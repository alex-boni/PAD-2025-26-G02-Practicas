import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
const PUBLIC_URL = '/PAD-2025-26-G02-Practicas/';
const SW_SCRIPT_PATH = `${PUBLIC_URL}sw.js`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // VitePWA genera el archivo sw.js
    navigator.serviceWorker.register(SW_SCRIPT_PATH, { scope: PUBLIC_URL }).then(registration => {
      console.log('SW registrado con éxito:', registration);
    }).catch(error => {
      console.error('Fallo en el registro del SW:', error);
    });
  });
}