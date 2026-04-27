@echo off
REM ─────────────────────────────────────────────────────────────
REM  🏠 ELITE HOME GROUP ISRAEL — Lanceur Windows
REM  Double-cliquez sur ce fichier pour ouvrir l'application
REM ─────────────────────────────────────────────────────────────

cd /d "%~dp0"

echo.
echo ======================================================
echo   ELITE HOME GROUP ISRAEL -- Calculateur de Devis
echo ======================================================
echo.

REM Vérifie que Python est installé
python3 --version >nul 2>&1
if %errorlevel% neq 0 (
    python --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ERREUR : Python n'est pas installe sur ce PC.
        echo.
        echo Telechargez-le sur : https://www.python.org/downloads/
        echo IMPORTANT : Cochez "Add Python to PATH" pendant l'installation
        echo.
        pause
        exit /b 1
    )
    echo Lancement avec python...
    python lancer_devis.py
) else (
    echo Lancement avec python3...
    python3 lancer_devis.py
)

pause
