import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
  plugins: [svelte(), viteSingleFile()],
  // TODO remove process dep from @blockpal/vault-x-sdk and this polyfill
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      process: 'process/browser'
    }
  }
});
