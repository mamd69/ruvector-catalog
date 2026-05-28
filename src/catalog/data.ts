// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'c2089c4e4880c0d2b1f5632043daea6535f4a534',
  ruvectorCommitShort: 'c2089c4e',
  ruvectorCommitDate: '2026-05-28T02:56:07Z',
  generatedAt: '2026-05-28',
  scope: {
    rustLines: 1751925,
    sourceFiles: 4138,
    crates: 135,
    adrs: 349,
    examples: 71,
    npmPackages: 59,
  },
};
