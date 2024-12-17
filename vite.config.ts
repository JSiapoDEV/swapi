/// <reference types="vitest" />

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['vitest'],
  },
  test: { environment: 'node' },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@functions': path.resolve(__dirname, 'functions'),
      '@helpers': path.resolve(__dirname, 'helpers'),
      '@entities': path.resolve(__dirname, 'entities'),
      '@domain': path.resolve(__dirname, 'domain'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@test': path.resolve(__dirname, 'test'),
    },
  },
});
