/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import { IPTable } from '../IPTable';

const mockIPs = [
  {
    id: '1',
    ip: '8.8.8.8',
    country: 'United States',
    city: 'Mountain View',
    latitude: 37.386,
    longitude: -122.084,
    isp: 'Google LLC',
    threatLevel: 'low',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    ip: '1.1.1.1',
    country: 'Australia',
    city: 'Sydney',
    latitude: -33.868,
    longitude: 151.207,
    isp: 'Cloudflare',
    threatLevel: 'low',
    createdAt: new Date('2024-01-02').toISOString(),
  },
];

describe('IPTable', () => {
  it('debe renderizar tabla con IPs', () => {
    render(
      <IPTable
        data={mockIPs}
        onDelete={jest.fn()}
        isLoading={false}
        onSelectIP={jest.fn()}
      />
    );

    expect(screen.getByText('8.8.8.8')).toBeInTheDocument();
    expect(screen.getByText('1.1.1.1')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Australia')).toBeInTheDocument();
  });

  it('debe mostrar mensaje cuando no hay IPs', () => {
    render(
      <IPTable
        data={[]}
        onDelete={jest.fn()}
        isLoading={false}
        onSelectIP={jest.fn()}
      />
    );

    expect(screen.getByText('No hay IPs registradas')).toBeInTheDocument();
  });

  it('debe llamar onDelete al hacer clic en eliminar', async () => {
    const handleDelete = jest.fn();
    render(
      <IPTable
        data={mockIPs}
        onDelete={handleDelete}
        isLoading={false}
        onSelectIP={jest.fn()}
      />
    );

    const deleteButtons = screen.getAllByText('Eliminar');
    fireEvent.click(deleteButtons[0]);

    const confirmButtons = await screen.findAllByText('Eliminar');
    fireEvent.click(confirmButtons[1]);

    expect(handleDelete).toHaveBeenCalledWith('1');
  });

  it('debe mostrar spinner cuando está cargando', () => {
    render(
      <IPTable
        data={[]}
        onDelete={jest.fn()}
        isLoading={true}
        onSelectIP={jest.fn()}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
