/** Standalone LaTeX wrappers for figure compilation (calc3book preamble subset). */

const CALC3_MACROS = String.raw`
\providecommand{\abs}[1]{\lvert\mspace{1mu}#1\mspace{1mu}\rvert}
\providecommand{\Abs}[1]{\bigl\lvert\mspace{1mu}#1\mspace{1mu}\bigr\rvert}
\providecommand{\norm}[1]{\lVert\mspace{1mu}#1\mspace{1mu}\rVert}
\providecommand{\Norm}[1]{\bigl\lVert\mspace{1mu}#1\mspace{1mu}\bigr\rVert}
\providecommand{\NORM}[1]{\Biggl\lVert\mspace{1mu}#1\mspace{1mu}\Biggr\rVert}
\providecommand{\ssub}[2]{#1_{\scriptscriptstyle #2}}
\providecommand{\vectwo}[1]{(#1_{\scriptscriptstyle 1},#1_{\scriptscriptstyle 2})}
\providecommand{\vectwoadd}[2]{(#1_{\scriptscriptstyle 1} + #2_{\scriptscriptstyle 1},#1_{\scriptscriptstyle 2} + #2_{\scriptscriptstyle 2})}
\providecommand{\vectwosub}[2]{(#1_{\scriptscriptstyle 1} - #2_{\scriptscriptstyle 1},#1_{\scriptscriptstyle 2} - #2_{\scriptscriptstyle 2})}
\providecommand{\vecthree}[1]{(#1_{\scriptscriptstyle 1},#1_{\scriptscriptstyle 2},#1_{\scriptscriptstyle 3})}
\providecommand{\vecthreeadd}[2]{(#1_{\scriptscriptstyle 1} + #2_{\scriptscriptstyle 1},#1_{\scriptscriptstyle 2} + #2_{\scriptscriptstyle 2},#1_{\scriptscriptstyle 3} + #2_{\scriptscriptstyle 3})}
\providecommand{\vecthreesub}[2]{(#1_{\scriptscriptstyle 1} - #2_{\scriptscriptstyle 1},#1_{\scriptscriptstyle 2} - #2_{\scriptscriptstyle 2},#1_{\scriptscriptstyle 3} - #2_{\scriptscriptstyle 3})}
\providecommand{\ssubsum}[3]{#1_{\scriptscriptstyle #3} + #2_{\scriptscriptstyle #3}}
\providecommand{\vecthreeijk}[1]{\ssub{#1}{1}\,\textbf{i} + \ssub{#1}{2}\,\textbf{j} + \ssub{#1}{3}\,\textbf{k}}
\providecommand{\Real}[1]{\mathbb{R}^{#1}}
\providecommand{\Dotprod}[2]{#1 \bm{\cdot} #2}
\providecommand{\Crossprod}[2]{#1 \bm{\times} #2}
\providecommand{\Degrees}[0]{\ensuremath{^\circ}}
\providecommand{\ival}[2]{\lbrack #1,#2 \rbrack}
\providecommand{\Reals}{\mathbb{R}}
\providecommand{\Complex}{\mathbb{C}}
\providecommand{\Rationals}{\mathbb{Q}}
\providecommand{\Naturals}{\mathbb{N}}
\providecommand{\Integers}{\mathbb{Z}}
`;

const BASE_PREAMBLE = String.raw`
\pdfminorversion=7
\pdfmapfile{+fourier.map}
\pdfmapfile{+phaistos.map}
\usepackage{amsmath,amssymb,bm}
\usepackage{fouriernc}
\usepackage{phaistos}
\usepackage{pifont}
\usepackage{xcolor}
\usepackage[T1]{fontenc}
\usepackage{lmodern}
\definecolor{captioncolor}{HTML}{005587}
\definecolor{linecolor}{HTML}{0074C8}
\definecolor{linecolor2}{HTML}{E14B4B}
\definecolor{linecolor3}{HTML}{657822}
\definecolor{fillcolor}{cmyk}{0.1,0.05,0,0}
\definecolor{fillcolor2}{HTML}{96CBE9}
\definecolor{brickcolor}{HTML}{F0D8B2}
\definecolor{blockcolor}{HTML}{B6B6B6}
\definecolor{groundcolor}{HTML}{E4D8C5}
\definecolor{earthcolor}{HTML}{C5FFFF}
\definecolor{watercolor}{cmyk}{0.1,0.05,0,0}
\definecolor{codecolor}{HTML}{FFF7E0}
\definecolor{insideo}{HTML}{798084}
\definecolor{insidei}{HTML}{F0F0F0}
\definecolor{outer}{HTML}{424296}
\definecolor{inner}{HTML}{D8D8FF}
\definecolor{planecolor}{HTML}{FFB270}
\definecolor{surfcolor}{HTML}{006146}
\definecolor{spherecolor}{HTML}{80DCFF}
\definecolor{ellipsecolor}{HTML}{AAAAFF}
${CALC3_MACROS}
`;

const TIKZ_PREAMBLE = String.raw`
\usetikzlibrary{arrows,patterns,decorations,intersections,matrix,snakes,calc,backgrounds,shadows,decorations.pathreplacing,decorations.markings,decorations.pathmorphing}
`;

export function tikzStandalone(content) {
  return `\\documentclass[border=2pt,tikz]{standalone}
${BASE_PREAMBLE}
${TIKZ_PREAMBLE}
\\begin{document}
${content}
\\end{document}
`;
}

export function gnuplotStandalone(file) {
  return `\\documentclass[border=2pt]{standalone}
\\usepackage{graphicx}
${BASE_PREAMBLE}
\\begin{document}
\\input{${file}.tex}
\\end{document}
`;
}

export function imageStandalone(file, options = '') {
  const opts = options ? `[${options}]` : '';
  return `\\documentclass[border=2pt]{standalone}
\\usepackage{graphicx}
${BASE_PREAMBLE}
\\begin{document}
\\includegraphics${opts}{${file}}
\\end{document}
`;
}
