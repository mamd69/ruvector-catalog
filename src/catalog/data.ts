// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'a083bd77fa2f4879595daa68686ed5b2132d981a',
  ruvectorCommitShort: 'a083bd77',
  ruvectorCommitDate: '2026-06-08T21:06:02Z',
  generatedAt: '2026-06-09',
  scope: {
    rustLines: 1760207,
    sourceFiles: 4173,
    crates: 135,
    adrs: 354,
    examples: 71,
    npmPackages: 59,
  },
};
