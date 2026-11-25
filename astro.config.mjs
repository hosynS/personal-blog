import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Core Engineering Runbooks & Incident Log',
      description:
        'Production-grade runbooks, architecture notes, and chronological incident analysis.',
      logo: {
        src: './public/ceril-mark.svg',
        alt: 'CERIL'
      },
      favicon: '/ceril-mark.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/hosynS/personal-blog' }
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'About CERIL', slug: 'index' },
            { label: 'Project Standard', slug: 'project-standard' },
            { label: 'Operating model', slug: 'operating-model' },
            { label: 'Evidence model', slug: 'evidence-model' },
            { label: 'Attachments and evidence', slug: 'attachments-guide' },
            { label: 'Writing guide', slug: 'writing-guide' }
          ]
        },
        {
          label: 'Engineering Projects',
          items: [
            { label: 'Projects Directory', slug: 'projects' },
            {
              label: 'Distributed Task API',
              items: [
                { label: 'Overview & Stack', slug: 'projects/distributed-task-api' },
                { label: 'Architecture (Archify)', slug: 'projects/distributed-task-api/architecture' },
                { label: 'Cheatsheet', slug: 'projects/distributed-task-api/cheatsheet' },
                { label: 'Errors & Fixes', slug: 'projects/distributed-task-api/errors-and-fixes' },
                { label: 'Interview Prep', slug: 'projects/distributed-task-api/interview-prep' }
              ]
            }
          ]
        },
        {
          label: 'Core Infrastructure',
          items: [
            {
              label: 'Backend Engineering',
              items: [
                { label: 'API latency remediation', slug: 'backend/api-latency-remediation' }
              ]
            },
            {
              label: 'DevOps & Platform',
              items: [
                { label: 'Kubernetes crash-loop remediation', slug: 'platform/kubernetes-crash-loop' }
              ]
            },
            {
              label: 'MLOps Architecture',
              items: [
                { label: 'Distributed training recovery', slug: 'mlops/distributed-training-recovery' }
              ]
            },
            {
              label: 'Data Engineering',
              items: [
                { label: 'Data engineering foundations', slug: 'data-engineering' }
              ]
            }
          ]
        },
        {
          label: 'Incident Log',
          items: [
            { label: '2026 Q4', slug: 'incidents/2026-q4' },
            { label: 'Historical logs', slug: 'incidents/historical' }
          ]
        }
      ],
    })
  ]
});
