// ============================================================
// ASISTEN BELAJAR — panel tetap di sisi kanan (AI lokal Qwen3 via local-ai.js)
// ============================================================
(function () {
  'use strict';
  const CHAT_KEY = 'ml_ai_chat';
  const $ = (id) => document.getElementById(id);
  const panel = $('assistant'), msgs = $('aiMsgs');
  if (!panel || !msgs) return;

  const jget = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const chat = jget(CHAT_KEY, {});
  const persist = () => localStorage.setItem(CHAT_KEY, JSON.stringify(chat));

  // Bersihkan sisa pesan error atau user yang menggantung di riwayat chat agar tidak memblokir UI
  Object.keys(chat).forEach(d => {
    if (Array.isArray(chat[d])) {
      chat[d] = chat[d].filter(m => m && m.r !== 'err');
      if (chat[d].length && chat[d][chat[d].length - 1].r === 'user') {
        chat[d].pop();
      }
    }
  });
  persist();
  const day = () => (window.DAILY_VIEWDAY ? window.DAILY_VIEWDAY() : 1);
  const STARTERS = ['Jelaskan konsep tahap ini', 'Beri contoh soal', 'Kaitkan dengan statistika'];
  let busy = false, lastDay = null;

  // ─── Tampilan ─────────────────────────────────────────────
  const GREEK = {
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε',
    zeta: 'ζ', eta: 'η', theta: 'θ', iota: 'ι', kappa: 'κ',
    lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', pi: 'π',
    rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ', phi: 'φ',
    chi: 'χ', psi: 'ψ', omega: 'ω',
    Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ',
    Pi: 'Π', Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
    nabla: '∇', partial: '∂', infty: '∞', sum: '∑', prod: '∏',
    times: '×', cdot: '·', pm: '±', approx: '≈', neq: '≠',
    le: '≤', ge: '≥', leq: '≤', geq: '≥', in: '∈', subset: '⊂',
    rightarrow: '→', to: '→', leftarrow: '←', mapsto: '↦'
  };

  // Format dan bersihkan rumus matematika (lingkup modul)
  function cleanFormula(f) {
    let s = String(f || '').trim();
    s = s.replace(/\\(?:text|mathrm|operatorname|mathit)\{([^}]+)\}/g, '$1');
    s = s.replace(/\\(?:mathbf|boldsymbol)\{([^}]+)\}/g, '<b>$1</b>');
    s = s.replace(/\\mathbf\s+([a-zA-Z0-9])/g, '<b>$1</b>');
    // Aksen matematika: tilde (C̃), hat (x̂), bar (x̄), vec (x⃗)
    s = s.replace(/\\(?:tilde|widetilde)\{([^}]+)\}/g, '$1&#x0303;');
    s = s.replace(/\\(?:tilde|widetilde)\s+([a-zA-Z0-9])/g, '$1&#x0303;');
    s = s.replace(/\\hat\{([^}]+)\}/g, '$1&#x0302;');
    s = s.replace(/\\bar\{([^}]+)\}/g, '$1&#x0304;');
    s = s.replace(/\\vec\{([^}]+)\}/g, '$1&#x20D7;');
    // Pecahan & akar
    s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');
    s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
    // Operator fungsi
    s = s.replace(/\\(?:tanh|sinh|cosh|sin|cos|tan|log|ln|exp|det|dim|ker|max|min|arg|lim)\b/g, (m) => m.slice(1));
    s = s.replace(/\\cdot\b/g, ' · ');
    s = s.replace(/\\times\b/g, ' × ');
    // Subscripts & Superscripts
    s = s.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
    s = s.replace(/_([a-zA-Z0-9+-]+)/g, '<sub>$1</sub>');
    s = s.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
    s = s.replace(/\^([a-zA-Z0-9+-]+)/g, '<sup>$1</sup>');
    // Simbol Yunani & kalkulus
    s = s.replace(/\\([a-zA-Z]+)/g, (match, word) => GREEK[word] !== undefined ? GREEK[word] : word);
    // Bersihkan kurung kurawal atau backslash yang tersisa
    s = s.replace(/\\([{}|\[\]])/g, '$1');
    return s;
  }

  function formatMath(str) {
    let s = str;
    s = s.replace(/\$\$([\s\S]*?)\$\$/g, (_, f) => `\n<div class="m-block">${cleanFormula(esc(f))}</div>\n`);
    s = s.replace(/\\\[([\s\S]*?)\\\]/g, (_, f) => `\n<div class="m-block">${cleanFormula(esc(f))}</div>\n`);
    s = s.replace(/\$([^$\n]+)\$/g, (_, f) => `<span class="m-inline">${cleanFormula(esc(f))}</span>`);
    s = s.replace(/\\\(([^)\n]+)\\\)/g, (_, f) => `<span class="m-inline">${cleanFormula(esc(f))}</span>`);
    return s;
  }

  function formatInline(str) {
    let s = esc(str);
    s = s.replace(/\$([^$\n]+)\$/g, (_, f) => `<span class="m-inline">${cleanFormula(f)}</span>`);
    s = s.replace(/\\\(([^)\n]+)\\\)/g, (_, f) => `<span class="m-inline">${cleanFormula(f)}</span>`);
    s = s.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>');
    s = s.replace(/\*([^*\n]+)\*/g, '<i>$1</i>');
    s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    return s;
  }

  function renderMarkdownText(text) {
    let s = text;

    // 1. Block Math: $$ ... $$ dan \[ ... \] PADA SELURUH TEKS MULTI-LINE SEBELUM SPLIT BARIS!
    s = s.replace(/\$\$([\s\S]*?)\$\$/g, (_, f) => `\n<div class="m-block">${cleanFormula(esc(f))}</div>\n`);
    s = s.replace(/\\\[([\s\S]*?)\\\]/g, (_, f) => `\n<div class="m-block">${cleanFormula(esc(f))}</div>\n`);

    // 2. Tables (Markdown | col | col |)
    s = s.replace(/(?:^|\n)(\|[^\n]+\|\r?\n\|[-:\s|]+\|\r?\n(?:\|[^\n]+\|\r?\n?)+)/g, (match, tbl) => {
      const lines = tbl.trim().split(/\r?\n/).filter(l => l.trim().startsWith('|'));
      if (lines.length < 2) return match;
      const parseCells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const heads = parseCells(lines[0]);
      const bodyRows = lines.slice(2).map(parseCells);
      
      const thead = '<thead><tr>' + heads.map(h => `<th>${formatInline(h)}</th>`).join('') + '</tr></thead>';
      const tbody = '<tbody>' + bodyRows.map(r => '<tr>' + r.map(c => `<td>${formatInline(c)}</td>`).join('') + '</tr>').join('') + '</tbody>';
      return `\n<div class="as-tbl-wrap"><table class="as-tbl">${thead}${tbody}</table></div>\n`;
    });

    // 3. Headings
    s = s.replace(/(?:^|\n)###\s+([^\n]+)/g, (_, h) => `\n<h4 class="as-h4">${formatInline(h)}</h4>\n`);
    s = s.replace(/(?:^|\n)##\s+([^\n]+)/g, (_, h) => `\n<h3 class="as-h3">${formatInline(h)}</h3>\n`);
    s = s.replace(/(?:^|\n)#\s+([^\n]+)/g, (_, h) => `\n<h3 class="as-h3">${formatInline(h)}</h3>\n`);

    // 4. Horizontal rules
    s = s.replace(/(?:^|\n)(?:---|___|\*\*\*)\s*(?=\n|$)/g, '\n<hr class="as-hr">\n');

    // 5. Lists (- item atau * item)
    s = s.replace(/(?:^|\n)[-*]\s+([^\n]+)/g, (_, li) => `\n<div class="as-li"><span class="as-bullet">•</span><span class="as-li-text">${formatInline(li)}</span></div>`);

    // 5. Linebreaks untuk baris biasa
    const lines = s.split(/\r?\n/);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      if (/^<(h3|h4|div|table|thead|tbody|tr|th|td|hr)/i.test(line)) {
        out.push(line);
      } else {
        out.push(`<p class="as-p">${formatInline(line)}</p>`);
      }
    }
    return out.join('');
  }

  // Deteksi dan bungkus baris kode Python yang tidak diberi tanda ``` oleh model AI
  function autoWrapRawCode(text) {
    const lines = text.split(/\r?\n/);
    const result = [];
    let codeBuffer = [];

    const isCode = (l) => {
      const line = l.trim();
      if (!line || line.length > 120) return false;
      // Jangan anggap elemen HTML atau teks percakapan normal sebagai kode
      if (/^<(h3|h4|div|table|thead|tbody|tr|th|td|hr|p|ul|ol|li|details|summary)/i.test(line)) return false;
      if (/^(?:Untuk|Dalam|Pada|Jika|Maka|Berikut|Perhatikan|Contoh|Catatan|Penjelasan|Intuisi|Aturan|Rumus|Kaitan|Langkah|Fungsi|Esensi|Analogi|#|##|###|-|\*|\d+\.)/i.test(line)) return false;
      // Jangan anggap kalimat teks panjang normal sebagai kode
      if (/^[A-Z][a-z]+(?:\s+[a-z]+){2,}/.test(line)) return false;
      // Hanya tangkap baris sintaks Python murni (import, def, print, penugasan variabel fungsi/library)
      return /^(?:import\s+[a-z0-9_]+|from\s+[a-z0-9_]+\s+import|def\s+[a-z0-9_]+\s*\(|class\s+[a-zA-Z0-9_]+|print\s*\(|[a-z0-9_]+\s*=\s*(?:np\.|torch\.|nn\.|pd\.|plt\.|[a-z0-9_]+\s*\())/i.test(line);
    };

    const flushCode = () => {
      if (codeBuffer.length > 0) {
        const codeText = codeBuffer.join('\n');
        result.push(`\n<div class="as-code-box"><div class="as-code-head"><span>python</span><button class="as-copy-btn" data-act="copy-code">Salin</button></div><pre><code>${esc(codeText)}</code></pre></div>\n`);
        codeBuffer = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (isCode(line)) {
        codeBuffer.push(line);
      } else {
        flushCode();
        result.push(line);
      }
    }
    flushCode();
    return result.join('\n');
  }

  function md(t) {
    if (!t) return '';
    let text = t;

    // Otomatis tutup blok kode ``` jika terputus di akhir respons
    const ticks = (text.match(/```/g) || []).length;
    if (ticks % 2 !== 0) {
      text += '\n```';
    }

    const parts = text.split(/```(\w*)\n?([\s\S]*?)```/);
    let result = '';
    for (let i = 0; i < parts.length; i += 3) {
      const wrappedText = autoWrapRawCode(parts[i]);
      result += renderMarkdownText(wrappedText);
      if (i + 2 < parts.length) {
        const lang = parts[i + 1] || 'python';
        const code = parts[i + 2];
        result += `<div class="as-code-box"><div class="as-code-head"><span>${esc(lang)}</span><button class="as-copy-btn" data-act="copy-code">Salin</button></div><pre><code>${esc(code)}</code></pre></div>`;
      }
    }
    return result;
  }

  // Bersihkan semua bentuk kebocoran pemikiran internal (CoT, <think>, draf bahasa Inggris)
  function cleanThought(text) {
    let s = String(text || '');
    s = s.replace(/<(?:think|thought|reasoning)>[\s\S]*?(?:<\/(?:think|thought|reasoning)>|$)/gi, '');
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
    // Hapus semua baris label keamanan sistem (User Safety: safe, Response Safety: safe, dsb.)
    s = s.replace(/(?:^|\n)\s*(?:\[\s*)?(?:User|Response|Prompt|Model|Content)?\s*Safety(?:\s*Rating)?\s*:\s*(?:safe|unsafe)?(?:\s*\])?\s*(?=\n|$)/gi, '');
    const trimmed = s.trim();
    // Pengaman mutlak: Jika setelah dibersihkan string kosong padahal teks aslinya ada isinya, pakai teks asli agar jawaban TIDAK PERNAH hilang
    return trimmed || String(text || '').trim();
  }

  // Format pesan: langsung tampilkan hasil output bersih (tanpa blok berpikir)
  function renderMsg(t) {
    try {
      return md(cleanThought(t));
    } catch (e) {
      return md(String(t || ''));
    }
  }

  // Animasi indikator progres: Mengetik... berselang-seling dengan Berpikir...
  let waitTimer = null;
  const WAIT_FRAMES = [
    'Mengetik.',
    'Mengetik..',
    'Mengetik...',
    'Berpikir.',
    'Berpikir..',
    'Berpikir...'
  ];
  let waitIdx = 0;

  function startWaiting() {
    waitIdx = 0;
    paint(`<div class="as-m wait" id="asWait">${WAIT_FRAMES[0]}</div>`);
    clearInterval(waitTimer);
    waitTimer = setInterval(() => {
      waitIdx = (waitIdx + 1) % WAIT_FRAMES.length;
      const el = $('asWait');
      if (el) el.textContent = WAIT_FRAMES[waitIdx];
    }, 450);
  }

  function stopWaiting() {
    clearInterval(waitTimer);
    waitTimer = null;
  }

  function renderChips() {
    const bar = $('aiChips');
    if (!bar) return;
    bar.innerHTML = STARTERS.map(s => `<button type="button" class="as-chip-pill" data-q="${esc(s)}">${esc(s)}</button>`).join('');
  }

  function paint(extra) {
    const d = day(), t = (typeof DAILY_TASKS !== 'undefined' && DAILY_TASKS[d - 1]) || { day: d, title: 'Tahap ' + d };
    const h = chat[d] || [];
    lastDay = d;
    $('aiCtx').textContent = `Tahap ${d} · ${t.title}`;
    msgs.innerHTML = (h.length
      ? h.map(m => `<div class="as-m ${m.r === 'user' ? 'me' : 'bot'}">${m.r === 'user' ? esc(m.t) : renderMsg(m.t)}</div>`).join('')
      : `<div class="as-empty"><p>Tanya soal materi tahap ini.</p>${
        STARTERS.map(s => `<button class="as-chip" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div>`)
      + (extra || '');
    msgs.scrollTop = msgs.scrollHeight;
    renderChips();
  }
  async function dot(force) {
    const ok = await ML_AI.ping(force), u = await ML_AI.resolve(), d = $('aiDot');
    d.className = 'as-dot ' + (ok ? 'on' : 'off');
    d.title = ML_AI.label(u.prov) + (u.model ? ' · ' + u.model : '') + (ok ? ' siap' : ' belum siap');
    return ok;
  }

  // ─── Konteks untuk AI ─────────────────────────────────────
  function memo(t) {
    try {
      const S = JSON.parse(localStorage.getItem('ml_daily_v1') || '{}'), done = Object.keys(S.doneOn || {}).map(Number).sort((x, y) => x - y);
      const last = done.slice(-6).map(n => 'Tahap ' + n + ' (' + (DAILY_TASKS[n - 1] || {}).title + ')').join('; ');
      const prev = [t.day - 1, t.day - 2].filter(n => n > 0 && (S.notes || {})[n]).map(n => `Catatan Tahap ${n}: ${String(S.notes[n]).slice(0, 250)}`).join(' | ');
      const now = (S.notes || {})[t.day];
      return `\n\nMemori belajar siswa: ${done.length} dari ${DAILY_TASKS.length} tahap selesai.` + (last ? ` Baru selesai: ${last}.` : '') + (prev ? ` ${prev}.` : '') + (now ? ` Catatan siswa tahap ini: ${String(now).slice(0, 500)}` : '') + `\nKaitkan jawaban dengan materi yang sudah dipelajari bila relevan.`;
    } catch (e) { return ''; }
  }
  function system(t) {
    return `Kamu adalah asisten belajar pribadi untuk mahasiswa Statistika semester 1 UNY (Python level intermediate) yang belajar jadi ML Engineer. ` +
      `Untuk setiap materi dan pertanyaan, berikan penjelasan yang LENGKAP, JELAS, TUNTAS, dan SISTEMATIS dengan 4 pilar berikut: ` +
      `1. Intuisi Konsep Utama (jelaskan esensi materi dengan 1 analogi sederhana kehidupan nyata). ` +
      `2. Aturan, Rumus & Langkah Teknis (jabarkan secara runtut dan mudah dipahami). ` +
      `3. Kaitan Erat ke Statistika & Machine Learning (mengapa materi ini penting dan di mana posisinya dalam ML). ` +
      `4. Contoh Kode Python Praktis (PEP 8, siap dijalankan dengan output yang jelas). WAJIB membungkus SEMUA baris kode Python di dalam blok triple backtick (\`\`\`python ... \`\`\`) agar otomatis berlatar belakang biru rapi. ` +
      `Tuliskan simbol matematika secara rapi (misal v₁, v₂, x², ∇f, ∂f/∂x atau huruf tebal). Hindari penulisan kode mentah LaTeX seperti $\\mathbf{v}_1$. ` +
      `DILARANG KERAS menuliskan proses berpikir internal, coret-coretan analisis (seperti 'Let\\'s draft...', 'We need to...', 'The user wants...'), atau teks berbahasa Inggris sebelum menjawab. Langsung mulai jawabanmu dalam Bahasa Indonesia yang bersih dan rapi.\n\n` +
      `Materi saat ini (Tahap ${t.day}): ${t.title}\nKonsep: ${t.concept}\nKaitan statistika: ${t.statConnection}\nTugas: ${t.todos.join(' | ')}` + memo(t);
  }

  // ─── Kirim pesan ──────────────────────────────────────────
  async function send(text) {
    const inp = $('aiInput'), btn = $('aiSend');
    const q = String(text !== undefined ? text : (inp ? inp.value : '')).trim();
    if (!q || busy) return;

    busy = true;
    if (btn) btn.disabled = true;

    const d = day();
    const h = chat[d] = chat[d] || [];
    h.push({ r: 'user', t: q });
    if (inp) { inp.value = ''; inp.style.height = 'auto'; }
    paint();
    startWaiting();

    try {
      const task = (typeof DAILY_TASKS !== 'undefined' && DAILY_TASKS[d - 1]) || { day: d, title: 'Tahap ' + d, concept: '', statConnection: '', todos: [] };
      const hist = h.slice(-4).map(m => ({
        role: m.r === 'user' ? 'user' : 'assistant',
        content: m.r === 'user' ? m.t : m.t.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '').trim()
      }));
      while (hist.length && hist[0].role !== 'user') hist.shift();

      const reply = await ML_AI.chat(system(task), hist);
      h.push({ r: 'bot', t: reply });
      persist();
    } catch (err) {
      console.error('Chat error:', err);
      if (h.length && h[h.length - 1].r === 'user') {
        h.pop();
      }
      persist();
      paint(`<div class="as-m err">${esc(err.message || 'Gagal berkomunikasi dengan AI.')}</div>`);
    } finally {
      stopWaiting();
      busy = false;
      if (btn) btn.disabled = false;
      paint();
      dot();
      if (inp) inp.focus();
    }
  }

  // ─── Pengaturan (satu panel kecil) ────────────────────────
  // Lokal: alamat server. Cloud: kolom key dan nama model.
  let hasKey = false;
  async function showFields(prov) {
    const local = prov === 'local';
    $('aiEpBox').hidden = !local;
    $('aiWarn').hidden = local;
    $('aiKeyBox').hidden = local;
    $('aiLm').value = ML_AI.modelOf(prov);
    $('aiLm').placeholder = local ? ML_AI.DEF.lm : 'Otomatis (terdeteksi dari API key)';
    if (local) { $('aiKeyDel').hidden = true; return; }
    const s = await ML_AI.status(true);
    hasKey = !!(s && (s.has_key || (s.providers && s.providers.openrouter)));
    $('aiKey').value = '';
    $('aiKey').placeholder = hasKey ? 'Tersimpan. Isi untuk mengganti.' : 'Masukkan API key (sk-or-...)...';
    $('aiKeyDel').hidden = !hasKey;
    if (hasKey) loadModels();
  }
  async function loadModels() {
    const j = await ML_AI.models('openrouter');
    if ($('aiProv').value === 'local') return;
    if (!j || !j.ok) {
      $('aiStat').textContent = !j ? 'Daftar model gagal dimuat: server belum versi terbaru. Tutup start.bat, jalankan lagi, lalu Ctrl+F5.'
        : 'Daftar model gagal dimuat: ' + (j.error || 'tidak diketahui') + '. Cek koneksi internet dan key-mu.';
      return;
    }
    const cleanList = (j.models || []).filter(m => !/safety|guard|moderation|embed|classifier/i.test(m));
    $('aiStat').textContent = cleanList.length + ' model terdeteksi dari API key-mu. Model dipilih otomatis bila dikosongkan.';
    $('aiModels').innerHTML = cleanList.map(m => `<option value="${esc(m)}"></option>`).join('');
    if (j.pick) $('aiLm').placeholder = 'Otomatis: ' + j.pick;
  }
  function openSettings(open) {
    const box = $('aiSet');
    box.hidden = open === undefined ? !box.hidden : !open;
    if (box.hidden) return;
    const c = ML_AI.cfg();
    $('aiProv').value = c.prov;
    $('aiEp').value = c.ep;
    $('aiStat').textContent = '';
    showFields(c.prov);
  }
  $('aiProv').onchange = () => showFields($('aiProv').value);
  $('aiSetBtn').onclick = () => openSettings();
  $('aiSave').onclick = async () => {
    const prov = $('aiProv').value, key = $('aiKey').value.trim();
    if (prov !== 'local' && key) {
      try { await ML_AI.setKey(key); } catch (e) { $('aiStat').textContent = e.message; return; }
    }
    ML_AI.save({ prov, ep: $('aiEp').value, lm: $('aiLm').value });
    $('aiStat').textContent = 'Mengecek…';
    const ok = await dot(true), u = await ML_AI.resolve();
    if (prov !== 'local') showFields(prov);
    $('aiStat').textContent = ok ? 'Tersimpan. Memakai ' + ML_AI.label(u.prov) + (u.model ? ' · ' + u.model : u.prov === 'local' ? '' : ' (model otomatis)') + '.'
      : (u.prov === 'local' ? 'Tersimpan, tapi AI lokal belum jalan. Jalankan start.bat, atau isi API key Asisten.'
        : 'Tersimpan, tapi API key Asisten belum diisi.');
    if (window.ML_AI_BADGE) window.ML_AI_BADGE();
  };
  $('aiKeyDel').onclick = async () => {
    try { await ML_AI.setKey(''); } catch (e) { $('aiStat').textContent = e.message; return; }
    showFields($('aiProv').value); dot(true); $('aiStat').textContent = 'Key dihapus.';
  };
  $('aiClr').onclick = () => { delete chat[day()]; persist(); paint(); openSettings(false); };
  $('aiReset').onclick = () => {
    if (!confirm('Reset semua progres, streak, dan catatan? Tidak bisa dibatalkan.')) return;
    if (window.DAILY_RESET) window.DAILY_RESET();
    openSettings(false); paint();
  };

  // ─── Event ────────────────────────────────────────────────
  if ($('aiSend')) $('aiSend').onclick = () => send();
  if ($('aiInput')) {
    $('aiInput').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
    $('aiInput').addEventListener('input', function () { this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 130) + 'px'; });
  }
  panel.addEventListener('click', (e) => {
    const chip = e.target.closest('.as-chip, .as-chip-pill');
    if (chip && chip.dataset.q) {
      send(chip.dataset.q);
      return;
    }
    const cp = e.target.closest('.as-copy-btn');
    if (cp) {
      const box = cp.closest('.as-code-box');
      const code = box ? box.querySelector('pre code').textContent : '';
      if (code && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          const orig = cp.textContent;
          cp.textContent = 'Tersalin!';
          setTimeout(() => { cp.textContent = orig; }, 1500);
        });
      }
    }
  });
  // Sembunyikan / Munculkan Asisten AI di sisi kanan (tersimpan di localStorage)
  const AS_KEY = 'ml_assistant_closed';
  const updateAssistant = (closed) => {
    panel.classList.toggle('closed', closed);
    panel.classList.remove('open');
    localStorage.setItem(AS_KEY, closed ? '1' : '0');
  };

  const initialAsClosed = localStorage.getItem(AS_KEY) === '1';
  if (initialAsClosed) updateAssistant(true);

  $('aiClose').onclick = () => updateAssistant(true);
  $('aiTab').onclick = () => updateAssistant(false);
  // konteks mengikuti hari yang sedang dibuka
  document.addEventListener('daily-render', () => { if (!busy && day() !== lastDay) paint(); });

  paint(); dot();
})();
