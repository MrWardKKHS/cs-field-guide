process.env.ROLLUP_NO_BINARY = 'true';
process.env.ROLLUP_NO_NATIVE = 'true';

import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import pjson from './package.json' with { type: 'json' };
import legacy from '@vitejs/plugin-legacy';
import { globSync } from 'glob';

const vendorsRoot = 'node_modules/';
const staticSourceRoot = 'static/';
const staticOutputRoot = 'build/';
const rootDir = path.resolve('static');
const entries = {};
globSync('static/interactives/**/js/*.js').forEach((file) => {
  const name = path.relative('static', file).replace(/\.[jt]s$/, '');
  if (!name.includes("starter-structure")){ // filter out starter-structure
      entries[name] = path.resolve(file);
  }
});

const paths = {
  app: `./${pjson.name}`,
  root_dir: rootDir,
  interactives_source: path.resolve(rootDir, 'interactives'),
  images_source: path.resolve(rootDir, 'img'),
  svg_source: path.resolve(rootDir, 'svg'),
  files_source: path.resolve(rootDir, 'files'),
  js_output: path.resolve('csfieldguide', 'build'),
};

export default defineConfig({
  root: paths.root_dir,
  build: {
    outDir: path.resolve('csfieldguide', 'build'),
    emptyOutDir: false,
    rollupOptions: {
      input: entries
    }
  },
  resolve: {
    alias: {
      '@': paths.root_dir,
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: path.resolve(paths.images_source, '**/*'), dest: 'img' },
        { src: path.resolve(paths.svg_source, '**/*'), dest: 'svg' },
        { src: path.resolve(paths.files_source, '**/*'), dest: 'files' },
      ]
    }),
    legacy({ targets: ['defaults'] })
  ]
});
