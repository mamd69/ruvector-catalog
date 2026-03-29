# RuVector Catalog

**A technology recommender that matches your problems to 200+ AI/ML capabilities.**

| | |
|---|---|
| Technologies | 200+ searchable AI/ML building blocks |
| Capability Domains | 16 (vector search, graph intelligence, self-learning, robotics, and more) |
| Industry Verticals | 5 (healthcare, finance, robotics, edge/IoT, genomics) |

---

## What Is This?

Imagine you are building something -- a clinical decision support tool, a fraud detection system, a search engine that understands meaning, not just keywords. You know *what* you want to accomplish, but you are not sure *which* technologies to use.

RuVector Catalog is your guide.

It works like asking a master librarian who has memorized every book in a vast technical library. You describe your problem in plain English. The catalog searches through 200+ AI and machine learning building blocks and recommends the ones that fit your needs -- with explanations of why each one matters and how they work together.

Think of it this way:

- **RuVector** is a large collection of AI/ML building blocks (like a parts catalog for an engineer).
- **RuVector Catalog** is the guide that helps you find the right parts for your project.
- You do not need to know the names of anything. Just describe what you need.

---

## Quick Start

### 1. Install the Bun runtime

Bun is a fast JavaScript runtime. Install it with one command:

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Clone the catalog and install dependencies

Copy and paste this entire block into your terminal — it runs all three commands in sequence:

```bash
git clone https://github.com/mamd69/ruvector-catalog.git
cd ruvector-catalog
bun install
```

### 3. Add the RuVector source code (required for rebuilding the catalog)

The catalog needs the RuVector monorepo as a submodule to scan its source code. In Claude Code, say:

> create an upstream submodule of ruvnet/ruvector

Or copy and paste these two commands into your terminal:

```bash
git submodule add https://github.com/ruvnet/ruvector.git ruvector
git submodule update --init --recursive
```

This pulls the full RuVector codebase (~1.58M lines of Rust). The catalog reads it to build its technology index.

### 4. Ask your first question

In Claude Code:

> use @ruvector-catalog to find technologies for searching documents by meaning, not just keywords

Or via the command line:

```bash
bun src/cli.ts search "I need to search documents by meaning, not just keywords"
```

---

## How to Use

There are three ways to use RuVector Catalog, from simplest to most thorough.

### Method 1: Ask Claude (Recommended for Most Users)

If you are working inside Claude Code, just ask directly. Claude reads the catalog's SKILL.md and finds the right technologies for you.

**Quick search** — get a ranked list of matching technologies:

> use @ruvector-catalog to find technologies for detecting errors in AI output

> use @ruvector-catalog to recommend technologies for building a clinical healthcare solution

> use @ruvector-catalog to find the best approach for searching millions of documents by meaning

> use @ruvector-catalog to help me build an AI agent that learns from experience

**Get a full implementation proposal** (RVBP) — only generated when you ask for one:

> use @ruvector-catalog to create an RVBP for building real-time patient monitoring

> use @ruvector-catalog to create a proposal for making my search 10x faster

A search returns a quick ranked list. An RVBP returns a detailed plan with architecture, integration steps, dependencies, code examples, and trade-offs.

**What to expect:** Claude returns a structured response with the top matching technologies, what each one does, why it fits your problem, and how they connect to each other.

---

### Method 2: Command Line

For direct searches when you are not using Claude Code.

**Search for technologies:**

```bash
bun src/cli.ts search "prevent AI model from giving wrong answers over time"
```

**Generate an implementation proposal (RVBP):**

```bash
bun src/cli.ts rvbp "make my document search 10x faster"
```

**Other commands:**

| Command | What it does | Claude Code equivalent |
|---|---|---|
| `bun src/cli.ts search "query"` | Search for matching technologies | *use @ruvector-catalog to find...* |
| `bun src/cli.ts rvbp "problem"` | Generate implementation proposal | *use @ruvector-catalog to create an RVBP for...* |
| `bun src/cli.ts list` | Show all 200+ technologies | *use @ruvector-catalog to list all technologies* |
| `bun src/cli.ts list --status production` | Show production-ready only | *use @ruvector-catalog to list production-ready technologies* |
| `bun src/cli.ts scope "query"` | Check if a query is in scope | *use @ruvector-catalog to check if [topic] is something RuVector covers* |
| `bun src/cli.ts stats` | Show catalog statistics | *use @ruvector-catalog to show catalog stats* |
| `bun src/cli.ts verify` | Check if catalog is up to date | *use @ruvector-catalog to check if the catalog is current* |
| `bun src/cli.ts help` | Show all commands | *how do I use @ruvector-catalog?* |

---

### Method 3: Deep Analysis (Swarm)

For complex problems that need thorough research, ask Claude to run a multi-agent analysis. This automatically produces a detailed RVBP (implementation proposal) — you do not need to ask for one separately.

> use @ruvector-catalog to deeply analyze how to build a real-time patient monitoring system

**What is different about this method?**

- Automatically generates a detailed RVBP with architecture, integration steps, and code examples
- Takes 30-60 seconds instead of a few seconds
- Multiple AI agents work in parallel, each with different expertise
- Produces richer results: not just "which technologies" but "how to architect the full solution"
- Includes cross-domain connections you might not think to ask about

**When to use deep analysis vs. quick search:**

