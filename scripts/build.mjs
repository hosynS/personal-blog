import { spawn } from 'node:child_process';

process.env.ASTRO_TELEMETRY_DISABLED = '1';

const child = spawn('npx', ['astro', 'build', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
