"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MATERIAL_RATES } from '../lib/materials';
export default function Home() {
  // États React pour faire fonctionner l'estimateur de prix
  const [material, setMaterial] = useState('Plastic');
  const [weight, setWeight] = useState(10);
  const current = MATERIAL_RATES[material];
  const estimatedValue = (weight * current.rate).toFixed(2);

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      
      {/* 1. Bloc Introduction (Hero Section) */}
      <section className="text-center py-16">
        <h1 className="font-heading text-5xl md:text-7xl text-forest font-bold mb-6">
          Your <span className="text-leaf">waste</span> has value.
        </h1>
        <p className="text-earth text-lg max-w-2xl mx-auto mb-10">
          Transformez vos déchets recyclables en argent. Rejoignez BinaGreen et participez à rendre le Grand Tunis plus vert en connectant foyers et collecteurs.
        </p>
        {/* Ce bouton redirigera vers la page de publication que l'on va créer ensuite */}
        <Link href="/publish" className="inline-block bg-forest text-sand font-bold text-lg px-8 py-4 rounded-full hover:bg-leaf transition shadow-lg">
          Publier une annonce
        </Link>
      </section>

      {/* 2. Estimateur de gain interactif */}
      <section className="bg-white rounded-3xl shadow-sm border border-pale-leaf p-8 max-w-4xl mx-auto mb-20">
        <h2 className="font-heading text-2xl text-forest font-bold mb-8 text-center">
          Estimez la valeur de vos matières
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          {/* Choix de la matière */}
          <div className="flex-1 w-full">
            <label className="block text-earth text-sm font-bold mb-2">Type de matière</label>
            <select
             value={material}
             onChange={(e) => setMaterial(e.target.value)}
             className="w-full border-2 border-pale-leaf rounded-xl p-3 text-forest bg-sand outline-none focus:border-leaf cursor-pointer"
            >
             {Object.entries(MATERIAL_RATES).map(([key, m]) => (
               <option key={key} value={key}>
                 {m.label} ({m.rate.toFixed(2)} TND / {m.unit})
               </option>
              ))}
            </select>
          </div>

          {/* Curseur de poids */}
          <div className="flex-1 w-full">
            <label className="block text-earth text-sm font-bold mb-2">
              Poids estimé : <span className="text-forest text-lg">{weight} kg</span>
            </label>
            <input 
              type="range" 
              min="1" max="100" 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-leaf cursor-pointer"
            />
            <div className="flex justify-between text-xs text-earth mt-1">
              <span>1 kg</span>
              <span>100 kg</span>
            </div>
          </div>

          {/* Résultat du calcul */}
          <div className="flex-1 w-full text-center bg-sand p-6 rounded-2xl border-2 border-yellow shadow-inner">
            <p className="text-earth text-sm font-bold mb-1">Gain potentiel</p>
            <p className="font-heading text-4xl text-forest font-bold">{estimatedValue} <span className="text-xl">TND</span></p>
          </div>
        </div>
      </section>

    </div>
  );
}