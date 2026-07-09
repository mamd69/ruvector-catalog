// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'c87541c9507084b9eb61b20bb1e460fa79545343',
  ruvectorCommitShort: 'c87541c9',
  ruvectorCommitDate: '2026-07-05T15:25:57Z',
  generatedAt: '2026-07-09',
  scope: {
    rustLines: 1758957,
    sourceFiles: 4341,
    crates: 159,
    adrs: 404,
    examples: 73,
    npmPackages: 57,
  },
};
