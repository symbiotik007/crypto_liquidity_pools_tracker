import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@msgpack/msgpack', '@noble/hashes/sha3.js'],
  },
  server: {
    proxy: {
      '/graph-api': {
        target: 'https://gateway.thegraph.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graph-api/, '/api'),
        secure: true,
      }
    }
  }
})