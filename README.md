# IP Geolocation Tracker - Frontend

Frontend de la aplicación de geolocalización de IPs.

## Tecnologías

- React 18
- TypeScript
- Vite
- TailwindCSS v4
- React Leaflet
- Axios
- Jest + Testing Library

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Testing

```bash
npm test
npm run test:coverage
```

## Variables de Entorno

Crear `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Características

- Búsqueda de IPs con validación en tiempo real
- Tabla paginada con filtros (país, ciudad, nivel de amenaza)
- Mapa interactivo con Leaflet
- Estadísticas en tiempo real
- Manejo de errores del backend con retry
- Modal de confirmación para eliminar
- Diseño responsive con TailwindCSS
- Code splitting y obfuscación para producción
- Error boundary para fallos del backend

## Arquitectura

- **Hooks personalizados**: useIPs, usePagination, useFilters, useAlert
- **Componentes separados**: Cada componente en su carpeta con types
- **Servicios**: IPService con métodos genéricos
- **Performance**: React.memo, useCallback, useMemo
- **Testing**: Jest con Testing Library
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
