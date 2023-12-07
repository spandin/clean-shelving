import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";


const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Clean Shelving',
    short_name: 'Clean Shelving',
    icons: [
    {
        "src": "/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
    },
    {
        "src": "/icon-256x256.png",
        "sizes": "256x256",
        "type": "image/png"
    },
    {
        "src": "/icon-384x384.png",
        "sizes": "384x384",
        "type": "image/png"
    },
    {
        "src": "/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
    }
    ],
    theme_color: '#121212',
    background_color: '#121212',
    display: 'standalone',
    scope: '/products/',
    start_url: '/products/',
    orientation: 'portrait'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [react(), VitePWA(manifestForPlugin)],
})
