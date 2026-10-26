# To Machine Learning (120 Tahap Belajar ML)

Platform belajar mandiri *Machine Learning* 120 tahap yang dirancang berbasis kurikulum terstruktur (fondasi statistika ke rekayasa ML). Aplikasi ini berjalan secara lokal di komputermu, ringan (*vanilla web stack*), aman, dan dilengkapi asisten AI pribadi yang mendukung mode **Cloud** maupun **Lokal**.

---

## 🚀 Fitur Utama

1. **Kurikulum Terstruktur (120 Tahap & 6 Fase Besar):**
   - Disusun bertahap dari Tahap 1 hingga Tahap 120: Fondasi Matematika & Statistika, Pemrograman Python & Library Data, Pengolahan Data, Workflow ML Klasik & Evaluasi, Deep Learning, hingga Deployment & Capstone.
   - Setiap tahap memuat konsep materi, keterkaitan erat dengan ilmu statistika, video & referensi, checklist tugas, kuis interaktif, dan cuplikan kode Python.
2. **Pelacak Progres Berbasis Fase:**
   - Menghitung capaian penyelesaian per fase kurikulum secara realistis (misal `0 dari 6 tahap selesai`).
   - Sinkronisasi otomatis dari `localStorage` browser ke database SQLite (`progress.db`) lewat `server.py`.
3. **Streak Ramah Pelajar (Toleransi Libur 3 Hari):**
   - Api streak hanya tercentang jika kamu menyelesaikan seluruh materi tahap tersebut sampai tuntas 100% (bukan sekadar mencentang 1 tugas kecil).
   - Dilengkapi sistem toleransi libur (*grace period*) hingga maksimal 3 hari sebelum api padam, sehingga kamu bisa belajar santai sesuai kecepatanmu sendiri tanpa tekanan jadwal kaku.
4. **Tata Letak Fleksibel (Mode Fokus / Zen Mode):**
   - Sidebar menu kiri dan panel Chatbot AI kanan dapat disembunyikan atau dimunculkan secara independen kapan saja menggunakan tombol panah (`‹` / `›`) atau tab tepi mengambang.
   - Konten materi di tengah otomatis melebar penuh untuk pengalaman membaca yang lega dan bebas distraksi. Status buka/tutup tersimpan otomatis di browser.
5. **Katalog Proyek Mini:**
   - 10 proyek praktis bertahap yang terbuka sesuai kemajuan belajarmu untuk membangun portofolio nyata.
6. **Asisten AI Belajar Terintegrasi:**
   - Panel asisten cerdas yang otomatis memahami konteks tahap yang sedang kamu buka, catatan belajarmu, dan riwayat materi sebelumnya.
   - **Mode Cloud:** Cukup masukkan API key; alamat server otomatis ditangani dan model terbaik otomatis terdeteksi dari akunmu.
   - **Mode Lokal:** Berjalan offline via server model lokal (seperti `llama-server`).
   - **Animasi Progres Real-Time:** Menampilkan indikator dinamis (`Mengetik...` berselang-seling dengan `Berpikir...`).
   - **Pemformat Rumus Matematika Otomatis:** Rumus matematika LaTeX kompleks (seperti notasi vektor, matriks, pecahan, dan kalkulus gradien) otomatis diubah menjadi tipografi bersih (**v₁**, **v₂**, ∇, ∂) yang rapi dan nyaman dibaca pemula.
7. **Desain Bersih & Mode Gelap/Terang:**
   - Antarmuka ramah mata dengan tombol pengganti tema instan (*dark/light mode*).

---

## 🛠️ Arsitektur & Teknologi

- **Frontend:** HTML5, CSS3 murni (variabel tema CSS), Vanilla JavaScript (IIFE klasik, tanpa framework, tanpa build tool/bundler).
- **Backend:** Python standar (`server.py`, menggunakan modul bawaan `http.server`, `urllib`, `sqlite3`).
- **Database:** SQLite (`progress.db`) untuk menyimpan progres belajar secara permanen dan aman.
- **Keamanan API:** Kunci API AI disimpan lokal di komputermu (`api-key.txt` atau environment variable), tidak pernah dikirim ke database publik, dan browser berkomunikasi via proxy lokal `POST /api/ai/chat`.

---

## 🏁 Cara Menjalankan

### Persyaratan:
- **Python 3.8+** sudah terpasang di komputermu.
- *(Opsional untuk AI Lokal)*: `llama-server.exe` dan model GGUF (seperti Qwen3).

### Langkah 1: Jalankan Server
Buka terminal / Command Prompt di folder proyek ini, lalu jalankan:

```bash
python server.py
```
*Atau di Windows, kamu cukup klik dua kali berkas `start.bat`.*

### Langkah 2: Buka di Browser
Akses alamat lokal berikut di perambanmu:
```
http://localhost:8000
```

---

## 🤖 Konfigurasi Asisten AI

