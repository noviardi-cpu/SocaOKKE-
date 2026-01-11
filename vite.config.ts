
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env dari file .env (lokal) atau environment variable (Netlify)
  // Fix: Cast process to any to access cwd() method when Node types are not properly detected by the IDE/Compiler in vite.config.ts
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Injeksi API_KEY ke dalam kode aplikasi saat build
      // Fix: Cast process to any to safely access env property during build time replacement
      'process.env.API_KEY': JSON.stringify(env.API_KEY || (process as any).env.API_KEY)
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    },
    server: {
      port: 3000
    }
  };
});
