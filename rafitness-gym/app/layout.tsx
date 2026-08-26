import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const oswald = Oswald({ 
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rafitness Gym | Academia em Várzea Grande - MT',
  description: 'Rafitness Gym em Várzea Grande - MT. Academia com ambiente climatizado, variedade de equipamentos e estrutura para você treinar, evoluir e alcançar seus objetivos.',
  keywords: 'academia em Várzea Grande, academia Cristo Rei, Rafitness Gym, academia Várzea Grande MT, musculação Várzea Grande, academia climatizada Várzea Grande',
  openGraph: {
    title: 'Rafitness Gym | Academia em Várzea Grande - MT',
    description: 'Rafitness Gym em Várzea Grande - MT. Academia com ambiente climatizado, variedade de equipamentos e estrutura para você treinar, evoluir e alcançar seus objetivos.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Rafitness Gym',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafitness Gym | Academia em Várzea Grande - MT',
    description: 'Rafitness Gym em Várzea Grande - MT. Academia com ambiente climatizado.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${oswald.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-brand-black text-brand-silver min-h-screen flex flex-col relative" suppressHydrationWarning>
        <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
