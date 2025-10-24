import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import path from 'path' // Importation du module 'path' de Node.js

// `https://vitejs.dev/config/`
export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      // Configuration de l'alias '@' pour qu'il pointe vers le dossier src.
      '@': path.resolve(__dirname, './src'),
    },
  },
})
