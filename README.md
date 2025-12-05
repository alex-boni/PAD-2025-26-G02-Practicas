# 🎡 Ruleta Student LTF - Gira sin Resistencias

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)


[🚀 Demo](#) · [📖 Documentación](#instalación) · [🐛 Reportar Bug](../../issues)

</div>

---

## 📋 Tabla de Contenidos

- [✨ Características](#-características)
- [🎯 Objetivo](#-objetivo)
- [🎰 Sistema de Premios](#-sistema-de-premios)
- [🛠️ Tecnologías](#️-tecnologías)
- [📦 Instalación](#-instalación)
- [🚀 Uso](#-uso)
- [🎨 Personalización](#-personalización)
- [📱 PWA](#-pwa)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## ✨ Características




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
- **PostCSS** - Procesamiento de CSS

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
ruletaLTF/
├── public/
│   ├── manifest.webmanifest    # Configuración PWA
│   └── icons/                  # Iconos de la aplicación
├── src/
│   ├── App.jsx                 # Componente principal con lógica 
│   ├── main.jsx                # Entry point, registra SW
│   ├── index.css               # Estilos globales + Tailwind imports
│   └── assets/                 # Recursos estáticos
├── vite.config.js              # Configuración de Vite y PWA
├── eslint.config.js            # Configuración de ESLint (flat config)
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

