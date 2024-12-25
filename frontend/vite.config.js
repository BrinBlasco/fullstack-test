import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 9999,
  },
  preview: {
    port: 8000,
  },
  plugins: [react()],
})
