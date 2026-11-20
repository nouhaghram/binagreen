import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BinaProvider } from '../context/BinaContext';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'BinaGreen - Your waste has value',
  description: 'A collaborative waste collection platform for Greater Tunis',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${dmSans.variable} font-sans bg-sand text-ink antialiased min-h-screen flex flex-col`}>
        <BinaProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </BinaProvider>
      </body>
    </html>
  );
}