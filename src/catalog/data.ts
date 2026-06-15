// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '85e475a45335242dc9535d7efc75dd1bc5f6ec7d',
  ruvectorCommitShort: '85e475a4',
  ruvectorCommitDate: '2026-06-15T02:23:53Z',
  generatedAt: '2026-06-15',
  scope: {
    rustLines: 1777807,
    sourceFiles: 4211,
    crates: 139,
    adrs: 356,
    examples: 71,
    npmPackages: 59,
  },
};
