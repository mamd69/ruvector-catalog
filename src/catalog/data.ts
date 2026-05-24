// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'cf074121e580a2e2d91a3d0deb0275e989915a96',
  ruvectorCommitShort: 'cf074121',
  ruvectorCommitDate: '2026-05-23T10:52:21Z',
  generatedAt: '2026-05-24',
  scope: {
    rustLines: 1751925,
    sourceFiles: 4138,
    crates: 135,
    adrs: 349,
    examples: 71,
    npmPackages: 59,
  },
};
