import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './.coverage',
      reporter: ['text', 'html', 'json-summary'],
      include: ['src/**/*'],
      exclude: [
        '**/*.test.ts',
        'src/icons/**',
        'src/index.ts',
        'src/IconBase.tsx',
        'src/dev/**',
        'src/registry/**',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 80,
        statements: 90,
      },
    },
  },
})
