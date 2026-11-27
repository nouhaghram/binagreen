"use client";
import { useState } from 'react';
import { useBina } from '../../context/BinaContext';
import { MATERIAL_RATES } from '../../lib/materials';
import dynamic from 'next/dynamic';

// La carte est chargée seulement dans le navigateur (Leaflet a besoin de "window")
const ListingsMap = dynamic(() => import('../../components/ListingsMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center text-earth text-sm">
      Chargement de la carte…
    </div>
  ),
});
// Données simulées (Mock API) pour le Grand Tunis


export default function PickupsPage() {
  const { listings, bookListing } = useBina();
  const [maxDistance, setMaxDistance] = useState(10);
  const [selectedMaterial, setSelectedMaterial] = useState('Tous');
  const [activeId, setActiveId] = useState<number | null>(null);

  // On retrouve l'annonce active dans la liste partagée : elle est toujours à jour
  const activeListing = listings.find((l) => l.id === activeId) ?? null;

  // Filtrage dynamique des annonces
  const filteredListings = listings.filter((item) => {
   const notCollected = item.status !== 'Collecté';
   const matchDist = item.distance <= maxDistance;
   const matchMat = selectedMaterial === 'Tous' || item.material === selectedMaterial;
   return notCollected && matchDist && matchMat;
  });

  

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl text-forest font-bold">Trouver des collectes</h1>
        <p className="text-earth text-sm">Grand Tunis (Tunis, Ariana, Ben Arous, Manouba)</p>
      </div>

      {/* Grille 3 colonnes fidèle à votre maquette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLONNE 1 : Filtres (Gauche) */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-3xl border border-pale-leaf h-fit shadow-sm">
          <h2 className="font-heading text-xl text-forest font-bold mb-4">Filtres</h2>

          <div className="mb-6">
            <label className="block text-sm font-bold text-earth mb-2">
              Distance max : <span className="text-forest">{maxDistance} km</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-forest cursor-pointer"
            />
            <div className="flex justify-between text-xs text-earth mt-1">
              <span>1 km</span>
              <span>20 km</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-earth mb-2">Matière</label>
            <div className="space-y-2">
              {['Tous', ...Object.values(MATERIAL_RATES).map((m) => m.label)].map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition ${
                    selectedMaterial === mat
                      ? 'bg-forest text-sand'
                      : 'bg-sand text-forest hover:bg-pale-leaf'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* COLONNE 2 : Carte interactive (Centre) */}
<div className="lg:col-span-5 bg-pale-leaf/60 rounded-3xl border-2 border-pale-leaf relative min-h-[420px] overflow-hidden">
  <div className="absolute inset-0">
    <ListingsMap listings={filteredListings} activeId={activeId} onSelect={setActiveId} />
  </div>

  {/* z-[1000] : pour rester au-dessus de la carte */}
  <span className="absolute top-4 left-4 z-[1000] bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-forest shadow-sm">
    Carte : Grand Tunis ({filteredListings.length} lots)
  </span>

  {activeListing && (
    <div className="absolute bottom-4 left-4 right-4 z-[1000] bg-white p-4 rounded-2xl shadow-lg border border-pale-leaf">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-heading font-bold text-forest">{activeListing.material} — {activeListing.qty}</h3>
          <p className="text-xs text-earth">{activeListing.district} ({activeListing.distance} km) • {activeListing.slot}</p>
        </div>
        <button onClick={() => setActiveId(null)} aria-label="Fermer" className="text-earth text-sm font-bold">✕</button>
      </div>

      {activeListing.status === 'Réservé' ? (
        <div className="bg-pale-leaf p-2.5 rounded-xl text-xs text-forest font-bold">
          ✓ Réservé ! Contact ({activeListing.owner}) : {activeListing.phone}
        </div>
      ) : (
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-earth">🔒 Numéro débloqué après réservation</span>
          <button
            onClick={() => bookListing(activeListing.id)}
            className="px-4 py-1.5 bg-yellow text-ink text-xs font-bold rounded-full hover:opacity-90"
          >
            Réserver ({activeListing.gain} TND)
          </button>
        </div>
      )}
    </div>
  )}
</div>

        {/* COLONNE 3 : Liste des annonces proches (Droite) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="font-heading text-xl text-forest font-bold">
            Annonces à proximité ({filteredListings.length})
          </h2>

          {filteredListings.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-pale-leaf text-center text-earth text-sm">
              Aucune collecte dans ce rayon. Augmentez la distance !
            </div>
          ) : (
            filteredListings.map((item) => {
              const isBooked = item.status === 'Réservé';
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`bg-white p-5 rounded-2xl border-2 transition cursor-pointer ${
                    activeListing?.id === item.id ? 'border-forest shadow-md' : 'border-pale-leaf hover:border-leaf'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-heading font-bold text-lg text-forest">
                      {item.material} • {item.qty}
                    </h3>
                    <span className="bg-pale-leaf text-forest text-xs font-bold px-3 py-1 rounded-full">
                      {item.gain.toFixed(2)} TND
                    </span>
                  </div>
                  <p className="text-xs text-earth mb-3">
                    {item.district} • à {item.distance} km • {item.slot}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-ink">{item.owner}</span>
                    {isBooked ? (
                      <span className="text-xs font-bold text-leaf">✓ Réservé ({item.phone})</span>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); bookListing(item.id); setActiveId(item.id); }}
                        className="px-4 py-1.5 border-2 border-forest text-forest text-xs font-bold rounded-full hover:bg-forest hover:text-sand transition"
                      >
                        Réserver
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}