| Use quick search when... | Use deep analysis when... |
|---|---|
| You want a fast recommendation | You are planning a real project |
| You are exploring possibilities | You need architecture-level guidance |
| Your question is focused on one area | Your problem spans multiple domains |
| You need an answer in seconds | You can wait 30-60 seconds for depth |

---

## Sample Prompts

Here are prompts you can try right now. Each one explores a different part of the catalog.

| Prompt | What it explores |
|---|---|
| *use @ruvector-catalog to find technologies for detecting errors in AI output* | Coherence and safety systems |
| *use @ruvector-catalog to recommend technologies for a clinical healthcare solution* | Healthcare vertical (genomics, patient similarity, clinical decision support) |
| *use @ruvector-catalog to find technologies for searching millions of documents by meaning* | Vector search, HNSW indexing, semantic embeddings |
| *use @ruvector-catalog to help me build an AI agent that learns from experience* | Self-learning, reinforcement learning, SONA adaptation |
| *use @ruvector-catalog to find technologies for real-time monitoring of sensor data* | Nervous system (spiking neural networks), streaming, edge compute |
| *use @ruvector-catalog to recommend technologies for financial trading systems* | Financial domain (tick processing, risk modeling, compliance) |
| *use @ruvector-catalog to find technologies for running AI models in web browsers* | WASM targets, quantization, constrained runtimes |
| *use @ruvector-catalog to help me build a knowledge graph of relationships* | Graph intelligence, PageRank, community detection |
| *use @ruvector-catalog to find technologies for detecting when my AI model starts behaving differently* | Drift detection, behavioral change tracking, coherence gates |
| *use @ruvector-catalog to create an RVBP for making my search results more relevant* | Full implementation proposal with attention mechanisms, re-ranking, filtered search |

---

## Industry Solutions

RuVector Catalog includes pre-built guides for five industries. These map RuVector's engineering capabilities to real-world problems in language that domain experts (not just engineers) can understand.

To explore a vertical, just ask:

> use @ruvector-catalog to explain what capabilities could help with [healthcare / finance / robotics / IoT / genomics]

### Healthcare

Patient similarity search, drug interaction prediction (pharmacogenomics), clinical decision support, medical image analysis, real-time patient monitoring, HIPAA-compliant data sharing, and federated learning for multi-hospital collaboration.

### Finance

Trading signal verification, fraud detection via graph analysis, compliance audit trails, market regime detection, and low-latency processing.

### Robotics

Perception pipelines, motion planning, safety-critical decision making, sensor fusion, and real-time control loops with spiking neural networks.

### Edge / IoT

WASM-compiled models for browser and device deployment, quantized inference for constrained hardware, and offline-capable AI as small as 11.8KB.

### Genomics

Pharmacogenomics (CYP2D6/CYP2C19 drug metabolism), biomarker scoring, genotype analysis, and privacy-preserving on-device genomic analysis.

---

## What RuVector Catalog Does NOT Do

It helps to know the boundaries.

- **Not a content generator.** It will not write your blog posts, emails, or marketing copy. It recommends *infrastructure* technologies.
- **Not an app builder.** It will not create your website or mobile app. It recommends the AI/ML components that would power those apps.
- **Not a chatbot.** It does not hold general conversations. It answers one specific question: "What technologies should I use for this problem?"

**What it IS:** The expert advisor that sits between your problem and the 200+ technologies that could solve it.

---

## File Structure

| File or Folder | What it contains |
|---|---|
| `SKILL.md` | The catalog index -- this is what Claude reads to understand what is available |
| `domains/` | Industry-specific guides (healthcare, finance, robotics, edge/IoT, genomics) |
| `src/` | The search engine and proposal generator source code |
| `tests/` | 168 tests validating search quality across 5 benchmark queries |
| `docs/` | Architecture decisions (ADRs) and domain design documents (DDDs) |
| `ruvector/` | The RuVector monorepo (git submodule, added during setup) |

---

## Keeping It Updated

RuVector is actively developed. To keep your catalog in sync:

In Claude Code:

> update the ruvector submodule and rebuild the catalog

Or copy and paste this block into your terminal (each line runs one step):

```bash
git submodule update --remote ruvector    # Pull latest RuVector source
bun scripts/build-catalog.ts              # Rebuild the catalog index
bun src/cli.ts verify                     # Check for staleness
```

---

## Getting Help

**Questions about using the catalog:**
Open a discussion on the [RuVector GitHub repository](https://github.com/ruvnet/ruvector).

**Found a bug or incorrect recommendation:**
File an issue at [github.com/mamd69/ruvector-catalog/issues](https://github.com/mamd69/ruvector-catalog/issues). Include the prompt you used and what you expected vs. what you got.

**Want a new industry vertical:**
Open a feature request issue with the title "Industry Vertical: [Your Industry]" and describe 3-5 use cases you would like mapped.

---

## Contributors

| | Role |
|---|---|
| [@mamd69](https://github.com/mamd69) | RuVector Catalog — architecture, V3 implementation, benchmarking, documentation |
| [@stuinfla](https://github.com/stuinfla) | V1 catalog — the original hand-curated SKILL.md and technology inventory that V3 builds upon |
| [@ruvnet](https://github.com/ruvnet) | [RuVector](https://github.com/ruvnet/ruvector) — the 1.58M-line monorepo of 200+ technologies that the catalog indexes |
