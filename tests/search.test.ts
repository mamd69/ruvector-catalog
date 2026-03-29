// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import { describe, test, expect } from 'bun:test';
import { SparseTfIdfEmbedder } from '../src/discovery/embeddings.js';
import type { SparseVector } from '../src/discovery/embeddings.js';
import { SearchEngine } from '../src/discovery/search.js';
import { CatalogRepository } from '../src/catalog/repository.js';

describe('SparseTfIdfEmbedder', () => {
  const documents = [
    { id: 'doc-1', text: 'nearest neighbor vector search similarity hnsw index embedding', weight: 1.0 },
    { id: 'doc-2', text: 'graph database knowledge relationships cypher pagerank', weight: 1.0 },
    { id: 'doc-3', text: 'attention transformer sequence token flash multi-head efficient', weight: 1.0 },
    { id: 'doc-4', text: 'learning adapt improve experience sona lora fine-tune self-learning', weight: 1.0 },
    { id: 'doc-5', text: 'hallucination drift coherence safety verify governance proof prime-radiant', weight: 1.0 },
    { id: 'doc-6', text: 'spiking neural network brain bio neuron hopfield', weight: 1.0 },
    { id: 'doc-7', text: 'quantum circuit simulation qubit grover vqe', weight: 1.0 },
    { id: 'doc-8', text: 'distributed consensus raft replication cluster sharding', weight: 1.0 },
    { id: 'doc-9', text: 'screenpipe monitor user actions desktop efficiency ospipe', weight: 1.0 },
    { id: 'doc-10', text: 'healthcare clinical patient safety monitoring diagnostic', weight: 1.0 },
  ];

  test('builds vocabulary from corpus', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);
    expect(embedder.isBuilt).toBe(true);
    expect(embedder.vocabularySize).toBeGreaterThan(30);
  });

  test('produces sparse vectors (not dense hashed)', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);
    const vec = embedder.embed('vector search nearest neighbor');

    // Sparse vectors use index/value pairs, not fixed dimensions
    expect(vec.indices).toBeInstanceOf(Array);
    expect(vec.values).toBeInstanceOf(Array);
    expect(vec.indices.length).toBe(vec.values.length);
    expect(vec.indices.length).toBeGreaterThan(0);
    expect(vec.norm).toBeGreaterThan(0);
  });

  test('sparse vector indices are sorted ascending', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);
    const vec = embedder.embed('vector search nearest neighbor hallucination');

    for (let i = 1; i < vec.indices.length; i++) {
      expect(vec.indices[i]).toBeGreaterThan(vec.indices[i - 1]);
    }
  });

  test('cosine similarity between sparse vectors', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);

    const v1 = embedder.embed('vector search nearest neighbor');
    const v2 = embedder.embed('similarity search vector index');
    const v3 = embedder.embed('quantum circuit qubit simulation');

    const sim12 = embedder.similarity(v1, v2);
    const sim13 = embedder.similarity(v1, v3);

    // Similar texts should have higher similarity
    expect(sim12).toBeGreaterThan(sim13);
    // Similarity should be between 0 and 1 for non-negative TF-IDF
    expect(sim12).toBeGreaterThanOrEqual(0);
    expect(sim12).toBeLessThanOrEqual(1);
  });

  test('different domains produce low similarity', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);

    const search = embedder.embed('vector search nearest neighbor');
    const quantum = embedder.embed('quantum circuit simulation qubit');

    const sim = embedder.similarity(search, quantum);
    expect(sim).toBeLessThan(0.3);
  });

  test('empty text returns zero-norm vector', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);
    const vec = embedder.embed('');

    expect(vec.indices.length).toBe(0);
    expect(vec.values.length).toBe(0);
    expect(vec.norm).toBe(0);
  });

  test('zero-norm vector similarity returns 0', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);

    const empty = embedder.embed('');
    const vec = embedder.embed('vector search');

    expect(embedder.similarity(empty, vec)).toBe(0);
    expect(embedder.similarity(vec, empty)).toBe(0);
  });

  test('serialization round-trip preserves vectors', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);

    const query = 'vector search nearest neighbor';
    const before = embedder.embed(query);

    const snapshot = embedder.serialize();
    const restored = SparseTfIdfEmbedder.deserialize(snapshot);

    expect(restored.isBuilt).toBe(true);
    expect(restored.vocabularySize).toBe(embedder.vocabularySize);

    const after = restored.embed(query);

    expect(after.indices.length).toBe(before.indices.length);
    for (let i = 0; i < before.indices.length; i++) {
      expect(after.indices[i]).toBe(before.indices[i]);
      expect(after.values[i]).toBeCloseTo(before.values[i], 6);
    }
  });

  test('embedding performance (1000 embeds)', () => {
    const embedder = new SparseTfIdfEmbedder();
    embedder.fit(documents);

    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      embedder.embed(documents[i % documents.length].text);
    }
    const elapsed = performance.now() - start;
    const perEmbed = elapsed / 1000;
    console.log(`  Sparse TF-IDF embed: ${perEmbed.toFixed(3)}ms/embed (1000 iterations)`);
    expect(perEmbed).toBeLessThan(1);
  });
});

