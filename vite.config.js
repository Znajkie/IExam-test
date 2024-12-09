import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
    alias: {
      '\\.(css|less|scss|sass)$': './__mocks__/styleMock.js',
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
});