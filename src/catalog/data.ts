// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '53f0419782a472d0a8cc683673667e79f3c350bb',
  ruvectorCommitShort: '53f04197',
  ruvectorCommitDate: '2026-05-17T02:44:49+00:00',
  generatedAt: '2026-05-18',
  scope: {
    rustLines: 1750489,
    sourceFiles: 4136,
    crates: 135,
    adrs: 203,
    examples: 71,
    npmPackages: 59,
  },
};
