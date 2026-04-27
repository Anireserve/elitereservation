#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  🏠 ELITE HOME GROUP ISRAEL — Lanceur Mac
#  Double-cliquez sur ce fichier pour ouvrir l'application
# ─────────────────────────────────────────────────────────────

# Se place dans le dossier du fichier
cd "$(dirname "$0")"

echo ""
echo "======================================================"
echo "  🏠  ELITE HOME GROUP ISRAEL — Calculateur de Devis"
echo "======================================================"
echo ""

# Vérifie que Python 3 est installé
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 n'est pas installé sur ce Mac."
    echo ""
    echo "👉 Téléchargez-le sur : https://www.python.org/downloads/"
    echo ""
    read -p "Appuyez sur Entrée pour fermer..."
    exit 1
fi

echo "✅ Python 3 trouvé : $(python3 --version)"
echo ""
echo "🚀 Lancement de l'application..."
echo "   (Ne fermez pas cette fenêtre pendant que vous utilisez l'app)"
echo ""

python3 lancer_devis.py
