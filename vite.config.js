import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
    css: false,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'json-summary'],
      all: true,
      exclude: ['./src/main.jsx', 'vite.config.js'],
    },
  },
});