"use client";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import type { Listing } from '../context/BinaContext';
import { REFERENCE_POINT } from '../lib/geo';

interface Props {
  listings: Listing[];
  activeId: number | null;
  onSelect: (id: number) => void;
}

// Pastille personnalisée (le style est dans globals.css : .bina-pin)
function pinIcon(item: Listing, selected: boolean) {
  return L.divIcon({
    className: '',
    html: `<div class="bina-pin${selected ? ' bina-pin-active' : ''}">${item.material} • ${item.gain} TND</div>`,
    iconSize: [0, 0],
  });
}

export default function ListingsMap({ listings, activeId, onSelect }: Props) {
  return (
    <MapContainer center={REFERENCE_POINT} zoom={11} scrollWheelZoom className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={pinIcon(item, item.id === activeId)}
          eventHandlers={{ click: () => onSelect(item.id) }}
        />
      ))}
    </MapContainer>
  );
}