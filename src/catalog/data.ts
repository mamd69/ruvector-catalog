// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '712e22c14ea5644ba768c82c55a9516be5f1d6f7',
  ruvectorCommitShort: '712e22c1',
  ruvectorCommitDate: '2026-05-30T23:59:06Z',
  generatedAt: '2026-05-31',
  scope: {
    rustLines: 1751925,
    sourceFiles: 4138,
    crates: 135,
    adrs: 352,
    examples: 90,
    npmPackages: 59,
  },
};
