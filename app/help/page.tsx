"use client";
import { useState } from 'react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'Quelles zones géographiques sont couvertes par BinaGreen ?',
    a: 'BinaGreen couvre actuellement les 4 gouvernorats du Grand Tunis : Tunis, Ariana, Ben Arous et Manouba.',
  },
  {
    q: 'Comment et quand suis-je payé pour mes déchets ?',
    a: 'Le paiement s’effectue en espèces (TND) directement lors du passage du collecteur, après vérification du poids ou du volume réel du lot.',
  },
  {
    q: 'Y a-t-il un poids minimum pour publier une annonce ?',
    a: 'Il n’y a pas de blocage technique, mais nous recommandons un seuil minimal (ex: 3 kg de plastique, 5 kg de carton ou 2 L d’huile) afin que le déplacement soit rentable pour le collecteur.',
  },
  {
    q: 'Mes coordonnées personnelles sont-elles visibles par tout le monde ?',
    a: 'Non. Seul votre quartier général (ex: Ennasr 2, Ariana) et la matière apparaissent publiquement. Votre numéro de téléphone n’est communiqué qu’au collecteur qui réserve votre annonce.',
  },
  {
    q: 'Que faire si le collecteur ne se présente pas au créneau prévu ?',
    a: 'Vous pouvez annuler la réservation depuis votre Tableau de bord en un clic : votre annonce redevient immédiatement disponible pour les autres collecteurs du secteur.',
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl text-forest font-bold mb-4">
          Centre d’aide & FAQ
        </h1>
        <p className="text-earth">
          Toutes les réponses aux questions fréquentes des foyers, commerçants et collecteurs.
        </p>
      </div>

      {/* Accordéon FAQ */}
      <div className="space-y-4 mb-16">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-pale-leaf overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left font-heading font-bold text-lg text-forest hover:bg-sand/40 transition"
              >
                <span>{faq.q}</span>
                <span className="text-leaf text-2xl ml-4">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-sm text-earth leading-relaxed border-t border-pale-leaf/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Formulaire de contact rapide */}
      <div className="bg-white p-8 rounded-3xl border border-pale-leaf shadow-sm">
        <h2 className="font-heading text-2xl text-forest font-bold mb-2">
          Vous n’avez pas trouvé votre réponse ?
        </h2>
        <p className="text-sm text-earth mb-6">
          Écrivez à l’équipe BinaGreen (SUP’COM Tunis), nous vous répondons sous 24h.
        </p>

        {sent ? (
          <div className="bg-pale-leaf text-forest p-5 rounded-2xl font-bold text-sm text-center">
            ✓ Votre message a bien été envoyé à l’équipe BinaGreen !
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Votre nom"
                className="w-full p-3 border-2 border-pale-leaf rounded-xl bg-sand text-ink outline-none focus:border-forest"
              />
              <input
                type="email"
                required
                placeholder="Votre email"
                className="w-full p-3 border-2 border-pale-leaf rounded-xl bg-sand text-ink outline-none focus:border-forest"
              />
            </div>
            <textarea
              rows={3}
              required
              placeholder="Décrivez votre question ou problème..."
              className="w-full p-3 border-2 border-pale-leaf rounded-xl bg-sand text-ink outline-none focus:border-forest"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-forest text-sand font-bold rounded-full hover:bg-leaf transition"
            >
              Envoyer le message
            </button>
          </form>
        )}
      </div>

    </div>
  );
}