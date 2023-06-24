import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    esbuild: {
        loader: 'jsx',
      },
      optimizeDeps: {
        esbuildOptions: {
          loader: {
            '.js': 'jsx',
          },
        },
      },
    plugins: [react()],
  };
});