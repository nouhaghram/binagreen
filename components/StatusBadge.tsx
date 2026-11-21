import type { Listing } from '../context/BinaContext';

// Une couleur ET un mot : le statut ne dépend jamais de la couleur seule (accessibilité).
const STYLES: Record<Listing['status'], string> = {
  'En attente': 'bg-pale-leaf text-forest',
  Réservé: 'bg-yellow text-ink',
  Collecté: 'bg-forest text-sand',
};

export default function StatusBadge({ status }: { status: Listing['status'] }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${STYLES[status]}`}>
      {status}
    </span>
  );
}