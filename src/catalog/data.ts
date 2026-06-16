// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '892b7a15c84f70fb4443b7b1cc7a3c5bcdcdab4f',
  ruvectorCommitShort: '892b7a15',
  ruvectorCommitDate: '2026-06-15T16:49:59Z',
  generatedAt: '2026-06-16',
  scope: {
    rustLines: 1780957,
    sourceFiles: 4218,
    crates: 139,
    adrs: 358,
    examples: 71,
    npmPackages: 59,
  },
};
