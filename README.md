# Practica 3 - Google Books Client 
<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)

**Un buscador de libros moderno, rápido y capaz de funcionar sin conexión.**
[🚀 Demo GH Pages](#githubPages)

</div>

---

## 📋 Tabla de Contenidos

- [✨ Características](#-características)
- [🎯 Objetivo](#-objetivo)
- [🛠️ Tecnologías](#️-tecnologías)
- [📦 Instalación](#-instalación)
- [🚀 Uso](#-uso)
- [📱 PWA](#-pwa)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## ✨ Características

- **🔍 Búsqueda en Tiempo Real:** Interfaz limpia para consultar la API de Google Books.
- **🛡️ Validación de Formularios:** Gestión de errores visuales si se intenta buscar sin título.
- **⚡ Feedback Visual:** Indicadores de estado de carga (`isLoading`) y manejo de errores de red.
- **📱 Diseño Responsivo:** Grid adaptable (Móvil, Tablet, Desktop) utilizando Tailwind CSS.
- **📦 Componentización:** Arquitectura modular con tarjetas de libros (`BookCard`) reutilizables.
- **📶 PWA Offline-First:** Capacidad de instalación en escritorio/móviles y funcionamiento sin conexión gracias a Vite PWA Plugin.

---

## 🎯 Objetivo

El objetivo de este proyecto es desarrollar una **Single Page Application (SPA)** robusta que consuma servicio de Google Books, con capacidades progresivas (PWA) para garantizar una experiencia de usuario fluida y en condiciones de sin conexión de red para cumplir con los requisitos de la Práctica 3 de la asignatura de PAD 2025/26.

---


## 🛠️ Tecnologías

### Frontend
- **React 19.2** - Biblioteca UI con hooks modernos
- **Vite 7.2** - Build tool ultra-rápido con HMR
- **Tailwind CSS 4.1** - Utility-first CSS framework

### PWA
- **vite-plugin-pwa** - Service worker automático
- **Workbox** - Estrategias de caché offline-first

### Herramientas de Desarrollo
- **ESLint 9** - Linter con configuración flat config

---

## 📦 Instalación

### Requisitos previos
- Node.js 18+ (recomendado LTS)
- npm, pnpm, o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/alex-boni/PAD-2025-26-G02-Practicas.git
   cd PAD-2025-26-G02-Practicas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   # o
   yarn install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

---

## 🚀 Uso

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Genera build de producción optimizado |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Ejecuta ESLint para validar código |

### Estructura del proyecto

```
PAD-2025-26-G02-Practicas/
├── public/
│   ├── manifest.webmanifest    # Configuración de instalación PWA
│   └── icons/                  # Iconos para distintos dispositivos
├── src/
│   ├── assets/                 # Imágenes y recursos estáticos
│   ├── components/
│   │   └── BookCard.jsx        # Componente para mostrar cada libro
│   ├── pages/                  # (Opcional si usas routing)
|   │   ├── Home.jsx                # Formulario y Pagina principal de búsqueda 
|   │   ├── Home.css                # Estilos específicos de la Home
│   │   └── homeService.js      # Lógica de fetch a la API
│   ├── services/
│   │   └── apiGoogleBooks.js      # Configuración de axions global.
│   ├── App.jsx                 # Componente raíz
│   ├── index.css               # Tailwind imports y estilos globales
│   └── main.jsx                # Entry point y registro de SW
├── vite.config.js              # Configuración Vite + Plugin PWA
└── package.json
```

---

## 📱 PWA

### Características PWA

- ✅ **Instalable** en dispositivos móviles y escritorio
- ✅ **Offline-first** con service worker automático
- ✅ **Auto-actualización** de contenido
- ✅ **Iconos adaptativos** para todas las plataformas

### Configuración del Service Worker

El SW se registra automáticamente en `src/main.jsx`:

```javascript
window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registrado:', reg))
    .catch(err => console.error('Error SW:', err));
});
```

### Manifest

Edita `public/manifest.webmanifest` para personalizar:

```json
{
  "name": "",
  "short_name": "",
  "theme_color": "#0370b3",
  "background_color": "#ffffff",
  "display": "standalone",
  "icons": [ /* tus iconos */ ]
}
```

---



## 📄 Licencia


---

## 👥 Contribuidores

### Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

---

