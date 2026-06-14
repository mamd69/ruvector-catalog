// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '524751e435266e3f0f49b3d89e8980c2dde3227d',
  ruvectorCommitShort: '524751e4',
  ruvectorCommitDate: '2026-06-13T17:23:15Z',
  generatedAt: '2026-06-14',
  scope: {
    rustLines: 1777807,
    sourceFiles: 4211,
    crates: 139,
    adrs: 356,
    examples: 71,
    npmPackages: 59,
  },
};
