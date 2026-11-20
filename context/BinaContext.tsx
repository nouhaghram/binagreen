"use client";
import React, { createContext, useContext, useState } from 'react';

export interface Listing {
  id: number;
  material: string;
  qty: string;
  district: string;
  distance: number;
  gain: number;
  slot: string;
  owner: string;
  phone: string;
  status: 'En attente' | 'Réservé' | 'Collecté';
  x: string;
  y: string;
}

interface BinaContextType {
  listings: Listing[];
  addListing: (newListing: Omit<Listing, 'id' | 'distance' | 'status' | 'x' | 'y'>) => void;
  bookListing: (id: number) => void;
  completeListing: (id: number) => void;
}

const INITIAL_DATA: Listing[] = [
  { id: 1, material: 'Huile usagée', qty: '10 L', district: 'Ariana', distance: 1.2, gain: 15.0, slot: 'Mar, 17:00 - 19:00', owner: 'Café El Amen', phone: '+216 22 345 678', status: 'En attente', x: '45%', y: '35%' },
  { id: 2, material: 'Plastique', qty: '5 kg', district: 'Tunis', distance: 2.4, gain: 4.0, slot: 'Mer, 14:00 - 16:00', owner: 'Sana M.', phone: '+216 55 987 654', status: 'En attente', x: '60%', y: '55%' },
  { id: 3, material: 'Verre', qty: '8 kg', district: 'Ben Arous', distance: 2.9, gain: 3.2, slot: 'Lun, 16:00 - 18:00', owner: 'Restaurant Le Golfe', phone: '+216 98 112 233', status: 'Réservé', x: '70%', y: '75%' },
  { id: 4, material: 'Carton', qty: '15 kg', district: 'Manouba', distance: 4.5, gain: 4.5, slot: 'Jeu, 09:00 - 11:00', owner: 'Supérette Nour', phone: '+216 20 445 566', status: 'Collecté', x: '25%', y: '50%' },
];

const BinaContext = createContext<BinaContextType | undefined>(undefined);

export function BinaProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(INITIAL_DATA);

  const addListing = (item: Omit<Listing, 'id' | 'distance' | 'status' | 'x' | 'y'>) => {
    const coords: Record<string, { x: string; y: string }> = {
      Ariana: { x: '48%', y: '30%' },
      Tunis: { x: '55%', y: '50%' },
      'Ben Arous': { x: '68%', y: '70%' },
      Manouba: { x: '30%', y: '45%' },
    };
    const pos = coords[item.district] || { x: '50%', y: '50%' };

    const created: Listing = {
      ...item,
      id: Date.now(),
      distance: 1.5,
      status: 'En attente',
      x: pos.x,
      y: pos.y,
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