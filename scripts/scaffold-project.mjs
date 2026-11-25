#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const slug = process.argv[2];
const rawTitle = process.argv[3];

if (!slug) {
  console.error('\nUsage: npm run scaffold:project <project-slug> ["Project Title"]\n');
  console.error('Example: npm run scaffold:project event-stream-pipeline "Event Stream Pipeline"\n');
  process.exit(1);
}

const title = rawTitle || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
const projectDir = path.join(rootDir, 'src', 'content', 'docs', 'projects', slug);
const templatesDir = path.join(rootDir, 'templates', 'project-template');
const publicDiagramsDir = path.join(rootDir, 'public', 'diagrams');

console.log(`\n======================================================`);
console.log(`Scaffolding New Zero-Redundancy Project: ${title} (${slug})`);
console.log(`======================================================\n`);

// 1. Ensure target directory exists
fs.mkdirSync(projectDir, { recursive: true });
fs.mkdirSync(publicDiagramsDir, { recursive: true });

// 2. Read template files and instantiate them
const templateFiles = ['index.mdx', 'architecture.mdx', 'cheatsheet.mdx', 'errors-and-fixes.mdx', 'interview-prep.mdx'];

for (const file of templateFiles) {
  const srcPath = path.join(templatesDir, file);
  const destPath = path.join(projectDir, file);
  
  if (fs.existsSync(destPath)) {
    console.log(`[skip] ${file} already exists at ${destPath}`);
    continue;
  }

  let content = fs.readFileSync(srcPath, 'utf8');
  content = content
    .replaceAll('{{PROJECT_SLUG}}', slug)
    .replaceAll('{{PROJECT_TITLE}}', title)
    .replaceAll('{{PROJECT_DESCRIPTION}}', `Production-grade architecture, cheatsheet, debugging log, and interview guide for ${title}.`);

  fs.writeFileSync(destPath, content, 'utf8');
  console.log(`[created] src/content/docs/projects/${slug}/${file}`);
}

// 3. Generate starter Archify diagram JSON
const diagramsSourceDir = path.join(rootDir, 'src', 'diagrams');
fs.mkdirSync(diagramsSourceDir, { recursive: true });

const archifyJsonPath = path.join(diagramsSourceDir, `${slug}.architecture.json`);
const archifyHtmlPath = path.join(publicDiagramsDir, `${slug}-architecture.html`);

if (!fs.existsSync(archifyJsonPath)) {
  const starterArchifyIR = {
    "$schema": "https://archify.si/schemas/architecture.schema.json",
    "meta": {
      "title": `${title} Architecture`,
      "description": `System boundaries and runtime components for ${title}.`,
      "locale": "en",
      "quality_profile": "standard"
    },
    "layout": {
      "mode": "auto"
    },
    "boundaries": [
      {
        "id": "public-dmz",
        "label": "Public DMZ",
        "kind": "cloud"
      },
      {
        "id": "vpc-internal",
        "label": "VPC Private Network",
        "kind": "cloud"
      }
    ],
    "components": [
      {
        "id": "client",
        "label": "Web & Mobile Clients",
        "role": "client",
        "icon": "globe",
        "boundary": "public-dmz"
      },
      {
        "id": "gateway",
        "label": "API Gateway / Ingress",
        "role": "gateway",
        "icon": "shield",
        "boundary": "public-dmz",
        "tech": "Envoy / Nginx"
      },
      {
        "id": "service-core",
        "label": `${title} Core API`,
        "role": "service",
        "icon": "server",
        "boundary": "vpc-internal",
        "tech": "Go / Node.js"
      },
      {
        "id": "redis-cache",
        "label": "Redis Cache",
        "role": "cache",
        "icon": "database",
        "boundary": "vpc-internal",
        "tech": "Redis 7"
      },
      {
        "id": "postgres-db",
        "label": "PostgreSQL Primary",
        "role": "database",
        "icon": "database",
        "boundary": "vpc-internal",
        "tech": "PostgreSQL 16"
      }
    ],
    "relationships": [
      {
        "id": "r1",
        "from": "client",
        "to": "gateway",
        "label": "HTTPS / TLS",
        "protocol": "https"
      },
      {
        "id": "r2",
        "from": "gateway",
        "to": "service-core",
        "label": "gRPC / HTTP",
        "protocol": "http"
      },
      {
        "id": "r3",
        "from": "service-core",
        "to": "redis-cache",
        "label": "Cache-aside check",
        "protocol": "redis"
      },
      {
        "id": "r4",
        "from": "service-core",
        "to": "postgres-db",
        "label": "ACID query / outbox",
        "protocol": "postgres"
      }
    ]
  };

  fs.writeFileSync(archifyJsonPath, JSON.stringify(starterArchifyIR, null, 2), 'utf8');
  console.log(`[created] Archify IR: src/diagrams/${slug}.architecture.json`);

  // Build the Archify diagram
  try {
    const archifyRenderer = path.join(rootDir, 'tools', 'archify', 'renderers', 'architecture', 'render-architecture.mjs');
    console.log(`[archify] Compiling interactive architecture diagram...`);
    execSync(`node "${archifyRenderer}" "${archifyJsonPath}" "${archifyHtmlPath}"`, {
      cwd: rootDir,
      stdio: 'pipe'
    });
    console.log(`[created] Interactive Diagram: public/diagrams/${slug}-architecture.html`);
  } catch (err) {
    console.warn(`[archify warning] Could not automatically deliver diagram: ${err.message}`);
  }
}

console.log(`\nSUCCESS: Project ${slug} scaffolded successfully!`);
console.log(`\nNext: Add this block to your astro.config.mjs sidebar array under 'Projects':`);
console.log(`--------------------------------------------------------------------------------`);
console.log(`{
  label: '${title}',
  items: [
    { label: 'Overview', slug: 'projects/${slug}' },
    { label: 'Architecture', slug: 'projects/${slug}/architecture' },
    { label: 'Cheatsheet', slug: 'projects/${slug}/cheatsheet' },
    { label: 'Errors & Fixes', slug: 'projects/${slug}/errors-and-fixes' },
    { label: 'Interview Prep', slug: 'projects/${slug}/interview-prep' }
  ]
}`);
console.log(`--------------------------------------------------------------------------------\n`);
