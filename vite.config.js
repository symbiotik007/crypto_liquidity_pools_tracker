import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@msgpack/msgpack'],
  },
  server: {
    port: 5174,
    proxy: {
      '/graph-api': {
        target: 'https://gateway.thegraph.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graph-api/, '/api'),
        secure: true,
      },
      '/revert-api': {
        target: 'https://api.revert.finance',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/revert-api/, ''),
        secure: true,
      }
    }
  }
})