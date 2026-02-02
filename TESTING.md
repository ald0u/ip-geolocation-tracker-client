# Testing

## Configuración

Jest configurado con:
- `ts-jest` para TypeScript
- `@testing-library/react` para componentes React
- `@testing-library/jest-dom` para matchers personalizados
- `jsdom` para entorno de navegador

## Ejecutar Pruebas

```bash
npm test
npm run test:watch
npm run test:coverage
```

## Estructura

```
src/
  components/
    IPTable/
      __tests__/
        IPTable.test.tsx
```

## Cobertura

Las pruebas cubren:
- Renderizado de componentes
- Interacciones de usuario (clicks, submit)
- Estados de carga
- Manejo de datos vacíos
- Callbacks y eventos

## Notas

- Los mocks de servicios están en `src/__mocks__/`
- jest.config.cjs contiene configuración global
- jest.setup.ts inicializa testing-library/jest-dom
