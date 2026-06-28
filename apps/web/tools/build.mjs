import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options,
  });

  if (result.error) {
    console.error(result.error.message);
  }

  return result.status ?? 1;
};

run(process.execPath, ['tools/generate-llms.js']);

const viteCli = fileURLToPath(new URL('../../../node_modules/vite/bin/vite.js', import.meta.url));
const status = run(process.execPath, [viteCli, 'build', '--outDir', '../../dist/apps/web']);
process.exit(status);
