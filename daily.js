// ============================================================
// MODUL BELAJAR HARIAN — tanpa API, semua data di localStorage
// Fitur: checklist per hari, progres + grafik, streak
// ============================================================
(function () {
  'use strict';

  const KEY = 'ml_daily_v1';
  const FLAME = '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 2c.6 3.6-3.2 5-3.2 9.2A4.8 4.8 0 0 0 12 16a4.8 4.8 0 0 0 4.8-4.8c0-1.8-.8-3-1.8-4.4-.5 1.6-1.4 2.2-2.4 1.8.9-2 .6-4.4-.6-6.6zM7 17.5A6 6 0 0 0 12 22a6 6 0 0 0 5-4.5c-1.2 1-3 1.5-5 1.5s-3.8-.5-5-1.5z"/></svg>';
  const TOTAL = DAILY_TASKS.length;
  const root = document.getElementById('dailyView');
  if (!root) return;

  // ─── STATE ────────────────────────────────────────────────
  let S = load();
  let viewDay = null;
  let tab = 'cek';

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.checks) return s;
    } catch (e) { /* ignore */ }
    return { start: null, checks: {}, activity: {}, doneOn: {}, notes: {} };
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(S)); }

  // ─── TANGGAL ──────────────────────────────────────────────
  const pad = (n) => String(n).padStart(2, '0');
  const ymd = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  function parse(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function diffDays(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }
  const today = () => ymd(new Date());
  const esc = (t) => { const d = document.createElement('div'); d.textContent = t == null ? '' : String(t); return d.innerHTML; };

  if (!S.start) { S.start = today(); save(); }
  S.quiz = S.quiz || {}; S.qa = S.qa || {};

  // Reset progres bersih otomatis (sekali jalan saat refresh)
  const RESET_TAG = 'reset_2026';
  if (localStorage.getItem('ml_reset_tag') !== RESET_TAG) {
    localStorage.setItem('ml_reset_tag', RESET_TAG);
    localStorage.setItem('ml_ai_fast', '0'); // Aktifkan mode berpikir secara default
    S = { start: today(), checks: {}, activity: {}, doneOn: {}, notes: {}, quiz: {}, qa: {} };
    save();
  }

  // ─── TUGAS (TO-DO) PER HARI ───────────────────────────────
  function tasksFor(t) {
    const list = [];
    const v = videoOf(t);
    if (v) list.push({ id: 'v', g: 'Tonton dan baca', text: 'Tonton video: ' + v.title });
    t.resources.forEach((r, i) => { if (v && r === v.ref) return; list.push({ id: 'r' + i, g: 'Tonton dan baca', text: 'Baca: ' + r.title, url: r.url, meta: r.type }); });
    t.todos.forEach((x, i) => list.push({ id: 't' + i, g: 'Kerjakan', text: x }));
    list.push({ id: 'c', g: 'Kerjakan', text: 'Jalankan kode contoh di Colab atau Jupyter, ubah 1 parameter, lihat apa yang berubah.' });
    list.push({ id: 'q', g: 'Tutup hari', text: 'Kerjakan kuis hari ini (tercentang otomatis saat dikirim).' });
    list.push({ id: 'n', g: 'Tutup hari', text: 'Tulis catatan 2–3 kalimat tentang yang sudah kamu pahami.' });
    return list;
  }
  const isOn = (day, id) => !!S.checks[day + ':' + id];
  function dayProgress(day) {
    const ts = tasksFor(DAILY_TASKS[day - 1]);
    const done = ts.filter(x => isOn(day, x.id)).length;
    return { done, total: ts.length, complete: done === ts.length };
  }
  function currentDay() {
    for (let d = 1; d <= TOTAL; d++) if (!dayProgress(d).complete) return d;
    return TOTAL + 1;
  }
  function toggle(day, id) {
    const k = day + ':' + id, t = today();
    if (S.checks[k]) {
      delete S.checks[k];
      S.activity[t] = Math.max(0, (S.activity[t] || 0) - 1);
      if (S.activity[t] === 0) delete S.activity[t];
    } else {
      S.checks[k] = true;
      S.activity[t] = (S.activity[t] || 0) + 1;
    }
    if (dayProgress(day).complete) { if (!S.doneOn[day]) S.doneOn[day] = t; }
    else delete S.doneOn[day];
    save();
  }

  // ─── STREAK (toleransi libur maksimal 3 hari sebelum padam) ─
  function streakInfo() {
    const t = today();
    const doneDates = {};
    Object.values(S.doneOn || {}).forEach(d => { if (d) doneDates[d] = (doneDates[d] || 0) + 1; });
    const dates = Object.keys(doneDates).sort();

    if (dates.length === 0) {
      return { cur: 0, best: 0, activeToday: false, daysSinceLast: 999 };
    }

    const lastDone = dates[dates.length - 1];
    const daysSinceLast = diffDays(lastDone, t);
    const activeToday = daysSinceLast === 0;

    // Jika libur lebih dari 3 hari, api padam (streak = 0)
    if (daysSinceLast > 3) {
      let best = 1, run = 1;
      for (let i = 1; i < dates.length; i++) {
        const gap = diffDays(dates[i - 1], dates[i]);
        if (gap <= 4) { run++; } else { best = Math.max(best, run); run = 1; }
      }
      best = Math.max(best, run);
      return { cur: 0, best, activeToday: false, daysSinceLast };
    }

    // Jika masih dalam batas toleransi (0-3 hari), hitung streak yang masih aktif
    let cur = 1;
    for (let i = dates.length - 1; i > 0; i--) {
      const gap = diffDays(dates[i - 1], dates[i]);
      if (gap <= 4) { cur++; } else { break; }
    }

    // Hitung streak terbaik sepanjang waktu
    let best = 1, run = 1;
    for (let i = 1; i < dates.length; i++) {
      const gap = diffDays(dates[i - 1], dates[i]);
      if (gap <= 4) { run++; } else { best = Math.max(best, run); run = 1; }
    }
    best = Math.max(best, run, cur);

    return { cur, best, activeToday, daysSinceLast };
  }

  // ─── RINGKASAN (dipakai sidebar, header, halaman progres) ───
  function summary() {
    const t = today(), cur = currentDay(), finished = cur > TOTAL;
    const doneDays = Object.keys(S.doneOn).length;
    let allTasks = 0, doneTasks = 0;
    for (let d = 1; d <= TOTAL; d++) { const p = dayProgress(d); allTasks += p.total; doneTasks += p.done; }
    let sched = '';
    if (finished) sched = `Semua materi telah selesai`;
    const st = streakInfo();
    let flameTitle, flameMsg, flameCls;
    if (st.cur === 0) {
      flameTitle = 'Streak mati';
      flameMsg = 'Selesaikan 1 tahap untuk menyalakan streak';
      flameCls = 'dead';
    } else if (st.activeToday) {
      flameTitle = `${st.cur} tahap beruntun`;
      flameMsg = 'Target tahap hari ini selesai';
      flameCls = 'alive';
    } else {
      flameTitle = `${st.cur} tahap beruntun`;
      const remaining = 3 - st.daysSinceLast;
      if (remaining > 0) {
        flameMsg = `Toleransi libur: sisa ${remaining} hari`;
      } else {
        flameMsg = 'Hari terakhir sebelum api padam!';
      }
      flameCls = 'risk';
    }
    return { cur, finished, doneDays, allTasks, doneTasks, sched, st, flameTitle, flameMsg, flameCls, pct: Math.round(doneDays / TOTAL * 100) };
  }
  const flameChip = (m) => `<div class="d-stat flame ${m.flameCls}"><span class="flame-icon">${FLAME}</span><div><b>${m.flameTitle}</b><span>${m.flameMsg}</span></div></div>`;

  // ─── SIDEBAR: daftar per hari ─────────────────────────────
  const nav = document.getElementById('sidebarNav');
  function renderNav(m) {
    if (!nav) return;
    const keep = nav.scrollTop;
    nav.innerHTML = ROADMAP_METADATA.phases.map(ph => {
      const days = DAILY_TASKS.filter(x => x.phaseId === ph.id);
      const dn = days.filter(x => dayProgress(x.day).complete).length;
      return `<div class="s-phase"><span>${esc(ph.name)}</span><span>${dn}/${days.length}</span></div>` + days.map(x => {
        const p = dayProgress(x.day);
        const cls = 's-day' + (x.day === viewDay && root.classList.contains('active') ? ' sel' : '') + (p.complete ? ' ok' : '') + (x.day === m.cur ? ' now' : '');
        return `<button class="${cls}" data-day="${x.day}" title="${esc(ph.name)} · ${esc(x.title)}"><span class="s-dot">${p.complete ? '✓' : ''}</span><span class="s-name">Tahap ${x.day} · ${esc(x.title)}</span><span class="s-count">${p.done}/${p.total}</span></button>`;
      }).join('');
    }).join('');
    nav.scrollTop = keep;
    const sel = nav.querySelector('.s-day.sel');
    if (sel && lastNavDay !== viewDay) sel.scrollIntoView({ block: 'nearest' });
    lastNavDay = viewDay;
    const donePhases = ROADMAP_METADATA.phases.filter(ph => {
      const days = DAILY_TASKS.filter(x => x.phaseId === ph.id);
      return days.length > 0 && days.every(x => dayProgress(x.day).complete);
    }).length;
    const totalPhases = ROADMAP_METADATA.phases.length;
    const bar = document.getElementById('globalProgress'), lab = document.getElementById('progressLabel');
    if (bar) bar.style.width = m.pct + '%';
    if (lab) lab.textContent = `${donePhases} dari ${totalPhases} tahap selesai`;
  }
  let lastNavDay = null;
  if (nav) nav.addEventListener('click', (e) => {
    const b = e.target.closest('.s-day'); if (!b) return;
    viewDay = +b.dataset.day; openDaily();
  });

  // ─── HALAMAN HARIAN ───────────────────────────────────────
  function render() {
    const mc = document.querySelector('.main-content');
    const sc = mc ? mc.scrollTop : 0, rs = root.scrollTop;
    const m = summary();
    if (viewDay == null) viewDay = Math.min(m.cur, TOTAL);
    const curTask = DAILY_TASKS[viewDay - 1];
    const curPhase = ROADMAP_METADATA.phases.find(p => p.id === curTask.phaseId) || { id: curTask.phaseId, name: '' };

    root.innerHTML = `
      <div class="d-wrap">
        <header class="d-head">
          <div>
            <h1>Tahap ${viewDay}<span>${esc(curPhase.name)}</span></h1>
            ${m.sched ? `<p>${esc(m.sched)}</p>` : ''}
          </div>
          <div class="d-stats">${flameChip(m)}</div>
        </header>
        <div id="dayDetail">${dayDetail(viewDay)}</div>
      </div>`;

    renderNav(m);
    if (mc) mc.scrollTop = sc;
    root.scrollTop = rs;
    document.dispatchEvent(new CustomEvent('daily-render'));
  }

  function quizHTML(day, t) {
    const q = quizFor(t), st = S.quiz[day] || { ans: {}, done: false };
    if (q.type === 'mcq') {
      let score = 0;
      const body = q.qs.map((x, i) => {
        const pick = st.ans[i];
        if (st.done && pick === x.a) score++;
        const opts = x.o.map((o, j) => {
          let c = 'c-opt';
          if (st.done) { if (j === x.a) c += ' right'; else if (j === pick) c += ' wrong'; }
          else if (j === pick) c += ' pick';
          return `<button class="${c}" data-act="qpick" data-day="${day}" data-q="${i}" data-o="${j}">${esc(o)}</button>`;
        }).join('');
        return `<div class="c-q"><p><b>${i + 1}.</b> ${esc(x.q)}</p>${opts}${st.done ? `<p class="muted small">${esc(x.e)}</p>` : ''}</div>`;
      }).join('');
      const all = q.qs.every((_, i) => st.ans[i] !== undefined);
      return body + (st.done
        ? `<div class="d-banner">Skor ${score}/${q.qs.length}</div><p><button class="btn-ghost-d" data-act="qreset" data-day="${day}">Ulangi kuis</button></p>`
        : `<button class="btn-primary" data-act="qsubmit" data-day="${day}" ${all ? '' : 'disabled'}>Kirim jawaban</button>`);
    }
    const body = q.qs.map((x, i) => `<div class="c-q"><p><b>${i + 1}.</b> ${esc(x)}</p>
      <textarea class="d-notes" rows="3" data-qa="${day}:${i}" placeholder="Minimal 15 karakter">${esc(S.qa[day + ':' + i] || '')}</textarea></div>`).join('');
    return `<p class="muted small">Kuis hari ini berupa jawaban tertulis.</p>${body}
      ${st.err ? '<p class="c-err">Semua jawaban minimal 15 karakter.</p>' : ''}
      ${st.done ? '<div class="d-banner">Kuis tercatat</div>' : `<button class="btn-primary" data-act="qsubmit" data-day="${day}">Simpan dan selesaikan</button>`}`;
  }

  function checklistHTML(day, t) {
    const groups = [];
    tasksFor(t).forEach(x => {
      let g = groups.find(y => y.name === x.g);
      if (!g) groups.push(g = { name: x.g, items: [] });
      g.items.push(x);
    });
    return groups.map(g => {
      const n = g.items.filter(x => isOn(day, x.id)).length;
      return `<div class="d-group"><h4>${esc(g.name)}<span>${n}/${g.items.length}</span></h4>${g.items.map(x => {
        const on = isOn(day, x.id);
        return `<div class="d-task ${on ? 'on' : ''}" data-act="toggle" data-day="${day}" data-id="${x.id}">
          <span class="d-box">${on ? '✓' : ''}</span>
          <span class="d-text">${esc(x.text)}
            ${x.url ? `<a class="d-link" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">buka</a>` : ''}
            ${x.meta ? `<span class="d-meta">${esc(x.meta)}</span>` : ''}</span></div>`;
      }).join('')}</div>`;
    }).join('');
  }

  function dayDetail(day) {
    const t = DAILY_TASKS[day - 1];
    const meta = ROADMAP_METADATA.phases.find(p => p.id === t.phaseId);
    const p = dayProgress(day);
    const pc = Math.round(p.done / p.total * 100);
    const v = videoOf(t);
    const player = v
      ? `<div class="c-video"><iframe src="${v.embedUrl || ('https://www.youtube-nocookie.com/embed/' + v.id)}" title="${esc(v.title)}" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
         <div class="c-vbar"><span>${esc(v.title)}</span><a class="d-link" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">Buka di YouTube</a></div>`
      : `<div class="c-video c-novideo"><div><b>Belum ada video untuk hari ini</b>
         <p class="muted small">Baca sumbernya di tab Materi, atau cari videonya.</p>
         <a class="btn-ghost-d" href="https://www.youtube.com/results?search_query=${encodeURIComponent(t.title)}" target="_blank" rel="noopener noreferrer">Cari di YouTube</a></div></div>`;

    const panes = {
      cek: `<div class="d-section">${checklistHTML(day, t)}</div>`,
      materi: `<div class="d-section"><h4>Konsep</h4><p>${esc(t.concept)}</p>
          <p class="muted small"><b>Kaitan statistika:</b> ${esc(t.statConnection)}</p></div>
        <div class="d-section"><h4>Sumber</h4>${t.resources.map(r => `<a class="c-res" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(r.title)}</span><span class="d-meta">${esc(r.type)}</span></a>`).join('')}</div>
        <div class="d-section"><h4>Kode contoh</h4><div class="d-code"><button class="d-copy" data-act="copy" data-day="${day}">Salin</button><pre><code>${esc(t.codeSnippet)}</code></pre></div></div>`,
      kuis: `<div class="d-section"><h4>Kuis</h4>${quizHTML(day, t)}</div>`,
      catatan: `<div class="d-section"><h4>Catatan</h4>
        <textarea class="d-notes" data-notes="${day}" rows="8" placeholder="Yang sudah paham, yang masih bingung">${esc(S.notes[day] || '')}</textarea></div>`
    };
    const tabs = [['cek', 'Checklist'], ['materi', 'Materi'], ['kuis', 'Kuis'], ['catatan', 'Catatan']]
      .map(([k, l]) => `<button class="c-tab ${tab === k ? 'on' : ''}" data-act="tab" data-tab="${k}">${l}</button>`).join('');

    return `<div class="d-card d-day">
      <div class="d-day-top">
        <div class="d-day-title">
          <span class="d-phase-tag">${esc(meta.name)}</span>
          <h2>${esc(t.title)}</h2>
        </div>
        <div class="d-nav">
          <button class="icon-btn" data-act="prev" aria-label="Hari sebelumnya" ${day <= 1 ? 'disabled' : ''}>‹</button>
          <button class="icon-btn" data-act="next" aria-label="Hari berikutnya" ${day >= TOTAL ? 'disabled' : ''}>›</button>
        </div>
      </div>
      ${player}
      <div class="d-prog"><div class="d-bar"><div style="width:${pc}%"></div></div><span class="muted small">${p.done}/${p.total} tugas${p.complete ? ', selesai' : ''}</span></div>
      <div class="c-tabs">${tabs}</div>
      ${panes[tab]}
    </div>`;
  }

  // ─── HALAMAN PROGRES ──────────────────────────────────────
  // ─── GRAFIK (canvas, tanpa library) ───────────────────────
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  function setup(c) {
    const dpr = window.devicePixelRatio || 1;
    const w = c.clientWidth, h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    return { g, w, h };
  }
  function grid(g, L, T, pw, ph, max, color, muted) {
    g.font = '11px IBM Plex Sans, sans-serif';
    g.textAlign = 'right'; g.textBaseline = 'middle';
    for (let k = 0; k <= 4; k++) {
      const y = T + ph * (1 - k / 4);
      g.strokeStyle = color; g.lineWidth = 1;
      g.beginPath(); g.moveTo(L, y); g.lineTo(L + pw, y); g.stroke();
      g.fillStyle = muted; g.fillText(String(Math.round(max * k / 4)), L - 6, y);
    }
  }

  function drawBars() {
    const c = document.getElementById('chBars'); if (!c || !c.clientWidth) return;
    const { g, w, h } = setup(c);
    const accent = css('--accent'), ok = css('--success'), line = css('--border'), muted = css('--text-muted');
    const days = [];
    for (let i = 13; i >= 0; i--) days.push(ymd(addDays(parse(today()), -i)));
    const vals = days.map(d => S.activity[d] || 0);
    const cd = Math.min(currentDay(), TOTAL);
    const target = tasksFor(DAILY_TASKS[cd - 1]).length;
    const max = Math.max(target, ...vals, 5);
    const L = 30, R = 8, T = 14, B = 24, pw = w - L - R, ph = h - T - B;
    grid(g, L, T, pw, ph, max, line, muted);
    const bw = pw / days.length;
    days.forEach((d, i) => {
      const v = vals[i], bh = v / max * ph, x = L + i * bw + bw * 0.18, bwid = bw * 0.64, y = T + ph - bh;
      if (v > 0) {
        const gr = g.createLinearGradient(0, T, 0, T + ph); gr.addColorStop(0, css('--sun')); gr.addColorStop(1, accent);
        g.fillStyle = v >= target ? css('--sun') : gr;
        if (g.roundRect) { g.beginPath(); g.roundRect(x, y, bwid, bh, 4); g.fill(); } else g.fillRect(x, y, bwid, bh);
        g.fillStyle = muted; g.textAlign = 'center'; g.textBaseline = 'bottom';
        g.fillText(String(v), x + bwid / 2, y - 2);
      }
      if ((13 - i) % 2 === 0) {
        const dt = parse(d);
        g.fillStyle = muted; g.textAlign = 'center'; g.textBaseline = 'top';
        g.fillText(pad(dt.getDate()) + '/' + pad(dt.getMonth() + 1), x + bwid / 2, T + ph + 6);
      }
    });
    const ty = T + ph * (1 - target / max);
    g.setLineDash([5, 4]); g.strokeStyle = muted; g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(L, ty); g.lineTo(L + pw, ty); g.stroke(); g.setLineDash([]);
  }

  function drawLine() {
    const c = document.getElementById('chLine'); if (!c || !c.clientWidth) return;
    const { g, w, h } = setup(c);
    const accent = css('--accent'), line = css('--border'), muted = css('--text-muted');
    const todayIdx = Math.max(0, diffDays(S.start, today()));
    const N = Math.min(Math.max(13, todayIdx), TOTAL - 1);
    const max = Math.max(5, Math.min(TOTAL, N + 1));
    const L = 30, R = 10, T = 14, B = 24, pw = w - L - R, ph = h - T - B;
    grid(g, L, T, pw, ph, max, line, muted);
    const X = (i) => L + (N === 0 ? 0 : i / N * pw);
    const Y = (v) => T + ph * (1 - Math.min(v, max) / max);
    // jadwal
    g.setLineDash([5, 4]); g.strokeStyle = muted; g.lineWidth = 1.5; g.beginPath();
    for (let i = 0; i <= N; i++) { const v = Math.min(TOTAL, i + 1); i ? g.lineTo(X(i), Y(v)) : g.moveTo(X(i), Y(v)); }
    g.stroke(); g.setLineDash([]);
    // aktual
    const doneDates = Object.values(S.doneOn);
    g.strokeStyle = accent; g.lineWidth = 2.5; g.beginPath();
    const pts = [];
    for (let i = 0; i <= Math.min(todayIdx, N); i++) {
      const dstr = ymd(addDays(parse(S.start), i));
      const v = doneDates.filter(x => x <= dstr).length;
      pts.push([X(i), Y(v)]);
      i ? g.lineTo(X(i), Y(v)) : g.moveTo(X(i), Y(v));
    }
    g.stroke();
    g.fillStyle = accent; pts.forEach(p => { g.beginPath(); g.arc(p[0], p[1], 3, 0, Math.PI * 2); g.fill(); });
    g.fillStyle = muted; g.textAlign = 'center'; g.textBaseline = 'top';
    for (let i = 0; i <= N; i += Math.max(1, Math.ceil(N / 7))) g.fillText('H' + (i + 1), X(i), T + ph + 6);
  }
  function drawCharts() { drawBars(); drawLine(); }

  const dash = document.getElementById('dashboardView');
  function renderProgress() {
    const m = summary();
    const donePhases = ROADMAP_METADATA.phases.filter(ph => {
      const days = DAILY_TASKS.filter(x => x.phaseId === ph.id);
      return days.length > 0 && days.every(x => dayProgress(x.day).complete);
    }).length;
    const totalPhases = ROADMAP_METADATA.phases.length;
    const bars = ROADMAP_METADATA.phases.map(p => {
      const days = DAILY_TASKS.filter(x => x.phaseId === p.id).map(x => x.day);
      const dn = days.filter(d => dayProgress(d).complete).length;
      return `<div class="d-phase"><div class="d-phase-top"><span>${esc(p.name)}</span><span class="muted">${dn}/${days.length} materi</span></div>
        <div class="d-bar"><div style="width:${Math.round(dn / days.length * 100)}%"></div></div></div>`;
    }).join('');
    dash.innerHTML = `
      <div class="d-wrap">
        <header class="d-head">
          <div><h1>${donePhases}<span>dari ${totalPhases} tahap selesai</span></h1>${m.sched ? `<p>${esc(m.sched)}</p>` : ''}</div>
          <div class="d-stats">${flameChip(m)}</div>
        </header>
        <div class="p-stats">
          <div class="d-card"><b>${m.doneTasks}/${m.allTasks}</b><span>tugas selesai</span></div>
          <div class="d-card"><b>${m.st.cur} hari</b><span>streak sekarang</span></div>
          <div class="d-card"><b>${m.st.best} hari</b><span>streak terbaik</span></div>
          <div class="d-card"><b>${totalPhases - donePhases}</b><span>tahap tersisa</span></div>
        </div>
        <div class="d-charts">
          <div class="d-card"><h3>Tugas per hari (14 hari terakhir)</h3><canvas id="chBars"></canvas>
            <p class="muted small">Batang kuning = target hari itu tercapai. Garis putus = target.</p></div>
          <div class="d-card"><h3>Hari selesai dan jadwal</h3><canvas id="chLine"></canvas>
            <p class="muted small">Garis biru = progresmu. Garis putus = 1 hari per hari.</p></div>
        </div>
        <div class="d-card"><h3>Per fase</h3>${bars}</div>
      </div>`;
    drawCharts();
    renderNav(m);
  }

  // ─── EVENT ────────────────────────────────────────────────
  root.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const el = e.target.closest('[data-act]'); if (!el) return;
    const a = el.dataset.act;
    if (a === 'tab') { tab = el.dataset.tab; render(); }
    else if (a === 'qpick') {
      const d = +el.dataset.day, st = S.quiz[d] = S.quiz[d] || { ans: {}, done: false };
      if (st.done) return;
      st.ans[el.dataset.q] = +el.dataset.o; save(); render();
    }
    else if (a === 'qsubmit') {
      const d = +el.dataset.day, t = DAILY_TASKS[d - 1], qz = quizFor(t);
      const st = S.quiz[d] = S.quiz[d] || { ans: {}, done: false };
      if (qz.type === 'reflect' && !qz.qs.every((_, i) => (S.qa[d + ':' + i] || '').trim().length >= 15)) { st.err = true; save(); render(); return; }
      st.done = true; st.err = false;
      if (!isOn(d, 'q')) toggle(d, 'q');
      save(); render();
    }
    else if (a === 'qreset') { S.quiz[+el.dataset.day] = { ans: {}, done: false }; save(); render(); }
    else if (a === 'toggle') { toggle(+el.dataset.day, el.dataset.id); render(); }
    else if (a === 'prev') { viewDay = Math.max(1, viewDay - 1); render(); }
    else if (a === 'next') { viewDay = Math.min(TOTAL, viewDay + 1); render(); }
    else if (a === 'copy') {
      navigator.clipboard.writeText(DAILY_TASKS[+el.dataset.day - 1].codeSnippet).then(() => {
        el.textContent = 'Tersalin'; setTimeout(() => { el.textContent = 'Salin'; }, 1500);
      });
    }
  });
  root.addEventListener('input', (e) => {
    const qa = e.target.closest('textarea[data-qa]');
    if (qa) { S.qa[qa.dataset.qa] = qa.value; save(); return; }
    const ta = e.target.closest('textarea[data-notes]'); if (!ta) return;
    S.notes[ta.dataset.notes] = ta.value; save();
  });

  // ─── NAVIGASI VIEW ────────────────────────────────────────
  function setActiveNav(id) {
    ['navDaily', 'navDash'].forEach(i => { const b = document.getElementById(i); if (b) b.classList.toggle('active', i === id); });
  }
  function openDaily() {
    dash.classList.remove('active');
    root.classList.add('active');
    setActiveNav('navDaily');
    render();
  }
  function openDash() {
    root.classList.remove('active');
    dash.classList.add('active');
    setActiveNav('navDash');
    renderProgress();
  }
  const bd = document.getElementById('navDaily'), bh = document.getElementById('navDash');
  if (bd) bd.addEventListener('click', () => { viewDay = null; openDaily(); });
  if (bh) bh.addEventListener('click', openDash);

  const refresh = () => { if (dash.classList.contains('active')) renderProgress(); else render(); };
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (dash.classList.contains('active')) drawCharts(); }, 150); });
  window.addEventListener('themechange', () => setTimeout(() => { if (dash.classList.contains('active')) drawCharts(); }, 30));

  window.DAILY_RENDER = refresh;
  window.DAILY_VIEWDAY = () => viewDay || Math.min(currentDay(), TOTAL);
  window.DAILY_RESET = () => {
    S = { start: today(), checks: {}, activity: {}, doneOn: {}, notes: {}, quiz: {}, qa: {} };
    save(); viewDay = null; refresh();
  };

  // halaman awal = Belajar Harian
  openDaily();
})();
