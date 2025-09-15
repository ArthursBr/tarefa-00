import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],  
  base: '/',
  server: {
    port: 3000,
    strictPort: true, // Garante que o Vite falhe se a porta 3000 estiver ocupada
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend na porta 4000
        changeOrigin: true,
        secure: false
      }
    }
  }
})
