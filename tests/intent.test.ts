// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import { describe, test, expect } from 'bun:test';
import { IntentClassifier } from '../src/discovery/intent.js';
import { CatalogRepository } from '../src/catalog/repository.js';

describe('IntentClassifier', () => {
  const repo = new CatalogRepository();
  const classifier = new IntentClassifier(repo);

  describe('audience detection', () => {
    test('detects non-technical audience from "explain in plain English"', () => {
      const result = classifier.classify(
        'explain in plain English what capabilities could add value to a clinical healthcare solution'
      );
      expect(result.audienceLevel).toBe('non-technical');
    });

    test('detects non-technical audience from "non-technical level"', () => {
      const result = classifier.classify(
        'explain at non-technical level what capabilities could add value to a clinical healthcare solution'
      );
      expect(result.audienceLevel).toBe('non-technical');
    });

    test('detects non-technical audience from "simple terms"', () => {
      const result = classifier.classify(
        'describe in simple terms how RuVector can help with patient safety'
      );
      expect(result.audienceLevel).toBe('non-technical');
    });

    test('detects executive audience from "executive summary"', () => {
      const result = classifier.classify(
        'give me an executive summary of RuVector capabilities for healthcare'
      );
      expect(result.audienceLevel).toBe('executive');
    });

    test('defaults to technical when no markers present', () => {
      const result = classifier.classify('I need vector search with HNSW indexing');
      expect(result.audienceLevel).toBe('technical');
    });

    test('defaults to technical for crate-name queries', () => {
      const result = classifier.classify('what does ruvector-coherence provide?');
      expect(result.audienceLevel).toBe('technical');
    });
  });

  describe('scope checking', () => {
    test('out-of-scope: "draft best selling books"', () => {
      const result = classifier.classify('draft best selling books from an idea using AI');
      expect(result.intent).toBe('out-of-scope');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('out-of-scope: "generate marketing copy"', () => {
      const result = classifier.classify('generate marketing copy for my product launch');
      expect(result.intent).toBe('out-of-scope');
    });

    test('out-of-scope: "build a website"', () => {
      const result = classifier.classify('build a responsive e-commerce website');
      expect(result.intent).toBe('out-of-scope');
    });

    test('in-scope: "detect hallucinations"', () => {
      const result = classifier.classify(
        'detecting hallucinations in LLM output before it reaches users'
      );
      expect(result.intent).not.toBe('out-of-scope');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('in-scope: "vector search"', () => {
      const result = classifier.classify('I need fast vector search for similarity matching');
      expect(result.intent).not.toBe('out-of-scope');
    });

    test('in-scope: "graph neural network"', () => {
      const result = classifier.classify('build a knowledge graph with GNN');
      expect(result.intent).not.toBe('out-of-scope');
    });

    test('in-scope: "attention mechanism"', () => {
      const result = classifier.classify('efficient attention mechanism for long sequences');
      expect(result.intent).not.toBe('out-of-scope');
    });
  });

  describe('intent classification', () => {
    test('"I need vector search" -> technology-lookup', () => {
      const result = classifier.classify('I need vector search');
      expect(result.intent).toBe('technology-lookup');
    });

    test('"healthcare solution" -> industry-vertical', () => {
      const result = classifier.classify(
        'what capabilities could add value to a clinical healthcare solution'
      );
      expect(result.intent).toBe('industry-vertical');
      expect(result.matchedVertical).toBe('healthcare');
    });

    test('"improve the ruvector-catalog" -> meta-query', () => {
      const result = classifier.classify('improve the ruvector-catalog skill and technology recommender');
      expect(result.intent).toBe('meta-query');
    });

    test('"detect hallucinations" -> problem-solution', () => {
      const result = classifier.classify(
        'detecting hallucinations in LLM output before it reaches users'
      );
      expect(result.intent).toBe('problem-solution');
    });

    test('"financial trading signals" -> industry-vertical', () => {
      const result = classifier.classify('detect anomalies in financial trading signals');
      expect(result.intent).toBe('industry-vertical');
      expect(result.matchedVertical).toBe('finance');
    });

    test('"robotics perception pipeline" -> industry-vertical', () => {
      const result = classifier.classify('build a real-time robotics perception pipeline');
      expect(result.intent).toBe('industry-vertical');
      expect(result.matchedVertical).toBe('robotics');
    });
  });

  describe('vertical detection', () => {
    test('detects healthcare vertical', () => {
      const result = classifier.classify('clinical healthcare patient safety monitoring');
      expect(result.matchedVertical).toBe('healthcare');
    });

    test('detects finance vertical', () => {
      const result = classifier.classify('financial trading risk compliance monitoring');
      expect(result.matchedVertical).toBe('finance');
    });

    test('detects robotics vertical', () => {
      const result = classifier.classify('autonomous robot perception and navigation');
      expect(result.matchedVertical).toBe('robotics');
    });

    test('detects edge-iot vertical', () => {
      const result = classifier.classify('deploy ML models on edge IoT devices');
      expect(result.matchedVertical).toBe('edge-iot');
    });

    test('no vertical for generic queries', () => {
      const result = classifier.classify('I need vector search with HNSW');
      expect(result.matchedVertical).toBeNull();
    });
  });

  describe('query expansion', () => {
    test('"hallucination" expands to include coherence-related terms', () => {
      const result = classifier.classify(
        'detecting hallucinations in LLM output before it reaches users'
      );
      expect(result.expandedTerms.length).toBeGreaterThan(0);

      const expanded = result.expandedTerms.map(t => t.toLowerCase());
      const expectedAny = ['coherence', 'drift', 'safety', 'verification', 'grounding'];
      const hasExpansion = expectedAny.some(term => expanded.includes(term));
      expect(hasExpansion).toBe(true);
    });

    test('"vector search" expands to include indexing-related terms', () => {
      const result = classifier.classify('I need vector search');
      const expanded = result.expandedTerms.map(t => t.toLowerCase());
      const expectedAny = ['hnsw', 'similarity', 'nearest neighbor', 'embedding', 'index'];
      const hasExpansion = expectedAny.some(term =>
        expanded.some(e => e.includes(term))
      );
      expect(hasExpansion).toBe(true);
    });

    test('"learning" expands to include self-learning terms', () => {
      const result = classifier.classify('adaptive learning that improves over time');
      const expanded = result.expandedTerms.map(t => t.toLowerCase());
      const expectedAny = ['sona', 'reasoning', 'lora', 'fine-tune', 'adaptation'];
      const hasExpansion = expectedAny.some(term =>
        expanded.some(e => e.includes(term))
      );
      expect(hasExpansion).toBe(true);
    });

    test('empty query produces no expanded terms', () => {
      const result = classifier.classify('');
      expect(result.expandedTerms.length).toBe(0);
    });
  });

  describe('confidence scoring', () => {
    test('high confidence for clear in-scope queries', () => {
      const result = classifier.classify('I need HNSW vector search for nearest neighbor queries');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('high confidence for clear out-of-scope queries', () => {
      const result = classifier.classify('draft best selling books from an idea using AI');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('lower confidence for ambiguous queries', () => {
      const result = classifier.classify('help me with my project');
      expect(result.confidence).toBeLessThan(0.8);
    });
  });
});
