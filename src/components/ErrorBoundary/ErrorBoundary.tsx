import { memo } from 'react';
import { Button } from '../common';

interface ErrorBoundaryProps {
  message: string;
  onRetry?: () => void;
}

const ErrorBoundaryComponent = ({ message, onRetry }: ErrorBoundaryProps) => {
  return (
    <div className="min-h-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Error de Conexión
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            Reintentar
          </Button>
        )}
      </div>
    </div>
  );
};

export const ErrorBoundary = memo(ErrorBoundaryComponent);
