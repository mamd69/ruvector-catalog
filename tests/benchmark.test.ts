// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector
//
// Performance benchmarks with timing. Measures cold/warm latency for
// search, intent classification, index build, and RVBP generation.

import { describe, test, expect } from 'bun:test';
import { CatalogRepository } from '../src/catalog/repository.js';
import { SearchEngine } from '../src/discovery/search.js';
import { IntentClassifier } from '../src/discovery/intent.js';
import { ProposalService } from '../src/proposals/generator.js';
import { SparseTfIdfEmbedder } from '../src/discovery/embeddings.js';

const BENCHMARK_QUERIES = [
  'detecting hallucinations in LLM output before it reaches users',
  'draft best selling books from an idea using AI',
  'monitor all user actions on a computer and suggest efficiency improvements through AI and automation',
  'improve the ruvector-catalog skill and technology recommender',
  'explain at non-technical level what capabilities could add value to a clinical healthcare solution',
];

describe('Performance Benchmarks', () => {
  describe('repository initialization', () => {
    test('CatalogRepository init time', () => {
      const iterations = 100;
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        new CatalogRepository();
      }
      const elapsed = performance.now() - start;
      const perInit = elapsed / iterations;
      console.log(`  Repository init: ${perInit.toFixed(3)}ms avg (${iterations} iterations)`);
      expect(perInit).toBeLessThan(10);
    });
  });

  describe('search latency', () => {
    const repo = new CatalogRepository();
    const engine = new SearchEngine(repo);

    test('cold search latency across all 5 queries', () => {
      // First run is cold (no warmup)
      const times: number[] = [];
      for (const query of BENCHMARK_QUERIES) {
        const start = performance.now();
        engine.search(query, 5);
        times.push(performance.now() - start);
      }

      const avg = times.reduce((a, b) => a + b) / times.length;
      const max = Math.max(...times);
      const min = Math.min(...times);

      console.log('  Cold search latency (5 queries):');
      console.log(`    avg: ${avg.toFixed(3)}ms`);
      console.log(`    min: ${min.toFixed(3)}ms`);
      console.log(`    max: ${max.toFixed(3)}ms`);
      for (let i = 0; i < BENCHMARK_QUERIES.length; i++) {
        console.log(`    Q${i + 1}: ${times[i].toFixed(3)}ms`);
      }

      // Cold start may be slower, but should still be under 50ms
      expect(avg).toBeLessThan(50);
    });

    test('warm search latency across all 5 queries', () => {
      // Warmup
      for (const query of BENCHMARK_QUERIES) {
        engine.search(query, 5);
      }

      const times: number[] = [];
      const iterations = 10;

      for (const query of BENCHMARK_QUERIES) {
        const queryTimes: number[] = [];
        for (let i = 0; i < iterations; i++) {
          const start = performance.now();
          engine.search(query, 5);
          queryTimes.push(performance.now() - start);
        }
        times.push(queryTimes.reduce((a, b) => a + b) / iterations);
      }

      const avg = times.reduce((a, b) => a + b) / times.length;
      const max = Math.max(...times);
      const min = Math.min(...times);

      console.log(`  Warm search latency (5 queries, ${iterations} iterations each):`);
      console.log(`    avg: ${avg.toFixed(3)}ms`);
      console.log(`    min: ${min.toFixed(3)}ms`);
      console.log(`    max: ${max.toFixed(3)}ms`);
      for (let i = 0; i < BENCHMARK_QUERIES.length; i++) {
        console.log(`    Q${i + 1}: ${times[i].toFixed(3)}ms`);
      }

      // Warm queries must be under 10ms per ADR-009
      expect(avg).toBeLessThan(10);
    });

    test('search throughput (queries per second)', () => {
      // Warmup
      engine.search('warmup', 5);

      const start = performance.now();
      const iterations = 500;
      for (let i = 0; i < iterations; i++) {
        engine.search(BENCHMARK_QUERIES[i % BENCHMARK_QUERIES.length], 5);
      }
      const elapsed = performance.now() - start;
      const qps = (iterations / elapsed) * 1000;

      console.log(`  Throughput: ${qps.toFixed(0)} queries/sec (${iterations} iterations in ${elapsed.toFixed(0)}ms)`);
      expect(qps).toBeGreaterThan(100);
    });
  });

  describe('sparse TF-IDF index build time', () => {
    test('index build from catalog data', () => {
      const repo = new CatalogRepository();
      const techs = repo.listTechnologies();
      const caps = repo.listCapabilities();

      const documents = techs.map(tech => {
        const cap = caps.find(c => c.id === tech.capabilityId);
        return {
          id: tech.id,
          text: [
            tech.name,
            tech.useWhen ?? '',
            tech.features ?? '',
            tech.crate,
            cap?.description ?? '',
            cap?.keywords.join(' ') ?? '',
            tech.useCases.join(' '),
            tech.plainDescription ?? '',
          ].join(' '),
          weight: 1.0,
        };
      });

      const iterations = 10;
      const times: number[] = [];

      for (let i = 0; i < iterations; i++) {
        const embedder = new SparseTfIdfEmbedder();
        const start = performance.now();
        embedder.fit(documents);
        times.push(performance.now() - start);
      }

      const avg = times.reduce((a, b) => a + b) / times.length;
      console.log(`  Sparse TF-IDF index build: ${avg.toFixed(3)}ms avg (${iterations} iterations, ${documents.length} documents)`);

      // Index build should be under 50ms for ~60 technologies
      expect(avg).toBeLessThan(50);
    });
  });

  describe('intent classification latency', () => {
    const repo = new CatalogRepository();
    const classifier = new IntentClassifier(repo);

    test('cold intent classification', () => {
      const times: number[] = [];
      for (const query of BENCHMARK_QUERIES) {
        const start = performance.now();
        classifier.classify(query);
        times.push(performance.now() - start);
      }

      const avg = times.reduce((a, b) => a + b) / times.length;
      console.log('  Cold intent classification (5 queries):');
      console.log(`    avg: ${avg.toFixed(3)}ms`);
      for (let i = 0; i < BENCHMARK_QUERIES.length; i++) {
        console.log(`    Q${i + 1}: ${times[i].toFixed(3)}ms`);
      }

      expect(avg).toBeLessThan(10);
    });

    test('warm intent classification', () => {
      // Warmup
      for (const q of BENCHMARK_QUERIES) classifier.classify(q);

      const iterations = 100;
      const times: number[] = [];

      for (const query of BENCHMARK_QUERIES) {
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
          classifier.classify(query);
        }
        times.push((performance.now() - start) / iterations);
      }

      const avg = times.reduce((a, b) => a + b) / times.length;
      console.log(`  Warm intent classification (5 queries, ${iterations} iterations each):`);
      console.log(`    avg: ${avg.toFixed(3)}ms`);
      for (let i = 0; i < BENCHMARK_QUERIES.length; i++) {
        console.log(`    Q${i + 1}: ${times[i].toFixed(3)}ms`);
      }

      expect(avg).toBeLessThan(5);
    });
  });

  describe('RVBP generation latency', () => {
    const repo = new CatalogRepository();
    const engine = new SearchEngine(repo);
    const classifier = new IntentClassifier(repo);
    const proposals = new ProposalService(repo);

    test('proposal generation latency', () => {
      const times: number[] = [];
      for (const query of BENCHMARK_QUERIES) {
        const intent = classifier.classify(query);
        const result = engine.search(query, 5);

        const start = performance.now();
        proposals.generate(query, result, 'benchmark', intent);
        times.push(performance.now() - start);
      }

      const avg = times.reduce((a, b) => a + b) / times.length;
      console.log('  Proposal generation (5 queries):');
      console.log(`    avg: ${avg.toFixed(3)}ms`);
      for (let i = 0; i < BENCHMARK_QUERIES.length; i++) {
        console.log(`    Q${i + 1}: ${times[i].toFixed(3)}ms`);
      }

      expect(avg).toBeLessThan(50);
    });

    test('proposal render latency', () => {
      const query = BENCHMARK_QUERIES[0];
      const intent = classifier.classify(query);
      const result = engine.search(query, 5);
      const proposal = proposals.generate(query, result, 'benchmark', intent);

      const iterations = 100;
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        proposals.render(proposal);
      }
      const elapsed = performance.now() - start;
      const avg = elapsed / iterations;

      console.log(`  Proposal render: ${avg.toFixed(3)}ms avg (${iterations} iterations)`);
      expect(avg).toBeLessThan(5);
    });
  });

  describe('end-to-end pipeline latency', () => {
    test('full pipeline: classify + search + generate + render', () => {
      const repo = new CatalogRepository();
      const engine = new SearchEngine(repo);
      const classifier = new IntentClassifier(repo);
      const proposals = new ProposalService(repo);

      // Warmup
      for (const q of BENCHMARK_QUERIES) {
        const i = classifier.classify(q);
        const r = engine.search(q, 5);
        const p = proposals.generate(q, r, 'warmup', i);
        proposals.render(p);
      }

      const times: number[] = [];
      for (const query of BENCHMARK_QUERIES) {
        const start = performance.now();
        const intent = classifier.classify(query);
        const result = engine.search(query, 5);
        const proposal = proposals.generate(query, result, 'benchmark', intent);
        proposals.render(proposal);
        times.push(performance.now() - start);
      }

      const avg = times.reduce((a, b) => a + b) / times.length;
      const max = Math.max(...times);

      console.log('  End-to-end pipeline (5 queries, warm):');
      console.log(`    avg: ${avg.toFixed(3)}ms`);
      console.log(`    max: ${max.toFixed(3)}ms`);
      for (let i = 0; i < BENCHMARK_QUERIES.length; i++) {
        console.log(`    Q${i + 1}: ${times[i].toFixed(3)}ms`);
      }

      expect(avg).toBeLessThan(50);
      expect(max).toBeLessThan(100);
    });
  });

  describe('memory footprint', () => {
    test('repository memory estimate', () => {
      const before = process.memoryUsage().heapUsed;
      const repos: CatalogRepository[] = [];
      for (let i = 0; i < 50; i++) {
        repos.push(new CatalogRepository());
      }
      const after = process.memoryUsage().heapUsed;
      const perInstance = (after - before) / 50;

      console.log(`  Memory per CatalogRepository: ~${(perInstance / 1024).toFixed(1)}KB`);
      // Keep reference to prevent GC
      expect(repos.length).toBe(50);
    });
  });
});
