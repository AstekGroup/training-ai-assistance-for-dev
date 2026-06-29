#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE="$ROOT/site"

if [[ ! -d "$SITE" ]]; then
  echo "Dossier site/ introuvable : $SITE" >&2
  exit 1
fi

cd "$SITE"

run_pnpm() {
  if command -v volta &>/dev/null; then
    volta run --node 22.22.2 pnpm "$@"
  else
    pnpm "$@"
  fi
}

if ! command -v pnpm &>/dev/null; then
  echo "pnpm est requis. Installez-le ou activez Volta (versions dans site/package.json)." >&2
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "Installation des dépendances…"
  run_pnpm install
fi

cat <<'EOF'
Deck de formation — serveur de développement

  Landing : http://localhost:5173/
  Slides  : http://localhost:5173/slides/1

Raccourcis clavier : ← → navigation · F plein écran · G glossaire · S sommaire

EOF

run_pnpm dev
