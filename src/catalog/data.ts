// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '9054c2cc6793ff11175460694a6479be3ac5b0af',
  ruvectorCommitShort: '9054c2cc',
  ruvectorCommitDate: '2026-05-12T13:58:08+00:00',
  generatedAt: '2026-05-16',
  scope: {
    rustLines: 1750254,
    sourceFiles: 4136,
    crates: 135,
    adrs: 203,
    examples: 71,
    npmPackages: 59,
  },
};
