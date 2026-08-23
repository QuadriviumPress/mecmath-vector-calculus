// site.js — site metadata for Nunjucks templates.
import config from '../lib/config.js';

export default {
  title: config.bookTitle,
  tagline: config.tagline,
  description: config.description,
  author: 'Michael Corral',
  url: 'https://quadriviumpress.github.io',
  baseUrl: `https://quadriviumpress.github.io${config.pathPrefix.replace(/\/+$/, '')}`,
  repositoryUrl: config.repositoryUrl,
  sourceUrl: config.sourceUrl,
};
