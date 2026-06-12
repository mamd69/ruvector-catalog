// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'ee6ba20d60a155f3495e68405a7eeb9b9593b8dd',
  ruvectorCommitShort: 'ee6ba20d',
  ruvectorCommitDate: '2026-06-12T03:21:10Z',
  generatedAt: '2026-06-12',
  scope: {
    rustLines: 1760386,
    sourceFiles: 4173,
    crates: 135,
    adrs: 354,
    examples: 71,
    npmPackages: 59,
  },
};
