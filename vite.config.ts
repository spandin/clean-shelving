import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Clean Shelving',
    short_name: 'Clean Shelving',
    icons: [
      {
        src: "/logo512.png",
        sizes: "512x512",
        type: 'image/png',
      },
      {
        src: "/logo192.png",
        sizes: "192x192",
        type: 'image/png',
      },
      {
        src: "/apple-touch.png",
        sizes: "180x180",
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: "/maskable.png",
        sizes: "225x225",
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    theme_color: '#121212',
    background_color: '#121212',
    display: 'standalone',
    scope: '/',
    start_url: '/products/',
    orientation: 'portrait'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
})
