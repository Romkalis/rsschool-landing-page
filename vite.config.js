import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { convertToWebp } from './plugins/convert-to-webp.js';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
  plugins: [
    // Raster images (jpg, png) are converted to webp by convertToWebp, the optimizer handles svg
    ViteImageOptimizer({
      test: /\.svg$/i,
      svg: { multipass: true },
    }),
    // Every image is at most 120 KB: the quality is lowered, then the image is scaled down
    convertToWebp({ quality: 80, maxSize: 120 * 1024 }),
  ],
});
