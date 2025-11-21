# Proyecto base React + Vite

Plantilla inicial creada con `npm create vite@latest` utilizando el template oficial de React. Incluye Hot Module Replacement, ESLint básico y configuración lista para escalar el proyecto.

## Requisitos

- Node.js 18+ (se recomienda la versión LTS vigente)
- npm 9+ o equivalente (`pnpm`/`yarn` también funcionan)

## Scripts disponibles

- `npm install`: instala las dependencias.
- `npm run dev`: levanta el servidor de desarrollo en `http://localhost:5173`.
- `npm run build`: genera la versión optimizada para producción dentro de `dist/`.
- `npm run preview`: sirve el build generado para validarlo localmente.

## Estructura rápida

- `src/main.jsx`: punto de entrada de la aplicación.
- `src/App.jsx` y `src/App.css`: componente principal y estilos asociados.
- `public/`: archivos estáticos expuestos sin procesamiento.
- `vite.config.js`: configuración de Vite y plugins.

## Próximos pasos sugeridos

1. Actualiza `src/App.jsx` con el diseño/base que necesites.
2. Configura variables de entorno creando un archivo `.env` (ej. `VITE_API_URL`).
3. Agrega librerías de UI, estado o routing según los requerimientos del proyecto.
