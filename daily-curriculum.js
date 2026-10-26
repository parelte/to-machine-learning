// ============================================================
// ROADMAP BELAJAR ML — 120 HARI (6 TAHAP)
// Diadaptasi dari ML Roadmap roadmap.sh/machine-learning
// Baseline: Mahasiswa Statistika Semester 1 UNY (Python level intermediate)
// Video TIDAK dikarang: hanya link yang sudah ada di data kurikulum,
// sisanya dicari lewat YouTube Data API (tombol "Cari video").
// ============================================================

const ROADMAP_METADATA = { title: '', targetAudience: 'Mahasiswa Statistika Semester 1 UNY (Intermediate Python)', phases: [] };

const DAILY_TASKS = [
  // ─── TAHAP 1: ORIENTASI & FONDASI MATEMATIKA (HARI 1 – 26) ───
  {
    day: 1, phaseId: 1, title: "Pengenalan: Apa itu ML Engineer?",
    concept: "Peran, alur kerja industri, serta Skills and Responsibilities utama seorang ML Engineer.",
    statConnection: "Statistika adalah fondasi utama ML; kemampuan analisis data dari kuliah statistika langsung relevan di sini.",
    resources: [
      { title: "Machine Learning Roadmap (roadmap.sh)", url: "https://roadmap.sh/machine-learning", type: "Web" },
      { title: "What is Machine Learning? (StatQuest)", url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI", type: "Video" }
    ],
    todos: ["Baca halaman ML Roadmap secara menyeluruh.", "Catat perbedaan peran ML Engineer, Data Scientist, dan MLOps.", "Tuliskan motivasi pribadi mengapa ingin menjadi ML Engineer."],
    codeSnippet: `# Hari 1: Tidak ada kode — hari orientasi
# Cukup tuliskan tujuan belajarmu di catatan di bawah!
print("Mulai perjalanan 120 hari menuju ML Engineer!")`
  },
  {
    day: 2, phaseId: 1, title: "ML Engineer vs AI Engineer & Roadmap Terkait",
    concept: "Perbedaan fokus kerja ML Engineer, AI Engineer, Data Scientist, dan MLOps. Setiap peran punya keahlian inti yang berbeda.",
    statConnection: "Data Scientist sangat bergantung pada statistik; ML Engineer lebih ke rekayasa sistem model.",
    resources: [
      { title: "AI Engineer Roadmap (roadmap.sh)", url: "https://roadmap.sh/ai-engineer", type: "Web" },
      { title: "MLOps Roadmap (roadmap.sh)", url: "https://roadmap.sh/mlops", type: "Web" },
      { title: "Stanford CS229 Intro (Andrew Ng)", url: "https://www.youtube.com/watch?v=jGwO_UgTS7I", type: "Video" }
    ],
    todos: ["Bandingkan roadmap ML vs AI Engineer vs MLOps.", "Buat tabel perbandingan skill utama tiap peran.", "Tentukan peran mana yang menjadi target utamamu."],
    codeSnippet: `# Hari 2: Eksplorasi roadmap
# Buka ketiga link di resources dan buat catatan perbandingan
roles = {"ML Engineer": ["modeling","deployment","optimization"],
         "AI Engineer": ["LLM","RAG","agents"],
         "MLOps": ["CI/CD","monitoring","pipelines"]}
for role, skills in roles.items():
    print(f"{role}: {', '.join(skills)}")`
  },
  {
    day: 3, phaseId: 1, title: "Aljabar Linear – Skalar, Vektor, & Tensor",
    concept: "Representasi dimensi data, operasi vektor, norma L1 dan L2. Vektor adalah blok bangunan data ML.",
    statConnection: "Vektor kolom dalam data statistik (observasi × variabel) adalah dasar matriks data X(n×p).",
    resources: [
      { title: "MML Book Bab 2 (PDF)", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "Vectors, What Even Are They? (3Blue1Brown)", url: "https://www.youtube.com/watch?v=fNk_zzaMoSs", type: "Video" }
    ],
    todos: ["Pahami representasi vektor dalam ruang n-dimensi.", "Hitung norma L1 dan L2 secara manual.", "Implementasikan operasi vektor dengan NumPy."],
    codeSnippet: `import numpy as np
v = np.array([3, 4, 0])
print("Norma L1 (Manhattan):", np.linalg.norm(v, ord=1))  # 7
print("Norma L2 (Euclidean):", np.linalg.norm(v))          # 5.0
# Dot product
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print("Dot product:", np.dot(a, b))  # 32`
  },
  {
    day: 4, phaseId: 1, title: "Aljabar Linear – Span & Basis Vectors",
    concept: "Kombinasi linear, span, dan kebebasan linear (linear independence). Basis = set vektor minimum yang merentang suatu ruang.",
    statConnection: "Kolom-kolom matriks data yang saling bebas linear memastikan model regresi tidak singular.",
    resources: [
      { title: "Stanford CS229 Linear Algebra Notes", url: "https://cs229.stanford.edu/section/cs229-linalg.pdf", type: "Docs" },
      { title: "Linear Combinations, Span, Basis Vectors (3Blue1Brown)", url: "https://www.youtube.com/watch?v=k7RM-ot2NWY", type: "Video" }
    ],
    todos: ["Pahami definisi span dan basis secara intuitif.", "Cek linear independence dua vektor.", "Tulis contoh 3 vektor di R² yang tidak bebas linear."],
    codeSnippet: `import numpy as np
# Cek rank untuk linear independence
A = np.array([[1, 2], [2, 4]])  # kolom 2 = 2 × kolom 1
print("Rank A:", np.linalg.matrix_rank(A))  # 1 = tidak bebas linear
B = np.array([[1, 0], [0, 1]])  # basis standar R²
print("Rank B:", np.linalg.matrix_rank(B))  # 2 = bebas linear`
  },
  {
    day: 5, phaseId: 1, title: "Aljabar Linear – Matriks & Operasi Matriks (1)",
    concept: "Penjumlahan, perkalian skalar, transpose, dan Hadamard product. Matriks = kumpulan transformasi linear.",
    statConnection: "Matriks korelasi dan kovarians adalah matriks simetris yang sering ditemui dalam analisis multivariat.",
    resources: [
      { title: "MML Book Bab 2.2: Matrices", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "Linear Transformations and Matrices (3Blue1Brown)", url: "https://www.youtube.com/watch?v=kYB8IZa5AuE", type: "Video" }
    ],
    todos: ["Lakukan operasi penjumlahan dan perkalian skalar matriks.", "Hitung transpose dan Hadamard product.", "Buat matriks 3×3 simetris dengan NumPy."],
    codeSnippet: `import numpy as np
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print("Penjumlahan:\\n", A + B)
print("Transpose A:\\n", A.T)
print("Hadamard (elemen-wise):\\n", A * B)  # bukan dot product!`
  },
  {
    day: 6, phaseId: 1, title: "Aljabar Linear – Operasi Matriks (2): Perkalian",
    concept: "Perkalian matriks (dot product) sebagai komposisi transformasi linear. Urutan perkalian penting: AB ≠ BA.",
    statConnection: "Perkalian matriks X^T·X muncul di solusi OLS regresi linear: β = (X^T X)⁻¹ X^T y.",
    resources: [
      { title: "MIT 18.06 Lecture Notes", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", type: "Course" },
      { title: "Matrix Multiplication as Composition (3Blue1Brown)", url: "https://www.youtube.com/watch?v=XkY2DOUCWMU", type: "Video" }
    ],
    todos: ["Hitung perkalian matriks secara manual untuk 2×2.", "Verifikasi non-kommutatif: buktikan AB ≠ BA.", "Hitung X.T @ X dari matriks data acak."],
    codeSnippet: `import numpy as np
A = np.array([[1, 2], [3, 4]])
B = np.array([[0, 1], [1, 0]])
print("A @ B:\\n", A @ B)
print("B @ A:\\n", B @ A)  # berbeda!
# Contoh OLS: X^T X
X = np.random.randn(10, 3)
print("Shape X.T @ X:", (X.T @ X).shape)  # (3, 3)`
  },
  {
    day: 7, phaseId: 1, title: "Aljabar Linear – Determinan",
    concept: "Perhitungan determinan matriks 2×2 hingga n×n serta interpretasi perubahan volume ruang. det = 0 berarti matriks singular.",
    statConnection: "Determinan matriks kovarians menunjukkan 'volume' varians multivariat; nol berarti multikolinearitas sempurna.",
    resources: [
      { title: "Khan Academy: Determinants", url: "https://www.khanacademy.org/math/linear-algebra/matrix-transformations", type: "Course" },
      { title: "The Determinant (3Blue1Brown)", url: "https://www.youtube.com/watch?v=Ip3X9LOh2dk", type: "Video" }
    ],
    todos: ["Hitung determinan 2×2 dan 3×3 secara manual.", "Interpretasikan apa artinya det = 0.", "Gunakan np.linalg.det() dan verifikasi hasilnya."],
    codeSnippet: `import numpy as np
A = np.array([[1, 2], [3, 4]])
print("det(A):", np.linalg.det(A))  # -2.0
# Matriks singular (det = 0)
B = np.array([[1, 2], [2, 4]])
print("det(B):", np.linalg.det(B))  # ≈ 0`
  },
  {
    day: 8, phaseId: 1, title: "Aljabar Linear – Invers Matriks",
    concept: "Syarat matriks invertible, eliminasi Gauss-Jordan, rank, column space, dan null space.",
    statConnection: "Invers matriks (X^T X)^{-1} adalah inti dari solusi analitik OLS regresi linear berganda.",
    resources: [
      { title: "MML Book Bab 2.3: Solving Systems", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "Inverse Matrices, Column Space and Null Space (3Blue1Brown)", url: "https://www.youtube.com/watch?v=uQhTuRlWMxw", type: "Video" }
    ],
    todos: ["Hitung invers matriks 2×2 dengan rumus manual.", "Verifikasi A @ A_inv = I.", "Coba np.linalg.solve() untuk sistem persamaan linear."],
    codeSnippet: `import numpy as np
A = np.array([[2, 1], [5, 3]], dtype=float)
A_inv = np.linalg.inv(A)
print("Invers A:\\n", A_inv)
print("A @ A_inv (harus ≈ I):\\n", np.round(A @ A_inv))
# Solusi sistem Ax = b
b = np.array([1, 2])
x = np.linalg.solve(A, b)
print("Solusi x:", x)`
  },
  {
    day: 9, phaseId: 1, title: "Aljabar Linear – Eigenvalues & Eigenvectors",
    concept: "Persamaan karakteristik det(A - λI) = 0 dan makna geometris vektor eigen. Eigenvector tidak berubah arah saat ditransformasi A.",
    statConnection: "PCA sepenuhnya bergantung pada eigendecomposition matriks kovarians untuk menemukan arah variansi maksimum.",
    resources: [
      { title: "MML Book Bab 4.2: Eigenvalues", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "Eigenvectors and Eigenvalues (3Blue1Brown)", url: "https://www.youtube.com/watch?v=PFDu9oVAE-g", type: "Video" }
    ],
    todos: ["Hitung eigenvalue 2×2 secara manual via persamaan karakteristik.", "Gunakan np.linalg.eig() dan verifikasi Av = λv.", "Interpretasikan eigenvalue terbesar secara geometris."],
    codeSnippet: `import numpy as np
A = np.array([[3, 1], [0, 2]])
vals, vecs = np.linalg.eig(A)
print("Eigenvalues:", vals)        # [3. 2.]
print("Eigenvectors:\\n", vecs)
# Verifikasi: A @ v = λ * v
v = vecs[:, 0]
print("A @ v:", A @ v)
print("λ * v:", vals[0] * v)`
  },
  {
    day: 10, phaseId: 1, title: "Aljabar Linear – Diagonalization",
    concept: "Dekomposisi eigen A = PDP^{-1}, matriks simetris, dan teorema spektral. Matriks simetris selalu dapat didiagonalisasi.",
    statConnection: "Matriks kovarians adalah simetris semi-definit positif — teorema spektral menjamin eigenvalue ≥ 0.",
    resources: [
      { title: "MIT 18.06 Course Material", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", type: "Course" },
      { title: "MIT 18.06 Lecture 21: Eigenvalues (Gilbert Strang)", url: "https://www.youtube.com/playlist?list=PLE7DDD91010BC51F8", type: "Video" }
    ],
    todos: ["Reconstruct A dari P, D, P_inv.", "Buktikan matriks simetris punya eigenvalue real.", "Coba matrix power via diagonalization."],
    codeSnippet: `import numpy as np
A = np.array([[4, 1], [2, 3]], dtype=float)
vals, P = np.linalg.eig(A)
D = np.diag(vals)
P_inv = np.linalg.inv(P)
A_recon = P @ D @ P_inv
print("Rekonstruksi A:\\n", np.round(A_recon))  # ≈ A asli`
  },
  {
    day: 11, phaseId: 1, title: "Aljabar Linear – Singular Value Decomposition (SVD)",
    concept: "Dekomposisi A = UΣV^T dan reduksi matriks low-rank. SVD berlaku untuk semua matriks, tidak hanya yang persegi.",
    statConnection: "SVD adalah generalisasi PCA; nilai singular menggambarkan 'energi' informasi tiap komponen.",
    resources: [
      { title: "MML Book Bab 4.5: SVD", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "Singular Value Decomposition / SVD (StatQuest)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUIzaEkCLIUxQFjPIlapw8nU", type: "Video" }
    ],
    todos: ["Hitung SVD matriks 4×3 dengan np.linalg.svd().", "Rekonstruksi matriks dengan hanya k singular value terbesar.", "Bandingkan SVD dan PCA pada data yang sama."],
    codeSnippet: `import numpy as np
A = np.random.randn(6, 4)
U, S, Vt = np.linalg.svd(A, full_matrices=False)
print("Singular values:", S)
# Rekonstruksi low-rank (k=2)
k = 2
A_approx = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]
print("Error low-rank:", np.linalg.norm(A - A_approx))`
  },
  {
    day: 12, phaseId: 1, title: "Kalkulus – Turunan (Derivatives)",
    concept: "Konsep limit, aturan turunan fungsi polinomial, eksponensial, logaritma. Turunan = laju perubahan sesaat.",
    statConnection: "MLE (Maximum Likelihood Estimation) diselesaikan dengan mencari titik di mana turunan log-likelihood = 0.",
    resources: [
      { title: "Khan Academy: Differential Calculus", url: "https://www.khanacademy.org/math/differential-calculus", type: "Course" },
      { title: "The Paradox of the Derivative (3Blue1Brown)", url: "https://www.youtube.com/watch?v=9vKqVkMQHKk", type: "Video" }
    ],
    todos: ["Review aturan turunan: power, chain, product rule.", "Hitung turunan f(x) = x³ - 2x² + x - 5.", "Implementasikan turunan numerik dengan finite difference."],
    codeSnippet: `def f(x): return x**3 - 2*x**2 + x - 5
# Turunan numerik (finite difference)
def df_numerical(x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)
# Turunan analitik: f'(x) = 3x² - 4x + 1
def df_analytical(x): return 3*x**2 - 4*x + 1
x = 3.0
print(f"Numerik: {df_numerical(x):.6f}")
print(f"Analitik: {df_analytical(x):.6f}")`
  },
  {
    day: 13, phaseId: 1, title: "Kalkulus – Turunan Parsial (Partial Derivatives)",
    concept: "Fungsi multivariabel dan perhitungan turunan parsial terhadap masing-masing parameter. ∂f/∂x berarti turunkan terhadap x, perlakukan variabel lain sebagai konstanta.",
    statConnection: "Regresi linear berganda meminimalkan MSE dengan mengambil turunan parsial terhadap setiap koefisien β_j.",
    resources: [
      { title: "Khan Academy: Multivariable Derivatives", url: "https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives", type: "Course" },
      { title: "Multivariable Calculus & Partial Derivatives (3Blue1Brown)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", type: "Video" }
    ],
    todos: ["Hitung ∂f/∂x dan ∂f/∂y untuk f(x,y) = x²y + 3y.", "Verifikasi dengan turunan numerik 2 variabel.", "Kaitkan dengan gradient descent: setiap ∂L/∂w_i adalah satu langkah update."],
    codeSnippet: `import numpy as np
# f(x, y) = x^2 * y + 3y
# ∂f/∂x = 2xy, ∂f/∂y = x^2 + 3
def df_dx(x, y): return 2 * x * y
def df_dy(x, y): return x**2 + 3
x, y = 2.0, 3.0
print(f"∂f/∂x di (2,3): {df_dx(x, y)}")  # 12
print(f"∂f/∂y di (2,3): {df_dy(x, y)}")  # 7`
  },
  {
    day: 14, phaseId: 1, title: "Kalkulus – Chain Rule of Derivation",
    concept: "Aturan rantai satu dan banyak variabel sebagai fondasi algoritma backpropagation. d/dx[f(g(x))] = f'(g(x)) · g'(x).",
    statConnection: "Backpropagation neural network adalah penerapan chain rule berulang sepanjang computational graph.",
    resources: [
      { title: "Colah's Blog: Calculus on Graphs", url: "https://colah.github.io/posts/2015-08-Backprop/", type: "Blog" },
      { title: "Visualizing the Chain Rule (3Blue1Brown)", url: "https://www.youtube.com/watch?v=YG15m2VwSjA", type: "Video" }
    ],
    todos: ["Terapkan chain rule pada f(x) = sin(x²).", "Trace computational graph sederhana secara manual.", "Baca artikel Colah tentang backprop via graphs."],
    codeSnippet: `import math
# f(x) = sin(x²), f'(x) = cos(x²) · 2x
def f(x): return math.sin(x**2)
def df(x): return math.cos(x**2) * 2 * x
x = 1.5
print(f"f({x}) = {f(x):.4f}")
print(f"f'({x}) = {df(x):.4f}")
# Verifikasi numerik
h = 1e-7
print(f"Numerik: {(f(x+h) - f(x-h))/(2*h):.4f}")`
  },
  {
    day: 15, phaseId: 1, title: "Kalkulus – Gradient",
    concept: "Penyusunan vektor gradien (∇f), turunan berarah, dan arah kenaikan/penurunan tercuram.",
    statConnection: "Gradient descent adalah algoritma optimasi utama dalam ML; gradient adalah 'kompas' menuju minimum loss.",
    resources: [
      { title: "Matrix Calculus for Deep Learning", url: "https://explained.ai/matrix-calculus/", type: "Blog" },
      { title: "Gradient Descent, Step-by-Step (StatQuest)", url: "https://www.youtube.com/watch?v=sDv4f4s2SB8", type: "Video" }
    ],
    todos: ["Hitung gradient L(w₁,w₂) = (w₁-1)² + (w₂-2)².", "Implementasikan satu langkah gradient descent.", "Visualisasikan permukaan loss dan arah gradient."],
    codeSnippet: `import numpy as np
# L(w1, w2) = (w1-1)^2 + (w2-2)^2
def loss(w): return (w[0]-1)**2 + (w[1]-2)**2
def grad(w): return np.array([2*(w[0]-1), 2*(w[1]-2)])
w = np.array([5.0, 5.0])
lr = 0.1
for i in range(30):
    w -= lr * grad(w)
print(f"Optimal w: {w}")   # mendekati [1, 2]
print(f"Loss: {loss(w):.6f}")`
  },
  {
    day: 16, phaseId: 1, title: "Kalkulus – Matriks Jacobian",
    concept: "Matriks Jacobian untuk fungsi vektor dan transformasi koordinat berdimensi tinggi. J_{ij} = ∂f_i/∂x_j.",
    statConnection: "Jacobian muncul dalam backpropagation layer yang memiliki banyak output (mis. softmax).",
    resources: [
      { title: "MML Book Bab 5.3: Jacobian", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "The Jacobian Matrix (Khan Academy)", url: "https://www.youtube.com/playlist?list=PLSQl0a2vh4HC5feHa6Rc5c0wbRTx56nF7", type: "Video" }
    ],
    todos: ["Hitung Jacobian fungsi f(x) = [x₁², x₁·x₂] secara manual.", "Verifikasi menggunakan autograd PyTorch.", "Pahami kenapa Jacobian penting di softmax layer."],
    codeSnippet: `import torch
x = torch.tensor([2.0, 3.0], requires_grad=True)
# f(x) = [x1^2, x1*x2]
def f(x): return torch.stack([x[0]**2, x[0]*x[1]])
J = torch.autograd.functional.jacobian(f, x)
print("Jacobian:\\n", J)
# Manual: [[2*x1, 0], [x2, x1]] = [[4, 0], [3, 2]]`
  },
  {
    day: 17, phaseId: 1, title: "Kalkulus – Matriks Hessian",
    concept: "Matriks turunan kedua (Hessian), uji kecekungan/konveksitas, minimum lokal, dan saddle point.",
    statConnection: "Hessian dipakai dalam metode Newton untuk optimasi lebih cepat dari gradient descent biasa.",
    resources: [
      { title: "MML Book Bab 7: Optimization", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "Hessian Matrix & Second Partial Derivatives (Khan Academy)", url: "https://www.youtube.com/playlist?list=PLSQl0a2vh4HC5feHa6Rc5c0wbRTx56nF7", type: "Video" }
    ],
    todos: ["Hitung Hessian f(x,y) = x² + xy + y² secara manual.", "Tentukan apakah titik kritis merupakan minimum/maximum/saddle point.", "Pahami kapan suatu fungsi loss bersifat konveks."],
    codeSnippet: `import numpy as np
# f(x,y) = x^2 + x*y + y^2
# Hessian: H = [[2, 1], [1, 2]]
H = np.array([[2, 1], [1, 2]])
eigenvals = np.linalg.eigvalsh(H)
print("Eigenvalues Hessian:", eigenvals)
# Semua eigenvalue > 0 -> minimum (konveks)
print("Konveks?" , all(eigenvals > 0))`
  },
  {
    day: 18, phaseId: 1, title: "Statistika – Konsep Dasar & Statistika Deskriptif (1)",
    concept: "Populasi vs sampel, tipe data (nominal, ordinal, interval, rasio), Mean, Median, Mode.",
    statConnection: "Materi inti Pengantar Statistika — sudah dikenal; tujuannya menghubungkan ke konteks data ML.",
    resources: [
      { title: "OpenIntro Statistics Bab 1 & 2", url: "https://www.openintro.org/book/os/", type: "Book" },
      { title: "Mean, Variance and Standard Deviation (StatQuest)", url: "https://www.youtube.com/watch?v=SzZ6GpcfoQY", type: "Video" }
    ],
    todos: ["Hitung mean, median, mode dari dataset nyata.", "Identifikasi tipe data dari 10 kolom dataset Titanic.", "Diskusikan kapan median lebih representatif dari mean."],
    codeSnippet: `import numpy as np
import pandas as pd
data = np.array([2, 4, 4, 4, 5, 5, 7, 9])
print("Mean:", np.mean(data))
print("Median:", np.median(data))
print("Mode:", pd.Series(data).mode()[0])
print("Std:", np.std(data, ddof=1))  # ddof=1 untuk sampel`
  },
  {
    day: 19, phaseId: 1, title: "Statistika – Statistika Deskriptif (2) & Grafik",
    concept: "Varians, deviasi standar, kuartil/IQR, Histogram, Boxplot, Scatter plot. Visualisasi membantu deteksi outlier.",
    statConnection: "EDA (Exploratory Data Analysis) adalah langkah wajib sebelum membangun model ML.",
    resources: [
      { title: "From Data to Viz Guide", url: "https://www.data-to-viz.com/", type: "Web" },
      { title: "Histograms and Boxplots Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=qBigTkBLU6g", type: "Video" }
    ],
    todos: ["Buat histogram dan boxplot untuk kolom numerik dataset Iris.", "Identifikasi outlier menggunakan IQR rule.", "Buat scatter plot untuk melihat hubungan 2 variabel."],
    codeSnippet: `import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_iris
iris = load_iris(as_frame=True)
df = iris.frame
fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].hist(df['sepal length (cm)'], bins=20, color='steelblue')
axes[0].set_title("Histogram Sepal Length")
df.boxplot(column='sepal length (cm)', ax=axes[1])
plt.tight_layout(); plt.show()`
  },
  {
    day: 20, phaseId: 1, title: "Probabilitas – Dasar Probabilitas",
    concept: "Ruang sampel, kejadian independen vs saling lepas, dan probabilitas bersyarat P(A|B) = P(A∩B)/P(B).",
    statConnection: "Semua model probabilistik di ML (Naive Bayes, GMM, VAE) dibangun di atas prinsip ini.",
    resources: [
      { title: "Stanford CS229 Probability Notes", url: "https://cs229.stanford.edu/section/cs229-prob.pdf", type: "Docs" },
      { title: "Probability vs Likelihood (StatQuest)", url: "https://www.youtube.com/watch?v=pYxNSUDSFH4", type: "Video" }
    ],
    todos: ["Hitung P(A|B) dari tabel kontingensi sederhana.", "Bedakan independence dan mutually exclusive.", "Simulasikan lempar koin 10.000 kali dan hitung probabilitas empiris."],
    codeSnippet: `import numpy as np
# Simulasi probabilitas empiris
np.random.seed(42)
n = 10000
flips = np.random.randint(0, 2, n)  # 0=ekor, 1=kepala
p_head = flips.mean()
print(f"P(kepala) empiris: {p_head:.4f}")  # ≈ 0.5
# Probabilitas bersyarat: P(dadu genap | dadu > 2)
dadu = np.random.randint(1, 7, n)
p_cond = ((dadu > 2) & (dadu % 2 == 0)).mean() / (dadu > 2).mean()
print(f"P(genap | >2): {p_cond:.4f}")  # 2/4 = 0.5`
  },
  {
    day: 21, phaseId: 1, title: "Probabilitas – Teorema Bayes",
    concept: "Hukum probabilitas total, penurunan rumus Bayes. P(H|D) = P(D|H)·P(H) / P(D). Prior, Likelihood, Posterior.",
    statConnection: "Bayes adalah fondasi: Naive Bayes classifier, Bayesian optimization, MCMC, semua berakar di sini.",
    resources: [
      { title: "Seeing Theory: Compound Probability", url: "https://seeing-theory.brown.edu/compound-probability/index.html", type: "Web" },
      { title: "Bayes theorem, geometry of changing beliefs (3Blue1Brown)", url: "https://www.youtube.com/watch?v=HZGCoVF3YvM", type: "Video" }
    ],
    todos: ["Selesaikan soal klasik: tes penyakit (sensitivity/specificity).", "Implementasikan Naive Bayes dari nol.", "Visualisasikan bagaimana posterior berubah saat prior berbeda."],
    codeSnippet: `# Tes penyakit: P(sakit) = 0.01, sensitivitas = 0.99, spesifisitas = 0.95
p_sakit = 0.01
p_pos_sakit = 0.99     # P(tes+|sakit)
p_pos_sehat = 0.05     # P(tes+|sehat) = 1 - spesifisitas
p_pos = p_pos_sakit * p_sakit + p_pos_sehat * (1 - p_sakit)
p_sakit_pos = (p_pos_sakit * p_sakit) / p_pos
print(f"P(sakit | tes+) = {p_sakit_pos:.4f}")  # ≈ 0.166`
  },
  {
    day: 22, phaseId: 1, title: "Probabilitas – Peubah Acak & PDF",
    concept: "Peubah acak diskrit/kontinu, ekspektasi E[X], varians Var[X], PMF, PDF, dan CDF.",
    statConnection: "Distribusi output model ML (mis. probabilitas kelas) adalah peubah acak kontinu/diskrit.",
    resources: [
      { title: "MML Book Bab 6.2: Probabilities", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "Probability Distributions, PMFs & PDFs (StatQuest)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", type: "Video" }
    ],
    todos: ["Hitung E[X] dan Var[X] dari distribusi diskrit.", "Plot PDF dan CDF Normal standar.", "Gunakan scipy.stats untuk bermain dengan berbagai distribusi."],
    codeSnippet: `import scipy.stats as stats
import numpy as np
import matplotlib.pyplot as plt
# Distribusi Normal
mu, sigma = 0, 1
x = np.linspace(-4, 4, 200)
plt.plot(x, stats.norm.pdf(x, mu, sigma), label='PDF')
plt.plot(x, stats.norm.cdf(x, mu, sigma), label='CDF')
plt.legend(); plt.title("Normal Distribution"); plt.show()
print("E[X]:", stats.norm.mean(mu, sigma))
print("Var[X]:", stats.norm.var(mu, sigma))`
  },
  {
    day: 23, phaseId: 1, title: "Probabilitas – Jenis-jenis Distribusi",
    concept: "Distribusi Binomial, Bernoulli, Poisson, Uniform, dan Normal/Gaussian. Setiap distribusi cocok untuk jenis data berbeda.",
    statConnection: "Asumsi distribusi menentukan fungsi loss: Normal → MSE, Bernoulli → Binary Cross-Entropy.",
    resources: [
      { title: "Seeing Theory: Distributions", url: "https://seeing-theory.brown.edu/probability-distributions/index.html", type: "Web" },
      { title: "The Normal Distribution, Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=rzFX5NWojp0", type: "Video" }
    ],
    todos: ["Plot 5 distribusi berbeda dengan scipy.stats.", "Jelaskan kapan memakai Poisson vs Binomial.", "Identifikasi distribusi yang sesuai untuk data cuaca, klik iklan, dan tinggi badan."],
    codeSnippet: `import scipy.stats as stats
import matplotlib.pyplot as plt
import numpy as np
fig, axes = plt.subplots(1, 3, figsize=(12, 3))
x_disc = np.arange(0, 15)
axes[0].bar(x_disc, stats.binom.pmf(x_disc, n=10, p=0.3))
axes[0].set_title("Binomial(10, 0.3)")
axes[1].bar(x_disc, stats.poisson.pmf(x_disc, mu=3))
axes[1].set_title("Poisson(λ=3)")
x_cont = np.linspace(-4, 4, 200)
axes[2].plot(x_cont, stats.norm.pdf(x_cont))
axes[2].set_title("Normal(0, 1)")
plt.tight_layout(); plt.show()`
  },
  {
    day: 24, phaseId: 1, title: "Statistika – Inferensial (1): CLT & Interval Kepercayaan",
    concept: "Central Limit Theorem (CLT), distribusi sampling, Standard Error, dan Confidence Intervals. CLT menjamin sampling mean mendekati Normal.",
    statConnection: "CLT adalah alasan mengapa kita bisa melakukan inferensi tentang populasi dari sampel kecil.",
    resources: [
      { title: "OpenIntro Statistics Bab 5", url: "https://www.openintro.org/book/os/", type: "Book" },
      { title: "But what is the Central Limit Theorem? (3Blue1Brown)", url: "https://www.youtube.com/watch?v=zeJD6dqJ5lo", type: "Video" }
    ],
    todos: ["Simulasikan CLT: rata-rata 1000 sampel dari distribusi Uniform.", "Hitung 95% confidence interval dari sampel.", "Jelaskan perbedaan Standard Deviation dan Standard Error."],
    codeSnippet: `import numpy as np
import matplotlib.pyplot as plt
# Demonstrasi CLT
np.random.seed(42)
n_samples, sample_size = 1000, 30
means = [np.random.uniform(0, 1, sample_size).mean() for _ in range(n_samples)]
plt.hist(means, bins=40, density=True, color='steelblue')
plt.title(f"CLT: Distribusi {n_samples} Sampel Mean (n={sample_size})")
plt.xlabel("Sample Mean"); plt.show()
se = np.std(means)
print(f"Standard Error: {se:.4f}")  # ≈ 1/(√12·√30)`
  },
  {
    day: 25, phaseId: 1, title: "Statistika – Inferensial (2): Uji Hipotesis & MLE",
    concept: "Uji hipotesis, p-value, uji-t, ANOVA, Chi-Square, dan Maximum Likelihood Estimation (MLE).",
    statConnection: "MLE adalah cara belajar parameter model ML dari data; p-value penting untuk A/B testing model di produksi.",
    resources: [
      { title: "OpenIntro Statistics Bab 6 & 7", url: "https://www.openintro.org/book/os/", type: "Book" },
      { title: "Hypothesis Testing and The Null Hypothesis (StatQuest)", url: "https://www.youtube.com/watch?v=0oc49DyA3hU", type: "Video" }
    ],
    todos: ["Lakukan t-test dua sampel dengan scipy.", "Implementasikan MLE untuk distribusi Normal.", "Hitung uji Chi-Square untuk dua variabel kategorik."],
    codeSnippet: `from scipy import stats
import numpy as np
# T-test
group_a = np.random.normal(100, 15, 50)
group_b = np.random.normal(110, 15, 50)
t_stat, p_val = stats.ttest_ind(group_a, group_b)
print(f"t={t_stat:.3f}, p={p_val:.4f}")
# MLE Normal: estimator adalah mean dan std sampel
data = np.random.normal(5, 2, 200)
mu_mle = data.mean()
sigma_mle = data.std()
print(f"MLE: μ={mu_mle:.2f}, σ={sigma_mle:.2f}")`
  },
  {
    day: 26, phaseId: 1, title: "Matematika Diskrit",
    concept: "Logika proposisional, teori himpunan, kombinatorika, dan dasar teori graf (pohon & DAG). DAG penting untuk computational graphs.",
    statConnection: "Teori graf menjadi landasan Graph Neural Networks; kombinatorika relevan untuk analisis kompleksitas algoritma.",
    resources: [
      { title: "Discrete Mathematics Open Book", url: "https://discrete.openmathbooks.org/dmoi3.html", type: "Book" },
      { title: "MIT 6.042J Mathematics for Computer Science (MIT OCW)", url: "https://www.youtube.com/playlist?list=PLB7540DEDD482705B", type: "Video" }
    ],
    todos: ["Gambar DAG dari pipeline ML sederhana.", "Hitung kombinasi C(10, 3) dan permutasi P(5, 2).", "Implementasikan BFS sederhana pada graf."],
    codeSnippet: `from math import comb, perm
import networkx as nx
print("C(10,3):", comb(10, 3))  # 120
print("P(5,2):", perm(5, 2))    # 20
# DAG sederhana pipeline ML
G = nx.DiGraph()
G.add_edges_from([("Data","Preprocess"),("Preprocess","Train"),
                  ("Preprocess","Validate"),("Train","Evaluate")])
print("Topological order:", list(nx.topological_sort(G)))`
  },

  // ─── TAHAP 2: PROGRAMMING FUNDAMENTALS, PYTHON & ESSENTIAL LIBRARIES (HARI 27 – 44) ───
  {
    day: 27, phaseId: 2, title: "Python – Sintaks Dasar & Tipe Data",
    concept: "Instalasi, lingkungan virtual, int, float, str, bool, dan operator dasar Python.",
    statConnection: "Python adalah bahasa utama data science — penguasaan sintaks dasar mempercepat implementasi analisis statistik.",
    resources: [
      { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/", type: "Docs" },
      { title: "Harvard CS50P – Full Python University Course", url: "https://www.youtube.com/watch?v=nLRL_NcnK-4", type: "Video" }
    ],
    todos: ["Buat virtual environment dengan venv.", "Eksplorasi semua tipe data bawaan Python.", "Tulis kalkulator BMI sederhana."],
    codeSnippet: `# Buat virtual environment:
# python -m venv ml_env
# source ml_env/bin/activate  (Linux/Mac)
# ml_env\\Scripts\\activate     (Windows)
name = "ML Engineer"
tinggi_m = 1.72
berat_kg = 68
bmi = berat_kg / tinggi_m**2
print(f"Halo, {name}! BMI kamu: {bmi:.1f}")`
  },
  {
    day: 28, phaseId: 2, title: "Python – Kondisional",
    concept: "Logika boolean, operator perbandingan, percabangan if, elif, else, dan ternary operator.",
    statConnection: "Logika kondisional dipakai di mana-mana: filtering data, encoding kategori, validasi input.",
    resources: [
      { title: "Python Docs: Control Flow", url: "https://docs.python.org/3/tutorial/controlflow.html", type: "Docs" },
      { title: "Python Tutorial: Conditionals and Booleans (Corey Schafer)", url: "https://www.youtube.com/watch?v=DZwmZ8Usvnk", type: "Video" }
    ],
    todos: ["Buat fungsi klasifikasi BMI (kurus/normal/gemuk/obesitas).", "Implementasikan ternary operator.", "Latih nested if-elif untuk logika kompleks."],
    codeSnippet: `def klasifikasi_bmi(bmi):
    if bmi < 18.5:
        return "Kurus"
    elif bmi < 25.0:
        return "Normal"
    elif bmi < 30.0:
        return "Gemuk"
    else:
        return "Obesitas"
# Ternary operator
nilai = 75
status = "Lulus" if nilai >= 60 else "Tidak Lulus"
print(status, klasifikasi_bmi(22.0))`
  },
  {
    day: 29, phaseId: 2, title: "Python – Loops",
    concept: "Iterasi dengan for dan while, pernyataan break, continue, serta fungsi range() dan enumerate().",
    statConnection: "Loop dipakai untuk iterasi data, tapi di ML praktis kita hindari loop Python murni — lebih baik vectorized NumPy.",
    resources: [
      { title: "Kaggle Learn: Python", url: "https://www.kaggle.com/learn/python", type: "Course" },
      { title: "Python Tutorial: Loops and Iterations (Corey Schafer)", url: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ", type: "Video" }
    ],
    todos: ["Implementasikan FizzBuzz.", "Bandingkan kecepatan loop Python vs NumPy untuk operasi besar.", "Gunakan enumerate() dan zip() secara kreatif."],
    codeSnippet: `import time, numpy as np
# Loop Python vs NumPy
n = 1_000_000
# Python loop
t0 = time.time()
total = sum(i**2 for i in range(n))
print(f"Python: {time.time()-t0:.3f}s")
# NumPy vectorized
t0 = time.time()
total_np = (np.arange(n)**2).sum()
print(f"NumPy: {time.time()-t0:.3f}s")  # jauh lebih cepat!`
  },
  {
    day: 30, phaseId: 2, title: "Python – Struktur Data (1): List & Tuple",
    concept: "Manipulasi list dan tuple, indexing, slicing, serta list comprehensions.",
    statConnection: "List sering dipakai untuk menyimpan hasil iterasi, tetapi untuk komputasi numerik gantilah dengan NumPy array.",
    resources: [
      { title: "Python Docs: Data Structures", url: "https://docs.python.org/3/tutorial/datastructures.html", type: "Docs" },
      { title: "Lists, Tuples, and Sets in Python (Corey Schafer)", url: "https://www.youtube.com/watch?v=W8KRzm-HUcc", type: "Video" }
    ],
    todos: ["Buat list comprehension untuk kuadrat bilangan 1-20.", "Jelaskan perbedaan list vs tuple.", "Gunakan slicing untuk ambil 5 elemen terakhir."],
    codeSnippet: `# List comprehension
squares = [x**2 for x in range(1, 21)]
print(squares[-5:])  # 5 terakhir
# Filter genap
evens = [x for x in squares if x % 2 == 0]
print(f"Jumlah genap: {len(evens)}")
# Tuple: immutable
point = (3.14, 2.71)
# point[0] = 1  # Error! tuple tidak bisa diubah
x, y = point   # unpacking`
  },
  {
    day: 31, phaseId: 2, title: "Python – Struktur Data (2): Dict & Set",
    concept: "Struktur key-value pada dict, operasi himpunan pada set, dan dict comprehensions.",
    statConnection: "Dict dipakai untuk menyimpan mapping label-kelas, hyperparameter, dan config model ML.",
    resources: [
      { title: "Real Python: Dictionaries", url: "https://realpython.com/python-dicts/", type: "Blog" },
      { title: "Dictionaries - Working with Key-Value Pairs (Corey Schafer)", url: "https://www.youtube.com/watch?v=daefaLgNkw0", type: "Video" }
    ],
    todos: ["Buat dict config hyperparameter model.", "Gunakan dict comprehension untuk invert mapping.", "Operasikan union, intersection, dan difference pada set."],
    codeSnippet: `# Config hyperparameter
config = {"lr": 0.001, "epochs": 100, "batch_size": 32, "dropout": 0.3}
# Dict comprehension: invert
label_map = {"cat": 0, "dog": 1, "bird": 2}
inv_map = {v: k for k, v in label_map.items()}
print(inv_map)  # {0: 'cat', 1: 'dog', 2: 'bird'}
# Set operations
train_ids = {1, 2, 3, 4, 5}
val_ids   = {4, 5, 6, 7}
print("Overlap:", train_ids & val_ids)  # {4, 5}`
  },
  {
    day: 32, phaseId: 2, title: "Python – Fungsi & Built-in Functions",
    concept: "Definisi def, *args, **kwargs, lambda, map(), filter(), dan zip().",
    statConnection: "Fungsi yang baik membuat kode preprocessing, training loop, dan evaluasi model lebih modular dan reusable.",
    resources: [
      { title: "Python Built-in Functions Docs", url: "https://docs.python.org/3/library/functions.html", type: "Docs" },
      { title: "Python Functions Tutorial (Corey Schafer)", url: "https://www.youtube.com/watch?v=9Os0o3wzS_I", type: "Video" }
    ],
    todos: ["Tulis fungsi dengan *args dan **kwargs.", "Gunakan lambda di sorted() dan map().", "Buat fungsi preprocessing pipeline sederhana."],
    codeSnippet: `# *args dan **kwargs
def summary(*values, label="Data"):
    return f"{label}: min={min(values)}, max={max(values)}, mean={sum(values)/len(values):.2f}"
print(summary(3, 1, 4, 1, 5, 9, label="Skor"))
# Lambda dan map
data = [1, 4, 9, 16, 25]
roots = list(map(lambda x: x**0.5, data))
print(roots)
# zip
features = ["umur", "tinggi", "berat"]
values   = [22, 170, 65]
print(dict(zip(features, values)))`
  },
  {
    day: 33, phaseId: 2, title: "Python – Exception & File Handling",
    concept: "Blok try, except, else, finally, raise, dan context manager (with open).",
    statConnection: "Penanganan error penting dalam pipeline data: file tidak ditemukan, format salah, atau nilai NaN tak terduga.",
    resources: [
      { title: "Python Docs: Errors and Exceptions", url: "https://docs.python.org/3/tutorial/errors.html", type: "Docs" },
      { title: "Using Try/Except Blocks for Error Handling (Corey Schafer)", url: "https://www.youtube.com/watch?v=NIWwJbo-9_8", type: "Video" }
    ],
    todos: ["Buat fungsi load CSV yang aman dengan try-except.", "Implementasikan custom exception DataValidationError.", "Gunakan with open() untuk tulis log sederhana."],
    codeSnippet: `import csv, os
class DataValidationError(Exception):
    pass
def load_csv_safe(path):
    if not os.path.exists(path):
        raise FileNotFoundError(f"File tidak ditemukan: {path}")
    try:
        with open(path, encoding='utf-8') as f:
            reader = csv.DictReader(f)
            return list(reader)
    except csv.Error as e:
        raise DataValidationError(f"Format CSV rusak: {e}")
    finally:
        print("Proses load selesai.")`
  },
  {
    day: 34, phaseId: 2, title: "Python – OOP (1): Class & Instance",
    concept: "Konsep Class, Instance, atribut, metode, dan konstruktor __init__.",
    statConnection: "Scikit-learn estimator API menggunakan OOP — memahami class membantu kamu membuat custom transformer.",
    resources: [
      { title: "Python Docs: Classes", url: "https://docs.python.org/3/tutorial/classes.html", type: "Docs" },
      { title: "Python OOP Tutorial 1: Classes and Instances (Corey Schafer)", url: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM", type: "Video" }
    ],
    todos: ["Buat class Dataset dengan atribut fitur dan label.", "Tambahkan method shape, head, dan describe.", "Buat class MLModel dengan atribut config."],
    codeSnippet: `class Dataset:
    def __init__(self, features, labels):
        self.features = features
        self.labels   = labels
    @property
    def shape(self):
        return (len(self.labels), len(self.features[0]))
    def head(self, n=5):
        return self.features[:n], self.labels[:n]
import numpy as np
X = np.random.randn(100, 4)
y = np.random.randint(0, 2, 100)
ds = Dataset(X, y)
print("Shape:", ds.shape)  # (100, 4)`
  },
  {
    day: 35, phaseId: 2, title: "Python – OOP (2): Inheritance & Polymorphism",
    concept: "Inheritance (super()), Encapsulation, Polymorphism, dan magic/dunder methods.",
    statConnection: "Pattern ini persis seperti Scikit-learn: BaseEstimator → LinearModel → LinearRegression.",
    resources: [
      { title: "Real Python: OOP in Python 3", url: "https://realpython.com/python3-object-oriented-programming/", type: "Blog" },
      { title: "Python OOP Playlist: Inheritance & Special Methods (Corey Schafer)", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc", type: "Video" }
    ],
    todos: ["Buat BaseModel dan turunkan LinearModel dari-nya.", "Implementasikan __repr__ dan __len__.", "Demonstrasikan polymorphism dengan metode predict yang berbeda."],
    codeSnippet: `class BaseModel:
    def __init__(self, name):
        self.name = name
    def fit(self, X, y):
        raise NotImplementedError
    def predict(self, X):
        raise NotImplementedError
    def __repr__(self):
        return f"<{self.__class__.__name__}: {self.name}>"
class DummyModel(BaseModel):
    def fit(self, X, y):
        self.mean_ = y.mean(); return self
    def predict(self, X):
        return [self.mean_] * len(X)
import numpy as np
m = DummyModel("Baseline"); m.fit(np.zeros((10,3)), np.array([1,2,3,4,5,1,2,3,4,5]))
print(m, "→", m.predict(np.zeros((3,3))))`
  },
  {
    day: 36, phaseId: 2, title: "NumPy (1): ndarray, Indexing & Slicing",
    concept: "Pembuatan ndarray, tipe data, atribut dimensi, indexing, slicing, dan reshaping.",
    statConnection: "NumPy array adalah struktur data inti ML — semua dataset numerik direpresentasikan sebagai ndarray.",
    resources: [
      { title: "NumPy Absolute Beginners Guide", url: "https://numpy.org/doc/stable/user/absolute_beginners.html", type: "Docs" },
      { title: "Python NumPy Tutorial for Beginners (freeCodeCamp)", url: "https://www.youtube.com/watch?v=QUT1VHiLmmI", type: "Video" }
    ],
    todos: ["Buat ndarray dari list dan linspace.", "Praktikkan fancy indexing dan boolean indexing.", "Reshape array (10, 4) menjadi (5, 8)."],
    codeSnippet: `import numpy as np
X = np.random.randn(10, 4)
print("Shape:", X.shape, "dtype:", X.dtype)
# Slicing: baris 0-4, kolom 1-3
print(X[:5, 1:3])
# Boolean indexing: baris yang nilai kolomnya > 0
mask = X[:, 0] > 0
print(f"Positif di kolom 0: {mask.sum()} baris")
# Reshape
X2 = X.reshape(5, 8)
print("Reshaped:", X2.shape)`
  },
  {
    day: 37, phaseId: 2, title: "NumPy (2): Broadcasting & Linear Algebra",
    concept: "Aturan Broadcasting, fungsi universal (ufuncs), agregasi cepat, dan numpy.linalg.",
    statConnection: "Broadcasting adalah kunci efisiensi komputasi; operasi X - mean(X) adalah broadcasting otomatis.",
    resources: [
      { title: "From Python to NumPy Book", url: "https://www.labri.fr/perso/nrougier/from-python-to-numpy/", type: "Book" },
      { title: "Complete Python NumPy Tutorial (Keith Galli)", url: "https://www.youtube.com/watch?v=GB9ByFAIAH4", type: "Video" }
    ],
    todos: ["Demonstrasikan broadcasting: tambahkan vektor baris ke matriks.", "Hitung standardisasi kolom dengan broadcasting.", "Gunakan np.linalg untuk eigenvalue dan solve."],
    codeSnippet: `import numpy as np
X = np.random.randn(100, 4)
# Standardisasi via broadcasting (tanpa loop!)
mu = X.mean(axis=0)   # (4,)
sd = X.std(axis=0)    # (4,)
X_std = (X - mu) / sd  # broadcasting: (100,4) - (4,) -> (100,4)
print("Mean setelah std:", X_std.mean(axis=0).round(8))  # ≈ 0
print("Std setelah std:", X_std.std(axis=0).round(8))    # ≈ 1`
  },
  {
    day: 38, phaseId: 2, title: "Pandas (1): Series, DataFrame & Seleksi Data",
    concept: "Struktur Series dan DataFrame, inspeksi data, serta seleksi loc dan iloc.",
    statConnection: "DataFrame adalah versi programatis tabel data statistik — setiap kolom adalah peubah, setiap baris adalah observasi.",
    resources: [
      { title: "10 Minutes to Pandas Docs", url: "https://pandas.pydata.org/docs/user_guide/10min.html", type: "Docs" },
      { title: "Python Pandas Tutorial Playlist (Corey Schafer)", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS", type: "Video" }
    ],
    todos: ["Load dataset Titanic atau Iris ke DataFrame.", "Gunakan .info(), .describe(), .value_counts().", "Seleksi subset data dengan loc dan iloc."],
    codeSnippet: `import pandas as pd
from sklearn.datasets import load_iris
iris = load_iris(as_frame=True)
df = iris.frame
print(df.shape, df.dtypes)
df.info()
print(df.describe())
# loc: label-based
print(df.loc[0:4, 'sepal length (cm)'])
# iloc: integer-based
print(df.iloc[:5, :2])`
  },
  {
    day: 39, phaseId: 2, title: "Pandas (2): Filtering, Modifikasi & Apply",
    concept: "Conditional filtering, modifikasi kolom, fungsi apply(), dan pengurutan data.",
    statConnection: "Filtering dengan kondisi adalah analog programatis dari subsetting data dalam analisis statistik.",
    resources: [
      { title: "Kaggle Learn: Pandas", url: "https://www.kaggle.com/learn/pandas", type: "Course" },
      { title: "Complete Python Pandas Data Science Tutorial (Keith Galli)", url: "https://www.youtube.com/watch?v=vmEHCJofslg", type: "Video" }
    ],
    todos: ["Filter baris berdasarkan kondisi ganda.", "Buat kolom baru menggunakan apply().", "Urutkan DataFrame berdasarkan dua kolom."],
    codeSnippet: `import pandas as pd
import numpy as np
from sklearn.datasets import load_iris
df = load_iris(as_frame=True).frame
# Filter ganda
subset = df[(df['sepal length (cm)'] > 6) & (df['target'] == 2)]
print(f"Filtered: {len(subset)} baris")
# Buat kolom baru
df['sepal_ratio'] = df['sepal length (cm)'] / df['sepal width (cm)']
# Apply custom function
df['size'] = df['sepal length (cm)'].apply(lambda x: 'large' if x > 5.8 else 'small')
print(df['size'].value_counts())`
  },
  {
    day: 40, phaseId: 2, title: "Pandas (3): GroupBy, Pivot & Merge",
    concept: "Agregasi dengan groupby(), pivot tables, serta penggabungan merge, join, dan concat.",
    statConnection: "GroupBy adalah split-apply-combine: prinsip yang sama dengan uji ANOVA (compare group means).",
    resources: [
      { title: "Python for Data Analysis 3e Book", url: "https://wesmckinney.com/book/", type: "Book" },
      { title: "Grouping and Aggregating in Pandas (Corey Schafer)", url: "https://www.youtube.com/watch?v=txMdrV1Ut64", type: "Video" }
    ],
    todos: ["Hitung statistik per-kelas dari dataset Iris dengan groupby.", "Buat pivot table dari data penjualan simulasi.", "Merge dua DataFrame berdasarkan kolom kunci."],
    codeSnippet: `import pandas as pd
from sklearn.datasets import load_iris
df = load_iris(as_frame=True).frame
# GroupBy
stats = df.groupby('target').agg({'sepal length (cm)': ['mean','std','count']})
print(stats)
# Concat
df1 = df.iloc[:50]; df2 = df.iloc[50:100]
combined = pd.concat([df1, df2], ignore_index=True)
print("Shape setelah concat:", combined.shape)`
  },
  {
    day: 41, phaseId: 2, title: "Matplotlib (1): Dasar-dasar Visualisasi",
    concept: "Arsitektur Figure dan Axes, line plot, scatter plot, bar chart, dan label.",
    statConnection: "Visualisasi adalah langkah EDA wajib — grafik yang baik mengungkap pola yang tidak terlihat dari angka saja.",
    resources: [
      { title: "Matplotlib Official Tutorials", url: "https://matplotlib.org/stable/tutorials/index.html", type: "Docs" },
      { title: "Matplotlib Tutorials Playlist (Corey Schafer)", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTvipOqomVEeZ1HRrcEvtZB_", type: "Video" }
    ],
    todos: ["Buat line plot trend sederhana.", "Buat scatter plot dengan warna berbeda per kelas.", "Tambahkan title, xlabel, ylabel, dan legend."],
    codeSnippet: `import matplotlib.pyplot as plt
import numpy as np
from sklearn.datasets import load_iris
iris = load_iris()
X, y = iris.data, iris.target
colors = ['#e74c3c', '#2ecc71', '#3498db']
fig, ax = plt.subplots(figsize=(8, 5))
for cls in range(3):
    mask = y == cls
    ax.scatter(X[mask, 0], X[mask, 1], c=colors[cls], label=iris.target_names[cls], alpha=0.7)
ax.set_xlabel('Sepal Length'); ax.set_ylabel('Sepal Width')
ax.set_title('Iris Dataset – Scatter Plot'); ax.legend()
plt.tight_layout(); plt.show()`
  },
  {
    day: 42, phaseId: 2, title: "Matplotlib (2): Subplots & Kustomisasi",
    concept: "Subplots (plt.subplots), kustomisasi gaya, anotasi teks, dan penyimpanan grafik resolusi tinggi.",
    statConnection: "Multi-panel figure dipakai untuk membandingkan distribusi sebelum dan sesudah preprocessing.",
    resources: [
      { title: "Matplotlib Lifecycle of a Plot", url: "https://matplotlib.org/stable/tutorials/lifecycle.html", type: "Docs" },
      { title: "Subplots in Matplotlib (Corey Schafer)", url: "https://www.youtube.com/watch?v=XFZRVnP-MTU", type: "Video" }
    ],
    todos: ["Buat figure 2×2 dengan 4 subplot berbeda.", "Tambahkan anotasi pada titik terpenting.", "Simpan plot sebagai PNG resolusi 300 dpi."],
    codeSnippet: `import matplotlib.pyplot as plt
import numpy as np
x = np.linspace(0, 2*np.pi, 100)
fig, axes = plt.subplots(2, 2, figsize=(10, 8))
axes[0,0].plot(x, np.sin(x)); axes[0,0].set_title("sin(x)")
axes[0,1].plot(x, np.cos(x), 'r'); axes[0,1].set_title("cos(x)")
axes[1,0].plot(x, np.tan(x), 'g'); axes[1,0].set_ylim(-5, 5); axes[1,0].set_title("tan(x)")
axes[1,1].plot(x, np.exp(-x), 'm'); axes[1,1].set_title("e^-x")
plt.tight_layout()
plt.savefig("/tmp/trig_plots.png", dpi=300, bbox_inches='tight')`
  },
  {
    day: 43, phaseId: 2, title: "Seaborn (1): Distribusi & Kategorik",
    concept: "Visualisasi distribusi (histplot, kdeplot, boxplot, violinplot) dan plot kategorikal.",
    statConnection: "Seaborn memudahkan visualisasi statistik kompleks — violinplot menampilkan distribusi jauh lebih kaya dari boxplot.",
    resources: [
      { title: "Seaborn User Guide", url: "https://seaborn.pydata.org/tutorial.html", type: "Docs" },
      { title: "Seaborn Tutorial for Beginners (Derek Banas)", url: "https://www.youtube.com/watch?v=6GUZXDef2U0", type: "Video" }
    ],
    todos: ["Plot histplot dan kdeplot untuk distribusi fitur Iris.", "Buat boxplot per kelas.", "Bandingkan boxplot vs violinplot untuk data yang sama."],
    codeSnippet: `import seaborn as sns, matplotlib.pyplot as plt
import pandas as pd
from sklearn.datasets import load_iris
df = load_iris(as_frame=True).frame
df['species'] = df['target'].map({0:'setosa',1:'versicolor',2:'virginica'})
fig, axes = plt.subplots(1, 3, figsize=(14, 4))
sns.histplot(df['sepal length (cm)'], kde=True, ax=axes[0])
sns.boxplot(data=df, x='species', y='sepal length (cm)', ax=axes[1])
sns.violinplot(data=df, x='species', y='petal length (cm)', ax=axes[2])
plt.tight_layout(); plt.show()`
  },
  {
    day: 44, phaseId: 2, title: "Seaborn (2) & Mini-Project EDA",
    concept: "Plot relasional, PairGrid, heatmap korelasi, dan latihan EDA menyeluruh.",
    statConnection: "EDA lengkap = ringkasan deskriptif + visualisasi distribusi + visualisasi hubungan antar variabel.",
    resources: [
      { title: "Kaggle Learn: Data Visualization", url: "https://www.kaggle.com/learn/data-visualization", type: "Course" },
      { title: "Exploratory Data Analysis with Pandas & Seaborn (Rob Mulla)", url: "https://www.youtube.com/watch?v=xi0vhXFPegw", type: "Video" }
    ],
    todos: ["Buat heatmap korelasi antar fitur.", "Buat pairplot untuk melihat hubungan semua variabel.", "Tulis laporan EDA 1 halaman untuk dataset yang dipilih."],
    codeSnippet: `import seaborn as sns, matplotlib.pyplot as plt
from sklearn.datasets import load_iris
import pandas as pd
df = load_iris(as_frame=True).frame
# Heatmap korelasi
fig, axes = plt.subplots(1, 2, figsize=(14, 5))
sns.heatmap(df.drop('target',axis=1).corr(), annot=True, cmap='coolwarm', ax=axes[0])
axes[0].set_title("Correlation Heatmap")
# Pairplot (ringkas)
df['species'] = df['target'].map({0:'setosa',1:'versicolor',2:'virginica'})
sns.pairplot(df.drop('target',axis=1), hue='species', height=2)
plt.suptitle("Pairplot Iris", y=1.02); plt.show()`
  },

  // ─── TAHAP 3: DATA COLLECTION, FORMATS & DATA CLEANING (HARI 45 – 60) ───
  {
    day: 45, phaseId: 3, title: "Sumber Data – SQL Dasar",
    concept: "Query SELECT, WHERE, ORDER BY, agregasi GROUP BY, HAVING, dan JOIN.",
    statConnection: "SQL adalah cara standar mengambil data dari database relasional — seperti tabel data pada statistika.",
    resources: [
      { title: "SQLBolt Interactive", url: "https://sqlbolt.com/", type: "Course" },
      { title: "SQL Tutorial - Full Course (freeCodeCamp)", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", type: "Video" }
    ],
    todos: ["Selesaikan pelajaran 1-10 di SQLBolt.", "Tulis query GROUP BY dan HAVING.", "JOIN dua tabel dan filter dengan WHERE."],
    codeSnippet: `# Contoh query SQL (jalankan di SQLite atau DB apapun)
# SELECT species, COUNT(*) as total, AVG(sepal_length) as avg_sl
# FROM iris
# WHERE petal_length > 2
# GROUP BY species
# HAVING total > 10
# ORDER BY avg_sl DESC;
import sqlite3, pandas as pd
from sklearn.datasets import load_iris
conn = sqlite3.connect(":memory:")
iris_df = load_iris(as_frame=True).frame
iris_df.to_sql("iris", conn, index=False)
result = pd.read_sql("SELECT target, AVG(\"sepal length (cm)\") FROM iris GROUP BY target", conn)
print(result)`
  },
  {
    day: 46, phaseId: 3, title: "Sumber Data – SQL Lanjut & Python",
    concept: "CTE, Window Functions, dan koneksi database via SQLAlchemy + Pandas.",
    statConnection: "Window functions seperti RANK() dan LAG() memungkinkan analisis deret waktu langsung di SQL.",
    resources: [
      { title: "Mode Advanced SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "Course" },
      { title: "SQLite & Databases in Python Tutorial (Corey Schafer)", url: "https://www.youtube.com/watch?v=pd-0G0MigUA", type: "Video" }
    ],
    todos: ["Tulis CTE untuk preprocessing bertahap.", "Gunakan window function ROW_NUMBER() dan LAG().", "Baca data SQL ke Pandas DataFrame langsung."],
    codeSnippet: `import sqlite3, pandas as pd
conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE sales (id INT, month INT, revenue REAL)")
data = [(i, m, m*100 + i*10) for i in range(1,4) for m in range(1,5)]
conn.executemany("INSERT INTO sales VALUES (?,?,?)", data)
# Window function: LAG (growth from previous month)
query = """
  SELECT id, month, revenue,
         revenue - LAG(revenue) OVER (PARTITION BY id ORDER BY month) as growth
  FROM sales
"""
print(pd.read_sql(query, conn))`
  },
  {
    day: 47, phaseId: 3, title: "Sumber Data – Database NoSQL",
    concept: "Konsep dokumen JSON/BSON, koleksi di MongoDB, dan penggunaan pymongo.",
    statConnection: "Data tidak terstruktur (log, teks, JSON) semakin umum sebagai sumber data ML modern.",
    resources: [
      { title: "MongoDB Manual Getting Started", url: "https://www.mongodb.com/docs/manual/tutorial/getting-started/", type: "Docs" },
      { title: "MongoDB Crash Course (Web Dev Simplified)", url: "https://www.youtube.com/watch?v=ofme2o29ngU", type: "Video" }
    ],
    todos: ["Instal MongoDB dan coba operasi CRUD dasar.", "Jelaskan perbedaan SQL vs NoSQL untuk data ML.", "Buat contoh dokumen JSON untuk data pengguna aplikasi."],
    codeSnippet: `# Simulasi struktur NoSQL dengan dict Python
# (tanpa MongoDB terinstall)
import json
documents = [
    {"user_id": 1, "events": [{"type":"click","ts":1700000001},{"type":"buy","ts":1700000050}], "age": 25},
    {"user_id": 2, "events": [{"type":"click","ts":1700000010}], "age": 32}
]
# Flatten nested documents for ML
import pandas as pd
rows = [{"user_id": d["user_id"], "n_events": len(d["events"]), "age": d["age"]} for d in documents]
print(pd.DataFrame(rows))`
  },
  {
    day: 48, phaseId: 3, title: "Sumber Data – Internet APIs",
    concept: "Protokol HTTP, REST API, autentikasi token, pustaka requests, dan web scraping dasar.",
    statConnection: "API adalah cara modern mengumpulkan data real-time untuk dataset ML — cuaca, harga saham, media sosial.",
    resources: [
      { title: "Python Requests Documentation", url: "https://requests.readthedocs.io/en/latest/", type: "Docs" },
      { title: "Python Requests Tutorial: Calling Web APIs (Corey Schafer)", url: "https://www.youtube.com/watch?v=tb8gHvYlCFs", type: "Video" }
    ],
    todos: ["Panggil satu API publik (mis. Open-Meteo cuaca) dan simpan ke CSV.", "Tambahkan autentikasi header.", "Parse respons JSON ke DataFrame."],
    codeSnippet: `import requests, pandas as pd
# API cuaca publik (tanpa API key)
url = "https://api.open-meteo.com/v1/forecast"
params = {"latitude": -7.8, "longitude": 110.4, "daily": "temperature_2m_max", "timezone": "Asia/Jakarta", "forecast_days": 7}
response = requests.get(url, params=params)
if response.status_code == 200:
    data = response.json()
    df = pd.DataFrame({"date": data["daily"]["time"], "temp_max": data["daily"]["temperature_2m_max"]})
    print(df)
else:
    print("Error:", response.status_code)`
  },
  {
    day: 49, phaseId: 3, title: "Sumber Data – Mobile Apps & IoT",
    concept: "Arsitektur telemetri event logs, protokol MQTT, dan pengumpulan data sensor time-series.",
    statConnection: "Data deret waktu dari sensor adalah domain statistika spatio-temporal yang penting di ML industri.",
    resources: [
      { title: "Eclipse Mosquitto / MQTT Docs", url: "https://mqtt.org/getting-started/", type: "Docs" },
      { title: "What is MQTT and How It Works for IoT (HiveMQ)", url: "https://www.youtube.com/watch?v=EIxdz-2rhLs", type: "Video" }
    ],
    todos: ["Pahami arsitektur publish-subscribe MQTT.", "Simulasikan data sensor time-series dengan Python.", "Visualisasikan time-series sederhana dengan Pandas."],
    codeSnippet: `import pandas as pd, numpy as np
# Simulasi data sensor IoT (tanpa perangkat nyata)
np.random.seed(42)
timestamps = pd.date_range("2024-01-01", periods=1000, freq="1min")
sensor_data = pd.DataFrame({
    "timestamp": timestamps,
    "temperature": 25 + np.random.randn(1000) * 2 + np.sin(np.linspace(0, 8*np.pi, 1000)),
    "humidity":    60 + np.random.randn(1000) * 5
})
print(sensor_data.head()); print(sensor_data.describe())`
  },
  {
    day: 50, phaseId: 3, title: "Format Data – CSV & Excel",
    concept: "Pembacaan/penulisan file tabular, manajemen encoding, delimiter, dan chunking file besar.",
    statConnection: "CSV adalah format output default SPSS, R, dan software statistik lainnya.",
    resources: [
      { title: "Pandas IO Tools Documentation", url: "https://pandas.pydata.org/docs/user_guide/io.html", type: "Docs" },
      { title: "Reading and Writing CSV & Excel in Pandas (Corey Schafer)", url: "https://www.youtube.com/watch?v=N6hyN6BW6ao", type: "Video" }
    ],
    todos: ["Baca CSV dengan encoding UTF-8 dan Latin-1.", "Simpan DataFrame ke Excel multi-sheet.", "Proses file CSV besar (> 1 juta baris) dengan chunking."],
    codeSnippet: `import pandas as pd
# Baca CSV
df = pd.read_csv("data.csv", encoding='utf-8', sep=',')
# Simpan ke Excel multi-sheet
with pd.ExcelWriter("output.xlsx") as writer:
    df.iloc[:50].to_excel(writer, sheet_name="Sheet1", index=False)
    df.iloc[50:].to_excel(writer, sheet_name="Sheet2", index=False)
# Chunking file besar
# for chunk in pd.read_csv("big_file.csv", chunksize=10000):
#     process(chunk)
print("Contoh selesai (ganti 'data.csv' dengan file nyata)")`
  },
  {
    day: 51, phaseId: 3, title: "Format Data – JSON, Parquet & Format Lainnya",
    concept: "Normalisasi nested JSON (json_normalize), penyimpanan kolumnar Parquet, Feather, dan HDF5.",
    statConnection: "Parquet adalah format standar industri untuk data besar; jauh lebih efisien dari CSV untuk kolom numerik.",
    resources: [
      { title: "Apache Parquet Documentation", url: "https://parquet.apache.org/docs/", type: "Docs" },
      { title: "Working with JSON Data in Python (Corey Schafer)", url: "https://www.youtube.com/watch?v=9N6a-VLBa2I", type: "Video" }
    ],
    todos: ["Flatten nested JSON dengan pd.json_normalize().", "Simpan dan load DataFrame ke format Parquet.", "Bandingkan ukuran file CSV vs Parquet."],
    codeSnippet: `import pandas as pd, json, os
# JSON bertingkat
data = [{"id": 1, "info": {"age": 25, "city": "Yogya"}, "scores": [85, 90]},
        {"id": 2, "info": {"age": 30, "city": "Solo"},  "scores": [70, 80]}]
df = pd.json_normalize(data, sep='_')
print(df)
# Simpan ke Parquet (perlu pyarrow)
try:
    df.to_parquet("/tmp/data.parquet")
    df_back = pd.read_parquet("/tmp/data.parquet")
    print("Parquet OK, shape:", df_back.shape)
except ImportError:
    print("Install pyarrow: pip install pyarrow")`
  },
  {
    day: 52, phaseId: 3, title: "Data Cleaning – Missing Values",
    concept: "Identifikasi mekanisme data hilang (MCAR, MAR, MNAR), penghapusan, dan imputasi (SimpleImputer, KNNImputer).",
    statConnection: "MCAR, MAR, MNAR berasal dari teori missing data rubin — penting untuk memilih strategi imputasi yang tepat.",
    resources: [
      { title: "Scikit-learn: Imputation of Missing Values", url: "https://scikit-learn.org/stable/modules/impute.html", type: "Docs" },
      { title: "Handling Missing Values in ML (Krish Naik)", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe", type: "Video" }
    ],
    todos: ["Identifikasi pola missing values di dataset Titanic.", "Bandingkan imputasi mean, median, dan KNN.", "Visualisasikan heatmap missing values."],
    codeSnippet: `import pandas as pd, numpy as np
from sklearn.impute import SimpleImputer, KNNImputer
X = np.array([[1, 2, np.nan], [3, np.nan, 4], [np.nan, 5, 6], [7, 8, 9]])
# SimpleImputer: mean
simple = SimpleImputer(strategy='mean')
print("Mean imputation:\\n", simple.fit_transform(X))
# KNNImputer
knn_imp = KNNImputer(n_neighbors=2)
print("KNN imputation:\\n", knn_imp.fit_transform(X))`
  },
  {
    day: 53, phaseId: 3, title: "Data Cleaning – Outliers, Duplikasi & Inkonsistensi",
    concept: "Deteksi outlier dengan metode IQR dan Z-Score, capping/winsorizing, serta deduplikasi.",
    statConnection: "Outlier detection adalah materi statistika deskriptif — IQR rule adalah rule of thumb standar boxplot.",
    resources: [
      { title: "Kaggle Learn: Data Cleaning", url: "https://www.kaggle.com/learn/data-cleaning", type: "Course" },
      { title: "Outlier Detection and Removal Using IQR & Z-Score (codebasics)", url: "https://www.youtube.com/watch?v=KFuEAGR3HS4", type: "Video" }
    ],
    todos: ["Deteksi outlier dengan IQR dan Z-Score pada kolom numerik.", "Terapkan winsorizing (capping pada persentil 5-95).", "Hapus duplikat dan periksa inkonsistensi string."],
    codeSnippet: `import pandas as pd, numpy as np
from scipy import stats
data = pd.Series([2, 3, 4, 5, 100, 3, 4, 5, 3, 4])
# IQR method
Q1, Q3 = data.quantile([0.25, 0.75])
IQR = Q3 - Q1
outliers_iqr = (data < Q1 - 1.5*IQR) | (data > Q3 + 1.5*IQR)
print("Outlier IQR:", data[outliers_iqr].values)
# Z-Score method
z_scores = np.abs(stats.zscore(data))
print("Outlier Z-Score:", data[z_scores > 3].values)
# Winsorizing (capping)
data_capped = data.clip(data.quantile(0.05), data.quantile(0.95))
print("Setelah capping:", data_capped.values)`
  },
  {
    day: 54, phaseId: 3, title: "Preprocessing – Feature Scaling & Normalization",
    concept: "Perbandingan StandardScaler, MinMaxScaler, RobustScaler, dan transformasi Box-Cox / Yeo-Johnson.",
    statConnection: "Standardisasi (z-score) adalah transformasi statistik klasik — mengubah distribusi agar punya mean=0, std=1.",
    resources: [
      { title: "Scikit-learn: Preprocessing Data", url: "https://scikit-learn.org/stable/modules/preprocessing.html", type: "Docs" },
      { title: "Feature Scaling: Standardization vs Normalization (Krish Naik)", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe", type: "Video" }
    ],
    todos: ["Terapkan ketiga scaler pada dataset yang sama.", "Bandingkan distribusi sebelum dan sesudah scaling.", "Jelaskan kapan menggunakan masing-masing scaler."],
    codeSnippet: `import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
X = np.array([[1, 2], [3, 4], [5, 6], [100, 200]])  # ada outlier
scalers = {"Standard": StandardScaler(), "MinMax": MinMaxScaler(), "Robust": RobustScaler()}
for name, scaler in scalers.items():
    Xt = scaler.fit_transform(X)
    print(f"{name}: min={Xt.min():.2f}, max={Xt.max():.2f}, mean={Xt.mean():.2f}")`
  },
  {
    day: 55, phaseId: 3, title: "Preprocessing – Feature Engineering Kategorikal",
    concept: "One-Hot Encoding, Ordinal Encoding, Target Encoding, dan penanganan high cardinality.",
    statConnection: "Encoding kategorik adalah langkah wajib sebelum analisis regresi atau diskriminan.",
    resources: [
      { title: "Kaggle Learn: Feature Engineering", url: "https://www.kaggle.com/learn/feature-engineering", type: "Course" },
      { title: "Categorical Encoding Techniques in ML (Krish Naik)", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe", type: "Video" }
    ],
    todos: ["Terapkan One-Hot Encoding dan Ordinal Encoding.", "Implementasikan Target Encoding dari nol.", "Diskusikan masalah high cardinality dan solusinya."],
    codeSnippet: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder
df = pd.DataFrame({'color': ['merah','biru','hijau','merah'], 'size': ['S','M','L','XL']})
# One-Hot Encoding
ohe = OneHotEncoder(sparse_output=False)
encoded = ohe.fit_transform(df[['color']])
print("OHE:\\n", encoded)
# Ordinal Encoding
oe = OrdinalEncoder(categories=[['S','M','L','XL']])
print("Ordinal:", oe.fit_transform(df[['size']]).flatten())`
  },
  {
    day: 56, phaseId: 3, title: "Preprocessing – Feature Engineering Numerik & Waktu",
    concept: "Binning/discretization, fitur interaksi polinomial, dan ekstraksi siklus waktu (sin/cos).",
    statConnection: "Binning mengubah variabel kontinu menjadi kategorik — teknik yang familiar dari distribusi frekuensi.",
    resources: [
      { title: "Feature Engineering Book (Gratis)", url: "http://www.feat.engineering/", type: "Book" },
      { title: "Feature Engineering for Machine Learning (freeCodeCamp)", url: "https://www.youtube.com/watch?v=6WDFfaYtN6s", type: "Video" }
    ],
    todos: ["Terapkan binning usia ke kelompok (muda/dewasa/tua).", "Buat fitur interaksi polinomial derajat 2.", "Encode jam dalam sehari sebagai sin/cos."],
    codeSnippet: `import numpy as np, pandas as pd
from sklearn.preprocessing import PolynomialFeatures
# Binning
ages = np.array([10, 20, 35, 50, 65, 80])
bins = [0, 18, 35, 60, 100]
labels = ['anak','muda','dewasa','lansia']
print(pd.cut(ages, bins=bins, labels=labels))
# Encoding waktu siklus (jam 0-23)
hours = np.arange(24)
sin_h = np.sin(2 * np.pi * hours / 24)
cos_h = np.cos(2 * np.pi * hours / 24)
# Fitur polinomial
X = np.array([[1, 2], [3, 4]])
poly = PolynomialFeatures(degree=2, include_bias=False)
print("Poly features:\\n", poly.fit_transform(X))`
  },
  {
    day: 57, phaseId: 3, title: "Preprocessing – Feature Selection (Filter Methods)",
    concept: "Variance Threshold, korelasi Pearson/Spearman, uji Chi-Square, ANOVA F-test, dan Mutual Information.",
    statConnection: "Ini adalah seleksi variabel statistik — analisis korelasi Pearson adalah materi dasar Statistika Multivariat.",
    resources: [
      { title: "Scikit-learn: Univariate Feature Selection", url: "https://scikit-learn.org/stable/modules/feature_selection.html", type: "Docs" },
      { title: "Feature Selection Techniques in ML (Krish Naik)", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe", type: "Video" }
    ],
    todos: ["Hapus fitur low-variance dengan VarianceThreshold.", "Pilih fitur terbaik dengan SelectKBest (ANOVA F-test).", "Bandingkan fitur yang dipilih filter method vs inspeksi visual."],
    codeSnippet: `from sklearn.feature_selection import VarianceThreshold, SelectKBest, f_classif
from sklearn.datasets import load_iris
import numpy as np
X, y = load_iris(return_X_y=True)
# Variance Threshold
vt = VarianceThreshold(threshold=0.1)
X_vt = vt.fit_transform(X)
print("Setelah VT:", X_vt.shape)
# SelectKBest
skb = SelectKBest(f_classif, k=2)
X_best = skb.fit_transform(X, y)
print("Top 2 fitur (F-score):", skb.scores_.round(1))`
  },
  {
    day: 58, phaseId: 3, title: "Preprocessing – Feature Selection (Wrapper & Embedded)",
    concept: "Forward/Backward Selection, Recursive Feature Elimination (RFE), dan seleksi berbasis L1/Tree.",
    statConnection: "Seleksi berbasis model (RFE, Lasso L1) lebih canggih dari filter method dan sesuai dengan stepwise regression statistika.",
    resources: [
      { title: "Scikit-learn: RFE & SelectFromModel", url: "https://scikit-learn.org/stable/modules/feature_selection.html", type: "Docs" },
      { title: "Feature Selection with Scikit-Learn (StatQuest)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", type: "Video" }
    ],
    todos: ["Terapkan RFE dengan LogisticRegression.", "Gunakan SelectFromModel dengan Lasso.", "Bandingkan fitur pilihan RFE vs SelectKBest."],
    codeSnippet: `from sklearn.feature_selection import RFE, SelectFromModel
from sklearn.linear_model import LogisticRegression, Lasso
from sklearn.datasets import load_breast_cancer
X, y = load_breast_cancer(return_X_y=True)
# RFE
rfe = RFE(LogisticRegression(max_iter=5000), n_features_to_select=5)
rfe.fit(X, y)
print("RFE selected:", rfe.support_.sum(), "fitur")
# SelectFromModel (Lasso)
sfm = SelectFromModel(Lasso(alpha=0.01, max_iter=5000))
sfm.fit(X, y)
print("Lasso selected:", sfm.get_support().sum(), "fitur")`
  },
  {
    day: 59, phaseId: 3, title: "Preprocessing – Konsep Dimensionality Reduction",
    concept: "Memahami Curse of Dimensionality, proyeksi manifold, dan kompresi ruang fitur.",
    statConnection: "Kutukan dimensi menjelaskan mengapa distance metrics kehilangan makna di dimensi tinggi — relevan untuk uji statistik multivariat.",
    resources: [
      { title: "Scikit-learn: Manifold Learning", url: "https://scikit-learn.org/stable/modules/manifold.html", type: "Docs" },
      { title: "Curse of Dimensionality & Reduction Intro (StatQuest)", url: "https://www.youtube.com/watch?v=FgakZw6K1QQ", type: "Video" }
    ],
    todos: ["Demonstrasikan curse of dimensionality secara numerik.", "Visualisasikan t-SNE pada dataset Digits.", "Jelaskan perbedaan PCA (linear) vs t-SNE (non-linear)."],
    codeSnippet: `import numpy as np
from sklearn.manifold import TSNE
from sklearn.datasets import load_digits
import matplotlib.pyplot as plt
digits = load_digits()
# t-SNE untuk visualisasi 2D (non-linear)
tsne = TSNE(n_components=2, random_state=42, perplexity=30)
X_2d = tsne.fit_transform(digits.data[:500])
plt.figure(figsize=(8, 6))
scatter = plt.scatter(X_2d[:,0], X_2d[:,1], c=digits.target[:500], cmap='tab10', s=10)
plt.colorbar(scatter); plt.title("t-SNE Digits Dataset"); plt.show()`
  },
  {
    day: 60, phaseId: 3, title: "Integrasi Pipeline Preprocessing",
    concept: "Membangun alur transformasi bebas data leakage menggunakan ColumnTransformer dan Pipeline.",
    statConnection: "Pipeline memastikan transformasi training tidak 'bocor' ke data test — analog dengan cross-validation yang benar.",
    resources: [
      { title: "Scikit-learn: ColumnTransformer", url: "https://scikit-learn.org/stable/modules/compose.html", type: "Docs" },
      { title: "Scikit-Learn Pipelines & ColumnTransformer (Data School)", url: "https://www.youtube.com/playlist?list=PL5-da3qGB5ICeMbQuqbbCOQWcS6OYBr5A", type: "Video" }
    ],
    todos: ["Buat Pipeline lengkap: imputer + scaler + model.", "Gunakan ColumnTransformer untuk kolom numerik dan kategorik.", "Evaluasi pipeline dengan cross_val_score."],
    codeSnippet: `from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
import pandas as pd, numpy as np
X = pd.DataFrame({'age':[25,np.nan,35,40],'city':['Yogya','Solo','Yogya','Jakarta'],'income':[3,5,np.nan,8]})
y = [0, 1, 0, 1]
num_pipe = Pipeline([('imp', SimpleImputer(strategy='mean')), ('scl', StandardScaler())])
cat_pipe = Pipeline([('imp', SimpleImputer(strategy='most_frequent')), ('ohe', OneHotEncoder())])
ct = ColumnTransformer([('num', num_pipe, ['age','income']), ('cat', cat_pipe, ['city'])])
full_pipe = Pipeline([('prep', ct), ('clf', LogisticRegression())])
print("Pipeline berhasil dibuat:", full_pipe.steps)`
  },

  // ─── TAHAP 4: CORE ML WORKFLOW, EVALUATION, SUPERVISED & UNSUPERVISED LEARNING (HARI 61 – 84) ───
  {
    day: 61, phaseId: 4, title: "Apa itu Machine Learning? Jenis-jenis ML (1)",
    concept: "Paradigma Supervised Learning dan Unsupervised Learning beserta formulasi matematisnya.",
    statConnection: "Supervised learning = model statistik prediktif dengan label; Unsupervised = analisis pola tanpa label.",
    resources: [
      { title: "ISLP Book Bab 1 & 2", url: "https://www.statlearning.com/", type: "Book" },
      { title: "Machine Learning Fundamentals (StatQuest Playlist)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", type: "Video" }
    ],
    todos: ["Buat diagram perbedaan Supervised vs Unsupervised.", "Identifikasi 5 contoh kasus Supervised dan Unsupervised di industri.", "Formulasikan masalah prediksi harga rumah secara matematis."],
    codeSnippet: `# Supervised: belajar f(X) -> y dari pasangan (X, y)
# Unsupervised: temukan struktur dalam X tanpa label
from sklearn.datasets import load_iris, make_blobs
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans
X_sup, y_sup = load_iris(return_X_y=True)
X_un, _ = make_blobs(n_samples=200, centers=3)
# Supervised
model = LogisticRegression(max_iter=200).fit(X_sup[:120], y_sup[:120])
print("Supervised accuracy:", model.score(X_sup[120:], y_sup[120:]))
# Unsupervised
km = KMeans(n_clusters=3, random_state=42).fit(X_un)
print("Cluster centers shape:", km.cluster_centers_.shape)`
  },
  {
    day: 62, phaseId: 4, title: "Jenis-jenis Machine Learning (2)",
    concept: "Paradigma Semi-supervised Learning, Self-supervised Learning, dan Reinforcement Learning.",
    statConnection: "Semi-supervised memanfaatkan data tidak berlabel — analoginya adalah imputasi cerdas dalam analisis data.",
    resources: [
      { title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", type: "Course" },
      { title: "Self-Supervised Learning Explained", url: "https://www.youtube.com/watch?v=SaJL4SLfrcY", type: "Video" }
    ],
    todos: ["Jelaskan perbedaan Self-supervised vs Semi-supervised.", "Cari 2 contoh aplikasi Reinforcement Learning di dunia nyata.", "Gambar diagram perbedaan keempat paradigma ML."],
    codeSnippet: `# Semi-supervised: hanya sebagian data berlabel
# Self-supervised: buat label dari data sendiri (contoh: prediksi kata berikutnya di NLP)
# Reinforcement Learning: agent belajar dari reward lingkungan
paradigms = {
    "Supervised": "Label eksplisit untuk setiap sampel",
    "Unsupervised": "Tanpa label, temukan pola",
    "Semi-supervised": "Sedikit label + banyak data tanpa label",
    "Self-supervised": "Label dibuat otomatis dari data (mis. BERT)",
    "Reinforcement": "Agent + Environment + Reward"
}
for name, desc in paradigms.items():
    print(f"[{name}] {desc}")`
  },
  {
    day: 63, phaseId: 4, title: "ML Workflow – Data Loading, Preparation & Train-Test Split",
    concept: "Strategi pembagian Train, Validation, Test set dan pencegahan Data Leakage.",
    statConnection: "Pembagian data adalah analog dari desain eksperimen — test set adalah 'eksperimen nyata' yang tidak pernah dilihat model.",
    resources: [
      { title: "Scikit-learn: Common Pitfalls", url: "https://scikit-learn.org/stable/common_pitfalls.html", type: "Docs" },
      { title: "Training, Validation and Testing Data Sets (StatQuest)", url: "https://www.youtube.com/watch?v=fSytzGwwBVw", type: "Video" }
    ],
    todos: ["Bagi dataset dengan stratify untuk kelas imbalanced.", "Identifikasi 3 sumber data leakage umum.", "Implementasikan validation set terpisah dari test set."],
    codeSnippet: `from sklearn.model_selection import train_test_split
from sklearn.datasets import load_breast_cancer
X, y = load_breast_cancer(return_X_y=True)
# Stratified split
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.15, random_state=42, stratify=y)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.18, random_state=42, stratify=y_temp)
print(f"Train: {X_train.shape}, Val: {X_val.shape}, Test: {X_test.shape}")
print(f"Train class ratio: {y_train.mean():.3f} | Test: {y_test.mean():.3f}")`
  },
  {
    day: 64, phaseId: 4, title: "Teknik Validasi – K-Fold & LOOCV",
    concept: "K-Fold Cross Validation, Stratified K-Fold, TimeSeriesSplit, dan Leave-One-Out Cross Validation (LOOCV).",
    statConnection: "K-Fold menggunakan semua data secara efisien — lebih handal dari satu kali split, seperti bootstrap di statistika.",
    resources: [
      { title: "Scikit-learn: Cross-validation", url: "https://scikit-learn.org/stable/modules/cross_validation.html", type: "Docs" },
      { title: "Cross Validation Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=fSytzGwwBVw", type: "Video" }
    ],
    todos: ["Implementasikan 5-Fold CV dan hitung mean ± std akurasi.", "Bandingkan KFold vs StratifiedKFold untuk dataset imbalanced.", "Demonstrasikan TimeSeriesSplit untuk data chronological."],
    codeSnippet: `from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
import numpy as np
X, y = load_iris(return_X_y=True)
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
model = DecisionTreeClassifier(random_state=42)
scores = cross_val_score(model, X, y, cv=skf, scoring='accuracy')
print(f"Akurasi: {scores.mean():.4f} ± {scores.std():.4f}")
print(f"Per fold: {scores.round(4)}")`
  },
  {
    day: 65, phaseId: 4, title: "Regularisasi – Bias-Variance Tradeoff",
    concept: "Bias-Variance Tradeoff, diagnosis Underfitting vs Overfitting, dan kurva pembelajaran (learning curves).",
    statConnection: "Bias = kesalahan sistematis model, Variance = sensitivitas terhadap fluktuasi data — sama dengan konsep dalam estimasi parameter.",
    resources: [
      { title: "ISLP Book Bab 2.2: Bias-Variance", url: "https://www.statlearning.com/", type: "Book" },
      { title: "Machine Learning Fundamentals: Bias and Variance (StatQuest)", url: "https://www.youtube.com/watch?v=EuBBz3bI-aA", type: "Video" }
    ],
    todos: ["Buat learning curve untuk model dengan underfitting dan overfitting.", "Demonstrasikan bagaimana model depth mempengaruhi bias-variance.", "Plotkan validation curve terhadap hyperparameter."],
    codeSnippet: `from sklearn.model_selection import learning_curve
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_breast_cancer
import numpy as np, matplotlib.pyplot as plt
X, y = load_breast_cancer(return_X_y=True)
for max_d in [1, 5, None]:
    train_sz, train_sc, val_sc = learning_curve(
        DecisionTreeClassifier(max_depth=max_d, random_state=42), X, y, cv=5, n_jobs=-1)
    plt.plot(train_sz, val_sc.mean(axis=1), label=f'depth={max_d}')
plt.xlabel("Training size"); plt.ylabel("Val Accuracy"); plt.legend()
plt.title("Learning Curves"); plt.show()`
  },
  {
    day: 66, phaseId: 4, title: "Regularisasi – Ridge, Lasso & ElasticNet",
    concept: "Penurunan matematis dan geometri penalti L2 (Ridge), L1 (Lasso), serta kombinasi ElasticNet.",
    statConnection: "Ridge adalah shrinkage estimator dalam statistika; Lasso melakukan seleksi variabel otomatis.",
    resources: [
      { title: "Scikit-learn: Ridge, Lasso, ElasticNet", url: "https://scikit-learn.org/stable/modules/linear_model.html", type: "Docs" },
      { title: "Regularization Part 1, 2, & 3: Ridge, Lasso, ElasticNet (StatQuest)", url: "https://www.youtube.com/watch?v=Q81RR3yKn30", type: "Video" }
    ],
    todos: ["Terapkan Ridge, Lasso, ElasticNet pada dataset dengan banyak fitur.", "Visualisasikan koefisien vs nilai α (regularization path).", "Gunakan RidgeCV untuk mencari α optimal."],
    codeSnippet: `from sklearn.linear_model import Ridge, Lasso, ElasticNet, RidgeCV
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler(); X_tr = scaler.fit_transform(X_tr); X_te = scaler.transform(X_te)
for name, model in [("Ridge", Ridge(alpha=1.0)), ("Lasso", Lasso(alpha=0.1)), ("ElasticNet", ElasticNet(alpha=0.1))]:
    model.fit(X_tr, y_tr)
    print(f"{name}: R²={model.score(X_te, y_te):.4f}, non-zero={sum(model.coef_ != 0)}/{len(model.coef_)}")`
  },
  {
    day: 67, phaseId: 4, title: "Evaluasi Model – Confusion Matrix, Precision, Recall, F1",
    concept: "Evaluasi klasifikasi pada dataset seimbang maupun timpang (imbalanced). Pilih metrik yang tepat untuk masalah yang tepat.",
    statConnection: "Sensitivity = Recall, Specificity = 1 - FPR — terminologi yang sama dengan uji diagnostik di epidemiologi.",
    resources: [
      { title: "Scikit-learn: Classification Metrics", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", type: "Docs" },
      { title: "Confusion Matrix, Sensitivity, Precision & F1 (StatQuest)", url: "https://www.youtube.com/watch?v=Kdsp6soqA7o", type: "Video" }
    ],
    todos: ["Hitung semua metrik dari confusion matrix secara manual.", "Jelaskan kapan Recall > Precision lebih penting (mis. deteksi kanker).", "Plotkan confusion matrix dengan seaborn."],
    codeSnippet: `from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = DecisionTreeClassifier(random_state=42).fit(X_tr, y_tr)
y_pred = model.predict(X_te)
print(classification_report(y_te, y_pred, target_names=['malignant','benign']))`
  },
  {
    day: 68, phaseId: 4, title: "Evaluasi Model – ROC-AUC, Log Loss & Metrik Regresi",
    concept: "Kurva ROC-AUC, Precision-Recall AUC, Log Loss, serta MAE, MSE, RMSE, dan R².",
    statConnection: "AUC-ROC adalah probabilitas bahwa model meranking sampel positif lebih tinggi dari negatif — interpretasi yang elegan dari perspektif statistika.",
    resources: [
      { title: "Google ML Crash Course: ROC & AUC", url: "https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc", type: "Course" },
      { title: "ROC and AUC, Clearly Explained! (StatQuest)", url: "https://www.youtube.com/watch?v=4jRBRDbJemM", type: "Video" }
    ],
    todos: ["Plot kurva ROC dan hitung AUC.", "Bandingkan ROC-AUC vs PR-AUC untuk imbalanced dataset.", "Hitung MAE, RMSE, R² untuk masalah regresi."],
    codeSnippet: `from sklearn.metrics import roc_auc_score, roc_curve, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt, numpy as np
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(random_state=42).fit(X_tr, y_tr)
y_prob = model.predict_proba(X_te)[:, 1]
fpr, tpr, _ = roc_curve(y_te, y_prob)
auc = roc_auc_score(y_te, y_prob)
plt.plot(fpr, tpr, label=f"AUC = {auc:.4f}"); plt.plot([0,1],[0,1],'k--')
plt.xlabel("FPR"); plt.ylabel("TPR"); plt.title("ROC Curve"); plt.legend(); plt.show()`
  },
  {
    day: 69, phaseId: 4, title: "Pemilihan & Tuning Model",
    concept: "GridSearchCV, RandomizedSearchCV, Bayesian Optimization (Optuna), dan inferensi model.",
    statConnection: "Tuning hyperparameter adalah optimasi — mencari nilai parameter yang meminimalkan error validasi.",
    resources: [
      { title: "Scikit-learn: Hyper-parameter Tuning", url: "https://scikit-learn.org/stable/modules/grid_search.html", type: "Docs" },
      { title: "Hyperparameter Tuning in Python (Data School)", url: "https://www.youtube.com/watch?v=Gol_qOgRqfA", type: "Video" }
    ],
    todos: ["Terapkan GridSearchCV untuk DecisionTree.", "Bandingkan RandomizedSearchCV (lebih cepat untuk ruang besar).", "Instal Optuna dan coba Bayesian optimization."],
    codeSnippet: `from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
X, y = load_iris(return_X_y=True)
param_grid = {'max_depth': [2, 3, 5, None], 'min_samples_split': [2, 5, 10], 'criterion': ['gini', 'entropy']}
gs = GridSearchCV(DecisionTreeClassifier(random_state=42), param_grid, cv=5, n_jobs=-1)
gs.fit(X, y)
print("Best params:", gs.best_params_)
print("Best CV score:", f"{gs.best_score_:.4f}")`
  },
  {
    day: 70, phaseId: 4, title: "Supervised Learning – Regresi Linear (1): OLS",
    concept: "Formulasi model linear dan solusi analitik Ordinary Least Squares (OLS). β̂ = (X^T X)^{-1} X^T y.",
    statConnection: "OLS adalah metode inti Statistika — hasil yang sama persis dengan perintah lm() di R atau PROC REG di SAS.",
    resources: [
      { title: "ISLP Book Bab 3: Linear Regression", url: "https://www.statlearning.com/", type: "Book" },
      { title: "Linear Regression, Clearly Explained! (StatQuest)", url: "https://www.youtube.com/watch?v=nk2CQITm_eo", type: "Video" }
    ],
    todos: ["Implementasikan OLS dari nol tanpa scikit-learn.", "Verifikasi dengan sklearn.linear_model.LinearRegression.", "Plot residual dan periksa asumsi normalitas."],
    codeSnippet: `import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
# OLS dari nol: β = (X^T X)^{-1} X^T y
X_b = np.hstack([np.ones((X_tr.shape[0],1)), X_tr])  # tambah bias
beta = np.linalg.pinv(X_b.T @ X_b) @ X_b.T @ y_tr
X_te_b = np.hstack([np.ones((X_te.shape[0],1)), X_te])
y_hat = X_te_b @ beta
ss_res = ((y_te - y_hat)**2).sum(); ss_tot = ((y_te - y_te.mean())**2).sum()
print(f"R² dari nol: {1 - ss_res/ss_tot:.4f}")`
  },
  {
    day: 71, phaseId: 4, title: "Supervised Learning – Regresi Linear (2): Gradient Descent",
    concept: "Optimasi dengan Batch, Stochastic, dan Mini-Batch Gradient Descent serta pengujian asumsi klasik.",
    statConnection: "Gradient descent menggantikan solusi analitik OLS saat matriks X^T X terlalu besar untuk diinvers.",
    resources: [
      { title: "Stanford CS229 Supervised Learning Notes", url: "https://cs229.stanford.edu/main_notes.pdf", type: "Docs" },
      { title: "Stochastic Gradient Descent, Clearly Explained! (StatQuest)", url: "https://www.youtube.com/watch?v=vMh0zPT0tLI", type: "Video" }
    ],
    todos: ["Implementasikan Mini-batch Gradient Descent dari nol.", "Plot kurva loss selama training.", "Periksa asumsi klasik OLS: homoskedastisitas, normalitas residual."],
    codeSnippet: `import numpy as np
np.random.seed(42)
X = np.random.randn(200, 1); y = 3*X.flatten() + 2 + np.random.randn(200)*0.5
X_b = np.hstack([np.ones((200,1)), X])
w = np.zeros(2); lr = 0.05; batch = 32
losses = []
for epoch in range(100):
    idx = np.random.permutation(200)
    for i in range(0, 200, batch):
        b_idx = idx[i:i+batch]
        Xb, yb = X_b[b_idx], y[b_idx]
        grad = Xb.T @ (Xb @ w - yb) / len(yb)
        w -= lr * grad
    losses.append(((X_b @ w - y)**2).mean())
print(f"Bias={w[0]:.2f}, Slope={w[1]:.2f}")  # ≈ 2, 3`
  },
  {
    day: 72, phaseId: 4, title: "Supervised Learning – Regresi Polinomial",
    concept: "Pemodelan hubungan non-linear menggunakan ekspansi fitur polinomial (PolynomialFeatures).",
    statConnection: "Regresi polinomial adalah kasus khusus regresi linear dengan fitur yang diperluas — teknik yang sama dengan kurva fitting di statistika.",
    resources: [
      { title: "Scikit-learn: Polynomial Regression", url: "https://scikit-learn.org/stable/modules/linear_model.html", type: "Docs" },
      { title: "Polynomial Regression in ML (StatQuest)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", type: "Video" }
    ],
    todos: ["Fit polynomial degree 1, 2, 5, 10 pada data non-linear.", "Visualisasikan overfitting di degree tinggi.", "Gunakan cross-validation untuk pilih degree optimal."],
    codeSnippet: `import numpy as np, matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
np.random.seed(42)
X = np.linspace(-3, 3, 50).reshape(-1,1)
y = X.flatten()**2 + np.random.randn(50)*0.5
plt.scatter(X, y, alpha=0.7, label='Data')
for deg in [1, 2, 5]:
    model = make_pipeline(PolynomialFeatures(deg), LinearRegression())
    model.fit(X, y)
    plt.plot(X, model.predict(X), label=f'Degree {deg}')
plt.legend(); plt.title("Polynomial Regression"); plt.show()`
  },
  {
    day: 73, phaseId: 4, title: "Supervised Learning – Regresi Logistik",
    concept: "Fungsi aktivasi Sigmoid, konsep Odds & Log-Odds (Logit), dan estimasi Maximum Likelihood.",
    statConnection: "Regresi logistik adalah metode statistika klasik untuk variabel respons biner — persis seperti yang dipelajari di Biostatistika.",
    resources: [
      { title: "ISLP Book Bab 4: Classification", url: "https://www.statlearning.com/", type: "Book" },
      { title: "Logistic Regression, Clearly Explained! (StatQuest)", url: "https://www.youtube.com/watch?v=yIYKR4sgzI8", type: "Video" }
    ],
    todos: ["Implementasikan sigmoid function dan hitung output.", "Fit LogisticRegression dan interpretasikan koefisien sebagai log-odds.", "Plot decision boundary untuk 2 fitur."],
    codeSnippet: `import numpy as np, matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X[:,:2], y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
print(f"Accuracy: {model.score(X_te, y_te):.4f}")
# Sigmoid
def sigmoid(z): return 1 / (1 + np.exp(-z))
z = np.linspace(-10, 10, 100)
plt.plot(z, sigmoid(z)); plt.axhline(0.5, linestyle='--', color='r')
plt.title("Sigmoid Function"); plt.show()`
  },
  {
    day: 74, phaseId: 4, title: "Supervised Learning – K-Nearest Neighbors (KNN)",
    concept: "Algoritma lazy learning, metrik jarak (Euclidean, Manhattan, Minkowski), dan pemilihan nilai K.",
    statConnection: "KNN tidak membangun model eksplisit — analoginya adalah interpolasi nearest neighbor dalam geostatistika.",
    resources: [
      { title: "Scikit-learn: Nearest Neighbors", url: "https://scikit-learn.org/stable/modules/neighbors.html", type: "Docs" },
      { title: "K-Nearest Neighbors (KNN), Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=HVXime0nQeI", type: "Video" }
    ],
    todos: ["Implementasikan KNN classifier dari nol.", "Plot akurasi vs K untuk memilih K optimal.", "Jelaskan trade-off K kecil vs K besar."],
    codeSnippet: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
import numpy as np, matplotlib.pyplot as plt
X, y = load_iris(return_X_y=True)
k_range = range(1, 31)
scores = [cross_val_score(KNeighborsClassifier(n_neighbors=k), X, y, cv=5).mean() for k in k_range]
plt.plot(k_range, scores, marker='o')
plt.xlabel("K"); plt.ylabel("CV Accuracy"); plt.title("KNN: Pemilihan K Optimal")
best_k = k_range[np.argmax(scores)]
plt.axvline(best_k, color='r', linestyle='--', label=f'Best K={best_k}')
plt.legend(); plt.show()`
  },
  {
    day: 75, phaseId: 4, title: "Supervised Learning – SVM (1): Maximum Margin",
    concept: "Maximum Margin Classifier, Support Vectors, dan parameter Soft Margin (C).",
    statConnection: "SVM mengoptimalkan margin — geometri yang berhubungan dengan teori keputusan statistik (Neyman-Pearson).",
    resources: [
      { title: "ISLP Book Bab 9: SVM", url: "https://www.statlearning.com/", type: "Book" },
      { title: "Support Vector Machines Part 1: Main Ideas (StatQuest)", url: "https://www.youtube.com/watch?v=efR1C6CvhmE", type: "Video" }
    ],
    todos: ["Visualisasikan decision boundary SVM linear.", "Eksperimen dengan nilai C berbeda dan lihat efeknya.", "Identifikasi support vectors dari model yang sudah difit."],
    codeSnippet: `from sklearn.svm import SVC
from sklearn.datasets import make_classification
import numpy as np, matplotlib.pyplot as plt
X, y = make_classification(n_samples=100, n_features=2, n_redundant=0, random_state=42)
for C in [0.1, 1, 100]:
    model = SVC(kernel='linear', C=C).fit(X, y)
    print(f"C={C}: n_support_vectors={model.support_.shape[0]}, score={model.score(X,y):.3f}")`
  },
  {
    day: 76, phaseId: 4, title: "Supervised Learning – SVM (2): Kernel Trick",
    concept: "The Kernel Trick (Polynomial & RBF Kernel) dan Support Vector Regression (SVR).",
    statConnection: "Kernel trick memproyeksikan data ke ruang dimensi tinggi implisit — memperluas model linear menjadi non-linear.",
    resources: [
      { title: "Scikit-learn: Support Vector Machines", url: "https://scikit-learn.org/stable/modules/svm.html", type: "Docs" },
      { title: "SVM Part 2 & 3: Polynomial and Radial (RBF) Kernel (StatQuest)", url: "https://www.youtube.com/watch?v=Toet3EiSFcM", type: "Video" }
    ],
    todos: ["Bandingkan kernel linear, poly, dan RBF pada dataset yang sama.", "Tuning parameter gamma (RBF) dan degree (poly).", "Implementasikan SVR untuk masalah regresi."],
    codeSnippet: `from sklearn.svm import SVC, SVR
from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
import numpy as np
X, y = load_iris(return_X_y=True)
for kernel in ['linear', 'poly', 'rbf']:
    score = cross_val_score(SVC(kernel=kernel, C=1.0, gamma='scale'), X, y, cv=5).mean()
    print(f"Kernel {kernel}: CV Accuracy = {score:.4f}")`
  },
  {
    day: 77, phaseId: 4, title: "Supervised Learning – Decision Trees",
    concept: "Algoritma CART, perhitungan Gini Impurity, Entropy / Information Gain, dan Cost-Complexity Pruning.",
    statConnection: "Decision tree adalah model non-parametrik yang tidak mengasumsikan distribusi data — berbeda dari model statistik parametrik.",
    resources: [
      { title: "Scikit-learn: Decision Trees", url: "https://scikit-learn.org/stable/modules/tree.html", type: "Docs" },
      { title: "Decision and Classification Trees, Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=_L39rN6gz7Y", type: "Video" }
    ],
    todos: ["Hitung Gini Impurity secara manual untuk split sederhana.", "Visualisasikan pohon keputusan yang sudah difit.", "Terapkan pruning (max_depth) dan lihat efeknya."],
    codeSnippet: `from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt
X, y = load_iris(return_X_y=True)
# Tanpa pruning: bisa overfit
tree = DecisionTreeClassifier(max_depth=3, random_state=42).fit(X, y)
plt.figure(figsize=(14, 6))
plot_tree(tree, feature_names=load_iris().feature_names, class_names=load_iris().target_names, filled=True)
plt.title("Decision Tree (max_depth=3)"); plt.show()
# Gini impurity manual
def gini(p): return 1 - sum(pi**2 for pi in p)
print("Gini [0.5, 0.5]:", gini([0.5, 0.5]))   # 0.5 (paling kotor)
print("Gini [1.0, 0.0]:", gini([1.0, 0.0]))   # 0.0 (murni)`
  },
  {
    day: 78, phaseId: 4, title: "Supervised Learning – Random Forest",
    concept: "Ensemble Bagging (Bootstrap Aggregating), Out-of-Bag (OOB) error, dan Feature Importance.",
    statConnection: "Bagging mengurangi variance melalui averaging — analog dengan mengulang sampling di statistika bootstrap.",
    resources: [
      { title: "ISLP Book Bab 8: Tree-Based Methods", url: "https://www.statlearning.com/", type: "Book" },
      { title: "Random Forests Part 1: Building, Using and Evaluating (StatQuest)", url: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ", type: "Video" }
    ],
    todos: ["Fit Random Forest dan hitung OOB error.", "Plot feature importance bar chart.", "Bandingkan akurasi Decision Tree vs Random Forest."],
    codeSnippet: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import pandas as pd, matplotlib.pyplot as plt
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
rf = RandomForestClassifier(n_estimators=100, oob_score=True, random_state=42).fit(X_tr, y_tr)
print(f"Test accuracy: {rf.score(X_te, y_te):.4f}")
print(f"OOB score: {rf.oob_score_:.4f}")
feat_imp = pd.Series(rf.feature_importances_, index=load_breast_cancer().feature_names)
feat_imp.nlargest(10).plot.barh(); plt.title("Top 10 Feature Importances"); plt.show()`
  },
  {
    day: 79, phaseId: 4, title: "Supervised Learning – Gradient Boosting (1): Teori",
    concept: "Konsep Boosting sekuensial dan pemodelan pseudo-residuals pada Gradient Boosting.",
    statConnection: "Gradient boosting adalah additive model yang meminimalkan fungsi loss differentiable — koneksi langsung ke kalkulus variasional.",
    resources: [
      { title: "Scikit-learn: Gradient Boosting", url: "https://scikit-learn.org/stable/modules/ensemble.html", type: "Docs" },
      { title: "Gradient Boost Part 1 & 2: Regression and Classification (StatQuest)", url: "https://www.youtube.com/watch?v=3CC4N4z3GJc", type: "Video" }
    ],
    todos: ["Jelaskan intuisi pseudo-residuals.", "Implementasikan 3 langkah boosting manual untuk regresi.", "Fit GradientBoostingClassifier dan evaluasi."],
    codeSnippet: `from sklearn.ensemble import GradientBoostingClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt, numpy as np
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
gb.fit(X_tr, y_tr)
# Plot training deviance
train_scores = [gb.estimators_[i][0].tree_.n_node_samples for i in range(len(gb.estimators_))]
print(f"Test accuracy: {gb.score(X_te, y_te):.4f}")`
  },
  {
    day: 80, phaseId: 4, title: "Supervised Learning – Gradient Boosting (2): XGBoost, LightGBM",
    concept: "Optimasi sistem dan regularisasi pohon pada XGBoost, LightGBM, dan CatBoost.",
    statConnection: "XGBoost menambahkan regularisasi L1/L2 ke objective function gradient boosting — menggabungkan Bayes dengan gradient.",
    resources: [
      { title: "XGBoost Official Documentation", url: "https://xgboost.readthedocs.io/en/stable/tutorials/model.html", type: "Docs" },
      { title: "XGBoost Part 1 & 2: Regression and Classification (StatQuest)", url: "https://www.youtube.com/watch?v=OtD8wVaFm6E", type: "Video" }
    ],
    todos: ["Install xgboost dan lightgbm.", "Bandingkan waktu training XGBoost vs sklearn GradientBoosting.", "Tuning learning_rate dan n_estimators via CV."],
    codeSnippet: `import xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5,
                           use_label_encoder=False, eval_metric='logloss', random_state=42)
model.fit(X_tr, y_tr, eval_set=[(X_te, y_te)], verbose=False)
print(f"XGBoost Accuracy: {accuracy_score(y_te, model.predict(X_te)):.4f}")`
  },
  {
    day: 81, phaseId: 4, title: "Unsupervised Learning – Clustering Ekslusif (K-Means & DBSCAN)",
    concept: "K-Means (Elbow Method, Silhouette) dan DBSCAN untuk deteksi kluster dengan bentuk arbitrer dan noise.",
    statConnection: "K-Means meminimalkan within-cluster sum of squares (WCSS) — analog dengan ANOVA: minimize variasi dalam grup.",
    resources: [
      { title: "Scikit-learn: Clustering Guide", url: "https://scikit-learn.org/stable/modules/clustering.html", type: "Docs" },
      { title: "K-Means & DBSCAN Clustering Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=4b5d3muPQmA", type: "Video" }
    ],
    todos: ["Plot Elbow Curve untuk memilih K optimal.", "Hitung Silhouette Score untuk berbagai K.", "Bandingkan K-Means vs DBSCAN pada dataset berbentuk bulan sabit."],
    codeSnippet: `from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score
from sklearn.datasets import make_moons
import matplotlib.pyplot as plt, numpy as np
X, _ = make_moons(n_samples=300, noise=0.1, random_state=42)
# Elbow method
inertias = [KMeans(k, random_state=42).fit(X).inertia_ for k in range(2, 10)]
# DBSCAN untuk data berbentuk bulan sabit
dbscan = DBSCAN(eps=0.3, min_samples=5).fit(X)
n_clusters = len(set(dbscan.labels_)) - (1 if -1 in dbscan.labels_ else 0)
print(f"DBSCAN menemukan {n_clusters} kluster, noise: {(dbscan.labels_==-1).sum()}")`
  },
  {
    day: 82, phaseId: 4, title: "Unsupervised Learning – Hierarchical Clustering",
    concept: "Agglomerative Clustering, Dendrogram, kriteria Linkage, dan Fuzzy C-Means.",
    statConnection: "Hierarchical clustering menghasilkan dendrogram — pohon klasifikasi yang sering dipakai dalam taksonomi dan filogenetika.",
    resources: [
      { title: "ISLP Book Bab 12.4: Clustering", url: "https://www.statlearning.com/", type: "Book" },
      { title: "Hierarchical Clustering, Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=7xHsRkOdVwo", type: "Video" }
    ],
    todos: ["Plot dendrogram dengan scipy.cluster.hierarchy.", "Bandingkan linkage: ward, complete, average.", "Cut dendrogram untuk mendapatkan 3 kluster."],
    codeSnippet: `from scipy.cluster.hierarchy import dendrogram, linkage, fcluster
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt, numpy as np
X, y = load_iris(return_X_y=True)
X_sample = X[:50]
# Hierarchical clustering
Z = linkage(X_sample, method='ward')
plt.figure(figsize=(12, 5))
dendrogram(Z, leaf_rotation=90, leaf_font_size=8)
plt.title("Dendrogram (Ward Linkage)"); plt.show()
# Cut tree
labels = fcluster(Z, t=3, criterion='maxclust')
print("Cluster distribution:", {l: (labels==l).sum() for l in set(labels)})`
  },
  {
    day: 83, phaseId: 4, title: "Unsupervised Learning – Gaussian Mixture Models (GMM)",
    concept: "GMM, soft clustering, dan algoritma Expectation-Maximization (EM).",
    statConnection: "GMM adalah model campuran probabilistik — persis seperti distribusi campuran (finite mixture distribution) dalam statistika Bayesian.",
    resources: [
      { title: "Scikit-learn: Gaussian Mixture Models", url: "https://scikit-learn.org/stable/modules/mixture.html", type: "Docs" },
      { title: "Gaussian Mixture Models & EM Algorithm (StatQuest)", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU", type: "Video" }
    ],
    todos: ["Fit GMM dengan 3 komponen pada dataset Iris.", "Bandingkan hard labels K-Means vs soft probabilities GMM.", "Plot ellipses kovarians dari setiap komponen Gaussian."],
    codeSnippet: `from sklearn.mixture import GaussianMixture
from sklearn.datasets import load_iris
import numpy as np, matplotlib.pyplot as plt
X, y = load_iris(return_X_y=True)
gmm = GaussianMixture(n_components=3, covariance_type='full', random_state=42)
gmm.fit(X)
probs = gmm.predict_proba(X)     # soft assignment
labels = gmm.predict(X)          # hard assignment
print("Means shape:", gmm.means_.shape)
print("Akurasi hard assignment:", (labels == y).mean())  # tanpa label alignment
print("Sample probs (baris 0):", probs[0].round(3))`
  },
  {
    day: 84, phaseId: 4, title: "Unsupervised Learning – Principal Component Analysis (PCA)",
    concept: "Dekomposisi matriks kovarians, Explained Variance Ratio, dan reduksi dimensi linear.",
    statConnection: "PCA adalah teknik statistika multivariat klasik — identik dengan Analisis Komponen Utama di buku statistika.",
    resources: [
      { title: "MML Book Bab 10: PCA", url: "https://mml-book.github.io/book/mml-book.pdf", type: "Book" },
      { title: "Principal Component Analysis (PCA), Step-by-Step (StatQuest)", url: "https://www.youtube.com/watch?v=FgakZw6K1QQ", type: "Video" }
    ],
    todos: ["Implementasikan PCA dari nol (eigendecomposition kovarians).", "Plot explained variance ratio (scree plot).", "Visualisasikan dataset Iris dalam 2D setelah PCA."],
    codeSnippet: `from sklearn.decomposition import PCA
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt, numpy as np
X, y = load_iris(return_X_y=True)
X_std = StandardScaler().fit_transform(X)
pca = PCA().fit(X_std)
# Scree plot
plt.plot(range(1, 5), np.cumsum(pca.explained_variance_ratio_), marker='o')
plt.xlabel("Number of PCs"); plt.ylabel("Cumulative Explained Variance")
plt.title("Scree Plot"); plt.axhline(0.95, color='r', linestyle='--', label='95%')
plt.legend(); plt.show()
X_2d = PCA(n_components=2).fit_transform(X_std)
print("PC1 + PC2 variance:", pca.explained_variance_ratio_[:2].sum().round(3))`
  },

  // ─── TAHAP 5: DEEP LEARNING FUNDAMENTALS, LIBRARIES & ARCHITECTURES (HARI 85 – 106) ───
  {
    day: 85, phaseId: 5, title: "Deep Learning – NN Basics, Perceptron & MLP",
    concept: "Struktur neuron matematis, batas linear Perceptron, dan arsitektur Multi-layer Perceptrons (MLP).",
    statConnection: "MLP adalah generalisasi non-linear dari regresi logistik — tambahkan hidden layers untuk model yang lebih ekspresif.",
    resources: [
      { title: "Dive into Deep Learning (d2l.ai) Bab 5", url: "https://d2l.ai/chapter_multilayer-perceptrons/index.html", type: "Book" },
      { title: "But what is a neural network? (3Blue1Brown)", url: "https://www.youtube.com/watch?v=aircAruvnKk", type: "Video" }
    ],
    todos: ["Gambar arsitektur MLP 2-3-1 secara manual.", "Hitung forward pass MLP dari nol dengan NumPy.", "Fit MLPClassifier dari sklearn dan evaluasi."],
    codeSnippet: `import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_tr = scaler.fit_transform(X_tr); X_te = scaler.transform(X_te)
mlp = MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=500, random_state=42)
mlp.fit(X_tr, y_tr)
print(f"Accuracy: {mlp.score(X_te, y_te):.4f}")`
  },
  {
    day: 86, phaseId: 5, title: "Deep Learning – Activation Functions",
    concept: "Peran non-linearitas, perbandingan Sigmoid, Tanh, ReLU, Leaky ReLU, GELU, dan Softmax.",
    statConnection: "Tanpa fungsi aktivasi non-linear, jaringan dalam sebanyak apapun setara dengan regresi linear satu layer.",
    resources: [
      { title: "UDL Book Bab 3 & 4: Deep Networks", url: "https://udlbook.github.io/udlbook/", type: "Book" },
      { title: "Neural Networks Part 1 & Activation Functions (StatQuest)", url: "https://www.youtube.com/watch?v=CqOfi41LfDw", type: "Video" }
    ],
    todos: ["Plot semua fungsi aktivasi dalam satu figure.", "Jelaskan masalah vanishing gradient pada Sigmoid.", "Implementasikan ReLU dan Leaky ReLU dari nol."],
    codeSnippet: `import numpy as np, matplotlib.pyplot as plt
x = np.linspace(-5, 5, 200)
activations = {
    "Sigmoid": 1 / (1 + np.exp(-x)),
    "Tanh": np.tanh(x),
    "ReLU": np.maximum(0, x),
    "Leaky ReLU": np.where(x >= 0, x, 0.01 * x),
    "GELU": 0.5*x*(1 + np.tanh(np.sqrt(2/np.pi)*(x + 0.044715*x**3)))
}
fig, axes = plt.subplots(1, 5, figsize=(18, 4))
for ax, (name, y) in zip(axes, activations.items()):
    ax.plot(x, y); ax.set_title(name); ax.axhline(0, color='k', linewidth=0.5)
plt.tight_layout(); plt.show()`
  },
  {
    day: 87, phaseId: 5, title: "Deep Learning – Forward Propagation & Loss Functions",
    concept: "Aliran tensor Forward Pass serta fungsi objektif (MSE, Binary/Categorical Cross-Entropy).",
    statConnection: "Cross-entropy loss berasal dari teori informasi Shannon dan memaksimalkan log-likelihood — identik dengan MLE.",
    resources: [
      { title: "UDL Book Bab 5: Loss Functions", url: "https://udlbook.github.io/udlbook/", type: "Book" },
      { title: "Gradient Descent, How Neural Networks Learn (3Blue1Brown)", url: "https://www.youtube.com/watch?v=IHZwWFHWa-w", type: "Video" }
    ],
    todos: ["Implementasikan forward pass MLP 2 layer dengan NumPy.", "Hitung cross-entropy loss secara manual.", "Bandingkan MSE vs Cross-Entropy untuk klasifikasi."],
    codeSnippet: `import numpy as np
def relu(x): return np.maximum(0, x)
def softmax(x): e = np.exp(x - x.max(axis=-1, keepdims=True)); return e / e.sum(axis=-1, keepdims=True)
def cross_entropy(y_pred, y_true): return -np.log(y_pred[range(len(y_true)), y_true] + 1e-9).mean()
# Forward pass
np.random.seed(42)
X = np.random.randn(4, 3)  # 4 sampel, 3 fitur
W1, b1 = np.random.randn(3, 4), np.zeros(4)
W2, b2 = np.random.randn(4, 3), np.zeros(3)
h = relu(X @ W1 + b1)
out = softmax(h @ W2 + b2)
y_true = np.array([0, 1, 2, 0])
print("Loss:", cross_entropy(out, y_true))`
  },
  {
    day: 88, phaseId: 5, title: "Deep Learning – Backpropagation (Teori & Kalkulus)",
    concept: "Penurunan gradien lapis demi lapis dengan aturan rantai pada computational graph.",
    statConnection: "Backprop adalah chain rule kalkulus yang diterapkan secara efisien — bukan algoritma yang memerlukan intuisi khusus, hanya kalkulus.",
    resources: [
      { title: "d2l.ai Bab 5.3: Forward and Backprop", url: "https://d2l.ai/chapter_multilayer-perceptrons/backprop.html", type: "Book" },
      { title: "What is backpropagation? (3Blue1Brown)", url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U", type: "Video" }
    ],
    todos: ["Trace gradient secara manual untuk network 1 hidden layer.", "Gambar computational graph dan anotasi gradien di setiap edge.", "Verifikasi gradient numerik vs analitik."],
    codeSnippet: `import numpy as np
# Backprop manual untuk y = sigmoid(w*x + b), loss = (y - t)^2
def sigmoid(z): return 1 / (1 + np.exp(-z))
x, t = 2.0, 1.0
w, b = 0.5, 0.1
# Forward
z = w*x + b; y = sigmoid(z); loss = (y - t)**2
# Backward (chain rule)
dL_dy = 2*(y - t)
dy_dz = y * (1 - y)           # gradient sigmoid
dz_dw = x; dz_db = 1
dL_dw = dL_dy * dy_dz * dz_dw
dL_db = dL_dy * dy_dz * dz_db
print(f"Loss: {loss:.4f}, dL/dw: {dL_dw:.4f}, dL/db: {dL_db:.4f}")`
  },
  {
    day: 89, phaseId: 5, title: "Deep Learning – Backpropagation (From Scratch) & Optimizers",
    concept: "Implementasi mesin autograd dari nol serta cara kerja SGD with Momentum, RMSprop, dan AdamW.",
    statConnection: "Momentum dalam optimizer adalah analog exponential smoothing dari statistika deret waktu.",
    resources: [
      { title: "UDL Book Bab 6: Fitting Models", url: "https://udlbook.github.io/udlbook/", type: "Book" },
      { title: "Intro to Neural Networks and Backpropagation: micrograd (Andrej Karpathy)", url: "https://www.youtube.com/watch?v=VMj-3S1tku0", type: "Video" }
    ],
    todos: ["Tonton video micrograd Karpathy dan coba implementasinya.", "Bandingkan SGD vs Adam secara visual (loss curve).", "Jelaskan kapan Adam vs SGD+momentum lebih cocok."],
    codeSnippet: `import numpy as np
# Perbandingan SGD vs Adam (1D)
def f(w): return w**2 - 4*w + 4  # min di w=2
def df(w): return 2*w - 4
# SGD
w_sgd = 10.0
for _ in range(50): w_sgd -= 0.1 * df(w_sgd)
print(f"SGD: w={w_sgd:.4f}")
# Adam
w_adam, m, v, eps = 10.0, 0, 0, 1e-8
lr, b1, b2 = 0.5, 0.9, 0.999
for t in range(1, 51):
    g = df(w_adam)
    m = b1*m + (1-b1)*g; v = b2*v + (1-b2)*g**2
    m_hat = m/(1-b1**t); v_hat = v/(1-b2**t)
    w_adam -= lr * m_hat / (v_hat**0.5 + eps)
print(f"Adam: w={w_adam:.4f}")`
  },
  {
    day: 90, phaseId: 5, title: "PyTorch (1): Tensor & Autograd",
    concept: "Pembuatan torch.Tensor, akselerasi GPU/CUDA, dan diferensiasi otomatis dengan torch.autograd.",
    statConnection: "PyTorch autograd membangun computational graph secara dinamis — jauh lebih intuitif dari graph statis TensorFlow v1.",
    resources: [
      { title: "PyTorch Beginner Basics Tutorial", url: "https://pytorch.org/tutorials/beginner/basics/intro.html", type: "Docs" },
      { title: "PyTorch for Deep Learning Full Course (freeCodeCamp)", url: "https://www.youtube.com/watch?v=V_xro1bcAuA", type: "Video" }
    ],
    todos: ["Buat tensor dan pindahkan ke GPU (jika tersedia).", "Hitung gradient loss sederhana dengan autograd.", "Bandingkan operasi PyTorch tensor vs NumPy array."],
    codeSnippet: `import torch
# Tensor dasar
x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
y = (x**2).sum()  # y = x1² + x2² + x3²
y.backward()
print("Gradient x:", x.grad)  # dy/dx = 2x = [2, 4, 6]
# GPU check
device = "cuda" if torch.cuda.is_available() else "cpu"
print("Device:", device)
# Matrix multiply
A = torch.randn(3, 4, device=device)
B = torch.randn(4, 2, device=device)
C = A @ B
print("Shape A@B:", C.shape)`
  },
  {
    day: 91, phaseId: 5, title: "PyTorch (2): nn.Module, DataLoader & Training Loop",
    concept: "Konstruksi jaringan dengan nn.Module, Dataset, DataLoader, training loop, BatchNorm, dan Dropout.",
    statConnection: "Dropout adalah regularisasi probabilistik — secara teori setara dengan ensemble model dengan weight sharing.",
    resources: [
      { title: "Learn PyTorch Book (Gratis)", url: "https://www.learnpytorch.io/", type: "Book" },
      { title: "Building makemore Part 3: Activations, Gradients, BatchNorm (Andrej Karpathy)", url: "https://www.youtube.com/watch?v=P6sfmUTpUmc", type: "Video" }
    ],
    todos: ["Buat class MLP dengan nn.Module.", "Buat DataLoader dari TensorDataset.", "Tulis training loop lengkap dengan validation step."],
    codeSnippet: `import torch, torch.nn as nn
from torch.utils.data import TensorDataset, DataLoader
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler
X, y = load_breast_cancer(return_X_y=True)
X = StandardScaler().fit_transform(X)
X_t, y_t = torch.FloatTensor(X), torch.LongTensor(y)
loader = DataLoader(TensorDataset(X_t, y_t), batch_size=32, shuffle=True)
model = nn.Sequential(nn.Linear(30,64), nn.ReLU(), nn.Dropout(0.3), nn.Linear(64,32), nn.ReLU(), nn.Linear(32,2))
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
for epoch in range(5):
    for xb, yb in loader:
        opt.zero_grad()
        loss = nn.CrossEntropyLoss()(model(xb), yb)
        loss.backward(); opt.step()
    print(f"Epoch {epoch+1}: loss={loss.item():.4f}")`
  },
  {
    day: 92, phaseId: 5, title: "TensorFlow & Keras",
    concept: "Sequential API vs Functional API, model.compile(), model.fit(), dan penggunaan Callbacks.",
    statConnection: "Keras menyederhanakan pembangunan model — lebih mudah untuk prototyping awal sebelum pindah ke PyTorch.",
    resources: [
      { title: "Keras Getting Started Guides", url: "https://keras.io/getting_started/", type: "Docs" },
      { title: "TensorFlow 2.0 Complete Course (freeCodeCamp)", url: "https://www.youtube.com/watch?v=tPYj3fFJGjk", type: "Video" }
    ],
    todos: ["Buat model Sequential dan Functional API untuk problem yang sama.", "Gunakan EarlyStopping dan ModelCheckpoint callbacks.", "Bandingkan model yang sama di PyTorch vs Keras."],
    codeSnippet: `import tensorflow as tf
from tensorflow.keras.utils import to_categorical
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
X, y = load_iris(return_X_y=True)
X = StandardScaler().fit_transform(X); y = to_categorical(y)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(4,)),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(3, activation='softmax')
])
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
early_stop = tf.keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True)
model.fit(X_tr, y_tr, epochs=100, validation_split=0.1, callbacks=[early_stop], verbose=0)
print(f"Test accuracy: {model.evaluate(X_te, y_te, verbose=0)[1]:.4f}")`
  },
  {
    day: 93, phaseId: 5, title: "CNN – Konvolusi, Padding, Strides & Pooling",
    concept: "Cara kerja filter/kernel 2D, perhitungan dimensi feature map, serta Max/Average Pooling.",
    statConnection: "Operasi konvolusi adalah filtering spasial berbobot — analog dengan weighted moving average dalam analisis deret waktu.",
    resources: [
      { title: "d2l.ai Bab 7: Convolutional Networks", url: "https://d2l.ai/chapter_convolutional-neural-networks/index.html", type: "Book" },
      { title: "But what is a convolution? (3Blue1Brown)", url: "https://www.youtube.com/watch?v=KuXjwB4LzSA", type: "Video" }
    ],
    todos: ["Hitung dimensi output conv layer secara manual (rumus: (W-F+2P)/S + 1).", "Implementasikan edge detection dengan konvolusi manual.", "Fit CNN sederhana pada MNIST."],
    codeSnippet: `import torch, torch.nn as nn
# Dimensi output: (W - F + 2P) / S + 1
def conv_output(W, F, P, S): return (W - F + 2*P) // S + 1
print("Output size:", conv_output(28, 3, 1, 1))  # 28 (same padding)
# CNN sederhana
cnn = nn.Sequential(
    nn.Conv2d(1, 32, kernel_size=3, padding=1),
    nn.ReLU(),
    nn.MaxPool2d(2),
    nn.Conv2d(32, 64, kernel_size=3, padding=1),
    nn.ReLU(),
    nn.MaxPool2d(2),
    nn.Flatten(),
    nn.Linear(64*7*7, 10)
)
x = torch.randn(4, 1, 28, 28)  # batch=4, 1 channel, 28×28
print("Output shape:", cnn(x).shape)`
  },
  {
    day: 94, phaseId: 5, title: "Aplikasi CNN – Image Classification & Transfer Learning",
    concept: "Evolusi arsitektur LeNet, AlexNet, VGG, ResNet (skip/residual connections), dan Transfer Learning.",
    statConnection: "Transfer learning menggunakan distribusi pengetahuan dari domain besar ke kecil — analog dengan prior informative di Bayesian.",
    resources: [
      { title: "d2l.ai Bab 8: Modern CNNs", url: "https://d2l.ai/chapter_convolutional-modern/index.html", type: "Book" },
      { title: "Stanford CS231n: CNN Architectures", url: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv", type: "Video" }
    ],
    todos: ["Load pretrained ResNet18 dari torchvision.", "Freeze semua layer kecuali head dan fine-tune.", "Evaluasi performa transfer learning vs training dari nol."],
    codeSnippet: `import torch, torchvision.models as models
import torch.nn as nn
# Load pretrained ResNet18
model = models.resnet18(pretrained=True)
# Freeze feature extractor
for param in model.parameters():
    param.requires_grad = False
# Ganti head untuk 10 kelas
n_features = model.fc.in_features
model.fc = nn.Linear(n_features, 10)
# Hanya head yang trainable
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total = sum(p.numel() for p in model.parameters())
print(f"Trainable: {trainable:,} / {total:,} params")`
  },
  {
    day: 95, phaseId: 5, title: "Aplikasi CNN – Object Detection & Video Recognition",
    concept: "Deteksi objek (Bounding Boxes, IoU, Non-Max Suppression, keluarga R-CNN, dan YOLO).",
    statConnection: "IoU (Intersection over Union) adalah metrik kesamaan set — secara statistik analog dengan Jaccard coefficient.",
    resources: [
      { title: "d2l.ai Bab 14.3: Object Detection", url: "https://d2l.ai/chapter_computer-vision/index.html", type: "Book" },
      { title: "Stanford CS231n: Detection and Segmentation", url: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv", type: "Video" }
    ],
    todos: ["Implementasikan fungsi IoU dari nol.", "Implementasikan Non-Max Suppression.", "Coba YOLOv8 inference pada satu gambar."],
    codeSnippet: `import numpy as np
def iou(box1, box2):
    # box = [x1, y1, x2, y2]
    xi1, yi1 = max(box1[0], box2[0]), max(box1[1], box2[1])
    xi2, yi2 = min(box1[2], box2[2]), min(box1[3], box2[3])
    inter = max(0, xi2-xi1) * max(0, yi2-yi1)
    area1 = (box1[2]-box1[0]) * (box1[3]-box1[1])
    area2 = (box2[2]-box2[0]) * (box2[3]-box2[1])
    return inter / (area1 + area2 - inter)
b1 = [0, 0, 10, 10]; b2 = [5, 5, 15, 15]
print(f"IoU: {iou(b1, b2):.4f}")  # 25/175 ≈ 0.143`
  },
  {
    day: 96, phaseId: 5, title: "Aplikasi CNN – Image Segmentation",
    concept: "Semantic Segmentation (FCN, U-Net dengan transposed convolution) dan Instance Segmentation (Mask R-CNN).",
    statConnection: "Segmentasi mengklasifikasikan setiap piksel — pixel-wise classification dengan spatial structure preservation.",
    resources: [
      { title: "d2l.ai Bab 14.9: Semantic Segmentation", url: "https://d2l.ai/chapter_computer-vision/semantic-segmentation-and-dataset.html", type: "Book" },
      { title: "U-Net & Image Segmentation Explained (Aladdin Persson)", url: "https://www.youtube.com/watch?v=IHq1t7NxS8k", type: "Video" }
    ],
    todos: ["Pahami arsitektur U-Net encoder-decoder.", "Implementasikan ConvTranspose2d (transposed convolution).", "Jelaskan perbedaan Semantic vs Instance Segmentation."],
    codeSnippet: `import torch, torch.nn as nn
# Blok U-Net sederhana
class DoubleConv(nn.Module):
    def __init__(self, in_c, out_c):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_c, out_c, 3, padding=1), nn.BatchNorm2d(out_c), nn.ReLU(),
            nn.Conv2d(out_c, out_c, 3, padding=1), nn.BatchNorm2d(out_c), nn.ReLU())
    def forward(self, x): return self.conv(x)
# Transposed convolution (upsampling)
up = nn.ConvTranspose2d(64, 32, kernel_size=2, stride=2)
x = torch.randn(1, 64, 16, 16)
print("After ConvTranspose2d:", up(x).shape)  # (1, 32, 32, 32)`
  },
  {
    day: 97, phaseId: 5, title: "Recommendation Systems",
    concept: "Collaborative Filtering, Matrix Factorization, Content-Based Filtering, dan Neural Collaborative Filtering.",
    statConnection: "Matrix factorization adalah SVD yang diaplikasikan untuk user-item rating — reduksi dimensi untuk data sparse.",
    resources: [
      { title: "d2l.ai Bab 21: Recommender Systems", url: "https://d2l.ai/chapter_recommender-systems/index.html", type: "Book" },
      { title: "Recommender Systems – ML Specialization (Andrew Ng)", url: "https://www.youtube.com/playlist?list=PLkDaE6sCzn6FNC6YRfRQc_FbeQrF8BwGI", type: "Video" }
    ],
    todos: ["Implementasikan User-Based Collaborative Filtering dari nol.", "Terapkan Matrix Factorization sederhana dengan gradient descent.", "Bandingkan prediksi CF vs content-based untuk user yang sama."],
    codeSnippet: `import numpy as np
# Matrix Factorization sederhana
np.random.seed(42)
R = np.array([[5, 3, 0, 1], [4, 0, 4, 1], [1, 1, 0, 5], [1, 0, 0, 4]])
n_users, n_items, k = R.shape[0], R.shape[1], 2
P = np.random.rand(n_users, k); Q = np.random.rand(k, n_items)
lr, reg = 0.005, 0.02
for _ in range(2000):
    for i, j in zip(*R.nonzero()):
        err = R[i,j] - (P[i] @ Q[:,j])
        P[i] += lr * (2*err*Q[:,j] - reg*P[i])
        Q[:,j] += lr * (2*err*P[i] - reg*Q[:,j])
R_hat = P @ Q
print("R_hat[0,:]:", R_hat[0].round(2))`
  },
  {
    day: 98, phaseId: 5, title: "Recurrent Neural Networks – Vanilla RNN",
    concept: "Pemodelan data sekuensial/time-series, Backpropagation Through Time (BPTT), dan vanishing gradients.",
    statConnection: "RNN adalah model autoregresif neural — analog dengan model AR(p) dalam time-series statistik.",
    resources: [
      { title: "d2l.ai Bab 9: Recurrent Neural Networks", url: "https://d2l.ai/chapter_recurrent-neural-networks/index.html", type: "Book" },
      { title: "Recurrent Neural Networks (RNNs), Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=AsNTP8Kwu80", type: "Video" }
    ],
    todos: ["Implementasikan RNN cell dari nol.", "Fit nn.RNN pada masalah time-series sederhana.", "Demonstrasikan vanishing gradient secara empiris."],
    codeSnippet: `import torch, torch.nn as nn
# RNN untuk sequence classification
class SimpleRNN(nn.Module):
    def __init__(self, input_size, hidden_size, n_classes):
        super().__init__()
        self.rnn = nn.RNN(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, n_classes)
    def forward(self, x):
        _, h = self.rnn(x)  # h: (1, batch, hidden)
        return self.fc(h.squeeze(0))
model = SimpleRNN(input_size=10, hidden_size=32, n_classes=5)
x = torch.randn(8, 20, 10)  # batch=8, seq_len=20, input_size=10
print("Output shape:", model(x).shape)  # (8, 5)`
  },
  {
    day: 99, phaseId: 5, title: "RNN – LSTM & GRU",
    concept: "Mekanisme Forget, Input, Output Gates pada LSTM dan Reset/Update Gates pada GRU.",
    statConnection: "Gate mechanism di LSTM adalah cara cerdas mengatasi masalah vanishing gradient — memungkinkan ingatan jangka panjang.",
    resources: [
      { title: "Colah's Blog: Understanding LSTMs", url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/", type: "Blog" },
      { title: "Long Short-Term Memory (LSTM), Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=YCzL96nL7j0", type: "Video" }
    ],
    todos: ["Baca artikel Colah tentang LSTM secara detail.", "Bandingkan RNN vs LSTM vs GRU pada time-series panjang.", "Implementasikan LSTM bidirectional untuk sentiment."],
    codeSnippet: `import torch, torch.nn as nn
# Perbandingan RNN vs LSTM vs GRU
seq_len, batch, input_size, hidden = 50, 8, 10, 64
x = torch.randn(batch, seq_len, input_size)
for name, layer in [("RNN", nn.RNN), ("LSTM", nn.LSTM), ("GRU", nn.GRU)]:
    rnn = layer(input_size, hidden, batch_first=True)
    out, _ = rnn(x)
    print(f"{name} output shape: {out.shape}")  # (8, 50, 64)
# LSTM Bidirectional
bilstm = nn.LSTM(input_size, hidden, batch_first=True, bidirectional=True)
out, _ = bilstm(x)
print("BiLSTM output shape:", out.shape)  # (8, 50, 128)`
  },
  {
    day: 100, phaseId: 5, title: "Attention Mechanisms",
    concept: "Arsitektur Seq2Seq Encoder-Decoder dan mekanisme Bahdanau / Luong Attention untuk mengatasi bottleneck konteks.",
    statConnection: "Attention weight adalah distribusi probabilitas atas semua posisi input — seperti mixture weight yang bisa dipelajari.",
    resources: [
      { title: "d2l.ai Bab 11: Attention Mechanisms", url: "https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html", type: "Book" },
      { title: "Attention for Neural Networks, Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=PSs6nxngL6k", type: "Video" }
    ],
    todos: ["Implementasikan Bahdanau attention dari nol.", "Visualisasikan attention weights sebagai heatmap.", "Jelaskan perbedaan additive (Bahdanau) vs multiplicative (Luong) attention."],
    codeSnippet: `import torch, torch.nn as nn, torch.nn.functional as F
class BahdanauAttention(nn.Module):
    def __init__(self, enc_h, dec_h):
        super().__init__()
        self.W1 = nn.Linear(enc_h, dec_h)
        self.W2 = nn.Linear(dec_h, dec_h)
        self.v  = nn.Linear(dec_h, 1)
    def forward(self, encoder_out, decoder_hidden):
        # encoder_out: (batch, seq, enc_h)  decoder_hidden: (batch, dec_h)
        score = self.v(torch.tanh(self.W1(encoder_out) + self.W2(decoder_hidden.unsqueeze(1))))
        weights = F.softmax(score, dim=1)          # (batch, seq, 1)
        context = (weights * encoder_out).sum(1)   # (batch, enc_h)
        return context, weights`
  },
  {
    day: 101, phaseId: 5, title: "Transformers – Self-Attention & Multi-head Attention",
    concept: "Scaled Dot-Product Attention softmax(QK^T/√d_k)V, Multi-head Attention, dan Positional Encoding.",
    statConnection: "Setiap attention head belajar relasi statistik berbeda dalam sequence — seperti ensemble dari berbagai sudut pandang.",
    resources: [
      { title: "Jay Alammar: Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", type: "Blog" },
      { title: "Attention in Transformers, Visually Explained (3Blue1Brown)", url: "https://www.youtube.com/watch?v=eMlx5fFNoYc", type: "Video" }
    ],
    todos: ["Baca artikel Illustrated Transformer secara menyeluruh.", "Implementasikan Scaled Dot-Product Attention dengan PyTorch.", "Jelaskan mengapa attention dibagi √d_k."],
    codeSnippet: `import torch, torch.nn.functional as F, math
def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = Q @ K.transpose(-2, -1) / math.sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    weights = F.softmax(scores, dim=-1)
    return weights @ V, weights
# Test
batch, heads, seq, d_k = 2, 4, 10, 64
Q = torch.randn(batch, heads, seq, d_k)
K = torch.randn(batch, heads, seq, d_k)
V = torch.randn(batch, heads, seq, d_k)
out, w = scaled_dot_product_attention(Q, K, V)
print("Output:", out.shape, "| Weights:", w.shape)`
  },
  {
    day: 102, phaseId: 5, title: "Transformers – Implementasi End-to-End",
    concept: "Layer Normalization, Residual Connections, Feed-Forward Network, dan penulisan arsitektur Transformer di PyTorch.",
    statConnection: "Residual connection (skip connection) mencegah degradasi gradien — memungkinkan training model dengan ratusan layer.",
    resources: [
      { title: "UDL Book Bab 12: Transformers", url: "https://udlbook.github.io/udlbook/", type: "Book" },
      { title: "Let's build GPT: from scratch, in code, spelled out (Andrej Karpathy)", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "Video" }
    ],
    todos: ["Tonton video GPT from scratch Karpathy dan implementasikan.", "Tambahkan positional encoding ke embedding.", "Hitung jumlah parameter model Transformer kecil."],
    codeSnippet: `import torch, torch.nn as nn, math
class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.attn = nn.MultiheadAttention(d_model, n_heads, batch_first=True, dropout=dropout)
        self.ff = nn.Sequential(nn.Linear(d_model, d_ff), nn.ReLU(), nn.Linear(d_ff, d_model))
        self.ln1 = nn.LayerNorm(d_model); self.ln2 = nn.LayerNorm(d_model)
        self.drop = nn.Dropout(dropout)
    def forward(self, x):
        attn_out, _ = self.attn(x, x, x)
        x = self.ln1(x + self.drop(attn_out))  # residual + norm
        x = self.ln2(x + self.drop(self.ff(x)))
        return x
blk = TransformerBlock(d_model=256, n_heads=8, d_ff=1024)
x = torch.randn(4, 32, 256)  # batch=4, seq=32, d=256
print("Output:", blk(x).shape)`
  },
  {
    day: 103, phaseId: 5, title: "Autoencoders (Undercomplete & Denoising)",
    concept: "Arsitektur Encoder-Bottleneck-Decoder, kompresi non-linear pada latent space, dan deteksi anomali.",
    statConnection: "Autoencoder adalah PCA non-linear — bottleneck memaksa representasi terkompresi seperti principal components.",
    resources: [
      { title: "Deep Learning Book Bab 14: Autoencoders", url: "https://www.deeplearningbook.org/contents/autoencoders.html", type: "Book" },
      { title: "Autoencoders in PyTorch Explained (StatQuest)", url: "https://www.youtube.com/watch?v=zp8clK9yCro", type: "Video" }
    ],
    todos: ["Implementasikan autoencoder sederhana untuk MNIST.", "Visualisasikan rekonstruksi vs input asli.", "Gunakan reconstruction error untuk deteksi anomali."],
    codeSnippet: `import torch, torch.nn as nn
class Autoencoder(nn.Module):
    def __init__(self, input_dim=784, bottleneck=32):
        super().__init__()
        self.encoder = nn.Sequential(nn.Linear(input_dim,128), nn.ReLU(), nn.Linear(128, bottleneck))
        self.decoder = nn.Sequential(nn.Linear(bottleneck,128), nn.ReLU(), nn.Linear(128, input_dim), nn.Sigmoid())
    def forward(self, x): return self.decoder(self.encoder(x))
ae = Autoencoder()
x = torch.randn(16, 784)  # batch of flattened MNIST
x_hat = ae(x)
loss = nn.MSELoss()(x_hat, x)
print(f"Reconstruction loss: {loss.item():.4f}")
print(f"Encoder params: {sum(p.numel() for p in ae.encoder.parameters()):,}")`
  },
  {
    day: 104, phaseId: 5, title: "Variational Autoencoders (VAE)",
    concept: "Representasi laten probabilistik, Reparameterization Trick, dan fungsi objektif ELBO (Reconstruction + KL Divergence).",
    statConnection: "VAE memaksimalkan Evidence Lower BOund (ELBO) — kombinasi likelihood reconstruction dan KL divergence sebagai regularizer.",
    resources: [
      { title: "UDL Book Bab 17: VAEs", url: "https://udlbook.github.io/udlbook/", type: "Book" },
      { title: "Variational Autoencoders (VAE) Explained (Arxiv Insights)", url: "https://www.youtube.com/watch?v=9zKuYvjFFS8", type: "Video" }
    ],
    todos: ["Implementasikan VAE dengan reparameterization trick.", "Plot 2D latent space dengan warna per kelas.", "Sampling z dari prior dan generate gambar baru."],
    codeSnippet: `import torch, torch.nn as nn, torch.nn.functional as F
class VAE(nn.Module):
    def __init__(self, in_dim=784, z_dim=2):
        super().__init__()
        self.enc = nn.Sequential(nn.Linear(in_dim,256), nn.ReLU())
        self.mu  = nn.Linear(256, z_dim); self.logvar = nn.Linear(256, z_dim)
        self.dec = nn.Sequential(nn.Linear(z_dim,256), nn.ReLU(), nn.Linear(256, in_dim), nn.Sigmoid())
    def encode(self, x): h = self.enc(x); return self.mu(h), self.logvar(h)
    def reparameterize(self, mu, logvar): return mu + torch.randn_like(mu)*torch.exp(0.5*logvar)
    def forward(self, x):
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        return self.dec(z), mu, logvar
def vae_loss(x_hat, x, mu, logvar):
    recon = F.binary_cross_entropy(x_hat, x, reduction='sum')
    kl = -0.5 * torch.sum(1 + logvar - mu**2 - logvar.exp())
    return recon + kl`
  },
  {
    day: 105, phaseId: 5, title: "Generative Adversarial Networks (GANs – Dasar)",
    concept: "Permainan Minimax antara jaringan Generator dan Discriminator serta isu Mode Collapse.",
    statConnection: "GAN training adalah permainan dua pemain (game theory) — Generator meminimalkan dan Discriminator memaksimalkan fungsi yang sama.",
    resources: [
      { title: "UDL Book Bab 15: GANs", url: "https://udlbook.github.io/udlbook/", type: "Book" },
      { title: "GANs from Scratch in PyTorch (Aladdin Persson)", url: "https://www.youtube.com/watch?v=OljTVUVzPpM", type: "Video" }
    ],
    todos: ["Implementasikan GAN sederhana untuk generate distribusi Gaussian.", "Amati mode collapse dengan mencoba berbagai arsitektur kecil.", "Plot training curve Generator dan Discriminator secara bersamaan."],
    codeSnippet: `import torch, torch.nn as nn
# GAN minimal
z_dim = 16; data_dim = 2
G = nn.Sequential(nn.Linear(z_dim,32), nn.ReLU(), nn.Linear(32, data_dim))
D = nn.Sequential(nn.Linear(data_dim,32), nn.ReLU(), nn.Linear(32,1), nn.Sigmoid())
g_opt = torch.optim.Adam(G.parameters(), lr=1e-3)
d_opt = torch.optim.Adam(D.parameters(), lr=1e-3)
bce = nn.BCELoss()
for _ in range(200):
    # Real data (Gaussian)
    real = torch.randn(64, data_dim) + 2.0
    fake = G(torch.randn(64, z_dim)).detach()
    d_loss = bce(D(real), torch.ones(64,1)) + bce(D(fake), torch.zeros(64,1))
    d_opt.zero_grad(); d_loss.backward(); d_opt.step()
    g_loss = bce(D(G(torch.randn(64, z_dim))), torch.ones(64,1))
    g_opt.zero_grad(); g_loss.backward(); g_opt.step()
print(f"D loss: {d_loss:.3f}, G loss: {g_loss:.3f}")`
  },
  {
    day: 106, phaseId: 5, title: "GANs Lanjutan & Pengantar Diffusion Models",
    concept: "Arsitektur DCGAN, Wasserstein GAN (WGAN), dan perbandingan dengan Denoising Diffusion Models.",
    statConnection: "Diffusion model membalikkan proses difusi fisik (SDE) — menggunakan score function yang berakar dari statistika probabilistik.",
    resources: [
      { title: "UDL Book Bab 18: Diffusion Models", url: "https://udlbook.github.io/udlbook/", type: "Book" },
      { title: "But how do AI images and Diffusion Models work? (Welch Labs)", url: "https://www.youtube.com/watch?v=1CIpzeNxIhU", type: "Video" }
    ],
    todos: ["Implementasikan DCGAN dengan Conv layers.", "Baca makalah DDPM (Ho et al. 2020) secara overview.", "Bandingkan kelebihan Diffusion Models vs GANs."],
    codeSnippet: `import torch, torch.nn as nn
# DCGAN Generator blok
class DCGenerator(nn.Module):
    def __init__(self, z_dim=100, n_channels=1):
        super().__init__()
        self.net = nn.Sequential(
            nn.ConvTranspose2d(z_dim, 256, 4, 1, 0), nn.BatchNorm2d(256), nn.ReLU(),
            nn.ConvTranspose2d(256, 128, 4, 2, 1), nn.BatchNorm2d(128), nn.ReLU(),
            nn.ConvTranspose2d(128, 64, 4, 2, 1), nn.BatchNorm2d(64), nn.ReLU(),
            nn.ConvTranspose2d(64, n_channels, 4, 2, 1), nn.Tanh()
        )
    def forward(self, z): return self.net(z.view(z.size(0), -1, 1, 1))
G = DCGenerator()
z = torch.randn(4, 100)
print("Generated:", G(z).shape)  # (4, 1, 32, 32)`
  },

  // ─── TAHAP 6: NLP, RL, EXPLAINABLE AI & RELATED ROADMAPS (HARI 107 – 120) ───
  {
    day: 107, phaseId: 6, title: "NLP – Stemming & Lemmatization",
    concept: "Pembersihan korpus teks, Regex, Stopwords, Porter/Snowball Stemmer, dan Lemmatization dengan spaCy.",
    statConnection: "Preprocessing teks adalah normalisasi data kategorik yang paling kompleks — setiap kata adalah kategori.",
    resources: [
      { title: "SLP3 Book Bab 2: Text Normalization", url: "https://web.stanford.edu/~jurafsky/slp3/", type: "Book" },
      { title: "NLP Tutorial with Python and spaCy (freeCodeCamp)", url: "https://www.youtube.com/watch?v=dIUTsFT2MeQ", type: "Video" }
    ],
    todos: ["Terapkan regex untuk membersihkan teks dari karakter khusus.", "Bandingkan stemming vs lemmatization pada 10 kata.", "Build pipeline preprocessing teks yang reusable."],
    codeSnippet: `import re
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.corpus import stopwords
import nltk
nltk.download('stopwords', quiet=True); nltk.download('wordnet', quiet=True)
text = "The ML engineers are running and studying models!"
# Regex + lowercase
text = re.sub(r'[^a-zA-Z\\s]', '', text).lower()
words = text.split()
# Hapus stopwords
sw = set(stopwords.words('english'))
words = [w for w in words if w not in sw]
# Stemming vs Lemmatizing
ps = PorterStemmer(); lem = WordNetLemmatizer()
for w in words[:5]:
    print(f"{w:15} | stem: {ps.stem(w):12} | lemma: {lem.lemmatize(w)}")`
  },
  {
    day: 108, phaseId: 6, title: "NLP – Tokenization",
    concept: "Word/Character Tokenization hingga algoritma Subword Tokenization modern (BPE, WordPiece, SentencePiece).",
    statConnection: "Tokenization mendefinisikan unit analisis — pilihan granularitas (char/subword/word) mempengaruhi distribusi vocabulary.",
    resources: [
      { title: "Hugging Face NLP Course Bab 6: Tokenizers", url: "https://huggingface.co/learn/nlp-course/chapter6/1", type: "Course" },
      { title: "Let's build the GPT Tokenizer (Andrej Karpathy)", url: "https://www.youtube.com/watch?v=zduSFxRajkE", type: "Video" }
    ],
    todos: ["Bandingkan word tokenizer vs BPE tokenizer pada kalimat yang sama.", "Hitung ukuran vocabulary untuk setiap metode.", "Implementasikan BPE sederhana dari nol."],
    codeSnippet: `from transformers import AutoTokenizer
# BERT WordPiece tokenizer
bert_tok = AutoTokenizer.from_pretrained("bert-base-uncased")
text = "Machine learning engineers preprocess data."
tokens_bert = bert_tok.tokenize(text)
print("BERT tokens:", tokens_bert)
# GPT-2 BPE tokenizer
gpt_tok = AutoTokenizer.from_pretrained("gpt2")
tokens_gpt = gpt_tok.tokenize(text)
print("GPT-2 tokens:", tokens_gpt)
# Encode → IDs
ids = bert_tok.encode(text, return_tensors='pt')
print("Input IDs:", ids)`
  },
  {
    day: 109, phaseId: 6, title: "NLP – Word Embeddings",
    concept: "Dari Bag-of-Words & TF-IDF menuju representasi padat Word2Vec (Skip-gram & CBOW), GloVe, dan FastText.",
    statConnection: "TF-IDF adalah bobot statistik berbasis frekuensi dokumen; embedding adalah kompresi dimensi yang mempertahankan semantik.",
    resources: [
      { title: "SLP3 Book Bab 6: Vector Semantics", url: "https://web.stanford.edu/~jurafsky/slp3/", type: "Book" },
      { title: "Word Embedding and Word2Vec, Clearly Explained (StatQuest)", url: "https://www.youtube.com/watch?v=viZrOnJclY0", type: "Video" }
    ],
    todos: ["Buat TF-IDF matrix dari 5 kalimat.", "Load GloVe atau Word2Vec dan hitung cosine similarity.", "Visualisasikan embedding 2D dengan t-SNE."],
    codeSnippet: `from sklearn.feature_extraction.text import TfidfVectorizer
import gensim.downloader as api
import numpy as np
corpus = ["mesin belajar sangat kuat","deep learning bagian mesin belajar",
          "python digunakan untuk machine learning","neural network adalah deep learning"]
# TF-IDF
tfidf = TfidfVectorizer(); X_tfidf = tfidf.fit_transform(corpus).toarray()
print("TF-IDF shape:", X_tfidf.shape)
# Word2Vec pretrained (butuh download ±30MB)
# model = api.load("glove-wiki-gigaword-50")
# print("King - Man + Woman =", model.most_similar(positive=["king","woman"], negative=["man"], topn=1))
print("(Download GloVe untuk word arithmetic)")`
  },
  {
    day: 110, phaseId: 6, title: "NLP – Attention Models (1): Arsitektur BERT, GPT, T5",
    concept: "Perbandingan arsitektur Encoder-only (BERT), Decoder-only (GPT/LLaMA), dan Encoder-Decoder (T5/BART).",
    statConnection: "BERT menggunakan masked language modeling — seperti variabel laten dalam model probabilistik yang harus diinferensi.",
    resources: [
      { title: "Hugging Face NLP Course Bab 1", url: "https://huggingface.co/learn/nlp-course/chapter1/1", type: "Course" },
      { title: "Stanford CS224N: NLP with Deep Learning (Chris Manning)", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ", type: "Video" }
    ],
    todos: ["Gunakan HF pipeline untuk sentiment analysis dengan BERT.", "Bandingkan output BERT (bidirectional) vs GPT-2 (unidirectional).", "Jelaskan mengapa T5 cocok untuk seq2seq tasks."],
    codeSnippet: `from transformers import pipeline
# BERT untuk sentiment analysis
sentiment = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
texts = ["Machine learning is amazing!", "This model is really slow and disappointing."]
results = sentiment(texts)
for text, res in zip(texts, results):
    print(f"'{text[:30]}...' → {res['label']} ({res['score']:.4f})")
# Fill-mask (BERT: bidirectional)
filler = pipeline("fill-mask", model="bert-base-uncased")
print(filler("Machine [MASK] is the future.")[:2])`
  },
  {
    day: 111, phaseId: 6, title: "NLP – Attention Models (2): Fine-tuning & PEFT/LoRA",
    concept: "Praktik fine-tuning model pretrained dengan pustaka transformers, datasets, dan PEFT / LoRA.",
    statConnection: "Fine-tuning adalah transfer learning dalam NLP — adaptasi prior knowledge ke posterior target domain.",
    resources: [
      { title: "Hugging Face Course Bab 3: Fine-tuning", url: "https://huggingface.co/learn/nlp-course/chapter3/1", type: "Course" },
      { title: "Fine-Tuning LLMs with Hugging Face (Hugging Face Official)", url: "https://www.youtube.com/playlist?list=PLo2EIpI_JMQvWfQndUesu0nPBAtZ9gP1o", type: "Video" }
    ],
    todos: ["Fine-tune DistilBERT pada dataset IMDb.", "Coba LoRA dengan pustaka peft.", "Bandingkan parameter yang ditraining: full vs LoRA."],
    codeSnippet: `# Contoh setup fine-tuning dengan HuggingFace Trainer
from transformers import AutoModelForSequenceClassification, TrainingArguments, Trainer
from datasets import load_dataset
# Load model dan tokenizer
model_name = "distilbert-base-uncased"
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)
# Dataset (butuh koneksi internet)
# dataset = load_dataset("imdb")
# training_args = TrainingArguments(output_dir="./results", num_train_epochs=1, per_device_train_batch_size=16)
# trainer = Trainer(model=model, args=training_args, train_dataset=dataset["train"])
# trainer.train()
total_params = sum(p.numel() for p in model.parameters())
print(f"Total parameters: {total_params:,}")`
  },
  {
    day: 112, phaseId: 6, title: "Reinforcement Learning – Apa itu RL & MDP",
    concept: "Komponen Agent, Environment, State, Action, Reward, Markov Decision Process (MDP), dan persamaan Bellman.",
    statConnection: "Persamaan Bellman adalah dynamic programming — framework matematis yang sama dengan optimasi rekursif dalam statistika keputusan.",
    resources: [
      { title: "Sutton & Barto RL Book Bab 1–3", url: "http://incompleteideas.net/book/the-book-2nd.html", type: "Book" },
      { title: "David Silver RL Course Lecture 1 & 2 (DeepMind)", url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ", type: "Video" }
    ],
    todos: ["Formalisasikan masalah pacman sebagai MDP.", "Implementasikan environment GridWorld sederhana.", "Hitung Q-value untuk MDP kecil secara manual."],
    codeSnippet: `import gymnasium as gym
# Gymnasium (dulu OpenAI Gym): ekosistem standar RL
env = gym.make("CartPole-v1")
obs, info = env.reset()
print("Observation space:", env.observation_space)
print("Action space:", env.action_space)
total_reward = 0
for step in range(200):
    action = env.action_space.sample()  # random policy
    obs, reward, done, truncated, info = env.step(action)
    total_reward += reward
    if done or truncated: break
print(f"Episode reward: {total_reward} (steps: {step+1})")`
  },
  {
    day: 113, phaseId: 6, title: "Reinforcement Learning – Q-Learning",
    concept: "Temporal Difference (TD) Learning, eksplorasi ε-greedy, pembaruan tabel Q, dan latihan di Gymnasium.",
    statConnection: "TD learning adalah estimasi inkremental yang mengupdate nilai saat ini menggunakan bootstrap — analog dengan stochastic approximation.",
    resources: [
      { title: "Hugging Face Deep RL Course Unit 2", url: "https://huggingface.co/learn/deep-rl-course/unit2/introduction", type: "Course" },
      { title: "Reinforcement Learning Course: Q-Learning from Scratch (freeCodeCamp)", url: "https://www.youtube.com/watch?v=JgvyzIkgxF0", type: "Video" }
    ],
    todos: ["Implementasikan Q-Learning pada FrozenLake-v1.", "Plot reward per episode selama training.", "Eksperimen dengan berbagai nilai ε (0.1, 0.3, 0.5)."],
    codeSnippet: `import gymnasium as gym, numpy as np
env = gym.make("FrozenLake-v1", is_slippery=False)
Q = np.zeros((env.observation_space.n, env.action_space.n))
lr, gamma, eps = 0.8, 0.95, 0.1
rewards = []
for ep in range(500):
    s, _ = env.reset(); ep_r = 0
    for _ in range(100):
        a = env.action_space.sample() if np.random.rand() < eps else Q[s].argmax()
        s2, r, done, trunc, _ = env.step(a)
        Q[s,a] += lr * (r + gamma * Q[s2].max() - Q[s,a])
        s = s2; ep_r += r
        if done or trunc: break
    rewards.append(ep_r)
print(f"Avg reward (last 100): {np.mean(rewards[-100:]):.2f}")`
  },
  {
    day: 114, phaseId: 6, title: "Reinforcement Learning – Deep Q-Network (DQN)",
    concept: "Aproksimasi fungsi nilai-Q dengan jaringan saraf, Experience Replay Buffer, dan Fixed Q-Targets.",
    statConnection: "Experience Replay mengacak korelasi temporal dalam data — memastikan i.i.d. assumption yang dibutuhkan SGD.",
    resources: [
      { title: "Hugging Face Deep RL Course Unit 3", url: "https://huggingface.co/learn/deep-rl-course/unit3/introduction", type: "Course" },
      { title: "Deep Q-Learning (DQN) in PyTorch Tutorial (Phil Tabor)", url: "https://www.youtube.com/watch?v=wc-FxNENg9U", type: "Video" }
    ],
    todos: ["Implementasikan DQN dengan PyTorch untuk CartPole.", "Tambahkan Experience Replay Buffer.", "Bandingkan DQN vs Q-Table pada environment yang sama."],
    codeSnippet: `import torch, torch.nn as nn
from collections import deque
import random, numpy as np
class DQN(nn.Module):
    def __init__(self, s_dim, a_dim):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(s_dim,64), nn.ReLU(), nn.Linear(64,64), nn.ReLU(), nn.Linear(64, a_dim))
    def forward(self, x): return self.net(x)
class ReplayBuffer:
    def __init__(self, capacity=10000): self.buf = deque(maxlen=capacity)
    def push(self, *args): self.buf.append(args)
    def sample(self, batch):
        s, a, r, s2, d = zip(*random.sample(self.buf, batch))
        return (torch.FloatTensor(np.array(x)) for x in [s, a, r, s2, d])
    def __len__(self): return len(self.buf)
print("DQN dan ReplayBuffer siap digunakan!")`
  },
  {
    day: 115, phaseId: 6, title: "Reinforcement Learning – Policy Gradient",
    concept: "Optimasi parameter policy π_θ(a|s) secara langsung, teorema Policy Gradient, dan algoritma REINFORCE.",
    statConnection: "Policy gradient mengoptimalkan expected reward secara langsung — gradient dari expectation adalah inti score function estimator (REINFORCE).",
    resources: [
      { title: "Hugging Face Deep RL Course Unit 4", url: "https://huggingface.co/learn/deep-rl-course/unit4/introduction", type: "Course" },
      { title: "David Silver RL Course Lecture 7: Policy Gradient", url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ", type: "Video" }
    ],
    todos: ["Implementasikan REINFORCE untuk CartPole.", "Jelaskan masalah high variance pada REINFORCE.", "Tambahkan baseline untuk mengurangi variance."],
    codeSnippet: `import torch, torch.nn as nn
import gymnasium as gym, numpy as np
class PolicyNet(nn.Module):
    def __init__(self, s_dim, a_dim):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(s_dim,64), nn.ReLU(), nn.Linear(64, a_dim))
    def forward(self, x): return torch.distributions.Categorical(logits=self.net(x))
env = gym.make("CartPole-v1")
policy = PolicyNet(4, 2)
opt = torch.optim.Adam(policy.parameters(), lr=1e-3)
# REINFORCE step
obs, _ = env.reset()
log_probs, rewards = [], []
for _ in range(200):
    dist = policy(torch.FloatTensor(obs))
    action = dist.sample()
    log_probs.append(dist.log_prob(action))
    obs, r, done, _, _ = env.step(action.item()); rewards.append(r)
    if done: break
G = torch.FloatTensor(np.cumsum(rewards[::-1])[::-1].copy())
loss = -(torch.stack(log_probs) * G).mean()
opt.zero_grad(); loss.backward(); opt.step()
print(f"Episode return: {sum(rewards):.0f}")`
  },
  {
    day: 116, phaseId: 6, title: "Reinforcement Learning – Actor-Critic & PPO",
    concept: "Penggabungan Actor dan Critic, Advantage Function (A2C/A3C), serta PPO (Proximal Policy Optimization).",
    statConnection: "Advantage function A(s,a) = Q(s,a) - V(s) mengukur seberapa lebih baik suatu aksi dari rata-rata — estimator variance reduction.",
    resources: [
      { title: "Hugging Face Deep RL Course Unit 6 & 8", url: "https://huggingface.co/learn/deep-rl-course/unit6/introduction", type: "Course" },
      { title: "Proximal Policy Optimization (PPO) Explained (Arxiv Insights)", url: "https://www.youtube.com/watch?v=5P7I-xPq8u8", type: "Video" }
    ],
    todos: ["Implementasikan A2C dengan shared Actor-Critic network.", "Pahami clipping objective dalam PPO (clip ratio 0.2).", "Train PPO pada LunarLander menggunakan stable-baselines3."],
    codeSnippet: `# Training PPO via stable-baselines3 (cara tercepat)
# pip install stable-baselines3
from stable_baselines3 import PPO
import gymnasium as gym
env = gym.make("CartPole-v1")
model = PPO("MlpPolicy", env, verbose=0, n_steps=512, batch_size=64, learning_rate=3e-4)
model.learn(total_timesteps=50_000)
# Evaluasi
obs, _ = env.reset()
total_r = 0
for _ in range(500):
    action, _ = model.predict(obs, deterministic=True)
    obs, r, done, _, _ = env.step(action); total_r += r
    if done: break
print(f"Eval reward: {total_r}")`
  },
  {
    day: 117, phaseId: 6, title: "Advanced Concepts – Explainable AI (XAI)",
    concept: "Interpretasi model black-box menggunakan Permutation Importance, PDP, LIME, dan SHAP (Shapley Values).",
    statConnection: "Shapley Values berasal dari teori game kooperatif — distribusi kontribusi yang adil, sekarang diaplikasikan ke kontribusi fitur.",
    resources: [
      { title: "Interpretable ML Book (Gratis)", url: "https://christophm.github.io/interpretable-ml-book/", type: "Book" },
      { title: "SHAP Documentation", url: "https://shap.readthedocs.io/en/latest/", type: "Docs" },
      { title: "SHAP Values & Explainable AI Clearly Explained (ritvikmath)", url: "https://www.youtube.com/watch?v=VB9uV-x0gtg", type: "Video" }
    ],
    todos: ["Hitung SHAP values untuk Random Forest pada dataset kredit.", "Buat beeswarm plot dan waterfall plot SHAP.", "Gunakan LIME untuk interpretasi prediksi tunggal."],
    codeSnippet: `import shap
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42).fit(X_tr, y_tr)
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_te[:50])
print("SHAP values shape:", shap_values[0].shape)
# Plot (memerlukan display)
# shap.summary_plot(shap_values[1], X_te[:50], feature_names=load_breast_cancer().feature_names)
print("Top fitur:", load_breast_cancer().feature_names[abs(shap_values[1]).mean(0).argsort()[::-1][:3]])`
  },
  {
    day: 118, phaseId: 6, title: "Related Roadmaps – MLOps",
    concept: "Experiment Tracking (MLflow), pembungkusan API inferensi (FastAPI + Docker), CI/CD, dan pemantauan Data Drift.",
    statConnection: "Data drift adalah pergeseran distribusi data produksi dari distribusi training — masalah statistik yang perlu dipantau terus menerus.",
    resources: [
      { title: "Made With ML Course", url: "https://madewithml.com/", type: "Course" },
      { title: "MLOps Roadmap (roadmap.sh)", url: "https://roadmap.sh/mlops", type: "Web" },
      { title: "MLOps Zoomcamp Full Course (DataTalksClub)", url: "https://www.youtube.com/playlist?list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK", type: "Video" }
    ],
    todos: ["Setup MLflow tracking server lokal.", "Log experiment: parameters, metrics, artifacts.", "Serve model dengan FastAPI dan uji dengan curl."],
    codeSnippet: `import mlflow, mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
# MLflow tracking
mlflow.set_tracking_uri("./mlruns")
with mlflow.start_run(run_name="rf_iris"):
    params = {"n_estimators": 100, "max_depth": 5}
    mlflow.log_params(params)
    model = RandomForestClassifier(**params, random_state=42).fit(X_tr, y_tr)
    acc = model.score(X_te, y_te)
    mlflow.log_metric("accuracy", acc)
    mlflow.sklearn.log_model(model, "model")
    print(f"Logged: accuracy={acc:.4f}")
    print("Run ID:", mlflow.active_run().info.run_id)`
  },
  {
    day: 119, phaseId: 6, title: "Related Roadmaps – AI Engineer & AI Agents",
    concept: "Arsitektur RAG (Retrieval-Augmented Generation), Vector Databases, Tool Calling, dan orkestrasi AI Agents.",
    statConnection: "RAG menggabungkan dense retrieval (cosine similarity embedding) dengan generative model — statistika similarity dipakai di level embedding.",
    resources: [
      { title: "AI Agents Roadmap (roadmap.sh)", url: "https://roadmap.sh/ai-agents", type: "Web" },
      { title: "HuggingFace AI Cookbook", url: "https://huggingface.co/learn/cookbook/index", type: "Course" },
      { title: "Building AI Agents & RAG Systems From Scratch (freeCodeCamp)", url: "https://www.youtube.com/watch?v=sVcwVQRHIc8", type: "Video" }
    ],
    todos: ["Implementasikan RAG sederhana: embed dokumen + FAISS + generate.", "Pahami konsep tool calling dalam function calling API.", "Rancang desain agent sederhana dengan ReAct pattern."],
    codeSnippet: `# RAG minimal dengan sentence-transformers + FAISS
# pip install sentence-transformers faiss-cpu
from sentence_transformers import SentenceTransformer
import numpy as np
docs = [
    "Machine learning adalah cabang AI yang belajar dari data.",
    "Deep learning menggunakan neural network berlapis banyak.",
    "Reinforcement learning melatih agent melalui reward.",
    "NLP memproses bahasa alami manusia."
]
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(docs)
print("Embeddings shape:", embeddings.shape)
# Retrieve: cari dokumen paling relevan dengan cosine similarity
query = "Apa itu neural network?"
q_emb = model.encode([query])
sims = (embeddings @ q_emb.T).flatten()
best = sims.argmax()
print(f"Dokumen paling relevan: '{docs[best]}' (sim={sims[best]:.3f})")`
  },
  {
    day: 120, phaseId: 6, title: "Related Roadmaps – AI & Data Scientist + Capstone",
    concept: "Desain eksperimen produksi (A/B Testing), Causal Inference, dan publikasi proyek end-to-end ke GitHub.",
    statConnection: "A/B testing adalah eksperimen terkontrol (controlled trial) — ini adalah lingkaran penuh: dari Statistika Dasar kembali ke ML Produksi!",
    resources: [
      { title: "AI & Data Scientist Roadmap (roadmap.sh)", url: "https://roadmap.sh/ai-data-scientist", type: "Web" },
      { title: "End-to-End Machine Learning Project Deployment (Krish Naik)", url: "https://www.youtube.com/watch?v=Rv6UFGNmNZg", type: "Video" }
    ],
    todos: ["Buat README profesional untuk proyek capstone.", "Tulis section: Latar Belakang, Method, Results, Conclusion.", "Push seluruh proyek ke GitHub dan buat demo sederhana."],
    codeSnippet: `# A/B Testing sederhana
import numpy as np
from scipy import stats
np.random.seed(42)
# Model A (baseline) vs Model B (baru)
n = 1000
ctr_a = np.random.binomial(1, 0.10, n)  # 10% CTR
ctr_b = np.random.binomial(1, 0.12, n)  # 12% CTR
t_stat, p_val = stats.ttest_ind(ctr_a, ctr_b)
print(f"Model A CTR: {ctr_a.mean():.4f}")
print(f"Model B CTR: {ctr_b.mean():.4f}")
print(f"p-value: {p_val:.4f}")
print("Signifikan?" , "YA" if p_val < 0.05 else "TIDAK")
print()
print("SELAMAT! 120 Hari belajar ML Engineering selesai!")
print("Saatnya deploy model ke produksi dan bangun portofoliomu!")`
  }
];

// Pertahankan link Playlist asli di tab Materi sekaligus aktifkan pemutar video utama
(function () {
  const FIRST_VIDEO_IN_PLAYLIST = {
    10:  "ZK3O402wf1c", // MIT 18.06 Gilbert Strang
    11:  "mBcLRGuAFUk", // SVD (MIT OCW)
    13:  "WUvTyaaNkzM", // Calculus (3Blue1Brown)
    16:  "TrcCbdWwCBc", // Multivariable & Jacobian
    17:  "TrcCbdWwCBc", // Hessian & Second Derivatives
    22:  "oRvgq966yZg", // Probability Distributions (StatQuest)
    26:  "L3LMbpZIKhQ", // MIT 6.042J Discrete Math
    35:  "H2SQrZK2nvM", // Python OOP (Corey Schafer)
    38:  "ZyhVh-qRZPA", // Pandas Tutorial (Corey Schafer)
    41:  "UO98lJQ3QGI", // Matplotlib Tutorial (Corey Schafer)
    52:  "P_iMSYQnqac", // Handling Missing Values (Krish Naik)
    54:  "bqhQ2LWBheQ", // Feature Scaling (Krish Naik)
    55:  "bA6mYC1a_Eg", // Categorical Encoding (Krish Naik)
    57:  "uMlU2JaiOd8", // Feature Selection Filter (Krish Naik)
    58:  "EqLBAmtKMnQ", // Feature Selection Wrapper (Krish Naik)
    60:  "gd-TZut-oto", // Scikit-Learn Pipelines (Data School)
    61:  "Gv9_4yMHFhI", // ML Fundamentals (StatQuest)
    72:  "Q81RR3yKn30", // Polynomial & Regularization (StatQuest)
    83:  "LMZZPneTcP4", // Stanford CS229 GMM & EM
    94:  "CNNnzl8HIIU", // CNN Architectures
    95:  "bNb2fEVKeEo", // Detection & Segmentation
    97:  "vStJoetOxJg", // Recommender Systems (Andrew Ng)
    110: "DzpHeXVSC5I", // Stanford CS224N NLP
    111: "QEaBAZQCtwE", // Hugging Face Fine-Tuning
    112: "2pWv7GOvuf0", // David Silver RL Course Lecture 1
    115: "zR11FLZ-O9M", // David Silver RL Course Lecture 7 (Policy Gradient)
    118: "r94QjpX9vSE"  // MLOps Zoomcamp
  };

  DAILY_TASKS.forEach(task => {
    const vidId = FIRST_VIDEO_IN_PLAYLIST[task.day];
    if (!vidId || !Array.isArray(task.resources)) return;

    const vidObj = task.resources.find(r => r.type === "Video" && r.url.includes("list=") && !r.url.includes("watch?v="));
    if (vidObj) {
      const playlistUrl = vidObj.url;
      const listMatch = playlistUrl.match(/[?&]list=([^&]+)/);
      const listParam = listMatch ? `&list=${listMatch[1]}` : "";

      // 1. Ubah URL Video agar dikenali player namun tetap membawa parameter &list=
      vidObj.url = `https://www.youtube.com/watch?v=${vidId}${listParam}`;

      // 2. Simpan link Playlist murni ke dalam resources agar tidak hilang di tab Materi
      task.resources.push({
        title: vidObj.title + " (Full Playlist)",
        url: playlistUrl,
        type: "Playlist"
      });
    }
  });
})();

// Fase dibangun dari data supaya rentang hari selalu cocok dengan DAILY_TASKS.
(function () {
  const NAMES = [
    "Orientasi & Fondasi Matematika",
    "Programming Fundamentals, Python & Libraries",
    "Data Collection, Formats & Data Cleaning",
    "Core ML Workflow, Evaluation & Algoritma ML",
    "Deep Learning Fundamentals, Libraries & Arsitektur",
    "NLP, Reinforcement Learning, XAI & Roadmaps Terkait"
  ];
  ROADMAP_METADATA.title = 'ML Engineering Roadmap (' + DAILY_TASKS.length + ' Hari)';
  ROADMAP_METADATA.phases = NAMES.map((name, i) => {
    const ds = DAILY_TASKS.filter(t => t.phaseId === i + 1).map(t => t.day);
    return { id: i + 1, name, icon: '', color: 'var(--accent)', days: 'Hari ' + Math.min(...ds) + '–' + Math.max(...ds) };
  });
})();

// Migrasi sekali jalan: dari kurikulum lama (95 hari) ke kurikulum baru (120 hari).
// Progres per-hari lama disimpan di S.legacy, streak dan tanggal mulai dipertahankan.
(function () {
  const VER = '3';
  try {
    if (localStorage.getItem('ml_cur_ver') === VER) return;
    const S = JSON.parse(localStorage.getItem('ml_daily_v1') || 'null');
    if (S && (S.checks || S.notes)) {
      const had = Object.keys(S.checks || {}).length || Object.keys(S.notes || {}).length;
      if (had) {
        let chat = null;
        try { chat = JSON.parse(localStorage.getItem('ml_ai_chat') || 'null'); } catch (e) { /* abaikan */ }
        S.legacy = Object.assign(S.legacy || {}, { savedAt: new Date().toISOString(), checks: S.checks, doneOn: S.doneOn, notes: S.notes, qa: S.qa, quiz: S.quiz, chat });
      }
      S.checks = {}; S.doneOn = {}; S.notes = {}; S.qa = {}; S.quiz = {};
      localStorage.setItem('ml_daily_v1', JSON.stringify(S));
    }
    localStorage.setItem('ml_ai_chat', '{}');
    localStorage.setItem('ml_yt_cache', '{}');
    localStorage.setItem('ml_cur_ver', VER);
  } catch (e) { /* tanpa localStorage: lewati */ }
})();