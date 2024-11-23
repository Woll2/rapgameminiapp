import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/rapgame-tgminiapp/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@tonconnect/ui-react', '@twa-dev/sdk'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    https: true,
  },
})
