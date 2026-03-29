// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector
//
// ADR-009 Benchmark Regression Tests
// These are the ACCEPTANCE CRITERIA for V3. Each test derives from a
// measured failure in V1/V2/Repo Search benchmarks.

import { describe, test, expect } from 'bun:test';
import { CatalogRepository } from '../src/catalog/repository.js';
import { SearchEngine } from '../src/discovery/search.js';
import { IntentClassifier } from '../src/discovery/intent.js';
import { ProposalService } from '../src/proposals/generator.js';

const repo = new CatalogRepository();
const engine = new SearchEngine(repo);
const classifier = new IntentClassifier(repo);
const proposals = new ProposalService(repo);

// ---------------------------------------------------------------------------
// Q1: "detecting hallucinations in LLM output before it reaches users"
// Regression source: V2 ranked prime-radiant at #4 (score 0.15) behind
//   Auto-Sharding (0.28) and CUSUM Drift Detection (0.32)
// ---------------------------------------------------------------------------
describe('Q1: detecting hallucinations in LLM output', () => {
  const QUERY = 'detecting hallucinations in LLM output before it reaches users';

  test('PASS: prime-radiant must be in top 3 results', () => {
    const result = engine.search(QUERY, 5);
    const top3Ids = result.matches.slice(0, 3).map(m => m.technologyId);

    expect(top3Ids).toContain('prime-radiant');
  });

  test('PASS: at least 2 of top 5 must be from coherence_safety capability', () => {
    const result = engine.search(QUERY, 5);
    const coherenceSafetyCount = result.matches
      .slice(0, 5)
      .filter(m => m.capability.id === 'coherence_safety')
      .length;

    expect(coherenceSafetyCount).toBeGreaterThanOrEqual(2);
  });

  test('FAIL guard: Auto-Sharding must NOT be in top 3 (V2 regression)', () => {
    const result = engine.search(QUERY, 5);
    const top3Ids = result.matches.slice(0, 3).map(m => m.technologyId);

    expect(top3Ids).not.toContain('auto-sharding');
  });

  test('intent is problem-solution, not out-of-scope', () => {
    const intent = classifier.classify(QUERY);
    expect(intent.intent).toBe('problem-solution');
    expect(intent.intent).not.toBe('out-of-scope');
  });

  test('query expansion includes coherence-related terms', () => {
    const intent = classifier.classify(QUERY);
    const expanded = intent.expandedTerms.map(t => t.toLowerCase());
    const hasRelevant = ['coherence', 'drift', 'safety', 'verification', 'grounding']
      .some(term => expanded.includes(term));
    expect(hasRelevant).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Q2: "draft best selling books from an idea using AI"
// Regression source: V2 returned Min-Cut Gated Attention (0.38) as top
//   recommendation. All three approaches failed to detect out-of-scope.
// ---------------------------------------------------------------------------
describe('Q2: draft best selling books (OUT OF SCOPE)', () => {
  const QUERY = 'draft best selling books from an idea using AI';

  test('PASS: must return out-of-scope signal', () => {
    const intent = classifier.classify(QUERY);
    expect(intent.intent).toBe('out-of-scope');
  });

  test('PASS: ScopeCheck verdict must be out-of-scope', () => {
    const intent = classifier.classify(QUERY);
    expect(intent.intent).toBe('out-of-scope');
    expect(intent.confidence).toBeGreaterThan(0.5);
  });

  test('PASS: must NOT return Min-Cut or attention mechanism as top result', () => {
    const result = engine.search(QUERY, 5);

    if (result.matches.length > 0) {
      const topId = result.matches[0].technologyId;
      expect(topId).not.toBe('min-cut-attention');
      expect(topId).not.toBe('dynamic-min-cut');

      // Also check top 3 for attention mechanisms masquerading as book tools
      const top3Ids = result.matches.slice(0, 3).map(m => m.technologyId);
      const attentionFalsePositives = [
        'min-cut-attention',
        'dynamic-min-cut',
        'mamba-s5',
        'hyperbolic-attention',
        'graph-transformer',
      ];
      for (const fp of attentionFalsePositives) {
        expect(top3Ids).not.toContain(fp);
      }
    }
  });

  test('proposal includes scope advisory', () => {
    const intent = classifier.classify(QUERY);
    const result = engine.search(QUERY, 5);
    const proposal = proposals.generate(QUERY, result, 'test', intent);

    expect(proposal.scopeAdvisory).toBeTruthy();
    expect(proposal.scopeAdvisory!.verdict).toBe('out-of-scope');
  });
});

// ---------------------------------------------------------------------------
// Q3: "monitor all user actions on a computer and suggest efficiency
//      improvements through AI and automation"
// Regression source: V2 returned RVF Cognitive Containers at #1 (0.40);
//   OSpipe was not in top 5. Repo Search had zero OSpipe matches.
// ---------------------------------------------------------------------------
describe('Q3: monitor user actions (OSpipe/ScreenPipe)', () => {
  const QUERY = 'monitor all user actions on a computer and suggest efficiency improvements through AI and automation';

  test('PASS: OSpipe must appear in results (as example or technology)', () => {
    const result = engine.search(QUERY, 10);
    const allIds = result.matches.map(m => m.technologyId);
    const allNames = result.matches.map(m => m.technology.name.toLowerCase());

    const hasOSpipe = allIds.some(id =>
      id.toLowerCase().includes('ospipe') || id.toLowerCase().includes('screenpipe')
    ) || allNames.some(name =>
      name.includes('ospipe') || name.includes('screenpipe')
    );

    expect(hasOSpipe).toBe(true);
  });

  test('PASS: must NOT have RVF Cognitive Containers as #1 (V2 regression)', () => {
    const result = engine.search(QUERY, 5);

    if (result.matches.length > 0) {
      const topId = result.matches[0].technologyId;
      expect(topId).not.toBe('rvf-cognitive-containers');
      expect(topId).not.toBe('rvf-containers');
    }
  });

  test('FAIL guard: storage/DB technologies should not dominate top 3', () => {
    const result = engine.search(QUERY, 5);
    const top3Caps = result.matches.slice(0, 3).map(m => m.capability.id);

    const dbCount = top3Caps.filter(id =>
      id.includes('database') || id.includes('storage') || id.includes('persistence')
    ).length;

    // DB/storage should not be majority of top 3
    expect(dbCount).toBeLessThan(2);
  });

  test('intent is not out-of-scope', () => {
    const intent = classifier.classify(QUERY);
    expect(intent.intent).not.toBe('out-of-scope');
  });
});

// ---------------------------------------------------------------------------
// Q4: "improve the ruvector-catalog skill and technology recommender"
// Regression source: V2 returned RVF Cognitive Containers at #1 (same as
//   Q3); V1 had 84-89% noise rate. This is a meta-query.
// ---------------------------------------------------------------------------
describe('Q4: improve the ruvector-catalog (meta-query)', () => {
  const QUERY = 'improve the ruvector-catalog skill and technology recommender';

  test('PASS: SONA or HNSW must be in top 3', () => {
    const result = engine.search(QUERY, 5);
    const top3Ids = result.matches.slice(0, 3).map(m => m.technologyId);

    const hasSelfLearningOrSearch = top3Ids.some(id =>
      id === 'sona' || id === 'hnsw' || id === 'reasoning-bank'
    );

    expect(hasSelfLearningOrSearch).toBe(true);
  });

  test('PASS: results must be from self_learning or vector_search capabilities', () => {
    const result = engine.search(QUERY, 5);
    const relevantCapabilities = [
      'self_learning',
      'vector_search',
      'attention_mechanisms',
      'agent_framework',
    ];

    const top5Caps = result.matches.slice(0, 5).map(m => m.capability.id);
    const relevantCount = top5Caps.filter(id => relevantCapabilities.includes(id)).length;

    // At least 2 of top 5 should be from relevant capabilities
    expect(relevantCount).toBeGreaterThanOrEqual(2);
  });

  test('FAIL guard: RVF Cognitive Containers must not be #1 (V2 regression)', () => {
    const result = engine.search(QUERY, 5);

    if (result.matches.length > 0) {
      expect(result.matches[0].technologyId).not.toBe('rvf-cognitive-containers');
      expect(result.matches[0].technologyId).not.toBe('rvf-containers');
    }
  });

  test('intent is meta-query', () => {
    const intent = classifier.classify(QUERY);
    expect(intent.intent).toBe('meta-query');
  });
});

// ---------------------------------------------------------------------------
// Q5: "explain at non-technical level what capabilities could add value
//      to a clinical healthcare solution"
// Regression source: No existing approach has healthcare-specific content
//   or non-technical adaptation ability. All returned raw technical output.
// ---------------------------------------------------------------------------
describe('Q5: non-technical healthcare capabilities', () => {
  const QUERY = 'explain at non-technical level what capabilities could add value to a clinical healthcare solution';

  test('PASS: IntentClassifier must detect healthcare vertical', () => {
    const intent = classifier.classify(QUERY);
    expect(intent.matchedVertical).toBe('healthcare');
  });

  test('PASS: IntentClassifier must detect non-technical audience', () => {
    const intent = classifier.classify(QUERY);
    expect(intent.audienceLevel).toBe('non-technical');
  });

  test('PASS: at least 3 results must have verticals including healthcare', () => {
    const result = engine.search(QUERY, 10);
    const healthcareResults = result.matches.filter(
      m => m.technology.verticals.includes('healthcare')
    );

    expect(healthcareResults.length).toBeGreaterThanOrEqual(3);
  });

  test('intent is industry-vertical', () => {
    const intent = classifier.classify(QUERY);
    expect(intent.intent).toBe('industry-vertical');
  });

  test('proposal includes healthcare vertical context', () => {
    const intent = classifier.classify(QUERY);
    const result = engine.search(QUERY, 10);
    const proposal = proposals.generate(QUERY, result, 'clinical-app', intent);

    expect(proposal.verticalContext).toBeTruthy();
    expect(proposal.verticalContext!.vertical).toBe('healthcare');
    expect(proposal.verticalContext!.regulatoryContext.length).toBeGreaterThan(0);
  });

  test('at least 3 distinct capability areas in results', () => {
    const result = engine.search(QUERY, 10);
    const uniqueCapabilities = new Set(result.matches.map(m => m.capability.id));

    expect(uniqueCapabilities.size).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// Cross-query pass criteria (ADR-009 Section 5.2)
// ---------------------------------------------------------------------------
describe('Cross-query regression criteria', () => {
  test('average search latency < 10ms across all 5 queries', () => {
    const queries = [
      'detecting hallucinations in LLM output before it reaches users',
      'draft best selling books from an idea using AI',
      'monitor all user actions on a computer and suggest efficiency improvements through AI and automation',
      'improve the ruvector-catalog skill and technology recommender',
      'explain at non-technical level what capabilities could add value to a clinical healthcare solution',
    ];

    // Warmup
    for (const q of queries) {
      engine.search(q, 5);
    }

    const times: number[] = [];
    for (const q of queries) {
      const start = performance.now();
      engine.search(q, 5);
      times.push(performance.now() - start);
    }

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    console.log(`  Average search latency (5 queries, warm): ${avg.toFixed(3)}ms`);
    for (let i = 0; i < queries.length; i++) {
      console.log(`    Q${i + 1}: ${times[i].toFixed(3)}ms`);
    }

    expect(avg).toBeLessThan(10);
  });

  test('out-of-scope queries return explicit boundary signal', () => {
    const outOfScopeQueries = [
      'draft best selling books from an idea using AI',
      'build a responsive e-commerce website',
      'generate marketing copy for my product',
    ];

    for (const q of outOfScopeQueries) {
      const intent = classifier.classify(q);
      expect(intent.intent).toBe('out-of-scope');
    }
  });

  test('at least 1 industry vertical (healthcare) is available', () => {
    const verticals = repo.listVerticals();
    const healthcare = verticals.find(v => v.vertical === 'healthcare');
    expect(healthcare).not.toBeUndefined();
    expect(healthcare!.capabilities.length).toBeGreaterThan(0);
  });

  test('non-technical adaptation is available on demand', () => {
    const intent = classifier.classify(
      'explain in simple terms what RuVector does'
    );
    expect(intent.audienceLevel).toBe('non-technical');
  });

  test('all problem-solution headers from V1 SKILL.md preserved', () => {
    const sections = repo.listProblemSections();
    // V1 SKILL.md had headers like "I need to..." for each capability
    // V3 must preserve all of them
    expect(sections.length).toBeGreaterThanOrEqual(10);

    // Key headers that must exist
    const headers = sections.map(s => s.header.toLowerCase());
    const requiredPhrases = [
      'vector',
      'graph',
      'attention',
      'learn',
      'hallucination',
    ];

    for (const phrase of requiredPhrases) {
      const found = headers.some(h => h.includes(phrase));
      if (!found) {
        console.log(`  WARNING: No problem section header contains "${phrase}"`);
      }
      expect(found).toBe(true);
    }
  });
});
