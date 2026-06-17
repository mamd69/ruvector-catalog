// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '644af4323644aa690496a065f0f66da9151208b4',
  ruvectorCommitShort: '644af432',
  ruvectorCommitDate: '2026-06-16T16:53:01Z',
  generatedAt: '2026-06-17',
  scope: {
    rustLines: 1781033,
    sourceFiles: 4218,
    crates: 139,
    adrs: 362,
    examples: 71,
    npmPackages: 59,
  },
};
