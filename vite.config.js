import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // Forward any /api/* request from localhost:5173 to 
  // https:https://sunsafe-web.onrender.com
  server: {
    proxy: {
      '/api': {
        target: 'https://sunsafe-web.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
