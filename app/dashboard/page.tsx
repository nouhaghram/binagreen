"use client";
import Link from 'next/link';
import { useBina } from '../../context/BinaContext';
import StatusBadge from '../../components/StatusBadge';

export default function DashboardPage() {
  const { listings, bookListing, completeListing } = useBina();

  // Compte les annonces ayant un statut donné
  const count = (status: string) => listings.filter((l) => l.status === status).length;

  // Somme des gains des annonces collectées
  const collectedGain = listings
    .filter((l) => l.status === 'Collecté')
    .reduce((sum, l) => sum + l.gain, 0);

  const stats = [
    { label: 'En attente', value: count('En attente') },
    { label: 'Réservées', value: count('Réservé') },
    { label: 'Collectées', value: count('Collecté') },
    { label: 'Gain collecté', value: `${collectedGain.toFixed(2)} TND` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-heading text-3xl md:text-4xl text-forest font-bold mb-2">Tableau de bord</h1>
      <p className="text-earth mb-8">
        Vue de démonstration : suivez le cycle d’une annonce, de la publication à la collecte.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-5 rounded-2xl border border-pale-leaf shadow-sm">
            <p className="text-sm text-earth font-bold">{s.label}</p>
            <p className="font-heading text-3xl text-forest font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {listings.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-pale-leaf text-center">
          <p className="text-earth mb-4">Aucune annonce pour le moment.</p>
          <Link href="/publish" className="px-6 py-3 bg-yellow text-ink font-bold rounded-full">
            Publier une annonce
          </Link>
        </div>
      ) : (
        // overflow-x-auto : le tableau défile sur téléphone au lieu de déborder
        <div className="bg-white rounded-2xl border border-pale-leaf shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-pale-leaf text-forest">
              <tr>
                <th className="p-4">Matière</th>
                <th className="p-4">Quantité</th>
                <th className="p-4">Lieu</th>
                <th className="p-4">Créneau</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item.id} className="border-t border-pale-leaf">
                  <td className="p-4 font-bold text-forest">{item.material}</td>
                  <td className="p-4">{item.qty}</td>
                  <td className="p-4">{item.district}</td>
                  <td className="p-4">{item.slot}</td>
                  <td className="p-4"><StatusBadge status={item.status} /></td>
                  <td className="p-4">
                    {item.status === 'En attente' && (
                      <button
                        type="button"
                        onClick={() => bookListing(item.id)}
                        className="px-4 py-1.5 border-2 border-forest text-forest font-bold rounded-full hover:bg-forest hover:text-sand transition"
                      >
                        Réserver
                      </button>
                    )}
                    {item.status === 'Réservé' && (
                      <button
                        type="button"
                        onClick={() => completeListing(item.id)}
                        className="px-4 py-1.5 bg-yellow text-ink font-bold rounded-full hover:opacity-90 transition"
                      >
                        Marquer collecté
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}