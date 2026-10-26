// ============================================================
// DAFTAR PROYEK — 10 proyek, satu atau dua per tahap kurikulum.
// Status (belum / dikerjakan / selesai) dan tautan disimpan di localStorage (ml_projects_v1, ikut tersinkron ke database).
// Sebuah proyek "siap" bila semua hari sampai `after` sudah selesai di Belajar Harian.
// ============================================================
(function () {
  'use strict';
  const KEY = 'ml_projects_v1', DAILY_KEY = 'ml_daily_v1';
  const root = document.getElementById('projectsView'), btn = document.getElementById('navProj');
  if (!root || !btn) return;

  const PROJECTS = [
    { id: 'clt', phase: 1, after: 25, title: 'Simulasi CLT dan Uji Hipotesis',
      goal: 'Buktikan Teorema Limit Pusat dan cara kerja uji hipotesis lewat simulasi.',
      out: ['Distribusi rata-rata sampel dari tiga distribusi berbeda', 'Visualisasi konvergensi ke normal untuk beberapa ukuran sampel', 'Uji hipotesis dan interval kepercayaan, dibandingkan dengan hasil SciPy'],
      stack: 'Python, NumPy, SciPy, Matplotlib', data: 'Data simulasi' },
    { id: 'eda', phase: 2, after: 44, title: 'Laporan EDA Dataset Nyata',
      goal: 'Kembangkan Mini-Project Hari 44 menjadi laporan analisis yang siap dipajang.',
      out: ['Ringkasan statistik dan pemeriksaan kualitas data', 'Minimal enam visualisasi, masing-masing dengan kesimpulan tertulis', 'Notebook yang bisa dijalankan ulang dari awal'],
      stack: 'Pandas, Matplotlib, Seaborn', data: 'Satu dataset pilihan dari Kaggle atau UCI' },
    { id: 'pipe', phase: 3, after: 60, title: 'Pipeline Data: Ambil, Bersihkan, Simpan',
      goal: 'Bangun alur data yang bisa diulang dari sumber mentah sampai siap dimodelkan.',
      out: ['Pengambilan data dari API publik atau CSV, disimpan ke SQLite', 'Pembersihan terdokumentasi: nilai hilang, outlier, duplikasi', 'Preprocessing dalam satu pipeline scikit-learn'],
      stack: 'Pandas, SQLite, scikit-learn', data: 'API publik atau CSV pilihanmu' },
    { id: 'reg', phase: 4, after: 72, title: 'Prediksi Harga Rumah',
      goal: 'Bandingkan model regresi dengan evaluasi yang benar secara statistik.',
      out: ['Baseline OLS, lalu Ridge, Lasso, dan fitur polinomial', 'Validasi silang, RMSE, MAE, dan R²', 'Analisis residual dan asumsi regresi'],
      stack: 'scikit-learn, statsmodels', data: 'California Housing (scikit-learn)' },
    { id: 'churn', phase: 4, after: 80, title: 'Prediksi Churn Pelanggan',
      goal: 'Klasifikasi pada data tidak seimbang, dari baseline sampai boosting.',
      out: ['Logistic Regression, Random Forest, dan XGBoost atau LightGBM', 'PR-AUC, F1, dan confusion matrix, bukan hanya akurasi', 'Penentuan threshold berdasarkan biaya kesalahan'],
      stack: 'scikit-learn, XGBoost atau LightGBM', data: 'Telco Customer Churn (Kaggle)' },
    { id: 'seg', phase: 4, after: 84, title: 'Segmentasi Pelanggan',
      goal: 'Temukan kelompok pelanggan dan jelaskan ciri masing-masing.',
      out: ['K-Means dan GMM, dipilih dengan silhouette', 'Proyeksi PCA dua dimensi', 'Profil tiap segmen dalam bahasa bisnis'],
      stack: 'scikit-learn, Matplotlib', data: 'Online Retail (UCI) atau Mall Customers' },
    { id: 'nn', phase: 5, after: 89, title: 'Jaringan Saraf dari Nol',
      goal: 'Pahami backpropagation dengan menulisnya sendiri tanpa framework.',
      out: ['MLP dengan NumPy: forward, backward, dan optimizer', 'Pemeriksaan gradien secara numerik', 'Hasil dibandingkan dengan versi PyTorch'],
      stack: 'NumPy, PyTorch', data: 'Digits (scikit-learn)' },
    { id: 'cnn', phase: 5, after: 94, title: 'Klasifikasi Gambar dengan Transfer Learning',
      goal: 'Fine-tune model pralatih dan baca hasilnya dengan jujur.',
      out: ['Fine-tuning model pralatih dengan augmentasi data', 'Kurva loss dan akurasi, serta confusion matrix', 'Analisis contoh yang salah diprediksi'],
      stack: 'PyTorch, torchvision', data: 'CIFAR-10 atau dataset gambar pilihanmu' },
    { id: 'nlp', phase: 6, after: 111, title: 'Analisis Sentimen Bahasa Indonesia',
      goal: 'Bandingkan baseline klasik dengan model transformer.',
      out: ['Baseline TF-IDF dan Logistic Regression', 'Fine-tuning model transformer dengan LoRA', 'Analisis kesalahan dan perbandingan kedua pendekatan'],
      stack: 'Hugging Face, PEFT', data: 'SmSA (IndoNLU)' },
    { id: 'cap', phase: 6, after: 118, title: 'Capstone: Model Terdeploy dan Terjelaskan',
      goal: 'Bawa satu model dari proyek sebelumnya sampai bisa dipakai orang lain.',
      out: ['API prediksi dengan FastAPI, dikemas dalam Docker', 'Penjelasan model dengan SHAP atau LIME', 'README dan demo singkat'],
      stack: 'FastAPI, Docker, SHAP', data: 'Model dari proyek sebelumnya' }
  ];
  const NEXT = { todo: 'doing', doing: 'done', done: 'todo' };
  const LABEL = { todo: 'Belum dimulai', doing: 'Dikerjakan', done: 'Selesai' };

  // ─── State ────────────────────────────────────────────────
  let S = load(), open = new Set();
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.st) return s; } catch (e) { /* abaikan */ }
    return { st: {}, link: {} };
  }
  const save = () => localStorage.setItem(KEY, JSON.stringify(S));
  const status = (id) => S.st[id] || 'todo';
  const esc = (t) => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const safeUrl = (u) => (/^https?:\/\//i.test(u) ? u : '');

  function doneDays() {
    try { return JSON.parse(localStorage.getItem(DAILY_KEY)).doneOn || {}; } catch (e) { return {}; }
  }
  const isReady = (p, done) => { for (let d = 1; d <= p.after; d++) if (!done[d]) return false; return true; };

  // ─── Tampilan ─────────────────────────────────────────────
  function item(p, done) {
    const st = status(p.id), isOpen = open.has(p.id), ready = isReady(p, done), url = safeUrl(S.link[p.id] || '');
    const when = st !== 'todo' ? LABEL[st] : ready ? 'Siap' : 'Setelah Hari ' + p.after;
    return `<article class="pj-item" data-id="${p.id}">
      <div class="pj-row" data-act="toggle">
        <button type="button" class="pj-st ${st}" data-act="cycle" aria-label="Status ${esc(p.title)}: ${LABEL[st]}. Klik untuk mengubah." title="${LABEL[st]}"></button>
        <button type="button" class="pj-main" aria-expanded="${isOpen}">
          <b>${esc(p.title)}</b><span>${esc(p.goal)}</span>
        </button>
        <span class="pj-when ${st === 'todo' && ready ? 'ready' : ''}">${esc(when)}</span>
      </div>
      <div class="pj-body" ${isOpen ? '' : 'hidden'}>
        <h4>Hasil akhir</h4>
        <ul>${p.out.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <dl><dt>Alat</dt><dd>${esc(p.stack)}</dd><dt>Data</dt><dd>${esc(p.data)}</dd></dl>
        <div class="pj-link">
          <input type="url" data-link="${p.id}" value="${esc(S.link[p.id] || '')}" placeholder="Tautan repo atau notebook (opsional)" autocomplete="off">
          <a class="d-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer" ${url ? '' : 'hidden'}>Buka</a>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const rs = root.scrollTop, done = doneDays();
    const phases = (typeof ROADMAP_METADATA !== 'undefined' && ROADMAP_METADATA.phases) || [];
    const n = PROJECTS.length, nDone = PROJECTS.filter(p => status(p.id) === 'done').length, nDoing = PROJECTS.filter(p => status(p.id) === 'doing').length;
    root.innerHTML = `<div class="d-wrap">
      <header class="pj-head">
        <h1>Proyek</h1>
        <p class="muted">${nDone} dari ${n} selesai${nDoing ? ` · ${nDoing} dikerjakan` : ''}</p>
      </header>
      ${phases.map(ph => {
        const list = PROJECTS.filter(p => p.phase === ph.id);
        return list.length ? `<section class="pj-phase"><h3>${esc(ph.name)}<span>${esc(ph.days)}</span></h3>
          <div class="d-card pj-card">${list.map(p => item(p, done)).join('')}</div></section>` : '';
      }).join('')}
    </div>`;
    root.scrollTop = rs;
  }

  // ─── Event ────────────────────────────────────────────────
  root.addEventListener('click', (e) => {
    if (e.target.closest('a, input')) return;
    const art = e.target.closest('.pj-item'); if (!art) return;
    const id = art.dataset.id;
    if (e.target.closest('[data-act="cycle"]')) { S.st[id] = NEXT[status(id)]; save(); render(); return; }
    if (e.target.closest('.pj-row')) {
      const body = art.querySelector('.pj-body'), main = art.querySelector('.pj-main');
      if (open.has(id)) open.delete(id); else open.add(id);
      body.hidden = !open.has(id); main.setAttribute('aria-expanded', open.has(id));
    }
  });
  root.addEventListener('change', (e) => {
    const inp = e.target.closest('input[data-link]'); if (!inp) return;
    const v = inp.value.trim(), a = inp.parentNode.querySelector('a'), url = safeUrl(v);
    S.link[inp.dataset.link] = v; save();
    a.href = url; a.hidden = !url;
  });

  // ─── Navigasi view ────────────────────────────────────────
  function show() {
    document.querySelectorAll('.main-content .view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-quick .nav-item').forEach(b => b.classList.toggle('active', b === btn));
    root.classList.add('active');
    S = load();
    render();
  }
  btn.addEventListener('click', show);
  // Menu lain (Belajar Harian, Progres, Portofolio, daftar hari) menutup halaman ini
  const side = document.getElementById('sidebar');
  if (side) side.addEventListener('click', (e) => {
    if (e.target.closest('#navProj') || !e.target.closest('.nav-quick .nav-item, .s-day')) return;
    root.classList.remove('active'); btn.classList.remove('active');
  }, true);
})();
