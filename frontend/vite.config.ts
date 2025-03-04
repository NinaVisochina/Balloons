import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
        '/api': {
            target: 'http://91.238.103.121:5000/', // Порт, на якому працює ваш бекенд
            changeOrigin: true,
            secure: false
        }
    }
},
  plugins: [react()],
})
