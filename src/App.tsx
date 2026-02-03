import { useCallback, useState } from 'react';
import { Alert, ErrorBoundary, IPTable, MapView, SearchBar, Statistics, TableFilters } from './components';
import { useAlert, useIPs } from './hooks';
import type { IPData } from './types';
import { toCoordinates } from './types';

function App() {
  const [selectedIP, setSelectedIP] = useState<IPData | null>(null);
  const { alert, showAlert, hideAlert } = useAlert();

  const {
    ips,
    loading,
    isBackendDown,
    pagination,
    filters,
    hasActiveFilters,
    activeFilterCount,
    createIP,
    deleteIP,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    updateFilters,
    clearFilters,
    retryConnection,
  } = useIPs();

  const handleSearch = useCallback(
    async (ip: string) => {
      const result = await createIP(ip);

      if (result.isDuplicate) {
        showAlert('warning', 'Esta IP ya fue registrada anteriormente');
      } else if (result.success && result.data) {
        setSelectedIP(result.data);
      }
    },
    [createIP, showAlert]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteIP(id);
        setSelectedIP(null);
      } catch {
        showAlert('error', 'No se pudo eliminar la IP');
      }
    },
    [deleteIP, showAlert]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
            IP Geolocation Tracker
          </h1>
          <p className="text-gray-600 text-center">
            Consulta y rastrea información de direcciones IP
          </p>
        </header>

        <Statistics className="mb-8" />

        {isBackendDown && (
          <ErrorBoundary
            message="No se puede conectar con el servidor. Verifica que el backend esté ejecutándose."
            onRetry={retryConnection}
          />
        )}

        {alert.isOpen && (
          <div className="mb-6">
            <Alert
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onClose={hideAlert}
            />
          </div>
        )}

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>

        <TableFilters
          filters={filters}
          onFilterChange={updateFilters}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
        />

        <div className="mb-8">
          <IPTable data={ips} isLoading={loading} onDelete={handleDelete} onSelectIP={setSelectedIP} />
        </div>

        {pagination.total > 0 && (
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md mb-8">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> a{' '}
              <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> de{' '}
              <span className="font-medium">{pagination.total}</span> resultados
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevPage}
                disabled={!canGoPrev}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-200">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={!canGoNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {selectedIP && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ubicación de {selectedIP.ip}
            </h2>
            <MapView
              coordinates={toCoordinates(selectedIP)}
              ipAddress={selectedIP.ip}
              city={selectedIP.city}
              country={selectedIP.country}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
