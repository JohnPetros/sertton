#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Uso: $0 <versao>" >&2
  echo "Exemplo: $0 1.0.16" >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Erro: o GitHub CLI (gh) não está instalado." >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Erro: faça login no GitHub primeiro com: gh auth login" >&2
  exit 1
fi

version="${1#v}"

if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+([.-][0-9A-Za-z.-]+)?$ ]]; then
  echo "Erro: versão inválida '$1'. Use o formato MAJOR.MINOR.PATCH, por exemplo 1.0.16." >&2
  exit 1
fi

tag="v${version}"

echo "Criando a release ${tag} a partir da branch main..."
gh release create "$tag" \
  --target main \
  --generate-notes

echo "Release ${tag} criada. O CD será disparado após a publicação."
