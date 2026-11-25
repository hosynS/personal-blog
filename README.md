# CERIL · Personal Engineering Second Brain & Technical Portfolio

> **Build it. Break it. Understand it. Document it.**  
> A production-grade engineering notebook and portfolio covering system architectures, operational cheatsheets, real incident post-mortems, and technical interview defenses.

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Docs-Starlight-1789c9?style=flat-square)](https://starlight.astro.build)
[![Archify](https://img.shields.io/badge/Architecture-Archify-0891b2?style=flat-square)](https://github.com/tt-a1i/archify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 🎯 The Philosophy: Zero Redundancy & Deep Evidence

Most software engineering blogs suffer from **narrative duplication** and **shallow summaries**—copying the same tech stack list across multiple articles without explaining the actual engineering: exact error stack traces, root cause analyses, operational runbooks, or architectural trade-offs.

This blog enforces a strict **Five-Pillar Zero-Redundancy Standard** where every piece of information has a single canonical home.

```text
Every Project Suite
  ├── 1. Overview & Hub (index.mdx)         → Business context, outcomes, single source of truth for tech stack
  ├── 2. Architecture (architecture.mdx)    → Interactive Archify diagram, trust boundaries, dataflow
  ├── 3. Cheatsheet (cheatsheet.mdx)        → Zero-fluff CLI commands, K8s snippets, env vars, incident one-liners
  ├── 4. Errors & Fixes (errors-fixes.mdx)  → Exact error traces, misleading clues, RCA, code diffs, prevention
  └── 5. Interview Prep (interview-prep.mdx)→ System design trade-offs, STAR behavioral proofs, edge cases
```

---

## 🏛️ The Five Pillars

### 1. Project Overview & Hub
The single source of truth (SSOT) for the project. Outlines the real-world problem, architectural decisions, and technology matrix (runtime, database, cache, orchestration, telemetry). Other sections link here rather than re-listing dependencies.

### 2. Archify Visual Architecture Design
Every project features an interactive, theme-aware system architecture diagram powered by [Archify](https://github.com/tt-a1i/archify.git):
- **Click-to-Inspect**: Explore component metadata, protocols, and ports.
- **Path Tracing**: Trace upstream and downstream data flows, cache-aside read paths, and asynchronous worker queues.
- **Security Boundaries**: Clearly marked VPCs, public DMZs, and private database tiers.
- **Embedded & Fullscreen**: Rendered via `<ArchifyDiagram />` with a one-click fullscreen viewer.

### 3. Production & Developer Cheatsheet
Zero narrative or filler—strictly high-density, actionable reference tables and commands:
- Quick start & local development (`docker compose`, database seeding).
- Docker & Kubernetes one-liners (rollout restart, logs filtering, port-forwarding).
- Complete environment variables matrix with defaults and requirements.
- Primary API endpoints table (method, route, auth, rate limit).
- Emergency DB and cache flush runbooks.

### 4. Errors & Debugging Catalog (6-Point Verification)
Every production failure or difficult bug is broken down with investigative rigor:
1. **Exact Symptom & Raw Trace**: Terminal output, HTTP error code, or alert metric.
2. **Misleading Clues**: What intuition falsely suggested.
3. **Diagnostic Commands**: Exact commands used to inspect the system (`EXPLAIN ANALYZE`, `pg_stat_activity`, `strace`).
4. **Root Cause Analysis (RCA)**: The underlying technical failure mechanism.
5. **The Verified Fix**: Drop-in code diff or configuration update.
6. **Prevention Guardrail**: Automated test, linter rule, or monitoring threshold added to prevent regressions.

### 5. Technical Interview Deep Dives
Translates real engineering experience directly into high-scoring interview answers:
- **System Design Defenses**: Concrete trade-off justifications (e.g., Redis cache-aside vs. horizontal read replicas; handling downstream backpressure).
- **STAR Behavioral Answers**: "Tell me about the hardest bug you solved" structured with Situation, Task, Action, and Result (referencing the real RCA).
- **High-Concurrency Gotchas**: Cache avalanche mitigation, circuit breakers, and rate-limit fallbacks.

---

## 🚀 Quick Start

### Prerequisites
- Node.js `>= 18.14.0` (v20+ recommended)
- npm or pnpm

### 1. Clone & Install

```bash
git clone https://github.com/hosynS/personal-blog.git
cd personal-blog
npm install
```

### 2. Local Development

```bash
npm run dev
```

Visit `http://localhost:4321` to explore the blog locally with hot-reloading.

### 3. Production Build & Static Validation

```bash
# Typecheck documentation and components
npm run check

# Build production static bundle and generate Pagefind search index
npm run build

# Preview production build locally
npm run preview
```

---

## ⚡ Scaffolding a New Project in Seconds

Use the built-in generator script to scaffold all 5 pillars and compile a starter Archify diagram automatically:

```bash
npm run scaffold:project <project-slug> "Project Title"
```

**Example:**

```bash
npm run scaffold:project event-stream-pipeline "Real-Time Event Stream Pipeline"
```

This will automatically:
1. Create `src/content/docs/projects/<slug>/` containing `index.mdx`, `architecture.mdx`, `cheatsheet.mdx`, `errors-and-fixes.mdx`, and `interview-prep.mdx`.
2. Generate an Archify architecture IR at `src/diagrams/<slug>.architecture.json`.
3. Compile the interactive visual diagram to `public/diagrams/<slug>-architecture.html`.
4. Output the exact snippet to add to `astro.config.mjs` sidebar.

---

## 📁 Repository Structure

```text
BLOG/
├── public/
│   ├── ceril-mark.svg           # Site logo & branding
│   └── diagrams/                # Compiled standalone Archify HTML diagrams
├── scripts/
│   ├── build.mjs                # Cross-platform production build runner
│   └── scaffold-project.mjs     # 5-Pillar automated project scaffolding CLI
├── src/
│   ├── components/
│   │   └── ArchifyDiagram.astro # Responsive Archify diagram embed component
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx        # Blog landing page & portfolio showcase
│   │       ├── project-standard.mdx # 5-Pillar zero-redundancy engineering spec
│   │       ├── projects/        # Master Projects Directory & Project Suites
│   │       │   ├── index.mdx
│   │       │   └── distributed-task-api/ # Flagship 5-Pillar implementation
│   │       ├── backend/         # Infrastructure runbooks
│   │       ├── platform/        # Kubernetes & platform engineering
│   │       ├── mlops/           # Distributed training recovery
│   │       └── incidents/       # Chronological incident analyses (2026 Q4)
│   ├── diagrams/                # Archify JSON Intermediate Representation (IR)
│   └── styles/
│       └── custom.css           # Custom dark theme and typography
├── templates/
│   └── project-template/        # Standardized 5-pillar starter templates
├── tools/
│   └── archify/                 # Archify CLI, renderers & validation engine
├── astro.config.mjs             # Starlight navigation, sidebar, and config
└── package.json
```

---

## 🛠️ Built With

- **Framework:** [Astro](https://astro.build/) & [Starlight](https://starlight.astro.build/)
- **Diagram Engine:** [Archify](https://github.com/tt-a1i/archify)
- **Search:** [Pagefind](https://pagefind.app/) (built-in, offline, instant static search)
- **Formatting & Syntax:** MDX, Expressive Code, GitHub Flavored Markdown

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
