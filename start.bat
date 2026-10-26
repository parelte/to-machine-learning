@echo off
title To Machine Learning

rem === UBAH BARIS INI JIKA PERLU ===============================
rem Lokasi model Qwen3-4B (hasil: hf download bartowski/Qwen_Qwen3-4B-GGUF)
set "MODEL=D:\Models\Qwen3-4B\Qwen_Qwen3-4B-Q4_K_M.gguf"
rem Folder llama.cpp. Kosongkan jika llama-server.exe sudah ada di PATH
set "LLAMA_DIR="
rem ============================================================

cd /d "%~dp0"

rem --- cari llama-server.exe: PATH dulu, lalu LLAMA_DIR ---
set "LLAMA="
where llama-server.exe >nul 2>nul
if not errorlevel 1 set "LLAMA=llama-server.exe"
if not defined LLAMA if defined LLAMA_DIR if exist "%LLAMA_DIR%\llama-server.exe" set "LLAMA=%LLAMA_DIR%\llama-server.exe"

if not defined LLAMA goto :nollama
if not exist "%MODEL%" goto :nomodel

start "Qwen3 - AI lokal" cmd /k ""%LLAMA%" -m "%MODEL%" -c 8192 --jinja --port 8080 --alias qwen3-4b"
goto :web

:nollama
echo [!] llama-server.exe tidak ditemukan (PATH maupun LLAMA_DIR).
echo     Website tetap jalan, tapi AI lokal belum aktif.
echo.
goto :web

:nomodel
echo [!] File model tidak ditemukan: %MODEL%
echo     Website tetap jalan, tapi AI lokal belum aktif.
echo.

:web
start "" cmd /c "timeout /t 3 >nul & start http://localhost:8000"
python server.py
pause
