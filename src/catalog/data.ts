// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '8f2b4bd822fd4df461e8be09e9df64f11b54fa09',
  ruvectorCommitShort: '8f2b4bd8',
  ruvectorCommitDate: '2026-06-12T23:34:29Z',
  generatedAt: '2026-06-13',
  scope: {
    rustLines: 1771156,
    sourceFiles: 4190,
    crates: 139,
    adrs: 355,
    examples: 71,
    npmPackages: 59,
  },
};
