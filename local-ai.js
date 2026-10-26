// ============================================================
// KLIEN AI: lokal (Qwen3 via llama-server) ATAU cloud (OpenRouter lewat proxy server.py)
// Bawaan: bila API key OpenRouter sudah diisi di pengaturan dipakai OpenRouter (model dipilih otomatis), bila tidak AI lokal.
// Key dikirim sekali ke server.py untuk disimpan, lalu TIDAK pernah kembali ke browser.
// Pengaturan di localStorage: ml_ai_provider, ml_ai_ep, ml_ai_lm, ml_ai_fast, ml_ai_lm_<provider>.
// ============================================================
(function () {
  'use strict';
  const K = { ep: 'ml_ai_ep', lm: 'ml_ai_lm', fast: 'ml_ai_fast', prov: 'ml_ai_provider' };
  const DEF = { ep: 'http://127.0.0.1:8080/v1', lm: 'qwen3-4b' };
  const CLOUD = { openrouter: { label: 'Cloud' } };
  const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const get = (k) => localStorage.getItem(k) || '';
  const lmKey = (p) => 'ml_ai_lm_' + p;

  // Bersihkan sisa pengaturan lama supaya tidak ada key tertinggal di browser.
  ['ml_hub_api_key', 'ml_hub_provider', 'ml_hub_local_endpoint', 'ml_hub_local_model', 'ml_hub_model',
    'ml_ai_model', 'ml_ai_think', 'ml_ai_prov'].forEach(k => localStorage.removeItem(k));
  if (/:8317\b/.test(get(K.ep))) localStorage.removeItem(K.ep); // alamat proxy lama

  // 'auto' | 'local' | nama penyedia cloud
  const provider = () => { const p = get(K.prov); return p === 'local' || has(CLOUD, p) ? p : 'auto'; };
  const label = (p) => (p === 'auto' ? 'Otomatis' : p === 'local' ? 'AI lokal' : CLOUD[p].label);
  const isBadModel = (m) => !m || /safety|guard|moderation|embed|classifier/i.test(m);
  const modelOf = (p) => {
    if (p === 'local') return get(K.lm) || DEF.lm;
    const key = lmKey(p === 'auto' ? 'openrouter' : p);
    const m = get(key);
    // Jika model kosong atau model sensor lama, bersihkan agar server otomatis mendeteksi model dari API pengguna
    if (isBadModel(m)) {
      localStorage.removeItem(key);
      return '';
    }
    return m;
  };

  function cfg() {
    return {
      prov: provider(),
      ep: (get(K.ep) || DEF.ep).replace(/\/+$/, ''),
      lm: modelOf(provider())
    };
  }
  function save(o) {
    const p = o.prov === 'local' || has(CLOUD, o.prov) ? o.prov : 'auto';
    localStorage.setItem(K.prov, p);
    if (p === 'local') {
      localStorage.setItem(K.ep, (o.ep || '').trim() || DEF.ep);
      localStorage.setItem(K.lm, (o.lm || '').trim() || DEF.lm);
    } else {
      const m = (o.lm || '').trim(), k = lmKey('openrouter');
      if (m) localStorage.setItem(k, m); else localStorage.removeItem(k);
    }
  }

  // Buang blok <think>...</think> agar hasil langsung bersih ke inti jawaban.
  const strip = (t) => String(t || '').replace(/<think>[\s\S]*?(<\/think>|$)/gi, '').trim();
  // Pesan error bisa berupa {error:{message}}, {error:"teks"}, atau [{error:{...}}] (gaya Google)
  const errOf = (j) => {
    const e = Array.isArray(j) ? j[0] : j, m = e && e.error;
    return (m && m.message) || (typeof m === 'string' ? m : '');
  };

  // ─── Status server (key yang ditemukan di api-key.txt) ─────
  let st = null, stAt = 0, used = null;
  async function status(force) {
    if (!force && Date.now() - stAt < 5000) return st;
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 2500);
    try { st = await (await fetch('/api/ai/status', { signal: ctl.signal })).json(); }
    catch (e) { st = null; }
    finally { clearTimeout(t); }
    stAt = Date.now();
    return st;
  }
  // Penyedia yang benar-benar dipakai: 'auto' menjadi penyedia dari api-key.txt, atau 'local' bila tidak ada key.
  async function effective(force) {
    const p = provider();
    if (p !== 'auto') return p;
    const s = await status(force);
    return (s && s.default) || 'local';
  }
  async function resolve(force) {
    const prov = await effective(force);
    return { prov, model: (used && used.prov === prov && used.model) || modelOf(prov) };
  }
  async function models(prov) {
    try {
      const q = prov ? '?provider=' + encodeURIComponent(prov) : '';
      return await (await fetch('/api/ai/models' + q)).json();
    }
    catch (e) { return null; }
  }

  // history: [{role:'user'|'assistant', content}]  ->  teks jawaban
  async function chat(system, history) {
    const prov = await effective(), c = cfg(), cloud = prov !== 'local';
    // Untuk model lokal Qwen: sematkan /no_think pada pertanyaan user terakhir agar tidak membuang waktu berpikir ribuan token
    const msgs = history.map((m, i) => (!cloud && i === history.length - 1 && m.role === 'user')
      ? { role: m.role, content: m.content + ' /no_think' } : m);
    const messages = [{ role: 'system', content: system }].concat(msgs);
    let res;
    try {
      if (cloud) {
        // max_tokens cukup luas (2200) agar penjelasan konsep dan kode selesai tuntas tanpa terpotong
        // reasoning: { effort: 'none' } menonaktifkan rantai CoT bertele-tele di OpenRouter
        const payload = {
          model: modelOf(prov) || 'auto',
          messages,
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 2200,
          reasoning: { effort: 'none' }
        };
        res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'ml-hub' },
          body: JSON.stringify({ provider: prov, payload })
        });
      } else {
        res = await fetch(c.ep + '/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: get(K.lm) || DEF.lm, messages,
            temperature: 0.7,
            top_p: 0.85,
            top_k: 20,
            max_tokens: 750,
            chat_template_kwargs: { enable_thinking: false }
          })
        });
      }
    } catch (e) {
      throw new Error(cloud
        ? 'Tidak bisa menghubungi server lokal. Jalankan start.bat (server.py) lalu buka lewat http://localhost:8000.'
        : c.prov === 'auto'
          ? 'Belum ada AI yang aktif. Isi API key Asisten di pengaturan, atau jalankan start.bat untuk AI lokal.'
          : 'Tidak bisa terhubung ke AI lokal di ' + c.ep + '. Jalankan start.bat (atau llama-server) lalu coba lagi.');
    }
    let j = null;
    try { j = await res.json(); } catch (e) { /* bukan JSON */ }
    if (!res.ok) throw new Error(errOf(j) || ('HTTP ' + res.status + ' dari ' + label(prov)));
    if (j && j.error) throw new Error(errOf(j));

    const choice = j && j.choices && j.choices[0];
    const msg = choice && (choice.message || choice.delta);
    
    // Ambil konten hanya dari hasil output bersih (content), JANGAN ambil reasoning_content
    let raw = '';
    if (msg) {
      if (typeof msg.content === 'string') raw = msg.content;
    } else if (choice && typeof choice.text === 'string') {
      raw = choice.text;
    } else if (typeof (j && j.response) === 'string') {
      raw = j.response;
    }

    // Bersihkan semua bentuk kebocoran CoT (Chain of Thought), <think>, draf internal, dan label sistem
    const cleanThought = (text) => {
      let s = String(text || '');
      // 1. Tag standar
      s = s.replace(/<(?:think|thought|reasoning)>[\s\S]*?(?:<\/(?:think|thought|reasoning)>|$)/gi, '');
      // 2. Draf CoT bahasa Inggris sebelum jawaban Indonesia
      const markers = [
        /Let['’]?s draft (?:the )?final (?:response|answer)? in Indonesian:\s*/i,
        /(?:^|\n)(?:Final Answer|Jawaban Akhir|Jawaban):\s*/i,
        /(?:^|\n)\*\*Final Answer:\*\*\s*/i
      ];
      for (const m of markers) {
        const idx = s.search(m);
        if (idx !== -1) {
          const match = s.match(m);
          s = s.slice(idx + match[0].length);
        }
      }
      // 3. Hapus semua baris label keamanan sistem (User Safety: safe, Response Safety: safe, dsb.)
      s = s.replace(/(?:^|\n)\s*(?:\[\s*)?(?:User|Response|Prompt|Model|Content)?\s*Safety(?:\s*Rating)?\s*:\s*(?:safe|unsafe)?(?:\s*\])?\s*(?=\n|$)/gi, '');
      const trimmed = s.trim();
      return trimmed || String(text || '').trim();
    };

    let out = cleanThought(raw);
    if (!out) {
      const modelName = (j && j.model) || '';
      throw new Error('Respons kosong dari ' + label(prov) + (modelName ? ' (' + modelName + ')' : '') + '. Coba pilih model lain di pengaturan atau tanyakan ulang.');
    }
    if (cloud && j.model) used = { prov, model: j.model };   // model yang benar-benar menjawab
    return out;
  }

  // Cek siap pakai (batas 2,5 detik) -> true/false
  // Cloud: ada key di api-key.txt (validitas key baru ketahuan saat chat). Lokal: server llama hidup.
  async function ping(force) {
    const prov = await effective(force);
    if (prov !== 'local') {
      const s = await status(force);
      return !!(s && (s.has_key || (s.providers && s.providers[prov])));
    }
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 2500);
    try { return (await fetch(cfg().ep + '/models', { signal: ctl.signal })).ok; }
    catch (e) { return false; }
    finally { clearTimeout(t); }
  }

  // Simpan (atau hapus bila kosong) API key OpenRouter di server.py
  async function setKey(key) {
    let j = null;
    try {
      j = await (await fetch('/api/ai/key', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'ml-hub' }, body: JSON.stringify({ key }) })).json();
    } catch (e) { throw new Error('Tidak bisa menghubungi server lokal. Jalankan start.bat lalu buka lewat http://localhost:8000.'); }
    if (!j || !j.ok) throw new Error((j && j.error) || 'Server belum versi terbaru. Tutup jendela start.bat, jalankan lagi, lalu refresh halaman (Ctrl+F5).');
    await status(true);
    return j.set;
  }

  window.ML_AI = { setKey, status, cfg, save, chat, ping, resolve, models, modelOf, label, DEF };
})();
