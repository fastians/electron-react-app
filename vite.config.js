import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Directory where Vite will output the built files
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Ensure that all static assets are placed in the same directory
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  base: "./"
});
