"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useBina } from '../../context/BinaContext';

const MATERIAL_RATES: Record<string, { label: string; unit: string; rate: number }> = {
  Plastic: { label: 'Plastique', unit: 'kg', rate: 0.8 },
  Glass: { label: 'Verre', unit: 'kg', rate: 0.4 },
  Cardboard: { label: 'Carton', unit: 'kg', rate: 0.3 },
  Oil: { label: 'Huile usagée', unit: 'L', rate: 1.5 },
};

export default function PublishPage() {
  const { addListing } = useBina();
  const [step, setStep] = useState(1);
  const [material, setMaterial] = useState('Plastic');
  const [quantity, setQuantity] = useState(5);
  const [district, setDistrict] = useState('Ariana');
  const [address, setAddress] = useState('');
  const [day, setDay] = useState('Mar');
  const [slot, setSlot] = useState('17:00 - 19:00');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentMat = MATERIAL_RATES[material];
  const estimatedGain = (quantity * currentMat.rate).toFixed(2);

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border border-pale-leaf text-center shadow-sm">
        <div className="w-16 h-16 bg-pale-leaf text-forest rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          ✓
        </div>
        <h1 className="font-heading text-3xl text-forest font-bold mb-2">
          Annonce publiée !
        </h1>
        <p className="text-earth mb-6">
          Votre lot de <strong>{quantity} {currentMat.unit} de {currentMat.label}</strong> ({district}) est maintenant visible sur la carte des collecteurs.
        </p>
        <div className="bg-sand p-4 rounded-2xl mb-8">
          <p className="text-sm text-earth">Gain estimé en espèces à la collecte</p>
          <p className="font-heading text-3xl text-forest font-bold">{estimatedGain} TND</p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/pickups" className="px-6 py-3 bg-forest text-sand font-bold rounded-full hover:bg-leaf transition">
            Voir sur la carte
          </Link>
          <button
            onClick={() => { setIsSubmitted(false); setStep(1); }}
            className="px-6 py-3 border-2 border-forest text-forest font-bold rounded-full hover:bg-pale-leaf transition"
          >
            Nouvelle annonce
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-heading text-3xl md:text-4xl text-forest font-bold mb-2">
        Publier une annonce
      </h1>
      <p className="text-earth mb-8">Trois clics pour valoriser vos déchets recyclables.</p>

      {/* Barre de progression des 3 étapes */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`h-2 flex-1 rounded-full transition-colors ${
              step >= num ? 'bg-forest' : 'bg-pale-leaf'
            }`}
          />
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-pale-leaf shadow-sm">
        {/* ÉTAPE 1 : Matière & Quantité */}
        {step === 1 && (
          <div>
            <p className="text-sm font-bold text-leaf uppercase mb-1">Étape 1 sur 3</p>
            <h2 className="font-heading text-2xl text-forest font-bold mb-6">Matière et quantité</h2>

            <label className="block text-sm font-bold text-earth mb-3">Choisissez la matière</label>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {Object.entries(MATERIAL_RATES).map(([key, info]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMaterial(key)}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    material === key
                      ? 'border-forest bg-pale-leaf text-forest font-bold'
                      : 'border-pale-leaf bg-sand/50 text-ink hover:border-leaf'
                  }`}
                >
                  <div className="text-lg">{info.label}</div>
                  <div className="text-xs text-earth">{info.rate.toFixed(2)} TND / {info.unit}</div>
                </button>
              ))}
            </div>

            <label className="block text-sm font-bold text-earth mb-2">
              Quantité estimée ({currentMat.unit})
            </label>
            <input
              type="number"
              min="1"
              max="500"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full p-3 border-2 border-pale-leaf rounded-xl bg-sand text-forest font-bold text-lg mb-6 outline-none focus:border-forest"
            />
          </div>
        )}

        {/* ÉTAPE 2 : Adresse & Créneaux */}
        {step === 2 && (
          <div>
            <p className="text-sm font-bold text-leaf uppercase mb-1">Étape 2 sur 3</p>
            <h2 className="font-heading text-2xl text-forest font-bold mb-6">Adresse et disponibilités</h2>

            <label className="block text-sm font-bold text-earth mb-2">Gouvernorat (Grand Tunis)</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-3 border-2 border-pale-leaf rounded-xl bg-sand text-forest font-bold mb-4 outline-none focus:border-forest"
            >
              <option value="Ariana">Ariana</option>
              <option value="Tunis">Tunis</option>
              <option value="Ben Arous">Ben Arous</option>
              <option value="Manouba">Manouba</option>
            </select>

            <label className="block text-sm font-bold text-earth mb-2">Quartier / Rue précise</label>
            <input
              type="text"
              placeholder="Ex: Ennasr 2, Avenue Hédi Nouira..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border-2 border-pale-leaf rounded-xl bg-sand text-ink mb-6 outline-none focus:border-forest"
            />

            <label className="block text-sm font-bold text-earth mb-2">Jour de collecte souhaité</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['Lun', 'Mar', 'Mer', 'Jeu'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(d)}
                  className={`py-2 rounded-xl font-bold border-2 transition ${
                    day === d ? 'bg-forest text-sand border-forest' : 'bg-sand border-pale-leaf text-forest'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <label className="block text-sm font-bold text-earth mb-2">Créneau horaire</label>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="w-full p-3 border-2 border-pale-leaf rounded-xl bg-sand text-forest font-bold mb-6 outline-none focus:border-forest"
            >
              <option value="09:00 - 11:00">09:00 - 11:00</option>
              <option value="14:00 - 16:00">14:00 - 16:00</option>
              <option value="17:00 - 19:00">17:00 - 19:00</option>
            </select>
          </div>
        )}

        {/* ÉTAPE 3 : Résumé & Confirmation */}
        {step === 3 && (
          <div>
            <p className="text-sm font-bold text-leaf uppercase mb-1">Étape 3 sur 3</p>
            <h2 className="font-heading text-2xl text-forest font-bold mb-6">Récapitulatif</h2>

            <div className="bg-sand p-5 rounded-2xl space-y-3 mb-6 text-sm">
              <div className="flex justify-between border-b border-pale-leaf pb-2">
                <span className="text-earth">Matière :</span>
                <span className="font-bold text-forest">{currentMat.label}</span>
              </div>
              <div className="flex justify-between border-b border-pale-leaf pb-2">
                <span className="text-earth">Quantité :</span>
                <span className="font-bold text-forest">{quantity} {currentMat.unit}</span>
              </div>
              <div className="flex justify-between border-b border-pale-leaf pb-2">
                <span className="text-earth">Lieu :</span>
                <span className="font-bold text-forest">{district} {address && `(${address})`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth">Créneau :</span>
                <span className="font-bold text-forest">{day}, {slot}</span>
              </div>
            </div>
          </div>
        )}

        {/* Encart Gain estimé toujours visible */}
        <div className="flex justify-between items-center bg-pale-leaf/70 px-5 py-4 rounded-2xl mb-6">
          <span className="text-forest font-bold">Gain estimé (cash)</span>
          <span className="font-heading text-2xl text-forest font-bold">{estimatedGain} TND</span>
        </div>

        {/* Boutons de navigation */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border-2 border-forest text-forest font-bold rounded-full hover:bg-pale-leaf transition"
            >
              Retour
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 bg-yellow text-ink font-bold rounded-full hover:opacity-90 transition shadow-sm"
            >
              Continuer
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                addListing({
                  material: currentMat.label,
                  qty: `${quantity} ${currentMat.unit}`,
                  district,
                  gain: Number(estimatedGain),
                  slot: `${day}, ${slot}`,
                  owner: 'Mon Foyer (Vous)',
                  phone: '+216 21 000 111',
                });
                setIsSubmitted(true);
              }}
              className="flex-1 py-3 bg-yellow text-ink font-bold rounded-full hover:opacity-90 transition shadow-sm"
            >
              Publier l&apos;annonce
            </button>
          )}
        </div>
      </div>
    </div>
  );
}