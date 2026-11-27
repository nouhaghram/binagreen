"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/materials', label: 'Materials' },
  { href: '/pickups', label: 'Find pickups' },
  { href: '/help', label: 'Help' },
];

export default function Header() {
  // pathname = l'adresse de la page actuelle, par exemple "/materials"
  const pathname = usePathname(); 

  return (
    // sticky : l'en-tête reste en haut quand on fait défiler
    // z-[2000] : au-dessus de la carte, dont les couches montent jusqu'à 1000
    <header className="sticky top-0 z-[2000] flex flex-wrap justify-between items-center gap-4 px-6 py-4 bg-sand/90 backdrop-blur border-b border-pale-leaf">
      <Link href="/" className="text-forest font-heading font-bold text-2xl">
        BinaGreen <span className="text-leaf text-xl">بيننا</span>
      </Link>

      <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-4 md:gap-6 text-forest font-bold text-sm md:text-base">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-1.5 transition hover:text-leaf ${
                isActive ? 'underline underline-offset-8 decoration-2 decoration-yellow' : ''
              }`}
            >
              {link.href === '/' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 11l9-8 9 8" />
                  <path d="M5 10v10h14V10" />
                </svg>
              )}
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/dashboard"
        className="px-6 py-2 border-2 border-forest text-forest rounded-full font-bold hover:bg-forest hover:text-sand transition"
      >
        Dashboard
      </Link>
    </header>
  );
}