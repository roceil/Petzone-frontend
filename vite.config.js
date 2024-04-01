/* global process */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000
    // proxy: {
    //   '/api': {
    //     target: 'https://petzone-backend.zeabur.app',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  // esbuild 配置
  esbuild: {
    // 在生產環境下去除 console 和 debugger
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})
