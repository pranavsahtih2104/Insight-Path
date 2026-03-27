import { defineConfig } from 'vite'; // <--- ADD THIS LINE
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Ensure this matches your Spring Boot port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});