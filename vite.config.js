import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 
import { VitePWA } from 'vite-plugin-pwa'
  


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  VitePWA({
      registerType: 'autoUpdate', // El Service Worker se actualiza automáticamente
      workbox: {
        // Caching de Assets estáticos (JavaScript, CSS, imágenes)
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], 
      },
      manifest: {
        name: "Google Books Client",
        short_name: "BooksClient",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4f46e5",
        icons: [
        {
            "src": "icons/appstore.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/playstore.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "icons/ic_app_512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "icons/ic_app_196.png",
            "sizes": "196x196",
            "type": "image/png"
        }
        ]
      }
    })
  ],
})