Buka panel **Asisten** di sisi kanan, lalu klik ikon **Pengaturan** (ikon gerigi):

### 1. Mode Cloud (Penyedia API Luar)
- **Penyedia AI:** Pilih `Cloud`.
- **API key Asisten:** Masukkan API key milikmu (direkomendasikan dari [OpenRouter](https://openrouter.ai/keys)). Kunci disimpan aman secara lokal di komputermu (`api-key.txt`).
- **Nama Model:**
  - **Otomatis (kosong):** Server otomatis mendeteksi akunmu dan memilihkan model terbaik yang tersedia.
  - **Manual (diisi):** Kamu juga bisa memilih model dari daftar yang terdeteksi atau mengetikkan model spesifik pilihanmu (contoh: `google/gemini-2.0-flash-001`, `deepseek/deepseek-chat`, `meta-llama/llama-3.3-70b-instruct`, dll.).
- Klik **Simpan**. Titik status akan berubah hijau jika siap digunakan.

### 💡 Catatan & Rekomendasi API (Mengapa OpenRouter Sangat Disarankan?)
Sangat disarankan menggunakan API dari **[OpenRouter](https://openrouter.ai)** karena alasan praktis:
1. **Satu Kunci untuk Semua Model:** Cukup dengan 1 API key gratis dari OpenRouter, kamu bisa langsung mengakses model dari **Google (Gemini 2.0 Flash / 1.5 Pro)**, **Meta (Llama 3.3)**, **DeepSeek (V3 / R1)**, hingga **Mistral** dan **Claude**, tanpa perlu mendaftar ke banyak platform secara terpisah.
2. **Koleksi Model Gratis:** OpenRouter menyediakan model gratis berkualitas tinggi yang siap pakai untuk belajar.

### 🔧 Panduan Modifikasi untuk Menerima API Lain Secara Langsung
Jika kamu ingin menghubungkan API penyedia lain secara langsung (tanpa melalui OpenRouter), kamu cukup memodifikasi dictionary `PROVIDERS` pada berkas `server.py`:

```python
# Di berkas server.py (sekitar baris 30):
PROVIDERS = {
    # Contoh untuk Google Gemini langsung (OpenAI-compatible):
    "gemini": {
        "base": "https://generativelanguage.googleapis.com/v1beta/openai",
        "env": "GEMINI_API_KEY",
        "prefix": "AIzaSy",
        "prefer": ("gemini-2.0-flash", "gemini-1.5-flash")
    },
    # Contoh untuk Groq langsung:
    "groq": {
        "base": "https://api.groq.com/openai/v1",
        "env": "GROQ_API_KEY",
        "prefix": "gsk_",
        "prefer": ("llama-3.3-70b-versatile",)
    },
    # Default OpenRouter:
    "openrouter": {
        "base": "https://openrouter.ai/api/v1",
        "env": "OPENROUTER_API_KEY",
        "prefix": "sk-or-",
        "prefer": ("google/gemini-2.0-flash-exp:free", "deepseek/deepseek-chat")
    }
}
```

### 2. Mode Lokal (Offline)
- **Penyedia AI:** Pilih `Lokal`.
- **Alamat server:** Alamat endpoint lokal (default: `http://127.0.0.1:8080/v1`).
- **Nama model:** Nama model lokalmu (misal `qwen3-4b`).

---

## 📂 Struktur Berkas

```text
ml-path/
├── index.html            # Kerangka utama aplikasi
├── server.py             # Server lokal Python + proxy AI + sync SQLite
├── progress.db           # Database SQLite progres belajar
├── start.bat             # Skrip instan untuk menjalankan AI lokal & server
│
├── styles.css            # Layout dan gaya global
├── daily.css             # Gaya tampilan belajar harian
├── theme.css             # Tema warna, variabel CSS, dan dark mode
├── ai.css                # Gaya panel asisten AI
├── projects.css          # Gaya tampilan daftar proyek
│
├── daily-curriculum.js   # Data kurikulum 120 tahap (6 fase)
├── daily-extra.js        # Data kuis & pengayaan kurikulum
├── daily.js              # Logika belajar, navigasi tahap, streak, dan kuis
├── daily-ai.js           # Logika interaksi panel chat asisten & parser rumus
├── local-ai.js           # Klien komunikasi AI (OpenAI format, status, fallback)
├── projects.js           # Logika daftar proyek praktis
├── db-sync.js            # Modul sinkronisasi localStorage ke server.py
└── app.js                # Pengaturan tema terang/gelap & toggle sidebar
```

---

## 🔒 Privasi & Keamanan Data
- Progres belajarmu tersimpan di browser (`localStorage`) dan disinkronkan ke database lokal `progress.db`.
- API Key AI tidak pernah dipublikasikan atau diekspos ke kode JavaScript frontend.
- Proxy `server.py` hanya melayani permintaan dari komputermu sendiri (`127.0.0.1`).
