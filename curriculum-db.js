// ============================================================
// ML ENGINEER LEARNING HUB — CURRICULUM DATABASE
// Berdasarkan roadmap & kurikulum bootcamp gambar 1–3
// ============================================================

const CURRICULUM = [
  // ─── 1. MATH & STATISTICS ────────────────────────────────
  {
    id: "math-stats",
    title: "Math & Statistics",
    icon: "📐",
    color: "#6C5CE7",
    week: "Minggu 1–2",
    description: "Fondasi matematika untuk ML: aljabar linear, probabilitas, dan statistik inferensial.",
    resources: [
      { name: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.youtube.com/watch?v=fNk_zzaMoSs", type: "video" },
      { name: "StatQuest Video Index", url: "https://statquest.org/video_index.html", type: "video" },
      { name: "ISLP — An Introduction to Statistical Learning (Python)", url: "https://www.statlearning.com/resources-python", type: "book" },
      { name: "Khan Academy — Linear Algebra", url: "https://www.khanacademy.org/math/linear-algebra", type: "course" },
      { name: "Khan Academy — Statistics & Probability", url: "https://www.khanacademy.org/math/statistics-probability", type: "course" }
    ],
    subtopics: [
      {
        id: "linear-algebra",
        title: "Linear Algebra",
        items: ["Vektor & operasi vektor", "Matriks & operasi matriks", "Eigenvalues & eigenvectors", "Dekomposisi SVD", "Aplikasi di ML (PCA, transformasi data)"]
      },
      {
        id: "probability",
        title: "Probability",
        items: ["Probabilitas dasar & aturan Bayes", "Distribusi diskrit (Bernoulli, Binomial, Poisson)", "Distribusi kontinu (Normal, Eksponensial)", "Conditional probability", "Maximum Likelihood Estimation (MLE)"]
      },
      {
        id: "statistics",
        title: "Statistics",
        items: ["Statistik deskriptif (mean, median, std)", "Hypothesis testing (t-test, chi-square)", "Confidence intervals", "Correlation & covariance", "A/B testing basics"]
      }
    ],
    prompts: [
      "Jelaskan konsep eigenvalue & eigenvector dengan analogi dunia nyata, lalu tunjukkan kode NumPy untuk menghitungnya.",
      "Berikan intuisi Teorema Bayes dengan contoh kasus fraud detection, lengkap rumus dan kode Python.",
      "Jelaskan perbedaan Type I & Type II error dalam konteks model ML, dengan contoh skenario industri.",
      "Buatkan ringkasan cheatsheet formula statistik yang paling sering dipakai di ML."
    ]
  },

  // ─── 2. DATA & VISUALIZATION ─────────────────────────────
  {
    id: "data-viz",
    title: "Data & Visualization",
    icon: "📊",
    color: "#00B894",
    week: "Minggu 3–5",
    description: "Python, NumPy, Pandas, SQL, dan teknik visualisasi data profesional.",
    resources: [
      { name: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/index.html", type: "docs" },
      { name: "NumPy User Guide", url: "https://numpy.org/doc/stable/user/", type: "docs" },
      { name: "Pandas User Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html", type: "docs" },
      { name: "PostgreSQL Tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html", type: "docs" },
      { name: "SQLBolt — Interactive SQL Lessons", url: "https://sqlbolt.com/", type: "course" },
      { name: "Matplotlib Quick Start", url: "https://matplotlib.org/stable/users/explain/quick_start.html", type: "docs" },
      { name: "Seaborn Tutorial", url: "https://seaborn.pydata.org/tutorial.html", type: "docs" }
    ],
    subtopics: [
      {
        id: "python-fundamentals",
        title: "Python Fundamentals",
        items: ["Data types & structures", "Functions & OOP", "List comprehension & generators", "File I/O & exception handling", "Virtual environments & pip"]
      },
      {
        id: "numpy-pandas",
        title: "NumPy & Pandas",
        items: ["Array creation & indexing (NumPy)", "Broadcasting & vectorization", "DataFrame creation & manipulation", "GroupBy, merge, join, pivot", "Handling missing data & dtypes"]
      },
      {
        id: "sql-databases",
        title: "SQL & Databases",
        items: ["SELECT, WHERE, JOIN, GROUP BY", "Subqueries & window functions", "Indexing & query optimization", "PostgreSQL vs SQLite", "Connecting Python ke database"]
      },
      {
        id: "visualization",
        title: "Matplotlib & Seaborn",
        items: ["Line, bar, scatter, histogram", "Customizing plots (labels, colors, styles)", "Seaborn statistical plots", "Heatmaps & pair plots", "Dashboard sederhana dengan subplots"]
      }
    ],
    prompts: [
      "Buatkan tutorial lengkap Pandas: dari read_csv hingga analisis EDA lengkap dengan kode dan penjelasan setiap langkah.",
      "Jelaskan SQL JOIN (INNER, LEFT, RIGHT, FULL) dengan analogi dan contoh query nyata untuk dataset e-commerce.",
      "Buatkan kode Python end-to-end untuk membuat dashboard visualisasi dengan Matplotlib & Seaborn dari dataset CSV.",
      "Berikan 20 trik Pandas yang sering dipakai data scientist profesional, lengkap dengan kode."
    ]
  },

  // ─── 3. CORE ML & TOOLS ──────────────────────────────────
  {
    id: "core-ml",
    title: "Core ML & Tools",
    icon: "⚙️",
    color: "#0984E3",
    week: "Minggu 6–8",
    description: "Algoritma ML klasik, Scikit-Learn, dan tools pengembangan (Jupyter, Git, Colab).",
    resources: [
      { name: "Scikit-Learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html", type: "docs" },
      { name: "JupyterLab Documentation", url: "https://jupyterlab.readthedocs.io/en/latest/user/index.html", type: "docs" },
      { name: "Google Colab", url: "https://colab.research.google.com/", type: "tool" },
      { name: "Pro Git Book", url: "https://git-scm.com/book/en/v2", type: "book" },
      { name: "ISLP — Statistical Learning", url: "https://www.statlearning.com/resources-python", type: "book" }
    ],
    subtopics: [
      {
        id: "supervised-learning",
        title: "Supervised Learning",
        items: ["Linear Regression & polynomial features", "Logistic Regression & decision boundary", "Decision Trees & Random Forest", "Gradient Boosting (XGBoost, LightGBM)", "SVM (Support Vector Machines)", "Model evaluation: accuracy, precision, recall, F1, AUC-ROC"]
      },
      {
        id: "unsupervised-learning",
        title: "Unsupervised Learning",
        items: ["K-Means Clustering", "Hierarchical Clustering", "DBSCAN", "PCA (Principal Component Analysis)", "t-SNE & UMAP untuk visualisasi"]
      },
      {
        id: "ml-workflow",
        title: "ML Workflow & Best Practices",
        items: ["Train/validation/test split", "Cross-validation (k-fold, stratified)", "Hyperparameter tuning (GridSearch, RandomSearch, Optuna)", "Feature engineering & selection", "Pipeline dengan Scikit-Learn"]
      },
      {
        id: "dev-tools",
        title: "Development Tools",
        items: ["JupyterLab & Jupyter Notebook", "Google Colab (GPU gratis)", "Git basics (commit, branch, merge)", "GitHub workflow", "Virtual environments (venv, conda)"]
      }
    ],
    prompts: [
      "Jelaskan perbedaan Random Forest vs XGBoost dengan intuisi, kapan pakai masing-masing, dan kode perbandingan Scikit-Learn.",
      "Buatkan pipeline ML lengkap di Scikit-Learn: preprocessing → feature engineering → model training → evaluation.",
      "Jelaskan cross-validation dan hyperparameter tuning dengan Optuna, lengkap kode dan best practices industri.",
      "Berikan panduan Git workflow untuk proyek ML: branching strategy, .gitignore untuk ML, dan tips kolaborasi."
    ]
  },

  // ─── 4. DEEP LEARNING ────────────────────────────────────
  {
    id: "deep-learning",
    title: "Deep Learning",
    icon: "🧬",
    color: "#E17055",
    week: "Minggu 9–11",
    description: "Neural networks, CNN, Transformers, dan framework DL (PyTorch, Keras, TensorFlow).",
    resources: [
      { name: "Dive into Deep Learning (d2l.ai)", url: "https://d2l.ai/", type: "book" },
      { name: "PyTorch — Learn the Basics", url: "https://docs.pytorch.org/tutorials/beginner/basics/intro.html", type: "docs" },
      { name: "Keras Getting Started", url: "https://keras.io/getting_started/", type: "docs" },
      { name: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials", type: "docs" },
      { name: "3Blue1Brown — Neural Networks", url: "https://www.youtube.com/watch?v=aircAruvnKk", type: "video" }
    ],
    subtopics: [
      {
        id: "neural-networks",
        title: "Neural Networks Fundamentals",
        items: ["Perceptron & activation functions", "Feedforward neural network", "Backpropagation & chain rule", "Loss functions (MSE, Cross-Entropy)", "Optimizers (SGD, Adam, AdamW)", "Regularization (dropout, batch norm, L2)"]
      },
      {
        id: "cnn",
        title: "Convolutional Neural Networks (CNN)",
        items: ["Convolution operation & filters", "Pooling layers", "Arsitektur klasik (LeNet, VGG, ResNet)", "Transfer learning & fine-tuning", "Image classification project"]
      },
      {
        id: "transformers",
        title: "Transformers & Attention",
        items: ["Self-attention mechanism", "Multi-head attention", "Positional encoding", "Encoder-decoder architecture", "BERT, GPT overview", "Vision Transformers (ViT)"]
      },
      {
        id: "dl-frameworks",
        title: "Frameworks & Practice",
        items: ["PyTorch: tensors, autograd, nn.Module", "Training loop patterns", "Keras/TensorFlow: Sequential & Functional API", "Data loaders & augmentation", "GPU training & mixed precision"]
      }
    ],
    prompts: [
      "Jelaskan backpropagation dari nol dengan penurunan matematika langkah demi langkah, lalu implementasikan neural network sederhana dengan NumPy.",
      "Buatkan tutorial CNN lengkap dengan PyTorch untuk klasifikasi gambar, dari data loading hingga evaluasi.",
      "Jelaskan mekanisme Self-Attention di Transformer dengan visualisasi step-by-step dan kode PyTorch.",
      "Bandingkan PyTorch vs TensorFlow/Keras: kapan pakai mana, kelebihan kekurangan, dan contoh kode yang sama di kedua framework."
    ]
  },

  // ─── 5. LLMs & GENERATIVE AI ─────────────────────────────
  {
    id: "llm-genai",
    title: "LLMs & Generative AI",
    icon: "🤖",
    color: "#A29BFE",
    week: "Minggu 12–13",
    description: "Large Language Models, Hugging Face, fine-tuning, dan RAG (Retrieval-Augmented Generation).",
    resources: [
      { name: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course/en/chapter1/1", type: "course" },
      { name: "Hugging Face Documentation", url: "https://huggingface.co/docs", type: "docs" },
      { name: "LlamaIndex RAG Guide", url: "https://developers.llamaindex.ai/python/framework/understanding/rag/", type: "docs" },
      { name: "OpenAI Cookbook", url: "https://cookbook.openai.com/", type: "docs" },
      { name: "LangChain Documentation", url: "https://python.langchain.com/docs/introduction/", type: "docs" }
    ],
    subtopics: [
      {
        id: "llm-fundamentals",
        title: "LLM Fundamentals",
        items: ["Tokenization (BPE, WordPiece, SentencePiece)", "Pre-training & causal language modeling", "Instruction tuning & RLHF", "Scaling laws & emergent abilities", "Open-source vs proprietary models"]
      },
      {
        id: "huggingface",
        title: "Hugging Face Ecosystem",
        items: ["Transformers library", "Pipeline API untuk inference", "Model Hub & tokenizers", "Datasets library", "Trainer API & PEFT"]
      },
      {
        id: "fine-tuning",
        title: "Fine-Tuning LLMs",
        items: ["Full fine-tuning vs parameter-efficient", "LoRA & QLoRA", "Dataset preparation untuk fine-tuning", "Evaluation metrics (perplexity, BLEU, ROUGE)", "Deployment model fine-tuned"]
      },
      {
        id: "rag",
        title: "RAG (Retrieval-Augmented Generation)",
        items: ["Embedding models & vector databases", "Chunking strategies", "Retrieval pipeline (dense & sparse)", "LlamaIndex & LangChain", "Evaluating RAG systems"]
      }
    ],
    prompts: [
      "Jelaskan arsitektur LLM modern dari tokenisasi hingga generation, lengkap diagram dan kode Hugging Face.",
      "Buatkan tutorial fine-tuning model LLM dengan LoRA menggunakan Hugging Face PEFT, step-by-step dengan kode.",
      "Jelaskan RAG dari A-Z: konsep, arsitektur, implementasi dengan LlamaIndex, dan tips optimasi.",
      "Bandingkan pendekatan fine-tuning vs RAG vs prompt engineering: kapan pakai masing-masing dengan decision tree."
    ]
  },

  // ─── 6. MLOps & DEPLOYMENT ────────────────────────────────
  {
    id: "mlops",
    title: "MLOps & Deployment",
    icon: "🚢",
    color: "#FDCB6E",
    week: "Minggu 14–15",
    description: "MLflow, Docker, FastAPI, Kubernetes, monitoring, dan Google Cloud deployment.",
    resources: [
      { name: "MLflow Tracking Quickstart", url: "https://mlflow.org/docs/latest/ml/tracking/quickstart/", type: "docs" },
      { name: "FastAPI Tutorial", url: "https://fastapi.tiangolo.com/tutorial/", type: "docs" },
      { name: "Docker Get Started", url: "https://docs.docker.com/get-started/", type: "docs" },
      { name: "Kubernetes Basics Tutorial", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", type: "docs" },
      { name: "Prometheus Getting Started", url: "https://prometheus.io/docs/prometheus/latest/getting_started/", type: "docs" },
      { name: "Google Cloud Vertex AI SDK", url: "https://docs.cloud.google.com/python/docs/reference/aiplatform/latest", type: "docs" }
    ],
    subtopics: [
      {
        id: "experiment-tracking",
        title: "Experiment Tracking",
        items: ["MLflow: tracking, projects, models", "Logging parameters, metrics, artifacts", "Model registry & versioning", "Experiment comparison", "Weights & Biases (alternatif)"]
      },
      {
        id: "model-serving",
        title: "Model Serving & APIs",
        items: ["FastAPI untuk ML endpoints", "Request/response schema (Pydantic)", "Batch vs real-time inference", "Model serialization (pickle, ONNX, TorchScript)", "Load testing & latency optimization"]
      },
      {
        id: "containerization",
        title: "Docker & Kubernetes",
        items: ["Dockerfile untuk ML apps", "Docker Compose multi-container", "Container registry (GCR, Docker Hub)", "Kubernetes pods, deployments, services", "Scaling & auto-scaling ML services"]
      },
      {
        id: "monitoring",
        title: "Monitoring & CI/CD",
        items: ["Data drift detection", "Model performance monitoring", "Prometheus + Grafana dashboards", "CI/CD pipeline untuk ML (GitHub Actions)", "Google Cloud deployment (Vertex AI)"]
      }
    ],
    prompts: [
      "Buatkan panduan lengkap deploy model ML dengan FastAPI + Docker, dari kode hingga docker-compose.yml.",
      "Jelaskan MLflow tracking lengkap: setup, logging experiment, model registry, dan best practices.",
      "Buatkan tutorial Kubernetes untuk ML: deploy model ke cluster dengan auto-scaling, step-by-step.",
      "Jelaskan monitoring model di production: data drift, performance degradation, dan alert system."
    ]
  },

  // ─── 7. FRAUD DETECTION PROJECT ───────────────────────────
  {
    id: "fraud-detection",
    title: "Proyek: Fraud Detection",
    icon: "🔍",
    color: "#E84393",
    week: "Minggu 16",
    description: "Capstone project: sistem deteksi fraud end-to-end dengan imbalanced data, SMOTE, dan deployment.",
    resources: [
      { name: "ULB Credit Card Fraud Detection (Kaggle)", url: "https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud", type: "dataset" },
      { name: "IEEE-CIS Fraud Detection Competition", url: "https://www.kaggle.com/competitions/ieee-fraud-detection", type: "dataset" },
      { name: "UCI ML Repository", url: "https://archive.ics.uci.edu/", type: "dataset" },
      { name: "Imbalanced-Learn User Guide", url: "https://imbalanced-learn.org/stable/user_guide.html", type: "docs" }
    ],
    subtopics: [
      {
        id: "fraud-eda",
        title: "EDA & Data Understanding",
        items: ["Analisis distribusi kelas (fraud vs legitimate)", "Visualisasi pola transaksi", "Feature analysis & correlation", "Temporal patterns dalam fraud", "Data quality assessment"]
      },
      {
        id: "imbalanced-data",
        title: "Handling Imbalanced Data",
        items: ["SMOTE (Synthetic Minority Oversampling)", "ADASYN & BorderlineSMOTE", "Random undersampling & Tomek links", "Class weights & cost-sensitive learning", "Evaluation metrics: PR-AUC, F1, MCC"]
      },
      {
        id: "fraud-modeling",
        title: "Modeling & Evaluation",
        items: ["Baseline model (Logistic Regression)", "Ensemble methods (Random Forest, XGBoost)", "Anomaly detection (Isolation Forest, AutoEncoder)", "Threshold tuning & cost analysis", "Model interpretability (SHAP, LIME)"]
      },
      {
        id: "fraud-deployment",
        title: "Deployment & Monitoring",
        items: ["Real-time scoring API (FastAPI)", "Feature store & pipeline", "A/B testing model baru", "Monitoring fraud patterns shift", "Compliance & explainability requirements"]
      }
    ],
    prompts: [
      "Buatkan kode Python lengkap untuk EDA dataset Credit Card Fraud dari Kaggle, termasuk visualisasi distribusi dan korelasi.",
      "Jelaskan dan implementasikan SMOTE serta teknik resampling lain untuk imbalanced data, bandingkan hasilnya.",
      "Buatkan pipeline fraud detection end-to-end: preprocessing → SMOTE → model training → evaluation → SHAP interpretability.",
      "Jelaskan cara deploy fraud detection system ke production: real-time API, monitoring drift, dan compliance."
    ]
  }
];

// ─── SYSTEM PROMPT TEMPLATE ──────────────────────────────────
const SYSTEM_PROMPT = `Kamu adalah AI tutor ML Engineer yang ahli dan interaktif. Tugasmu adalah mengajar dengan gaya yang:

1. **Intuitif**: Mulai dengan analogi dunia nyata sebelum masuk ke teori
2. **Matematis**: Sertakan penurunan rumus ketika relevan (gunakan notasi LaTeX dalam backtick)
3. **Praktis**: Selalu sertakan kode Python end-to-end yang bisa langsung dijalankan
4. **Industri**: Bagikan best practices dari industri ML/AI
5. **Interaktif**: Akhiri dengan pertanyaan refleksi atau latihan mini

FORMAT JAWABAN:
- Gunakan heading dan bullet points untuk struktur
- Kode dalam blok \`\`\`python ... \`\`\`
- Formula matematika dalam backtick
- Berikan contoh output yang diharapkan
- Bahasa: Indonesia (istilah teknis boleh Inggris)

KONTEKS KURIKULUM: Kamu sedang mengajar dalam program bootcamp ML Engineer 16 minggu.`;

// AI: hanya model lokal (Qwen3-4B lewat llama-server). Lihat local-ai.js.
