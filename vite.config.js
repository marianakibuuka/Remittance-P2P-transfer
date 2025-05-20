import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react() 
    
  ],
  //added
  define: {
    'process.env': process.env, // Forward env variables
  },
  server: {
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline'", // Needed for wallet connections
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});