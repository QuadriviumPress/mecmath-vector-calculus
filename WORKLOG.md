# Mecmath Vector Calculus — Work Log

Building an Eleventy website that renders the mecmath *Vector Calculus* textbook
(Michael Corral) with the LaTeX source as ground truth, mirroring the
`mecmath-trigonometry` project architecture, deployable to GitHub Pages under
the `QuadriviumPress` org.

## Status

- **Repository:** created
- **LaTeX source:** not yet downloaded
- **Build engine:** not started (will adapt from `mecmath-trigonometry`)

## Planned steps

1. Download `calc3book-1.0-src.tar.gz` into `mecmath-vector-calculus/`
2. Inventory corpus (master `.tex`, chapters, figures, custom macros)
3. Compare structure with `mecmath-trigonometry` (same author, similar LaTeX style)
4. Copy and adapt Eleventy framework (`lib/`, `scripts/`, templates, CI)
5. Handle TeX Live compatibility (upstream compiled with TeX Live 2011; may need shims)
6. Deploy to `https://quadriviumpress.github.io/mecmath-vector-calculus/`

## Upstream references

- Homepage: https://www.mecmath.net/
- Latest PDF: VectorCalculus.pdf (2022-08-15)
- Related: Elementary Calculus (prequel), Trigonometry (same author family)
