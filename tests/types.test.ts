// ruvector-catalog — Technology recommender for the RuVector monorepo
// https://github.com/ruvnet/ruvector

import { describe, test, expect } from 'bun:test';
import type {
  Technology,
  Capability,
  ProblemSection,
  ScopeCheck,
  IntentResult,
  AudienceLevel,
  QueryIntent,
  IndustryVertical,
  VerticalMapping,
  VerticalCapability,
} from '../src/types/index.js';

describe('V3 Type Extensions', () => {
  describe('Technology', () => {
    const tech: Technology = {
      id: 'prime-radiant',
      name: 'Prime Radiant',
      crate: 'ruvector-coherence',
      capabilityId: 'coherence_safety',
      complexity: 'O(n)',
      latency: '12us p50',
      status: 'production',
      useWhen: 'You need to verify AI outputs or prevent hallucination',
      features: 'Coherence scoring, drift detection, safety gates',
      deploymentTargets: ['native', 'wasm'],
      sourcePath: 'crates/ruvector-coherence/src/prime_radiant.rs',
      algorithms: [],
      // V3 extensions
      useCases: ['hallucination detection', 'output verification', 'safety gating'],
      problemDomains: ['ai-safety', 'coherence'],
      verticals: ['healthcare', 'finance'],
      plainDescription: 'Checks AI-generated text for factual consistency before it reaches users',
      relatedExamples: ['coherence-demo'],
      primaryFor: ['coherence_safety'],
    };

    test('has V2 fields preserved', () => {
      expect(tech.id).toBe('prime-radiant');
      expect(tech.name).toBe('Prime Radiant');
      expect(tech.crate).toBe('ruvector-coherence');
      expect(tech.status).toBe('production');
      expect(tech.deploymentTargets).toContain('native');
    });

    test('has V3 useCases field', () => {
      expect(tech.useCases).toBeInstanceOf(Array);
      expect(tech.useCases.length).toBeGreaterThan(0);
      expect(tech.useCases).toContain('hallucination detection');
    });

    test('has V3 verticals field', () => {
      expect(tech.verticals).toBeInstanceOf(Array);
      expect(tech.verticals).toContain('healthcare');
      expect(tech.verticals).toContain('finance');
    });

    test('has V3 plainDescription field', () => {
      expect(tech.plainDescription).not.toBeNull();
      expect(tech.plainDescription!.length).toBeGreaterThan(10);
      // Should be human-readable, not contain crate names
      expect(tech.plainDescription!).not.toContain('ruvector-');
    });

    test('has V3 relatedExamples field', () => {
      expect(tech.relatedExamples).toBeInstanceOf(Array);
    });

    test('has V3 primaryFor field', () => {
      expect(tech.primaryFor).toBeInstanceOf(Array);
      expect(tech.primaryFor).toContain('coherence_safety');
    });

    test('has V3 problemDomains field', () => {
      expect(tech.problemDomains).toBeInstanceOf(Array);
      expect(tech.problemDomains).toContain('ai-safety');
    });
  });

  describe('Capability', () => {
    const cap: Capability = {
      id: 'coherence_safety',
      description: 'Coherence scoring and safety verification for AI outputs',
      primaryCrate: 'ruvector-coherence',
      status: 'production',
      docPath: 'docs/coherence.md',
      keywords: ['coherence', 'hallucination', 'safety', 'drift'],
      technologies: [],
      // V3 extensions
      problemStatement: 'I need to verify AI outputs / prevent hallucination / detect drift',
      synonyms: ['hallucination detection', 'output safety', 'coherence checking'],
      relatedCapabilities: ['self_learning', 'attention_mechanisms'],
    };

    test('has V3 problemStatement field', () => {
      expect(cap.problemStatement).toBeTruthy();
      expect(cap.problemStatement.length).toBeGreaterThan(10);
    });

    test('has V3 synonyms field', () => {
      expect(cap.synonyms).toBeInstanceOf(Array);
      expect(cap.synonyms.length).toBeGreaterThan(0);
    });

    test('has V3 relatedCapabilities field', () => {
      expect(cap.relatedCapabilities).toBeInstanceOf(Array);
    });
  });

  describe('ProblemSection', () => {
    const section: ProblemSection = {
      id: 'hallucination-detection',
      header: 'I need to verify AI outputs / prevent hallucination / detect drift',
      synonyms: ['coherence checking', 'output safety', 'factual grounding'],
      technologies: ['prime-radiant', 'cusum-drift', 'coherence-gate'],
      primaryCrate: 'ruvector-coherence',
    };

    test('has required header field', () => {
      expect(section.header).toBeTruthy();
      expect(section.header.length).toBeGreaterThan(10);
    });

    test('has synonyms array', () => {
      expect(section.synonyms).toBeInstanceOf(Array);
      expect(section.synonyms.length).toBeGreaterThan(0);
    });

    test('has technologies array', () => {
      expect(section.technologies).toBeInstanceOf(Array);
      expect(section.technologies.length).toBeGreaterThan(0);
    });

    test('has primaryCrate', () => {
      expect(section.primaryCrate).toBeTruthy();
    });
  });

  describe('ScopeCheck', () => {
    test('in-scope verdict structure', () => {
      const check: ScopeCheck = {
        verdict: 'in-scope',
        confidence: 0.95,
        matchedSections: ['hallucination-detection'],
        outOfScopeCategory: null,
        suggestions: [],
      };

      expect(check.verdict).toBe('in-scope');
      expect(check.confidence).toBeGreaterThan(0.5);
      expect(check.matchedSections.length).toBeGreaterThan(0);
      expect(check.outOfScopeCategory).toBeNull();
    });

    test('out-of-scope verdict structure', () => {
      const check: ScopeCheck = {
        verdict: 'out-of-scope',
        confidence: 0.9,
        matchedSections: [],
        outOfScopeCategory: 'content-generation',
        suggestions: ['RuVector focuses on ML infrastructure, not content creation'],
      };

      expect(check.verdict).toBe('out-of-scope');
      expect(check.matchedSections.length).toBe(0);
      expect(check.outOfScopeCategory).not.toBeNull();
      expect(check.suggestions.length).toBeGreaterThan(0);
    });

    test('partial-scope verdict structure', () => {
      const check: ScopeCheck = {
        verdict: 'partial-scope',
        confidence: 0.6,
        matchedSections: ['vector-search'],
        outOfScopeCategory: null,
        suggestions: ['Some aspects of this query are outside RuVector capabilities'],
      };

      expect(check.verdict).toBe('partial-scope');
      expect(check.confidence).toBeLessThan(0.9);
    });

    test('verdict is one of three allowed values', () => {
      const validVerdicts = ['in-scope', 'out-of-scope', 'partial-scope'];
      for (const v of validVerdicts) {
        const check: ScopeCheck = {
          verdict: v as ScopeCheck['verdict'],
          confidence: 0.8,
          matchedSections: [],
          outOfScopeCategory: null,
          suggestions: [],
        };
        expect(validVerdicts).toContain(check.verdict);
      }
    });
  });

  describe('IntentResult', () => {
    test('non-technical audience detection', () => {
      const result: IntentResult = {
        intent: 'industry-vertical',
        confidence: 0.85,
        matchedVertical: 'healthcare',
        audienceLevel: 'non-technical',
        expandedTerms: ['clinical', 'patient safety', 'healthcare'],
      };

      expect(result.audienceLevel).toBe('non-technical');
      expect(result.matchedVertical).toBe('healthcare');
    });

    test('technical audience is default', () => {
      const result: IntentResult = {
        intent: 'technology-lookup',
        confidence: 0.9,
        matchedVertical: null,
        audienceLevel: 'technical',
        expandedTerms: ['vector', 'search', 'hnsw'],
      };

      expect(result.audienceLevel).toBe('technical');
      expect(result.matchedVertical).toBeNull();
    });

    test('all audience levels are valid', () => {
      const levels: AudienceLevel[] = ['technical', 'semi-technical', 'non-technical', 'executive'];
      for (const level of levels) {
        const result: IntentResult = {
          intent: 'problem-solution',
          confidence: 0.8,
          matchedVertical: null,
          audienceLevel: level,
          expandedTerms: [],
        };
        expect(levels).toContain(result.audienceLevel);
      }
    });

    test('all query intents are valid', () => {
      const intents: QueryIntent[] = [
        'problem-solution',
        'technology-lookup',
        'industry-vertical',
        'out-of-scope',
        'meta-query',
      ];
      for (const intent of intents) {
        const result: IntentResult = {
          intent,
          confidence: 0.8,
          matchedVertical: null,
          audienceLevel: 'technical',
          expandedTerms: [],
        };
        expect(intents).toContain(result.intent);
      }
    });

    test('expandedTerms is populated for ambiguous queries', () => {
      const result: IntentResult = {
        intent: 'problem-solution',
        confidence: 0.7,
        matchedVertical: null,
        audienceLevel: 'technical',
        expandedTerms: ['hallucination', 'coherence', 'drift', 'safety'],
      };

      expect(result.expandedTerms.length).toBeGreaterThan(0);
      expect(result.expandedTerms).toContain('coherence');
    });
  });

  describe('VerticalMapping', () => {
    test('healthcare vertical structure', () => {
      const mapping: VerticalMapping = {
        vertical: 'healthcare',
        capabilities: [
          {
            label: 'Patient Safety Monitoring',
            technologyIds: ['prime-radiant', 'cusum-drift'],
            plainDescription: 'Monitors AI-generated clinical recommendations for accuracy',
            useCases: ['Clinical decision support', 'Prescription validation'],
          },
        ],
        regulatoryContext: ['HIPAA', 'FDA 21 CFR Part 11'],
        referenceDocuments: ['docs/verticals/healthcare.md'],
      };

      expect(mapping.vertical).toBe('healthcare');
      expect(mapping.capabilities.length).toBeGreaterThan(0);
      expect(mapping.regulatoryContext.length).toBeGreaterThan(0);
    });

    test('all industry verticals are valid', () => {
      const verticals: IndustryVertical[] = ['healthcare', 'finance', 'robotics', 'edge-iot', 'genomics'];
      for (const v of verticals) {
        expect(verticals).toContain(v);
      }
    });

    test('vertical capability has plain description', () => {
      const cap: VerticalCapability = {
        label: 'Anomaly Detection',
        technologyIds: ['cusum-drift'],
        plainDescription: 'Detects unusual patterns in patient data streams',
        useCases: ['Vital sign monitoring'],
      };

      expect(cap.plainDescription).toBeTruthy();
      expect(cap.plainDescription.length).toBeGreaterThan(10);
    });
  });
});
