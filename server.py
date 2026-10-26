#!/usr/bin/env python3
"""Server lokal: menyajikan file web + menyimpan progres ke database SQLite (progress.db).
Jalankan:  python server.py   lalu buka  http://localhost:8000
Hanya menerima koneksi dari komputermu sendiri (127.0.0.1).

API key OpenRouter: dimasukkan lewat pengaturan Asisten di website, disimpan di api-key.txt (komputermu saja).
Modelnya dipilih otomatis dari daftar model milik akunmu. Key tidak pernah dikirim balik ke browser
dan tidak disimpan di database."""
import json
import os
import re
import sqlite3
import sys
import time
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit

ROOT = Path(__file__).parent.resolve()
DB = ROOT / "progress.db"
KEYFILE = ROOT / "api-key.txt"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
KEYS = {"ml_daily_v1", "ml_ai_chat", "ml_yt_cache", "ml_yt_valid", "ml_cur_ver", "ml_portfolio_v1", "ml_projects_v1"}  # whitelist
MAX_BYTES = 5_000_000

# Penyedia AI (semua format OpenAI-compatible). Urutan = prioritas saat mode "Otomatis".
# prefix : awalan key untuk mengenali penyedia. prefer : nama model yang dicoba lebih dulu (dicek ke daftar live).
PROVIDERS = {
    "openrouter": {
        "base": "https://openrouter.ai/api/v1",
        "env": "OPENROUTER_API_KEY",
        "prefix": "sk-or-",
        "prefer": ("google/gemini-2.0-flash-exp:free", "deepseek/deepseek-chat", "meta-llama/llama-3.3-70b-instruct", "qwen/qwen-2.5-72b-instruct:free")
    },
}
AI_FIELDS = ("model", "messages", "temperature", "top_p", "max_tokens", "reasoning")  # whitelist isi permintaan
AI_MAX_BYTES = 200_000
AI_TIMEOUT = 120
MODELS_TTL = 600  # detik

# Hanya jenis file ini yang disajikan ke browser. Selain itu (api-key.txt, .db, .py, dotfile) ditolak.
STATIC_OK = {".html", ".css", ".js", ".svg", ".ico", ".png", ".jpg", ".jpeg", ".webp", ".woff2"}
# Model yang bukan untuk chat teks
SKIP = re.compile(r"embed|guard|moderat|whisper|tts|image|vision|-vl\b|audio|rerank|safety|classifier", re.I)

_cache = {}  # penyedia -> (waktu, daftar model, is_free_tier, key)


def conn():
    c = sqlite3.connect(DB)
    c.execute("CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT NOT NULL, "
              "updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)")
    return c


# ─── API key: dari api-key.txt dan environment variable ───────────────────────
def detect(name, val):
    return "openrouter"


def read_keys():
    """{penyedia: key}. Dibaca ulang tiap permintaan, jadi mengubah api-key.txt tidak perlu restart.
    Format baris: key saja, atau NAMA=key. Baris berawalan # diabaikan."""
    found = {}
    try:
        lines = KEYFILE.read_text(encoding="utf-8-sig").splitlines()
    except OSError:
        lines = []
    for ln in lines:
        ln = ln.strip()
        if not ln or ln.startswith("#"):
            continue
        name, _, val = ln.rpartition("=")
        val = val.strip().strip("\"'")
        p = detect(name, val) if val else None
        if p and p not in found:
            found[p] = val
    for p, cfg in PROVIDERS.items():  # environment variable menimpa file
        if os.environ.get(cfg["env"]):
            found[p] = os.environ[cfg["env"]]
    return found


def default_provider(keys=None):
    keys = read_keys() if keys is None else keys
    return next((p for p in PROVIDERS if p in keys), None)


# ─── Daftar model + pilih otomatis ────────────────────────────────────────────
def http_get(url, key):
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + key, "User-Agent": "ml-hub/1.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode("utf-8"))


