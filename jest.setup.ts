import '@testing-library/jest-dom';

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:5000/api',
      },
    },
  },
  writable: true,
});
