// Sinkron progres ke database (server.py). Dimuat PERTAMA agar data server sudah
// dipulihkan ke localStorage sebelum skrip lain membacanya. Tanpa server = tetap jalan di browser saja.
(function () {
  'use strict';
  const KEYS = ['ml_daily_v1', 'ml_ai_chat', 'ml_yt_cache', 'ml_yt_valid', 'ml_cur_ver', 'ml_portfolio_v1', 'ml_projects_v1'];
  const rawSet = Storage.prototype.setItem;
  const timers = {};
  window.DB_ONLINE = false;

  function send(k, keepalive) {
    const v = localStorage.getItem(k); if (v === null) return;
    fetch('/api/state/' + k, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: v, keepalive: !!keepalive && v.length < 60000 }).catch(() => {});
  }
  function push(k) { clearTimeout(timers[k]); timers[k] = setTimeout(() => { delete timers[k]; send(k); }, 400); }

  let data = null;
  try {
    const x = new XMLHttpRequest(); x.open('GET', '/api/state', false); x.send();
    if (x.status === 200) { const r = JSON.parse(x.responseText); if (r.ok) { window.DB_ONLINE = true; data = r.data; } }
  } catch (e) { /* tidak ada server: pakai localStorage saja */ }

  if (DB_ONLINE) {
    KEYS.forEach(k => {
      if (k in data) rawSet.call(localStorage, k, data[k]);        // database menang
      else if (localStorage.getItem(k) !== null) send(k);          // migrasi progres lama ke database
    });
  }
  Storage.prototype.setItem = function (k, v) {
    rawSet.call(this, k, v);
    if (DB_ONLINE && this === localStorage && KEYS.includes(k)) push(k);
  };
  window.addEventListener('pagehide', () => Object.keys(timers).forEach(k => { clearTimeout(timers[k]); send(k, true); }));
})();
