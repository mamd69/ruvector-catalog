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

Three steps to your first recommendation.

### 1. Install the Bun runtime

Bun is a fast JavaScript runtime (similar to Node.js, but faster). Install it with one command:

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Install the catalog

```bash
cd ruvector-catalog
bun install
```

### 3. Ask your first question

```bash
bun src/cli.ts search "I need to search documents by meaning, not just keywords"
```

You will see a ranked list of technologies that match your problem, with similarity scores and brief explanations.

---

## How to Use

There are three ways to use RuVector Catalog, from simplest to most thorough.

### Method 1: Ask Claude (Recommended for Most Users)

If you are working inside Claude Code, just ask directly. Claude already knows how to use the catalog.

Type something like:

```
use @ruvector-catalog to find technologies for detecting errors in AI output
```

Claude will search the catalog, read the detailed documentation for each match, and explain the recommendations in plain language -- including how the technologies work together.

**More examples you can try:**

```
use @ruvector-catalog to recommend technologies for building a clinical healthcare solution
```

```
use @ruvector-catalog to find the best approach for searching millions of documents by meaning
```

```
use @ruvector-catalog to help me build an AI agent that learns from experience
```

**What to expect:** Claude returns a structured response with the top matching technologies, what each one does, why it fits your problem, and how they connect to each other. Think of it as a curated recommendation from an expert, not a raw database dump.

---

### Method 2: Command Line

For direct searches and implementation proposals, use the CLI (command-line interface -- the text-based terminal on your computer).

#### Search for technologies

```bash
bun src/cli.ts search "your question here"
```

This returns a ranked list of matching technologies with similarity scores.

**Example:**

```bash
bun src/cli.ts search "prevent AI model from giving wrong answers over time"
```

#### Generate a full implementation proposal (RVBP)

An RVBP (RuVector Booster Proposal) is a detailed plan for how to solve your problem using specific RuVector technologies. It includes architecture recommendations, integration steps, and trade-offs.

```bash
bun src/cli.ts rvbp "your problem description"
```

**Example:**

```bash
bun src/cli.ts rvbp "make my document search 10x faster"
```

#### Other useful commands

| Command | What it does |
|---|---|
| `bun src/cli.ts list` | Show all 200+ technologies in the catalog |
| `bun src/cli.ts list --status production` | Show only production-ready technologies |
| `bun src/cli.ts stats` | Show catalog statistics (total count, domains, coverage) |
| `bun src/cli.ts verify` | Check if the catalog is up to date with the latest RuVector code |
| `bun src/cli.ts help` | Show all available commands and options |

---

### Method 3: Deep Analysis (Swarm)

For complex problems that need thorough research, you can ask Claude to run a multi-agent analysis. This dispatches several specialized AI agents that each investigate a different angle of your problem.

```
use @ruvector-catalog to deeply analyze how to build a real-time patient monitoring system
```

**What is different about this method?**

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
| "Find technologies for detecting errors in AI output" | Coherence and safety systems |
| "What can help build a clinical healthcare solution?" | Healthcare vertical (genomics, patient similarity, clinical decision support) |
| "I need to search millions of documents by meaning, not just keywords" | Vector search, HNSW indexing, semantic embeddings |
| "How can I build an AI agent that learns from experience?" | Self-learning, reinforcement learning, SONA adaptation |
| "I need real-time monitoring of sensor data" | Nervous system (spiking neural networks), streaming, edge compute |
| "What technologies support financial trading systems?" | Financial domain (tick processing, order book, risk modeling) |
| "I need to run AI models on edge devices and in web browsers" | WASM targets, quantization, constrained runtimes |
| "How can I build a knowledge graph of relationships?" | Graph intelligence, PageRank, community detection |
| "I want to detect when my AI model starts behaving differently than expected" | Drift detection, behavioral change tracking, coherence gates |
| "How do I make my search results more relevant?" | Attention mechanisms, re-ranking, filtered search |

---

## Industry Solutions

RuVector Catalog includes pre-built guides for five industries. These map RuVector's engineering capabilities to real-world problems in language that domain experts (not just engineers) can understand.

