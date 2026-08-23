// paths.js — LaTeX source layout (names come from lib/config.js).
import path from 'node:path';
import config from './config.js';

export const SRC_ROOT = config.srcRoot;

export function srcRoot(root) {
  return path.join(root, SRC_ROOT);
}

/** Master .tex file drives the whole book via \\include{}. */
export function bookFile(root) {
  return path.join(srcRoot(root), config.masterTex);
}

/** Chapter/appendix .tex files live directly in the source root. */
export function srcFile(root, name) {
  return path.join(srcRoot(root), `${name}.tex`);
}

export function generatedDir(root) {
  return path.join(root, 'generated');
}

export function generatedFiguresDir(root) {
  return path.join(root, 'generated', 'figures');
}
