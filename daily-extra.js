// Data pendukung tampilan course: video, kuis pilihan ganda, soal refleksi
const YT_RE = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  // 1. Jika URL adalah Playlist murni (youtube.com/playlist?list=...)
  const playlistOnly = url.match(/youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/);
  if (playlistOnly) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistOnly[1]}`;
  }

  // 2. Jika URL adalah Video tunggal (dengan atau tanpa &list=...)
  const videoMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (videoMatch) {
    const listMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    const listQuery = listMatch ? `?list=${listMatch[1]}` : "";
    return `https://www.youtube-nocookie.com/embed/${videoMatch[1]}${listQuery}`;
  }

  return null;
}

// Ambil video YouTube dari resources (ID berasal dari data kurikulummu, bukan dikarang)
function videoOf(t) {
  for (const r of t.resources) {
    const embedUrl = getYouTubeEmbedUrl(r.url);
    if (embedUrl) {
      const m = r.url.match(YT_RE);
      return { id: m ? m[1] : null, embedUrl, title: r.title, url: r.url, ref: r };
    }
  }
  return null;
}

// Kuis pilihan ganda (kunci = nomor hari kurikulum 95 hari): a = indeks jawaban benar, e = penjelasan
const QUIZ_DB = {
  1: [
    { q: 'Pada matriks data X berukuran (n × p), p mewakili apa?', o: ['Jumlah sampel', 'Jumlah fitur/variabel', 'Jumlah kelas', 'Jumlah epoch'], a: 1, e: 'Baris = observasi (n), kolom = variabel/fitur (p).' },
    { q: 'Dot product dua vektor yang saling orthogonal bernilai…', o: ['1', '-1', '0', 'Tak terhingga'], a: 2, e: 'a·b = ||a|| ||b|| cos θ; orthogonal berarti θ = 90°, cos 90° = 0.' },
    { q: 'X berukuran (4×3) dikali w berukuran (3,). Bentuk hasil np.dot(X, w)?', o: ['(3,)', '(4,)', '(4, 3)', '(3, 4)'], a: 1, e: 'Dimensi dalam (3) hilang, tersisa 4 prediksi: satu per sampel.' }
  ],
  21: [
    { q: 'Rumus matriks kovarians sampel dari X yang sudah dipusatkan (X_c)?', o: ['X_c @ X_c.T / n', 'X_c.T @ X_c / (n-1)', 'X_c.T @ X_c * n', 'X_c / (n-1)'], a: 1, e: 'Hasilnya (p × p) dan memakai n-1 untuk estimator tak bias.' },
    { q: 'Apa yang diisi di diagonal matriks kovarians?', o: ['Korelasi tiap variabel', 'Variansi tiap variabel', 'Rata-rata tiap variabel', 'Selalu 1'], a: 1, e: 'Cov(X, X) = Var(X).' },
    { q: 'Korelasi Pearson didapat dari kovarians dengan cara…', o: ['Dikuadratkan', 'Dibagi hasil kali simpangan baku kedua variabel', 'Dikali n', 'Diakarkan'], a: 1, e: 'r = Cov(X,Y) / (sd_X · sd_Y), sehingga nilainya terbatas di [-1, 1].' }
  ],
  2: [
    { q: 'Eigenvector v dari matriks A memenuhi…', o: ['Av = λv', 'Av = v + λ', 'Av = 0 selalu', 'A = λv'], a: 0, e: 'A hanya mengubah panjang v (dikali λ), bukan arahnya.' },
    { q: 'Di PCA, arah variansi terbesar adalah eigenvector dengan…', o: ['Eigenvalue terkecil', 'Eigenvalue terbesar', 'Eigenvalue nol', 'Elemen terbesar'], a: 1, e: 'Eigenvalue pada matriks kovarians = variansi sepanjang arah eigenvector-nya.' },
    { q: 'Eigenvalue matriks kovarians (simetris, semi-definit positif) selalu…', o: ['Negatif', '≥ 0', 'Bilangan bulat', 'Sama semua'], a: 1, e: 'Variansi tidak mungkin negatif.' }
  ],
  4: [
    { q: 'Gradien fungsi loss L(w) adalah…', o: ['Nilai minimum L', 'Vektor turunan parsial L terhadap tiap parameter', 'Rata-rata L', 'Integral L'], a: 1, e: 'Gradien menunjuk arah kenaikan loss paling curam.' },
    { q: 'Update gradient descent yang benar?', o: ['w ← w + η∇L', 'w ← w − η∇L', 'w ← η∇L', 'w ← w / ∇L'], a: 1, e: 'Kita bergerak berlawanan arah gradien agar loss turun.' },
    { q: 'Learning rate η terlalu besar biasanya menyebabkan…', o: ['Konvergen lebih stabil', 'Loss berosilasi atau divergen', 'Gradien jadi nol', 'Tidak ada efek'], a: 1, e: 'Langkah melompati titik minimum.' }
  ],
  5: [
    { q: 'Pada Bayes P(Y|X) = P(X|Y)P(Y)/P(X), P(Y) disebut…', o: ['Posterior', 'Likelihood', 'Prior', 'Evidence'], a: 2, e: 'Prior = keyakinan awal (misal proporsi kelas) sebelum melihat fitur.' },
    { q: 'P(X|Y) disebut…', o: ['Likelihood', 'Prior', 'Posterior', 'Galat'], a: 0, e: 'Seberapa mungkin fitur X muncul jika kelasnya Y.' },
    { q: 'P(spam)=0,2; P(kata|spam)=0,5; P(kata|bukan spam)=0,1. Berapa P(spam|kata)?', o: ['0,20', '0,50', '≈0,56', '0,80'], a: 2, e: 'Pembilang 0,5×0,2=0,10; penyebut 0,10 + 0,1×0,8=0,18; hasil 0,10/0,18 ≈ 0,56.' }
  ]
};

// Hari tanpa kuis pilihan ganda memakai 3 soal refleksi yang wajib ditulis
function quizFor(t) {
  if (QUIZ_DB[t.day]) return { type: 'mcq', qs: QUIZ_DB[t.day] };
  return { type: 'reflect', qs: [
    'Dengan kata-katamu sendiri, apa inti dari "' + t.title + '"?',
    'Hubungkan konsep hari ini dengan satu materi statistika yang sudah kamu kenal.',
    'Tulis satu rumus atau istilah penting hari ini dan jelaskan artinya.'
  ] };
}
