// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'ea3e2f227fa6fcce034502ca122f1d4efc5516ee',
  ruvectorCommitShort: 'ea3e2f22',
  ruvectorCommitDate: '2026-06-18T02:56:30Z',
  generatedAt: '2026-06-18',
  scope: {
    rustLines: 1711611,
    sourceFiles: 4127,
    crates: 137,
    adrs: 352,
    examples: 70,
    npmPackages: 57,
  },
};
