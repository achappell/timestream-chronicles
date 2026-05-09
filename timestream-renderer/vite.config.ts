import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execSync } from 'child_process';

const gitHash = process.env.VITE_GIT_HASH || 
                execSync('git rev-parse --short HEAD').toString().trim();

// https://vite.dev/config/
export default defineConfig({
  base: '/timestream-chronicles/',
  plugins: [vue()],
  define: {
    '__APP_VERSION__': JSON.stringify(`${process.env.npm_package_version}-${gitHash}`),
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov'],
    },
  },
})
