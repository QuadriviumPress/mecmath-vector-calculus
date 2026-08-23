// figures.js — the figure-asset registry shared by the build and the
// prebuild converter. Every tikzpicture, gnuplot epslatex figure and
// \includegraphics image in the book becomes one asset with a stable
// content-hash id; scripts/convert-figures.js compiles each to SVG/PNG in
// generated/figures/, and the renderer points <img> at /figures/<id>.<ext>.
import crypto from 'node:crypto';
import { parseBook } from './parse/book.js';
import { buildModel } from './model/numbering.js';
import { tokenize } from './parse/tokenizer.js';
import { tikzStandalone, gnuplotStandalone } from './figure-preamble.js';

export { tikzStandalone, gnuplotStandalone };

export function assetId(asset) {
  const key =
    asset.kind === 'tikz' ? asset.content : `${asset.kind}:${asset.file}`;
  return 'fig-' + crypto.createHash('sha1').update(key).digest('hex').slice(0, 10);
}

/**
 * Parse the book and collect every asset (deduped by id) plus per-page
 * warnings. Also attaches ids to the assets referenced by each page.
 */
export function collectBookAssets(root) {
  const structure = parseBook(root);
  const model = buildModel(structure);
  const warnings = [...structure.warnings];
  const byId = new Map();

  for (const page of model.pages) {
    const t = tokenize(page.tex, { name: page.name });
    warnings.push(...t.warnings);
    page.blocks = t.blocks;
    page.mathSpans = t.mathSpans;
    page.assets = t.assets;
    for (const asset of page.assets) {
      if (asset.kind === 'verbatim') continue;
      const id = assetId(asset);
      asset.id = id;
      if (!byId.has(id)) byId.set(id, { ...asset, id, usedIn: [] });
      byId.get(id).usedIn.push(page.name);
    }
  }

  const assets = [...byId.values()];
  return { structure, model, assets, warnings };
}
