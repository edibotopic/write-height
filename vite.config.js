import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
