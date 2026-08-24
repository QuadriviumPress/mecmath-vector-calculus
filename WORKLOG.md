# Mecmath Vector Calculus — Work Log

## Status

- **Repository:** https://github.com/QuadriviumPress/mecmath-vector-calculus
- **LaTeX source:** downloaded (`calc3book-1.0-src.tar.gz`, 107 files)
- **Build engine:** ported from `mecmath-trigonometry`
- **Site:** 55 pages, search index, book index (300 refs)
- **Figures:** MetaPost `.mp` → `.0` compiled at build time; SVG conversion in progress
- **Verify:** `npm run build && npm run verify` passes locally
- **Deploy:** GitHub Pages on push to `main`

## Source

- Homepage: https://www.mecmath.net/
- LibreTexts: https://math.libretexts.org/Bookshelves/Calculus/Vector_Calculus_(Corral)
- Master: `calc3book.tex` (4 chapters + 3 appendices + gnupdl + History)
- Heavy MetaPost figure usage (62 `.mp` files)

## Math rendering

`assets/js/math-config.js` holds the MathJax mirror of the `calc3book.tex`
preamble (`\Dotprod`, `\Crossprod`, `\vecthree`, `\lineintvec`, …).
`npm run verify:math` typesets every math span in `_site` with that exact file
and fails on any control sequence MathJax cannot resolve, plus any backslash
command left in the prose; `npm run verify` runs it too, so CI covers it. When
the upstream preamble grows a macro, add it to the config or the check goes red.

## Next steps

- Improve MetaPost `.0` → SVG pipeline for vector figures
- Render bibliography section from `calc3book.bib`
- Add chapter PDF generation once Playwright CI is confirmed
