"use client";
import { useState } from 'react';
import Link from 'next/link';

interface MaterialGuide {
  id: string;
  name: string;
  icon: string;
  rate: string;
  minQty: string;
  accepted: string[];
  rejected: string[];
  tip: string;
}

const MATERIALS: MaterialGuide[] = [
  {
    id: 'plastic',
    name: 'Plastique (PET / HDPE)',
    icon: '🧴',
    rate: '0.80 TND / kg',
    minQty: '3 kg minimum',
    accepted: [
      'Bouteilles d’eau et de soda transparentes (PET)',
      'Flacons de shampoing, lessive et produits ménagers (HDPE)',
      'Bidons alimentaires propres',
    ],
    rejected: [
      'Sacs plastiques fins et films alimentaires',
      'Barquettes souillées ou polystyrène',
      'Tubes de dentifrice',
    ],
    tip: 'Écrasez vos bouteilles pour réduire le volume de 70 % et laissez les bouchons dessus.',
  },
  {
    id: 'oil',
    name: 'Huile alimentaire usagée',
    icon: '🫗',
    rate: '1.50 TND / L',
    minQty: '2 L minimum',
    accepted: [
      'Huile de friture végétale (tournesol, maïs, soja)',
      'Huile d’olive usagée de cuisson',
      'Huile de conservation (thon, sardines) filtrée',
    ],
    rejected: [
      'Huile de moteur ou lubrifiant mécanique',
      'Eau de lavage mélangée à l’huile',
      'Graisses animales figées',
    ],
    tip: 'Laissez refroidir l’huile, filtrez les miettes et versez-la dans un bidon plastique bien fermé.',
  },
  {
    id: 'cardboard',
    name: 'Carton & Papier',
    icon: '📦',
    rate: '0.30 TND / kg',
    minQty: '5 kg minimum',
    accepted: [
      'Cartons d’emballage et de livraison pliés',
      'Cahiers, livres, journaux et feuilles de bureau',
      'Boîtes alimentaires sèches (céréales, biscuits)',
    ],
    rejected: [
      'Cartons à pizza gras ou mouillés',
      'Mouchoirs et essuie-tout usagés',
      'Briques de lait ou de jus (Tetra Pak)',
    ],
    tip: 'Pliez les cartons à plat et gardez-les à l’abri de l’humidité pour préserver leur valeur.',
  },
  {
    id: 'glass',
    name: 'Verre d’emballage',
    icon: '🍾',
    rate: '0.40 TND / kg',
    minQty: '5 kg minimum',
    accepted: [
      'Bouteilles en verre (eau, jus, huile)',
      'Bocaux de confiture, miel et conserves rincés',
      'Flacons en verre transparent ou coloré',
    ],
    rejected: [
      'Vitres cassées, miroirs et pare-brise',
      'Ampoules électriques et néons',
      'Vaisselle en céramique ou porcelaine',
    ],
    tip: 'Retirez les couvercles métalliques et rincez brièvement les bocaux à l’eau.',
  },
  {
    id: 'aluminum',
    name: 'Aluminium & Métaux légers',
    icon: '🥫',
    rate: '2.50 TND / kg',
    minQty: '1 kg minimum',
    accepted: [
      'Canettes de boissons (sodas, jus)',
      'Barquettes alimentaires en aluminium propres',
      'Boîtes de conserve métalliques vides',
    ],
    rejected: [
      'Aérosols sous pression (déodorants, insecticides)',
      'Piles et batteries',
      'Câbles électriques dénudés',
    ],
    tip: 'L’aluminium est la matière la mieux rémunérée : séparez bien les canettes des boîtes en acier.',
  },
];

export default function MaterialsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const visibleMaterials =
    selectedCategory === 'all'
      ? MATERIALS
      : MATERIALS.filter((m) => m.id === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* En-tête */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block bg-pale-leaf text-forest text-xs font-bold px-4 py-1.5 rounded-full mb-3">
          Grille tarifaire Grand Tunis
        </span>
        <h1 className="font-heading text-4xl md:text-5xl text-forest font-bold mb-4">
          Guide des matières & tarifs
        </h1>
        <p className="text-earth">
          Consultez les prix de rachat indicatifs au kilo ou au litre et nos conseils de préparation pour maximiser vos gains lors de chaque collecte.
        </p>
      </div>

      {/* Filtres rapides par matière */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-5 py-2 rounded-full text-sm font-bold transition ${
            selectedCategory === 'all'
              ? 'bg-forest text-sand'
              : 'bg-white text-forest border border-pale-leaf hover:bg-pale-leaf/50'
          }`}
        >
          Toutes les matières
        </button>
        {MATERIALS.map((mat) => (
          <button
            key={mat.id}
            onClick={() => setSelectedCategory(mat.id)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition ${
              selectedCategory === mat.id
                ? 'bg-forest text-sand'
                : 'bg-white text-forest border border-pale-leaf hover:bg-pale-leaf/50'
            }`}
          >
            {mat.icon} {mat.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Tableau récapitulatif des tarifs */}
      <div className="bg-white rounded-3xl border border-pale-leaf shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pale-leaf/60 text-forest font-heading text-sm border-b border-pale-leaf">
                <th className="py-4 px-6">Matière</th>
                <th className="py-4 px-6">Tarif indicatif</th>
                <th className="py-4 px-6">Seuil conseillé</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pale-leaf text-sm">
              {visibleMaterials.map((mat) => (
                <tr key={mat.id} className="hover:bg-sand/40 transition">
                  <td className="py-4 px-6 font-bold text-forest flex items-center gap-3">
                    <span className="text-2xl">{mat.icon}</span>
                    {mat.name}
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-yellow/20 text-ink font-bold px-3 py-1 rounded-full">
                      {mat.rate}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-earth">{mat.minQty}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href="/publish"
                      className="text-xs font-bold text-forest underline hover:text-leaf"
                    >
                      Publier ce lot →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fiches détaillées : Ce qu'on accepte / Ce qu'on refuse */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {visibleMaterials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white p-6 md:p-8 rounded-3xl border border-pale-leaf shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{mat.icon}</span>
                  <h2 className="font-heading text-xl text-forest font-bold">{mat.name}</h2>
                </div>
                <span className="font-heading font-bold text-leaf text-lg">{mat.rate}</span>
              </div>

              <div className="space-y-4 mb-6 text-sm">
                <div>
                  <p className="font-bold text-forest mb-1.5">✓ Accepté :</p>
                  <ul className="space-y-1 text-ink pl-4 list-disc">
                    {mat.accepted.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-earth mb-1.5">✕ Refusé :</p>
                  <ul className="space-y-1 text-earth/80 pl-4 list-disc">
                    {mat.rejected.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-sand p-4 rounded-2xl text-xs text-forest">
              <strong>💡 Conseil BinaGreen :</strong> {mat.tip}
            </div>
          </div>
        ))}
      </div>

      {/* Bannière d'appel à l'action */}
      <div className="bg-forest text-sand rounded-3xl p-8 md:p-10 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
          Vos matières sont triées et prêtes ?
        </h2>
        <p className="text-pale-leaf text-sm max-w-xl mx-auto mb-6">
          Publiez votre annonce en moins d’une minute et recevez votre paiement en espèces dès le passage d’un collecteur vérifié.
        </p>
        <Link
          href="/publish"
          className="inline-block bg-yellow text-ink font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition shadow-md"
        >
          Publier une annonce maintenant
        </Link>
      </div>

    </div>
  );
}