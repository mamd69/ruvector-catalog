// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import { describe, test, expect } from 'bun:test';
import { CatalogRepository } from '../src/catalog/repository.js';

describe('CatalogRepository', () => {
  const repo = new CatalogRepository();

  describe('V2 compatibility', () => {
    test('loads all capabilities', () => {
      const caps = repo.listCapabilities();
      expect(caps.length).toBeGreaterThanOrEqual(15);
    });

    test('loads technologies across capabilities', () => {
      const techs = repo.listTechnologies();
      expect(techs.length).toBeGreaterThanOrEqual(40);
    });

    test('getCapability returns correct data', () => {
      const cap = repo.getCapability('vector_search');
      expect(cap).not.toBeNull();
      expect(cap!.primaryCrate).toBeTruthy();
      expect(cap!.technologies.length).toBeGreaterThanOrEqual(3);
    });

    test('getCapability returns null for unknown id', () => {
      expect(repo.getCapability('nonexistent')).toBeNull();
    });

    test('getTechnology returns correct data', () => {
      const tech = repo.getTechnology('hnsw');
      expect(tech).not.toBeNull();
      expect(tech!.name).toBe('HNSW');
      expect(tech!.status).toBe('production');
    });

    test('getTechnology returns null for unknown id', () => {
      expect(repo.getTechnology('nonexistent')).toBeNull();
    });

    test('listTechnologies filters by status', () => {
      const prod = repo.listTechnologies({ status: 'production' });
      const experimental = repo.listTechnologies({ status: 'experimental' });
      expect(prod.length).toBeGreaterThan(0);
      expect(prod.every(t => t.status === 'production')).toBe(true);
      if (experimental.length > 0) {
        expect(experimental.every(t => t.status === 'experimental')).toBe(true);
      }
    });

    test('listTechnologies filters by deployment target', () => {
      const wasm = repo.listTechnologies({ deploymentTarget: 'wasm' });
      expect(wasm.length).toBeGreaterThan(0);
      expect(wasm.every(t => t.deploymentTargets.includes('wasm'))).toBe(true);
    });

    test('listTechnologies filters by capability', () => {
      const caps = repo.listCapabilities();
      if (caps.length > 0) {
        const capId = caps[0].id;
        const techs = repo.listTechnologies({ capability: capId });
        expect(techs.every(t => t.capabilityId === capId)).toBe(true);
      }
    });

    test('version returns valid data', () => {
      const v = repo.getVersion();
      expect(v.inventoryVersion).toBe('4.0.0');
      expect(v.scope.crates).toBe(114);
      expect(v.scope.rustLines).toBeGreaterThan(1_000_000);
    });

    test('counts are consistent', () => {
      expect(repo.technologyCount).toBe(repo.listTechnologies().length);
      expect(repo.capabilityCount).toBe(repo.listCapabilities().length);
    });

    test('every technology references a valid capability', () => {
      for (const tech of repo.listTechnologies()) {
        const cap = repo.getCapability(tech.capabilityId);
        expect(cap).not.toBeNull();
      }
    });
  });

  describe('V3: examples', () => {
    test('lists all examples', () => {
      const examples = repo.listExamples();
      expect(examples.length).toBeGreaterThan(0);
    });

    test('examples have required fields', () => {
      const examples = repo.listExamples();
      for (const ex of examples) {
        expect(ex.name).toBeTruthy();
        expect(ex.path).toBeTruthy();
        expect(ex.description).toBeTruthy();
        expect(ex.technologiesUsed).toBeInstanceOf(Array);
      }
    });

    test('getExample returns data for known example', () => {
      const examples = repo.listExamples();
      if (examples.length > 0) {
        const found = repo.getExample(examples[0].name);
        expect(found).not.toBeNull();
        expect(found!.name).toBe(examples[0].name);
      }
    });

    test('getExample returns null for unknown name', () => {
      expect(repo.getExample('nonexistent-example')).toBeNull();
    });

    test('exampleCount is consistent', () => {
      expect(repo.exampleCount).toBe(repo.listExamples().length);
    });
  });

  describe('V3: problem sections', () => {
    test('lists problem sections', () => {
      const sections = repo.listProblemSections();
      expect(sections.length).toBeGreaterThan(0);
    });

    test('problem sections have required fields', () => {
      const sections = repo.listProblemSections();
      for (const section of sections) {
        expect(section.id).toBeTruthy();
        expect(section.header).toBeTruthy();
        expect(section.synonyms).toBeInstanceOf(Array);
        expect(section.technologies).toBeInstanceOf(Array);
        expect(section.technologies.length).toBeGreaterThan(0);
        expect(section.primaryCrate).toBeTruthy();
      }
    });

    test('problem section technologies reference valid technology ids', () => {
      const sections = repo.listProblemSections();
      for (const section of sections) {
        for (const techId of section.technologies) {
          const tech = repo.getTechnology(techId);
          expect(tech).not.toBeNull();
        }
      }
    });

    test('getProblemSection returns data for known id', () => {
      const sections = repo.listProblemSections();
      if (sections.length > 0) {
        const found = repo.getProblemSection(sections[0].id);
        expect(found).not.toBeNull();
      }
    });
  });

  describe('V3: out-of-scope list', () => {
    test('returns out-of-scope categories', () => {
      const outOfScope = repo.getOutOfScopeList();
      expect(outOfScope.length).toBeGreaterThan(0);
    });

    test('out-of-scope categories are strings', () => {
      const outOfScope = repo.getOutOfScopeList();
      for (const item of outOfScope) {
        expect(typeof item).toBe('string');
        expect(item.length).toBeGreaterThan(0);
      }
    });

    test('content generation is out of scope', () => {
      const outOfScope = repo.getOutOfScopeList();
      const hasContentGen = outOfScope.some(
        s => s.toLowerCase().includes('content') || s.toLowerCase().includes('generation')
      );
      expect(hasContentGen).toBe(true);
    });
  });

  describe('V3: vertical mappings', () => {
    test('returns vertical mappings', () => {
      const verticals = repo.listVerticals();
      expect(verticals.length).toBeGreaterThan(0);
    });

    test('healthcare vertical exists', () => {
      const verticals = repo.listVerticals();
      const healthcare = verticals.find(v => v.vertical === 'healthcare');
      expect(healthcare).not.toBeUndefined();
    });

    test('vertical mappings have capabilities', () => {
      const verticals = repo.listVerticals();
      for (const v of verticals) {
        expect(v.capabilities.length).toBeGreaterThan(0);
        for (const cap of v.capabilities) {
          expect(cap.label).toBeTruthy();
          expect(cap.technologyIds).toBeInstanceOf(Array);
          expect(cap.technologyIds.length).toBeGreaterThan(0);
          expect(cap.plainDescription).toBeTruthy();
        }
      }
    });

    test('vertical technology ids reference valid technologies', () => {
      const verticals = repo.listVerticals();
      for (const v of verticals) {
        for (const cap of v.capabilities) {
          for (const techId of cap.technologyIds) {
            const tech = repo.getTechnology(techId);
            expect(tech).not.toBeNull();
          }
        }
      }
    });

    test('getVertical returns data for known vertical', () => {
      const healthcare = repo.getVertical('healthcare');
      expect(healthcare).not.toBeNull();
      expect(healthcare!.vertical).toBe('healthcare');
    });

    test('getVertical returns null for unknown vertical', () => {
      expect(repo.getVertical('nonexistent' as any)).toBeNull();
    });
  });

  describe('V3: technology extensions', () => {
    test('technologies have useCases field', () => {
      const techs = repo.listTechnologies();
      for (const tech of techs) {
        expect(tech.useCases).toBeInstanceOf(Array);
      }
    });

    test('technologies have verticals field', () => {
      const techs = repo.listTechnologies();
      for (const tech of techs) {
        expect(tech.verticals).toBeInstanceOf(Array);
      }
    });

    test('some technologies have healthcare vertical', () => {
      const techs = repo.listTechnologies();
      const withHealthcare = techs.filter(t => t.verticals.includes('healthcare'));
      expect(withHealthcare.length).toBeGreaterThan(0);
    });

    test('technologies have plainDescription field', () => {
      const techs = repo.listTechnologies();
      // At least some technologies should have plain descriptions
      const withPlainDesc = techs.filter(t => t.plainDescription !== null);
      expect(withPlainDesc.length).toBeGreaterThan(0);
    });
  });

  describe('V3: capability extensions', () => {
    test('capabilities have problemStatement field', () => {
      const caps = repo.listCapabilities();
      for (const cap of caps) {
        expect(typeof cap.problemStatement).toBe('string');
      }
    });

    test('capabilities have synonyms field', () => {
      const caps = repo.listCapabilities();
      for (const cap of caps) {
        expect(cap.synonyms).toBeInstanceOf(Array);
      }
    });

    test('capabilities have relatedCapabilities field', () => {
      const caps = repo.listCapabilities();
      for (const cap of caps) {
        expect(cap.relatedCapabilities).toBeInstanceOf(Array);
      }
    });
  });
});
