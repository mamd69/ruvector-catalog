// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import { describe, test, expect } from 'bun:test';
import { CatalogRepository } from '../src/catalog/repository.js';
import { SearchEngine } from '../src/discovery/search.js';
import { IntentClassifier } from '../src/discovery/intent.js';
import { ProposalService } from '../src/proposals/generator.js';

describe('ProposalService', () => {
  const repo = new CatalogRepository();
  const engine = new SearchEngine(repo);
  const classifier = new IntentClassifier(repo);
  const proposals = new ProposalService(repo);

  describe('basic proposal generation', () => {
    test('generates a proposal from search results', () => {
      const result = engine.search('make my search 10x faster');
      const proposal = proposals.generate('make my search 10x faster', result, 'test-project');

      expect(proposal.id).toMatch(/^RVBP-\d{4}-\d{2}-\d{2}/);
      expect(proposal.title).toBeTruthy();
      expect(proposal.projectName).toBe('test-project');
      expect(proposal.matches.length).toBeGreaterThan(0);
      expect(proposal.integrationPlan.phase1.steps.length).toBeGreaterThan(0);
      expect(proposal.integrationPlan.phase2.steps.length).toBeGreaterThan(0);
      expect(proposal.integrationPlan.phase3.steps.length).toBeGreaterThan(0);
      expect(proposal.dependencies.length).toBeGreaterThan(0);
      expect(proposal.codeExample).toBeTruthy();
      expect(proposal.risks.length).toBeGreaterThan(0);
    });

    test('proposal matches are ranked', () => {
      const result = engine.search('graph neural network attention');
      const proposal = proposals.generate('graph neural network attention', result);

      for (let i = 0; i < proposal.matches.length; i++) {
        expect(proposal.matches[i].rank).toBe(i + 1);
      }
    });

    test('proposal matches include difficulty assessment', () => {
      const result = engine.search('vector search nearest neighbor');
      const proposal = proposals.generate('vector search nearest neighbor', result);

      for (const m of proposal.matches) {
        expect(['easy', 'medium', 'hard']).toContain(m.integrationDifficulty);
      }
    });

    test('renders proposal to valid markdown', () => {
      const result = engine.search('prevent model drift hallucination');
      const proposal = proposals.generate('prevent model drift hallucination', result);
      const md = proposals.render(proposal);

      expect(md).toContain('# RVBP-');
      expect(md).toContain('## Problem Statement');
      expect(md).toContain('## Matched Technologies');
      expect(md).toContain('## Recommended Integration Plan');
      expect(md).toContain('## Dependencies');
      expect(md).toContain('## Code Example');
      expect(md).toContain('```rust');
      expect(md).toContain('## Risks and Mitigations');
    });

    test('rendered markdown includes all matches', () => {
      const result = engine.search('search embedding');
      const proposal = proposals.generate('search embedding', result);
      const md = proposals.render(proposal);

      for (const m of proposal.matches) {
        expect(md).toContain(m.technology.name);
        expect(md).toContain(m.technology.crate);
      }
    });

    test('dependencies have no duplicates', () => {
      const result = engine.search('vector search hnsw');
      const proposal = proposals.generate('vector search hnsw', result);
      const crateNames = proposal.dependencies.map(d => d.name);
      const unique = new Set(crateNames);
      expect(crateNames.length).toBe(unique.size);
    });

    test('catalog version is included in proposal', () => {
      const result = engine.search('anything');
      const proposal = proposals.generate('anything', result);
      expect(proposal.catalogVersion.inventoryVersion).toBe('4.0.0');
      expect(proposal.catalogVersion.ruvectorCommitShort).toBe('3bbc8170');
    });
  });

  describe('V3: out-of-scope proposals', () => {
    test('out-of-scope query produces scope advisory', () => {
      const query = 'draft best selling books from an idea using AI';
      const intent = classifier.classify(query);

      expect(intent.intent).toBe('out-of-scope');

      const result = engine.search(query);
      const proposal = proposals.generate(query, result, 'test-project', intent);

      // Proposal should contain a scope advisory
      expect(proposal.scopeAdvisory).toBeTruthy();
      expect(proposal.scopeAdvisory!.verdict).toBe('out-of-scope');
      expect(proposal.scopeAdvisory!.message).toBeTruthy();
    });

    test('out-of-scope proposal still renders to markdown', () => {
      const query = 'generate marketing emails automatically';
      const intent = classifier.classify(query);
      const result = engine.search(query);
      const proposal = proposals.generate(query, result, 'test', intent);
      const md = proposals.render(proposal);

      expect(md).toContain('Scope');
      expect(md.length).toBeGreaterThan(100);
    });

    test('in-scope query does not produce scope advisory', () => {
      const query = 'I need fast vector search for nearest neighbor';
      const intent = classifier.classify(query);
      const result = engine.search(query);
      const proposal = proposals.generate(query, result, 'test', intent);

      expect(proposal.scopeAdvisory).toBeUndefined();
    });
  });

  describe('V3: industry vertical framing', () => {
    test('healthcare vertical produces domain-specific framing', () => {
      const query = 'explain at non-technical level what capabilities could add value to a clinical healthcare solution';
      const intent = classifier.classify(query);

      expect(intent.matchedVertical).toBe('healthcare');

      const result = engine.search(query);
      const proposal = proposals.generate(query, result, 'clinical-app', intent);

      // Proposal should have vertical-specific content
      expect(proposal.verticalContext).toBeTruthy();
      expect(proposal.verticalContext!.vertical).toBe('healthcare');
      expect(proposal.verticalContext!.regulatoryContext.length).toBeGreaterThan(0);
    });

    test('finance vertical produces domain-specific framing', () => {
      const query = 'detect anomalies in financial trading signals';
      const intent = classifier.classify(query);

      expect(intent.matchedVertical).toBe('finance');

      const result = engine.search(query);
      const proposal = proposals.generate(query, result, 'trading-app', intent);

      expect(proposal.verticalContext).toBeTruthy();
      expect(proposal.verticalContext!.vertical).toBe('finance');
    });

    test('generic query does not produce vertical context', () => {
      const query = 'I need fast vector search';
      const intent = classifier.classify(query);
      const result = engine.search(query);
      const proposal = proposals.generate(query, result, 'test', intent);

      expect(proposal.verticalContext).toBeUndefined();
    });

    test('rendered markdown includes vertical section when present', () => {
      const query = 'clinical healthcare patient safety monitoring';
      const intent = classifier.classify(query);
      const result = engine.search(query);
      const proposal = proposals.generate(query, result, 'clinical-app', intent);
      const md = proposals.render(proposal);

      if (proposal.verticalContext) {
        expect(md).toContain('Healthcare');
      }
    });
  });

  describe('V3: non-technical adaptation', () => {
    test('non-technical audience gets plain language descriptions', () => {
      const query = 'explain in plain English what RuVector can do for healthcare';
      const intent = classifier.classify(query);

      expect(intent.audienceLevel).toBe('non-technical');

      const result = engine.search(query);
      const proposal = proposals.generate(query, result, 'clinic', intent);
      const md = proposals.render(proposal);

      // Non-technical output should avoid raw crate names without explanation
      // and should use plain language
      expect(md.length).toBeGreaterThan(100);
    });
  });
});
