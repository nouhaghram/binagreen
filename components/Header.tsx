import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-wrap justify-between items-center gap-4 p-6 bg-sand border-b border-pale-leaf">
      <Link href="/" className="text-forest font-heading font-bold text-2xl">
        BinaGreen <span className="text-leaf text-xl">بيننا</span>
      </Link>
      
      {/* flex-wrap permet d'afficher les liens sur toutes les tailles d'écran */}
      <nav className="flex flex-wrap items-center gap-4 md:gap-6 text-forest font-bold text-sm md:text-base">
        <Link href="/how-it-works" className="hover:text-leaf transition">How it works</Link>
        <Link href="/materials" className="hover:text-leaf transition">Materials</Link>
        <Link href="/pickups" className="hover:text-leaf transition">Find pickups</Link>
        <Link href="/help" className="hover:text-leaf transition">Help</Link>
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