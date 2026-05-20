// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: 'dd5e14516417d7e44b2d71168c23b2d5fe2630f8',
  ruvectorCommitShort: 'dd5e1451',
  ruvectorCommitDate: '2026-05-19T14:08:18Z',
  generatedAt: '2026-05-20',
  scope: {
    rustLines: 1750657,
    sourceFiles: 4136,
    crates: 135,
    adrs: 203,
    examples: 71,
    npmPackages: 59,
  },
};
