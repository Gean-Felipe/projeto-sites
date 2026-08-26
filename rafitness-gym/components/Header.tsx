'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Dumbbell } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INÍCIO', href: '#inicio' },
    { name: 'SOBRE', href: '#sobre' },
    { name: 'ESTRUTURA', href: '#estrutura' },
    { name: 'PLANOS', href: '#planos' },
    { name: 'DEPOIMENTOS', href: '#depoimentos' },
    { name: 'LOCALIZAÇÃO', href: '#localizacao' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-navy/80 backdrop-blur-md shadow-lg py-4 border-b border-white/10' : 'bg-gradient-to-b from-brand-black/80 to-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="#inicio" className="flex items-center gap-3 z-50 group">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-sm flex items-center justify-center transform rotate-45 border border-white/20 transition-transform group-hover:scale-110">
            <span className="transform -rotate-45 font-black text-xl italic text-brand-black">RF</span>
          </div>
          <div className="flex flex-col text-brand-white">
            <span className="font-heading text-2xl md:text-3xl font-black tracking-tighter leading-none italic uppercase">
              RAFITNESS <span className="text-brand-orange">GYM</span>
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">Saúde • Força • Resultados</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative py-1 text-xs font-bold tracking-widest uppercase text-brand-silver hover:text-brand-orange transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-orange after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/5565981706248?text=Olá! Gostaria de conhecer os planos da Rafitness Gym."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange hover:bg-brand-orange-dark text-brand-black px-7 py-3 rounded-none font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] hover:scale-105"
          >
            QUERO TREINAR
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden z-50 text-white hover:text-brand-orange transition-colors duration-200 p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-brand-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading tracking-wider text-white hover:text-brand-orange transition-colors">
              {link.name}
            </Link>
          ))}
          <a href="https://wa.me/5565981706248?text=Olá! Gostaria de conhecer os planos da Rafitness Gym." target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-orange hover:bg-brand-orange-dark text-brand-black px-8 py-4 rounded-none font-black uppercase tracking-widest transition-colors text-xl mt-4 w-64 text-center shadow-[0_0_20px_rgba(255,106,0,0.3)]">
            QUERO TREINAR
          </a>
        </div>
      </div>
    </header>
  );
}
