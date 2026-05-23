// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import type { CatalogVersion } from '../types/index.js';

export { CAPABILITIES } from './data-capabilities.js';
export { PROBLEM_SECTIONS, OUT_OF_SCOPE, EXAMPLES } from './data-sections.js';
export { VERTICALS } from './data-verticals.js';

export const CATALOG_VERSION: CatalogVersion = {
  inventoryVersion: '4.0.0',
  ruvectorVersion: 'v3.0.0',
  ruvectorCommit: '44dd8de2b8987643c71687e53faf832d3a04cef9',
  ruvectorCommitShort: '44dd8de2',
  ruvectorCommitDate: '2026-05-23T07:45:16Z',
  generatedAt: '2026-05-23',
  scope: {
    rustLines: 1751772,
    sourceFiles: 4138,
    crates: 133,
    adrs: 349,
    examples: 71,
    npmPackages: 59,
  },
};
