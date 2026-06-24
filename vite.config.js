import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Why this file?
// Vite reads this to know which plugins to use.
// - react() enables JSX transformation
// - tailwindcss() scans your files and generates only the CSS classes you actually use
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Any request starting with /api gets forwarded to our Express backend
      // This way the frontend and backend feel like one app during development
      '/api': 'http://localhost:5000',
    },
  },
})