def model_info(prov, key):
    """(daftar model teks, apakah akun free-tier). Di-cache 10 menit."""
    hit = _cache.get(prov)
    if hit and time.time() - hit[0] < MODELS_TTL and hit[3] == key:
        return hit[1], hit[2]
    raw = http_get(PROVIDERS[prov]["base"] + "/models", key)
    out = []
    for m in raw.get("data") or raw.get("models") or []:
        mid = str(m.get("id") or m.get("name") or "")
        mid = mid[7:] if mid.startswith("models/") else mid
        if not mid or SKIP.search(mid):
            continue
        outs = (m.get("architecture") or {}).get("output_modalities")
        if outs and "text" not in outs:
            continue
        pr = m.get("pricing") or {}
        free = mid.endswith(":free") or (str(pr.get("prompt")) in ("0", "0.0") and str(pr.get("completion")) in ("0", "0.0"))
        out.append({"id": mid, "ctx": int(m.get("context_length") or 0), "free": free, "created": int(m.get("created") or 0)})
    free_tier = False
    if prov == "openrouter":
        try:  # akun gratis hanya boleh memakai model :free
            free_tier = bool((http_get(PROVIDERS[prov]["base"] + "/key", key).get("data") or {}).get("is_free_tier"))
        except Exception:
            pass
    _cache[prov] = (time.time(), out, free_tier, key)
    return out, free_tier


def pick_model(prov, key):
    """Pilih model terbaik yang tersedia di OpenRouter: utamakan model chat berkualitas, atau auto."""
    models, free_tier = model_info(prov, key)
    ids = {m["id"] for m in models}
    if free_tier:
        want = [
            "google/gemini-2.0-flash-exp:free",
            "qwen/qwen-2.5-72b-instruct:free",
            "deepseek/deepseek-chat:free",
            "meta-llama/llama-3.3-70b-instruct",
            "openrouter/free",
            "openrouter/auto"
        ]
    else:
        want = [
            "google/gemini-2.0-flash-001",
            "deepseek/deepseek-chat",
            "meta-llama/llama-3.3-70b-instruct",
            "openrouter/auto"
        ]
    for w in want:
        if w in ids:
            return w
    pool = [m for m in models if (m["free"] or not free_tier) and (not m["ctx"] or m["ctx"] >= 8000)]
    if not pool:
        pool = models

    def score(m):  # ukuran parameter dari nama (mis. 70b), lalu konteks, lalu terbaru
        sizes = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)b(?![a-z])", m["id"].lower())]
        return (max(sizes, default=0), m["ctx"], m["created"])
    return max(pool, key=score)["id"] if pool else ("gemini-2.0-flash" if prov == "gemini" else "openrouter/auto")


def ai_forward(base, key, payload):
    """Teruskan permintaan chat ke penyedia. Mengembalikan (status_http, body_bytes)."""
    req = urllib.request.Request(
        base + "/chat/completions",
        data=json.dumps(payload).encode(),
        method="POST",
        headers={"Content-Type": "application/json",
                 "Authorization": "Bearer " + key,
                 "X-Title": "To Machine Learning",
                 "User-Agent": "ml-hub/1.0"},
    )
    try:
        with urllib.request.urlopen(req, timeout=AI_TIMEOUT) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:      # 401/429/dll: teruskan pesan aslinya
        return e.code, e.read()
    except (urllib.error.URLError, TimeoutError) as e:
        msg = f"Gagal menghubungi penyedia AI: {e}"
        return 502, json.dumps({"error": {"message": msg}}).encode()


