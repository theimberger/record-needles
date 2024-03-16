import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      "name": "Record Needles - a simple stitch counter",
      "short_name": "Record Needles",
      "start_url": ".",
      "display": "standalone",
      "background_color": "#fff",
      "description": "A stitch counting app.",
      "icons": [],
      "related_applications": []
    }
  })],
  base: '/record-needles/'
})
