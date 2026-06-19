// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '6d2da757121026888c6439e2bb35a516f89801b4',
  ruvectorCommitShort: '6d2da757',
  ruvectorCommitDate: '2026-06-19T05:15:51Z',
  generatedAt: '2026-06-19',
  scope: {
    rustLines: 1731659,
    sourceFiles: 4213,
    crates: 148,
    adrs: 364,
    examples: 70,
    npmPackages: 57,
  },
};
