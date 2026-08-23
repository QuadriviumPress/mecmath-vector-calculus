#!/usr/bin/env bash
# Build calc3book.pdf from the pristine mecmath source on TeX Live 2023+.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/mecmath-vector-calculus"
OUT="${BOOK_OUT:-$ROOT/generated/book}"
JOB=calc3book
COMPAT=calc3book-compat

export TEXINPUTS="$ROOT/tex:"
export TEXMFHOME="$ROOT/vendor/texmf"

for tool in latex makeindex dvips ps2pdf mktexlsr bibtex; do
  command -v "$tool" >/dev/null || { echo "error: $tool not found" >&2; exit 1; }
done

mktexlsr "$TEXMFHOME" >/dev/null

rm -rf "$OUT"
mkdir -p "$OUT"
cp "$SRC"/*.tex "$SRC"/*.eps "$SRC"/*.ist "$SRC"/*.bib "$OUT/" 2>/dev/null || true
cd "$OUT"

if compgen -G "*.mp" > /dev/null; then
  export TEX=latex
  for mp in *.mp; do mpost "$mp"; done
fi

run_latex() {
  latex -interaction=nonstopmode -halt-on-error -file-line-error \
        -jobname="$JOB" "\\RequirePackage{$COMPAT}\\input{$JOB.tex}"
}

echo "==> pass 1"; run_latex >pass1.log
makeindex -s myindex.ist -o "$JOB.ind" "$JOB.idx" 2>/dev/null || true
echo "==> pass 2"; run_latex >pass2.log
makeindex "$JOB.nlo" -s nomencl.ist -o "$JOB.nls" 2>/dev/null || true
bibtex "$JOB" 2>/dev/null || true
echo "==> pass 3"; run_latex >pass3.log
echo "==> pass 4"; run_latex >pass4.log

echo "==> dvips"
dvips -Ppdf -t letter -G0 -z "$JOB.dvi" -o "$JOB.ps"

echo "==> ps2pdf"
ps2pdf -dMaxSubsetPct=100 -dSubsetFonts=true -dEmbedAllFonts=true \
       -dPDFSETTINGS=/printer -dCompatibilityLevel=1.7 \
       "$JOB.ps" "$JOB.pdf"

echo "Built $OUT/$JOB.pdf"
grep -a "Output written" pass4.log || true
