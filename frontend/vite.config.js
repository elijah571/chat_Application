import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/': {
        target: "https://chat-app-4j3t.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
