// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '6a6c39e662a4c3184dcb913db91a09401c84b2ae',
  ruvectorCommitShort: '6a6c39e6',
  ruvectorCommitDate: '2026-07-17T20:57:31Z',
  generatedAt: '2026-07-18',
  scope: {
    rustLines: 1760477,
    sourceFiles: 4343,
    crates: 159,
    adrs: 405,
    examples: 73,
    npmPackages: 57,
  },
};