### Healthcare

Patient similarity search, drug interaction prediction (pharmacogenomics), clinical decision support, medical image analysis, clinical trial matching, adverse event detection, treatment pathway optimization, real-time patient monitoring, and federated learning for multi-hospital data sharing (HIPAA-compatible architecture).

### Finance

High-frequency tick processing, order book reconstruction, real-time risk modeling, fraud detection via behavioral analysis, portfolio optimization, regulatory compliance analytics, and market anomaly detection.

### Robotics

Perception pipelines (SLAM, point cloud processing), motion planning, safety-critical decision making, sensor fusion, and real-time control loops with spiking neural networks.

### Edge / IoT

WASM-compiled models for browser and device deployment, quantized inference for constrained hardware, real-time streaming on low-power devices, and offline-capable AI.

### Genomics

Pharmacogenomics (CYP2D6/CYP2C19 drug metabolism), biomarker scoring, genotype analysis (23andMe-compatible), genomic variant search, and population-scale similarity matching.

---

## What RuVector Catalog Does NOT Do

It helps to know the boundaries.

- **Not a content generator.** It will not write your blog posts, emails, or marketing copy. It recommends *infrastructure* technologies.
- **Not an app builder.** It will not create your website or mobile app. It recommends the AI/ML components that would power those apps.
- **Not a chatbot.** It does not hold general conversations. It answers one specific question: "What technologies should I use for this problem?"

**What it IS:** The expert advisor that sits between your problem and the 200+ technologies that could solve it. It is the infrastructure layer -- the foundation that powers content generators, app builders, and chatbots.

---

## File Structure

Here is what you will find in the catalog directory.

| File or Folder | What it contains |
|---|---|
| `SKILL.md` | The catalog index -- this is the file Claude reads to understand what is available |
| `catalog.store.json` | The structured database of all 200+ technologies with metadata, scores, and relationships |
| `domains/` | Industry-specific guides (healthcare, finance, robotics, edge/IoT, genomics) |
| `docs/` | Detailed documentation for each capability, plus architecture decision records and domain design documents |
| `src/` | The search engine and proposal generator source code |
| `scripts/` | Maintenance scripts (updating from the RuVector source, rebuilding the catalog) |
| `templates/` | Templates for generating implementation proposals (RVBPs) |

---

## Keeping It Updated

RuVector is actively developed. New technologies and improvements are added regularly. To keep your catalog in sync:

### Update from the latest RuVector source

```bash
bash scripts/update-submodule.sh
```

This pulls the latest RuVector code and checks for new or changed crates (packages of code).

### Rebuild the catalog index

```bash
bun scripts/build-catalog.ts
```

This re-scans the RuVector source code and regenerates the searchable catalog. Run this after updating the submodule.

### Regenerate the SKILL.md file

```bash
bun scripts/generate-skill.ts
```

This updates the SKILL.md file that Claude reads, ensuring it reflects the latest catalog contents.

### Check for staleness

```bash
bun src/cli.ts verify
```

This tells you if your catalog is out of date and which technologies may have changed since the last rebuild.

---

## Getting Help

**Questions about using the catalog:**
Open a discussion on the [RuVector GitHub repository](https://github.com/ruvnet/ruvector).

**Found a bug or incorrect recommendation:**
File an issue at [github.com/ruvnet/ruvector/issues](https://github.com/ruvnet/ruvector/issues). Include the prompt you used and what you expected vs. what you got.

**Want a new industry vertical:**
Open a feature request issue with the title "Industry Vertical: [Your Industry]" and describe 3-5 use cases you would like mapped. The catalog team will evaluate whether enough RuVector technologies apply.

**Want to contribute:**
The catalog is built from the RuVector monorepo source code. Contributions to RuVector itself automatically flow into the catalog on the next rebuild. If you want to improve the catalog search or add documentation, pull requests are welcome.

---

*RuVector Catalog is part of the [HeroForge Genesis](https://github.com/ruvnet/heroforge-genesis) project.*