def static_ok(path):
    p = unquote(urlsplit(path).path)
    if any(part.startswith(".") for part in p.split("/") if part):
        return False
    return p.endswith("/") or Path(p).suffix.lower() in STATIC_OK


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ROOT), **kw)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, code, obj):
        self._raw(code, json.dumps(obj).encode())

    def _raw(self, code, body):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _origin_ok(self):
        origin = self.headers.get("Origin")
        return not origin or origin in (f"http://localhost:{PORT}", f"http://127.0.0.1:{PORT}")

    def _save_key(self):
        """Simpan atau hapus API key OpenRouter (body: {"key": "..."}; kosong = hapus)."""
        n = int(self.headers.get("Content-Length", 0))
        try:
            key = str(json.loads(self.rfile.read(min(n, 2000)).decode("utf-8")).get("key", "")).strip()
        except (ValueError, AttributeError):
            return self._json(400, {"ok": False, "error": "permintaan tidak valid"})
        if key and (len(key) < 8 or len(key) > 300 or re.search(r"\s", key)):
            return self._json(400, {"ok": False, "error": "Format API key tidak valid. Periksa kembali key yang ditempel."})
        if key:
            KEYFILE.write_text("# Dikelola dari pengaturan Asisten di website. Jangan dibagikan.\n" + key + "\n", encoding="utf-8")
        elif KEYFILE.exists():
            KEYFILE.unlink()
        _cache.clear()
        self._json(200, {"ok": True, "set": bool(key)})

    def do_POST(self):
        if self.path not in ("/api/ai/chat", "/api/ai/key"):
            return self._json(404, {"ok": False})
        # header kustom memaksa preflight CORS, jadi situs lain tidak bisa memakai proxy ini
        if not self._origin_ok() or self.headers.get("X-Requested-With") != "ml-hub":
            return self._json(403, {"error": {"message": "ditolak"}})
        if self.path == "/api/ai/key":
            return self._save_key()
        n = int(self.headers.get("Content-Length", 0))
        if n > AI_MAX_BYTES:
            return self._json(413, {"error": {"message": "permintaan terlalu besar"}})
        keys = read_keys()
        try:
            req = json.loads(self.rfile.read(n).decode("utf-8"))
            name = req["provider"]
            if name == "auto":
                name = default_provider(keys)
                if not name:
                    return self._json(503, {"error": {"message": "API key Asisten belum diisi. Masukkan di pengaturan Asisten."}})
            prov = PROVIDERS[name]
            if not isinstance(req["payload"], dict):
                raise ValueError
            payload = {k: req["payload"][k] for k in AI_FIELDS if k in req["payload"]}
        except (ValueError, KeyError, TypeError):
            return self._json(400, {"error": {"message": "permintaan tidak valid"}})
        key = keys.get(name)
        if not key:
            return self._json(503, {"error": {"message": "API key Asisten belum diisi. Masukkan di pengaturan Asisten."}})
        cur_model = str(payload.get("model", "")).strip()
        if not cur_model or cur_model == "auto" or SKIP.search(cur_model):  # model otomatis atau model safety/guard yang tidak cocok
            try:
                payload["model"] = pick_model(name, key)
            except Exception as e:
                return self._json(502, {"error": {"message": f"Gagal membaca daftar model {name}: {e}"}})
            if not payload["model"]:
                return self._json(502, {"error": {"message": "Tidak ada model yang cocok. Isi nama model secara manual di pengaturan."}})
        code, body = ai_forward(prov["base"], key, payload)
        self._raw(code, body)

    def do_GET(self):
        url = urlsplit(self.path)
        if url.path == "/api/ai/status":  # hanya true/false dan nama penyedia, key tidak pernah dikirim
            keys = read_keys()
            return self._json(200, {"ok": True, "providers": {p: p in keys for p in PROVIDERS}, "default": default_provider(keys), "has_key": len(keys) > 0})
        if url.path == "/api/ai/models":
            keys = read_keys()
            name = (parse_qs(url.query).get("provider") or [""])[0]
            if not name or name not in PROVIDERS:
                name = default_provider(keys) or "openrouter"
            key = keys.get(name)
            if not key:
                return self._json(503, {"ok": False, "error": f"API key {name} belum ada"})
            try:
                models, _ = model_info(name, key)
                return self._json(200, {"ok": True, "provider": name, "models": sorted(m["id"] for m in models), "pick": pick_model(name, key)})
            except Exception as e:
                return self._json(502, {"ok": False, "error": str(e)})
        if url.path == "/api/state":
            with conn() as c:
                rows = c.execute("SELECT k, v FROM kv").fetchall()
            return self._json(200, {"ok": True, "data": dict(rows)})
        if not static_ok(self.path):  # jangan sajikan database, skrip, atau file key
            return self._json(404, {"ok": False})
        super().do_GET()

    def do_HEAD(self):
        if not static_ok(self.path):
            return self._json(404, {"ok": False})
        super().do_HEAD()

    def do_PUT(self):
        key = self.path.rsplit("/", 1)[-1]
        origin = self.headers.get("Origin")
        if origin and origin not in (f"http://localhost:{PORT}", f"http://127.0.0.1:{PORT}"):
            return self._json(403, {"ok": False, "error": "origin ditolak"})
        if not self.path.startswith("/api/state/") or key not in KEYS:
            return self._json(404, {"ok": False})
        n = int(self.headers.get("Content-Length", 0))
        if n > MAX_BYTES:
            return self._json(413, {"ok": False})
        val = self.rfile.read(n).decode("utf-8")
        try:
            json.loads(val)
        except ValueError:
            return self._json(400, {"ok": False, "error": "bukan JSON"})
        with conn() as c:
            c.execute("INSERT INTO kv (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE "
                      "SET v = excluded.v, updated_at = CURRENT_TIMESTAMP", (key, val))
        self._json(200, {"ok": True})


if __name__ == "__main__":
    conn().close()
    found = read_keys()
    print(f"ML Hub berjalan di http://localhost:{PORT}  |  database: {DB.name}  (Ctrl+C untuk berhenti)")
    print("Cloud AI:", "key terpasang" if found else "belum ada key (isi di pengaturan Asisten)")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
