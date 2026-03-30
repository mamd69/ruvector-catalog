# RuVector Catalog v3.5.0

**An architect's playbook that matches your problems to 200+ AI/ML capabilities, provides complete migration paths from aging technology, and ensures nothing gets left behind.**

| | |
|---|---|
| Technologies | 200+ searchable AI/ML building blocks |
| Rust Crates | 113 (verified against source) |
| npm Packages | 56 (12 scoped @ruvector/* packages) |
| WASM Builds | 30 (buildable from submodule with wasm-pack) |
| npm Exports | 170 (44 classes, 126 functions) |
| Capability Domains | 16 (vector search, graph, self-learning, attention, bio-inspired, and more) |
| Migration Patterns | 10 aging-technology replacement guides with sunset checklists |
| Industry Verticals | 5 (healthcare, finance, robotics, edge/IoT, genomics) |

---

## What Is This?

RuVector Catalog does three things:

### 1. Recommends the Right Technology

You describe your problem in plain English. The catalog searches 200+ AI/ML building blocks and recommends the ones that fit, with explanations of why and how they connect.

### 2. Migrates You From Aging Technology

The catalog detects 10 common aging patterns in codebases (OpenAI embeddings, JSON flat-file indexes, pgvector, static search, etc.) and provides complete replacement guides: what to install, what code to write, and critically, **what to delete** -- old code, old data, old scripts, old environment variables, old documentation.

### 3. Shows You How to Access Everything

Every RuVector capability has three possible access paths:
- **npm package** -- `require('ruvector')` gives you 170 exports instantly
- **Submodule WASM build** -- `wasm-pack build` compiles any of 30 Rust crates to Node.js in ~90 seconds
- **NAPI native bindings** -- Pre-built platform-specific binaries for maximum performance

The catalog maps every component to its access path so you never hear "not available" when a feature exists.

---

## What's New in v3.5.0

### Migration Intelligence (NEW)

Ten aging-technology patterns with detect/replace/delete instructions:

| # | Aging Pattern | RuVector Replacement |
|---|---------------|---------------------|
| 1 | External embedding APIs (OpenAI, Cohere) | AdaptiveEmbedder (local ONNX, $0/query, self-learning) |
| 2 | JSON flat-file vector indexes | RVF binary HNSW (O(log n), witness chains) |
| 3 | pgvector / Pinecone / Qdrant / Weaviate | VectorDb + RvfDatabase (zero server, zero cost) |
| 4 | Static embeddings (never improve) | AdaptiveEmbedder + SonaEngine (3-loop learning) |
| 5 | No image understanding | ruvector-cnn-wasm (MobileNet-V3, 512D CNN) |
| 6 | Hand-rolled hybrid search | differentiableSearch (learned ranking) |
| 7 | No document relationships | buildGraph + louvainCommunities + minCut |
| 8 | No anomaly detection | CoherenceMonitor + delta-core (CUSUM) |
| 9 | Simple softmax attention | FlashAttention-3 / MoEAttention (50+ variants) |
| 10 | No formal verification | ruvector-verified-wasm (SAT/SMT, K-induction) |

Each pattern includes:
- **Detect**: Code patterns and imports that reveal the aging technology
- **Replace**: Exact `require()` path or `wasm-pack build` command
- **Delete**: What to remove -- old files, old dependencies, old env vars, old docs

### Complete Sunset Checklist (NEW)

15-step checklist ensuring nothing gets left behind during migrations. Steps 5-11 are explicitly called out as the deletion steps where incomplete migrations live.

### Operational Bridge (NEW)

Three access paths mapped for every major component. Decision tree: never say a feature is unavailable until all four paths are checked (npm export, scoped package, submodule WASM, submodule Rust crate).

### Verified Inventory (UPDATED)

All counts verified against the actual filesystem on 2026-03-30:
- 113 Rust crates (counted via `ls -d ruvector/crates/*/`)
- 56 npm packages (counted via `ls -d ruvector/npm/packages/*/`)
- 30 WASM crates (counted via `ls -d ruvector/crates/*-wasm/`)
- 170 npm exports (verified via `Object.keys(require('ruvector'))`)
- 131 ADRs (counted via `ls ruvector/docs/adr/ADR-*.md`)
- 42 example projects (counted via `ls -d ruvector/examples/*/`)
- CNN WASM build tested end-to-end (produces 512D MobileNet-V3 embeddings)

---

## Quick Start

### 1. Install the Bun runtime

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Clone the catalog and install dependencies

```bash
git clone https://github.com/mamd69/ruvector-catalog.git
cd ruvector-catalog
bun install
```

### 3. Add the RuVector source code (required for rebuilding the catalog)

```bash
git submodule add https://github.com/ruvnet/ruvector.git ruvector
git submodule update --init --recursive
```

### 4. Ask your first question

In Claude Code:

> use @ruvector-catalog to find technologies for searching documents by meaning, not just keywords

Or via the command line:

```bash
bun src/cli.ts search "I need to search documents by meaning, not just keywords"
```

---

## How to Use

### Method 1: Ask Claude (Recommended)

**Quick search** -- get a ranked list of matching technologies:

> use @ruvector-catalog to find technologies for detecting errors in AI output

> use @ruvector-catalog to recommend technologies for building a clinical healthcare solution

**Migration analysis** -- detect aging technology and get replacement plan:

> use @ruvector-catalog to analyze my codebase for aging patterns and recommend RuVector replacements

> use @ruvector-catalog to help me migrate from OpenAI embeddings to local RuVector embeddings

> use @ruvector-catalog to create a complete migration plan from pgvector to RVF format

**Full implementation proposal** (RVBP):

> use @ruvector-catalog to create an RVBP for building real-time patient monitoring

### Method 2: Command Line

```bash
bun src/cli.ts search "prevent AI model from giving wrong answers over time"
bun src/cli.ts rvbp "make my document search 10x faster"
bun src/cli.ts list
bun src/cli.ts stats
```

### Method 3: Deep Analysis (Swarm)

For complex problems that need multi-agent research:

> use @ruvector-catalog to deeply analyze how to build a real-time patient monitoring system and create an RVBP in docs/research/

---

## Migration Examples

### Before: OpenAI Embeddings ($0.002/query, no learning)

```javascript
// OLD: External API call for every embedding
const response = await fetch('https://api.openai.com/v1/embeddings', {
  headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` },
  body: JSON.stringify({ model: 'text-embedding-3-small', input: text })
});
```

### After: RuVector AdaptiveEmbedder (local, free, learns)

```javascript
// NEW: Local ONNX with self-learning LoRA adapters
const { AdaptiveEmbedder } = require('ruvector');
const embedder = new AdaptiveEmbedder({ loraRank: 4, contrastiveLearning: true });
await embedder.init();
const embedding = await embedder.embed(text);
// Embedding improves with every query via learnFromOutcome()
```

### Before: JSON Index with O(n) Search

```javascript
// OLD: Load entire index, compare every vector
const index = JSON.parse(fs.readFileSync('embeddings.json'));
const results = index.map(e => ({ score: cosine(query, e.vec), ...e }))
  .sort((a, b) => b.score - a.score).slice(0, 10);
```

### After: RVF Binary with O(log n) HNSW

```javascript
// NEW: Binary index, logarithmic search
const { RvfDatabase } = require('@ruvector/rvf');
const db = await RvfDatabase.openReadonly('index.rvf');
const results = await db.query(queryVector, 10); // O(log n)
```

### Before: No Image Search

```javascript
// OLD: Images stored but not searchable
// Best you could do: text descriptions via OCR
```

### After: CNN Visual Similarity

```javascript
// NEW: Native image embeddings from submodule
const cnn = require('./ruvector/crates/ruvector-cnn-wasm/pkg/ruvector_cnn_wasm.js');
const embedder = new cnn.WasmCnnEmbedder();
const embedding = embedder.extract(rgbPixels, 224, 224); // 512D
```

---

## What RuVector Catalog Does NOT Do

- **Not a content generator.** It will not write blog posts, emails, or marketing copy. It recommends *infrastructure* technologies.
- **Not an app builder.** It will not create your website or mobile app. It recommends the AI/ML components that would power those apps.
- **Not a chatbot.** It does not hold general conversations. It answers one specific question: "What technologies should I use for this problem?"
- **Not a deployment tool.** It tells you what to build and what to migrate from — but it does not deploy, configure, or monitor your infrastructure.

**What it IS:** The expert architect that sits between your problem and the 200+ technologies that could solve it, including how to migrate away from what you have now.

---

## Industry Solutions

### Healthcare
Patient similarity, drug interaction prediction (CYP2D6/CYP2C19), clinical decision support, medical image analysis, real-time monitoring, HIPAA-compliant data sharing, federated learning.

### Finance
Trading signal verification, fraud detection via graph analysis, compliance audit trails, market regime detection, low-latency processing.

### Robotics
Perception pipelines, motion planning, safety-critical decisions, sensor fusion, real-time control with spiking neural networks.

### Edge / IoT
WASM-compiled models (as small as 11.8KB), quantized inference for constrained hardware, offline-capable AI.

### Genomics
Pharmacogenomics, biomarker scoring, genotype analysis, privacy-preserving on-device analysis.

---

## File Structure

| File or Folder | What it contains |
|---|---|
| `SKILL.md` | The architect's playbook -- problem/solution map, migration intelligence, access paths, sunset checklist |
| `domains/` | Industry-specific guides (healthcare, finance, robotics, edge/IoT, genomics) |
| `src/` | Search engine and proposal generator source code |
| `tests/` | 168 tests validating search quality |
| `docs/` | Architecture decisions (ADRs) and domain design documents |
| `ruvector/` | The RuVector monorepo (git submodule, ~1.58M lines Rust) |

---

## Keeping It Updated

```bash
git submodule update --remote ruvector    # Pull latest RuVector source
bun scripts/build-catalog.ts              # Rebuild the catalog index
bun src/cli.ts verify                     # Check for staleness
```

---

## Changelog

### v3.5.0 (2026-03-30)
- **Migration Intelligence**: 10 aging-pattern detection and replacement guides
- **Sunset Checklist**: 15-step migration completion verification
- **Operational Bridge**: 3 access paths (npm, WASM build, NAPI) with decision tree
- **Verified Inventory**: All counts verified against filesystem (113 crates, 56 npm, 30 WASM)
- **CNN WASM tested**: MobileNet-V3 image embeddings confirmed working
- **RVF API documented**: `ingestBatch([{id, vector}])` signature verified

### v3.0.0 (2026-03-20)
- Initial V3 with problem-solution map, algorithms index, industry verticals
- 168 search quality benchmarks
- CLI search and RVBP generation

---

## Contributors

| | Role |
|---|---|
| [@mamd69](https://github.com/mamd69) | RuVector Catalog -- architecture, V3 implementation, benchmarking, documentation |
| [@stuinfla](https://github.com/stuinfla) | V1 catalog + V3.5 migration intelligence, operational bridge, verified inventory |
| [@ruvnet](https://github.com/ruvnet) | [RuVector](https://github.com/ruvnet/ruvector) -- the 1.58M-line monorepo that the catalog indexes |

---

## Getting Help

**Questions:** Open a discussion on the [RuVector GitHub repository](https://github.com/ruvnet/ruvector).

**Bugs or incorrect recommendations:** File an issue at [github.com/mamd69/ruvector-catalog/issues](https://github.com/mamd69/ruvector-catalog/issues).

**New industry vertical:** Open a feature request with title "Industry Vertical: [Your Industry]" and 3-5 use cases.
