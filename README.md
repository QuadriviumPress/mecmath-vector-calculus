# Vector Calculus — Web Edition

Eleventy build of **Vector Calculus** by Michael Corral, rendering the original
LaTeX source to a searchable, offline-capable web textbook.

- **Repository:** https://github.com/QuadriviumPress/mecmath-vector-calculus
- **Original text:** https://www.mecmath.net/
- **LibreTexts edition:** https://math.libretexts.org/Bookshelves/Calculus/Vector_Calculus_(Corral)
- **License:** [GNU FDL 1.2](https://www.gnu.org/licenses/old-licenses/fdl-1.2.html)

## How it works

The verbatim mecmath source lives in [`mecmath-vector-calculus/`](mecmath-vector-calculus/)
— **ground truth, never modified**. Build tooling mirrors
[`mecmath-trigonometry`](https://github.com/QuadriviumPress/mecmath-trigonometry).

```
mecmath-vector-calculus/   LaTeX source (calc3book.tex + 4 chapters + 3 appendices)
lib/config.js              book-specific paths and metadata
lib/figure-preamble.js     TeX macros for figure compilation
tex/calc3book-compat.sty   TeX Live 2023+ shims
lib/parse/                 calc3book.tex tokenizer
scripts/                   figure conversion (incl. MetaPost), search, verify, CI
```

## Developing

Requires Node ≥ 22. For figure conversion also install TeX Live plus
`ghostscript`, `dvisvgm`, `mpost`, and `mupdf-tools`.

```sh
npm install
npm run update:vendor
npm run build
npm run verify
npm run serve    # http://localhost:4000/mecmath-vector-calculus/
```

## Deployment

Pushes to `main` deploy to GitHub Pages at
https://quadriviumpress.github.io/mecmath-vector-calculus/

## Attribution

Content © Michael Corral, licensed under the GNU Free Documentation License,
Version 1.2.
