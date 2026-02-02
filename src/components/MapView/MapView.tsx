import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { MAP_CONFIG } from '../../constants/config';
import type { MapViewProps } from './MapView.types';

const MapUpdater = ({ coordinates }: { coordinates: { lat: number; lng: number } }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([coordinates.lat, coordinates.lng], MAP_CONFIG.MARKER_ZOOM);
  }, [coordinates, map]);

  return null;
};

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapViewComponent = ({ coordinates, ipAddress, city, country }: MapViewProps) => {
  const position: [number, number] = [coordinates.lat, coordinates.lng];

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={position}
        zoom={MAP_CONFIG.MARKER_ZOOM}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{ipAddress}</p>
              <p className="text-gray-600">{city}, {country}</p>
              <p className="text-xs text-gray-500 mt-1">
                {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
        <MapUpdater coordinates={coordinates} />
      </MapContainer>
    </div>
  );
};

export const MapView = memo(MapViewComponent);