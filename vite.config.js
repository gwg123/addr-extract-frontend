import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), compression()],
  server: {
    port: 5173,
    open: false
  },
  publicDir: 'public'
})

