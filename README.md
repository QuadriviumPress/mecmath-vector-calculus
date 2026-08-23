# Vector Calculus — Web Edition

Eleventy build of **Vector Calculus** by Michael Corral, rendering the original
LaTeX source to a searchable, offline-capable web textbook.

- **Repository:** https://github.com/QuadriviumPress/mecmath-vector-calculus
- **Original text:** https://www.mecmath.net/
- **License:** [GNU FDL 1.2](https://www.gnu.org/licenses/old-licenses/fdl-1.2.html)

## Source materials (upstream)

| Asset | URL |
|---|---|
| LaTeX source | https://www.mecmath.net/calc3book-1.0-src.tar.gz |
| PDF (reference) | https://www.mecmath.net/VectorCalculus.pdf |
| Java code samples | https://www.mecmath.net/calc3book_java.zip |
| Sage code samples | https://www.mecmath.net/calc3book_sage.zip |
| LaTeX mini-tutorial | https://www.mecmath.net/latex-tutorial.pdf |

The verbatim mecmath source will live in [`mecmath-vector-calculus/`](mecmath-vector-calculus/)
— **ground truth, never modified**. Build tooling mirrors
[`mecmath-trigonometry`](https://github.com/QuadriviumPress/mecmath-trigonometry).

## Book overview

Multivariable calculus: vectors, partial derivatives, multiple integrals, line and
surface integrals (Green, Divergence, Stokes). 420 exercises, three appendices.
PDF built with TeX Live 2011; author notes source may need TeX Live 2020 updates.

## Status

**Scaffolding only.** Next steps: download LaTeX source, port the Eleventy build
framework from `mecmath-trigonometry`, adapt parsers for this book's macros and
structure, deploy to GitHub Pages.

## Attribution

Content © Michael Corral, licensed under the GNU Free Documentation License,
Version 1.2.