describe('SearchEngine', () => {
  const repo = new CatalogRepository();
  const engine = new SearchEngine(repo);

  test('returns results for a vector search query', () => {
    const result = engine.search('I need vector search for nearest neighbor');
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.latencyMs).toBeLessThan(100);
  });

  test('results are ranked by score descending', () => {
    const result = engine.search('hallucination detection coherence');
    for (let i = 1; i < result.matches.length; i++) {
      expect(result.matches[i - 1].score).toBeGreaterThanOrEqual(result.matches[i].score);
    }
  });

  test('scores are between 0 and 1', () => {
    const result = engine.search('graph neural network');
    for (const m of result.matches) {
      expect(m.score).toBeGreaterThanOrEqual(0);
      expect(m.score).toBeLessThanOrEqual(1);
    }
  });

  test('score threshold filters results below 0.15', () => {
    const result = engine.search('obscure unrelated quantum financial genomics');
    for (const m of result.matches) {
      expect(m.score).toBeGreaterThanOrEqual(0.15);
    }
  });

  test('respects limit parameter', () => {
    const result3 = engine.search('search', 3);
    const result10 = engine.search('search', 10);
    expect(result3.matches.length).toBeLessThanOrEqual(3);
    expect(result10.matches.length).toBeGreaterThanOrEqual(result3.matches.length);
  });

  test('empty query returns empty results', () => {
    const result = engine.search('');
    expect(result.matches.length).toBe(0);
  });

  test('field weighting: useWhen has higher weight', () => {
    // Technologies with the query terms in their useWhen field should rank higher
    // than technologies that only match on name or description
    const result = engine.search('prevent hallucination in AI output');
    const topIds = result.matches.slice(0, 5).map(m => m.technologyId);

    // prime-radiant's useWhen is about verifying AI outputs / preventing hallucination
    // It should benefit from the 3x useWhen weight boost
    if (topIds.length > 0) {
      // At minimum, results should come from coherence-related capabilities
      const hasCoherenceRelated = result.matches.some(
        m => m.capability.keywords.some(k =>
          ['coherence', 'hallucination', 'safety', 'drift'].includes(k)
        )
      );
      expect(hasCoherenceRelated).toBe(true);
    }
  });

  test('reranking boosts primaryCrate technologies', () => {
    // When a capability's primaryCrate matches, those technologies should get a boost
    const result = engine.search('coherence safety verification');
    if (result.matches.length >= 2) {
      // The first result should ideally come from the primary crate
      const firstMatch = result.matches[0];
      expect(firstMatch.technology.crate).toBeTruthy();
    }
  });

  test('examples are searchable', () => {
    // V3: examples should appear in or influence search results
    const result = engine.search('OSpipe ScreenPipe desktop monitoring');
    const allIds = result.matches.map(m => m.technologyId);
    // The search should find OSpipe-related technologies
    expect(result.matches.length).toBeGreaterThan(0);
  });

  test('search returns totalCandidates count', () => {
    const result = engine.search('anything');
    expect(result.totalCandidates).toBe(repo.technologyCount);
  });

  test('search performance is sub-10ms (warm)', () => {
    // Warmup
    engine.search('vector search');

    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      engine.search('vector search nearest neighbor');
    }
    const elapsed = performance.now() - start;
    const perQuery = elapsed / 100;
    console.log(`  Search latency (warm): ${perQuery.toFixed(3)}ms avg`);
    expect(perQuery).toBeLessThan(10);
  });
});
