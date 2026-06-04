// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'edf6b04219d4cfe553e0f6ce3dce8897d522e2a1',
  ruvectorCommitShort: 'edf6b042',
  ruvectorCommitDate: '2026-06-03T13:34:07Z',
  generatedAt: '2026-06-04',
  scope: {
    rustLines: 1751925,
    sourceFiles: 4138,
    crates: 135,
    adrs: 351,
    examples: 71,
    npmPackages: 59,
  },
};
