// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'a531628bbee8f1556836b2634e02ca7f85c9efb7',
  ruvectorCommitShort: 'a531628b',
  ruvectorCommitDate: '2026-05-22T07:43:41Z',
  generatedAt: '2026-05-22',
  scope: {
    rustLines: 1751152,
    sourceFiles: 4137,
    crates: 135,
    adrs: 203,
    examples: 71,
    npmPackages: 59,
  },
};
