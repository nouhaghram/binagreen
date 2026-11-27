"use client";
import React, { createContext, useContext, useState } from 'react';
import { DISTRICT_CENTERS, REFERENCE_POINT, haversineKm, jitter } from '../lib/geo';

export interface Listing {
  id: number;
  material: string;
  qty: string;
  district: string;
  distance: number; // km depuis le point de référence
  gain: number;
  slot: string;
  owner: string;
  phone: string;
  status: 'En attente' | 'Réservé' | 'Collecté';
  lat: number;
  lng: number;
}

type NewListing = Omit<Listing, 'id' | 'distance' | 'status' | 'lat' | 'lng'>;
type RawListing = Omit<Listing, 'distance'>;

interface BinaContextType {
  listings: Listing[];
  addListing: (newListing: NewListing) => void;
  bookListing: (id: number) => void;
  completeListing: (id: number) => void;
}

const distanceFromReference = (lat: number, lng: number) =>
  Number(haversineKm(REFERENCE_POINT, [lat, lng]).toFixed(1));

// Positions approximatives, à l'intérieur de chaque gouvernorat (données de démonstration)
const RAW_DATA: RawListing[] = [
  { id: 1, material: 'Huile usagée', qty: '10 L', district: 'Ariana', gain: 15.0, slot: 'Mar, 17:00 - 19:00', owner: 'Café El Amen', phone: '+216 22 345 678', status: 'En attente', lat: 36.8702, lng: 10.1721 },
  { id: 2, material: 'Plastique', qty: '5 kg', district: 'Tunis', gain: 4.0, slot: 'Mer, 14:00 - 16:00', owner: 'Sana M.', phone: '+216 55 987 654', status: 'En attente', lat: 36.8001, lng: 10.175 },
  { id: 3, material: 'Verre', qty: '8 kg', district: 'Ben Arous', gain: 3.2, slot: 'Lun, 16:00 - 18:00', owner: 'Restaurant Le Golfe', phone: '+216 98 112 233', status: 'Réservé', lat: 36.748, lng: 10.2301 },
  { id: 4, material: 'Carton', qty: '15 kg', district: 'Manouba', gain: 4.5, slot: 'Jeu, 09:00 - 11:00', owner: 'Supérette Nour', phone: '+216 20 445 566', status: 'Collecté', lat: 36.815, lng: 10.095 },
];

const INITIAL_DATA: Listing[] = RAW_DATA.map((l) => ({
  ...l,
  distance: distanceFromReference(l.lat, l.lng),
}));

const BinaContext = createContext<BinaContextType | undefined>(undefined);

export function BinaProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(INITIAL_DATA);

  const addListing = (item: NewListing) => {
    const center = DISTRICT_CENTERS[item.district] ?? REFERENCE_POINT;
    const [lat, lng] = jitter(center);

    const created: Listing = {
      ...item,
      id: Date.now(),
      distance: distanceFromReference(lat, lng),
      status: 'En attente',
      lat,
      lng,
    };
    setListings((prev) => [created, ...prev]);
  };

  const bookListing = (id: number) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Réservé' } : item))
    );
  };

  const completeListing = (id: number) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Collecté' } : item))
    );
  };

  return (
    <BinaContext.Provider value={{ listings, addListing, bookListing, completeListing }}>
      {children}
    </BinaContext.Provider>
  );
}

export function useBina() {
  const context = useContext(BinaContext);
  if (!context) throw new Error('useBina must be used within a BinaProvider');
  return context;
}