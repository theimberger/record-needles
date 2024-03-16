import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      "short_name": "Record Needles",
      "name": "Record Needles: a Simple Stitch Counter",
      "icons": [],
      "background_color": "#3367D6",
      "display": "standalone",
      "scope": "/",
      "theme_color": "#3367D6",
      "shortcuts": [],
      "description": "A stitch counter",
      "screenshots": []
    }
  })],
  base: '/record-needles/'
})
