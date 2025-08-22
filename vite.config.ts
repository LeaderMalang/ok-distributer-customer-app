
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig(({

plugins: [
    react(),
    VitePWA({ 
      registerType: 'prompt',
      // include public directory files here
      includeAssets: ['app-icon.svg'],
      // include webpack-loaded files here
      workbox: {
       globPatterns: ['**/*.{js,css,html}', 'assets/*.svg'],
      },
      // enable sw on development
      devOptions: {
        enabled: true
      }
    })
  ],

}) );

// => {
  
//     const env = loadEnv(mode, '.', '');
//     return {
//       define: {
//         'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
//         'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
//       },
//       resolve: {
//         alias: {
//           '@': path.resolve(__dirname, '.'),
//         }
//       }
//     };
// });
