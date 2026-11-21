"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const [audience, setAudience] = useState<'citizen' | 'collector'>('citizen');

  const stepsCitizen = [
    {
      num: '01',
      title: 'Triez vos matières recyclables',
      desc: 'Séparez le plastique, le carton, le verre, l’aluminium ou l’huile alimentaire usagée chez vous ou dans votre commerce.',
      icon: '♻️',
    },
    {
      num: '02',
      title: 'Publiez votre annonce en 3 clics',
      desc: 'Indiquez la matière, le poids estimé, votre quartier (Grand Tunis) et le créneau horaire qui vous arrange.',
      icon: '📱',
    },
    {
      num: '03',
      title: 'Un collecteur passe chez vous',
      desc: 'Un collecteur indépendant à proximité réserve votre lot et se déplace à votre porte à l’heure convenue.',
      icon: '🚚',
    },
    {
      num: '04',
      title: 'Recevez votre gain en cash',
      desc: 'Le lot est pesé ensemble et vous êtes payé immédiatement en espèces (TND) selon le tarif en vigueur.',
      icon: '💵',
    },
  ];

  const stepsCollector = [
    {
      num: '01',
      title: 'Explorez la carte du Grand Tunis',
      desc: 'Filtrez les annonces par rayon kilométrique (Tunis, Ariana, Ben Arous, Manouba) et par type de matière.',
      icon: '🗺️',
    },
    {
      num: '02',
      title: 'Réservez les lots rentables',
      desc: 'Optimisez votre tournée en réservant plusieurs lots dans le même quartier. Le numéro du propriétaire se débloque aussitôt.',
      icon: '✅',
    },
    {
      num: '03',
      title: 'Collectez et réglez sur place',
      desc: 'Récupérez les matières triées, payez le montant convenu au particulier et validez la collecte sur votre tableau de bord.',
      icon: '🤝',
    },
    {
      num: '04',
      title: 'Revendez aux centres de tri',
      desc: 'Massifiez vos volumes pour les revendre avec une marge nette aux unités de recyclage partenaires.',
      icon: '📈',
    },
  ];

  const currentSteps = audience === 'citizen' ? stepsCitizen : stepsCollector;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* En-tête */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block bg-pale-leaf text-forest text-xs font-bold px-4 py-1.5 rounded-full mb-3">
          Économie circulaire collaborative
        </span>
        <h1 className="font-heading text-4xl md:text-5xl text-forest font-bold mb-4">
          Comment fonctionne BinaGreen ?
        </h1>
        <p className="text-earth mb-8">
          Une plateforme simple qui connecte directement les producteurs de déchets triés aux collecteurs de proximité dans le Grand Tunis.
        </p>

        {/* Bascule Foyer / Collecteur */}
        <div className="inline-flex bg-white p-1.5 rounded-full border border-pale-leaf shadow-sm">
          <button
            onClick={() => setAudience('citizen')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition ${
              audience === 'citizen' ? 'bg-forest text-sand' : 'text-forest hover:bg-pale-leaf/50'
            }`}
          >
            Je suis un Foyer / Commerce
          </button>
          <button
            onClick={() => setAudience('collector')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition ${
              audience === 'collector' ? 'bg-forest text-sand' : 'text-forest hover:bg-pale-leaf/50'
            }`}
          >
            Je suis un Collecteur
          </button>
        </div>
      </div>

      {/* Grille des 4 étapes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {currentSteps.map((step) => (
          <div
            key={step.num}
            className="bg-white p-6 rounded-3xl border border-pale-leaf shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl">{step.icon}</span>
                <span className="font-heading text-sm font-bold text-leaf bg-pale-leaf px-3 py-1 rounded-full">
                  Étape {step.num}
                </span>
              </div>
              <h2 className="font-heading text-xl text-forest font-bold mb-2">
                {step.title}
              </h2>
              <p className="text-sm text-earth leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Section Engagements & Sécurité */}
      <div className="bg-white rounded-3xl border border-pale-leaf p-8 md:p-10 mb-12">
        <h2 className="font-heading text-2xl text-forest font-bold mb-6 text-center">
          Pourquoi faire confiance à BinaGreen ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-sand p-5 rounded-2xl">
            <h3 className="font-bold text-forest text-base mb-2">🔒 Confidentialité protégée</h3>
            <p className="text-earth">
              Votre adresse exacte et votre numéro de téléphone restent masqués jusqu’à ce qu’un collecteur réserve officiellement votre lot.
            </p>
          </div>
          <div className="bg-sand p-5 rounded-2xl">
            <h3 className="font-bold text-forest text-base mb-2">⚖️ Tarifs transparents</h3>
            <p className="text-earth">
              L’estimateur calcule votre gain à l’avance selon les cours du marché local en TND. Aucune mauvaise surprise.
            </p>
          </div>
          <div className="bg-sand p-5 rounded-2xl">
            <h3 className="font-bold text-forest text-base mb-2">🌍 Impact mesurable</h3>
            <p className="text-earth">
              Chaque collecte validée met à jour votre bilan carbone (kg CO<sub>2</sub> évités) et débloque des badges d’engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Appel à l'action */}
      <div className="text-center">
        <Link
          href={audience === 'citizen' ? '/publish' : '/pickups'}
          className="inline-block bg-yellow text-ink font-bold text-lg px-8 py-4 rounded-full hover:opacity-90 transition shadow-md"
        >
          {audience === 'citizen' ? 'Publier ma première annonce' : 'Voir les collectes disponibles'}
        </Link>
      </div>

    </div>
  );
}