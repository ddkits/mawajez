import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Set this to '/<repo>/' when deploying to GitHub Pages
  base: '/',
  plugins: [react()],
})
