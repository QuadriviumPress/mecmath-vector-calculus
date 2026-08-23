// GitHub Pages serves this project site under a path prefix. Vercel serves at
// domain root, so it builds with no prefix — detected via VERCEL env var.
import config from './lib/config.js';

const PATH_PREFIX = process.env.VERCEL ? '/' : config.pathPrefix;

export default function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget(`./${config.srcRoot}/`);
  eleventyConfig.addWatchTarget('./lib/');

  eleventyConfig.addTransform('pathPrefix', function (content) {
    const out = this.page && this.page.outputPath;
    if (typeof out !== 'string' || !out.endsWith('.html')) return content;
    const prefix = PATH_PREFIX.replace(/\/+$/, '');
    if (!prefix) return content;
    return content.replace(
      /(\s(?:href|src)=)"(\/(?!\/)[^"]*)"/g,
      (_, pre, url) => `${pre}"${prefix}${url}"`
    );
  });

  eleventyConfig.addFilter('trimSlash', v => String(v).replace(/\/+$/, ''));

  eleventyConfig.addPassthroughCopy({ assets: 'assets' });
  eleventyConfig.addPassthroughCopy({ 'generated/figures': 'figures' });
  eleventyConfig.addPassthroughCopy({ 'assets/pwa/offline.html': 'offline.html' });

  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

  return {
    dir: {
      input: '.',
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data',
    },
    templateFormats: ['njk'],
    htmlTemplateEngine: 'njk',
    pathPrefix: PATH_PREFIX,
  };
};
