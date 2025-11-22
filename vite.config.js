import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'demos/*',
          dest: 'demos'
        },
        {
          src: 'assets/*',
          dest: 'assets'
        }
      ]
    })
  ],
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
