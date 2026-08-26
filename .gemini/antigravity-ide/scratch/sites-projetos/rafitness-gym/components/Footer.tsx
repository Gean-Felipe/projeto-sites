import Link from 'next/link';
import { Dumbbell, Instagram, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-navy pt-20 pb-10 border-t border-white/10 relative z-30">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="#inicio" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-sm flex items-center justify-center transform rotate-45 border border-white/20">
                <span className="transform -rotate-45 font-black text-xl italic text-brand-black">RF</span>
              </div>
              <div className="flex flex-col text-brand-white">
                <span className="font-heading text-2xl font-black tracking-tighter leading-none italic uppercase">
                  RAFITNESS <span className="text-brand-orange">GYM</span>
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">Saúde • Força • Resultados</span>
              </div>
            </Link>
            <p className="text-brand-orange font-bold tracking-widest text-sm">SAÚDE • FORÇA • RESULTADOS</p>
            <p className="text-brand-gray text-sm leading-relaxed">
              Uma academia moderna, acessível e bem equipada, com ambiente climatizado e atendimento próximo.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xl text-white tracking-wide mb-2">NAVEGAÇÃO</h4>
            {['Início', 'Sobre', 'Estrutura', 'Planos', 'Localização'].map((link) => (
              <Link key={link} href={`#${link.toLowerCase().replace('í', 'i').replace('çã', 'ca')}`} className="text-brand-silver hover:text-brand-orange transition-colors text-sm w-fit">
                {link}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xl text-white tracking-wide mb-2 italic font-black uppercase">CONTATO</h4>
            <a href="https://wa.me/5565981706248" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-orange font-black italic hover:text-brand-orange-dark transition-colors text-sm">
              <Phone className="w-5 h-5" />
              <span>(65) 98170-6248</span>
            </a>
            <div className="flex items-start gap-3 text-brand-silver text-sm">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>R. Alves de Oliveira, 2150<br/>Cristo Rei - Várzea Grande/MT<br/>78118-081</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xl text-white tracking-wide mb-2">REDES SOCIAIS</h4>
            <a href="https://www.instagram.com/p/DbbnE6TgnZr/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-silver hover:text-brand-orange transition-colors text-sm">
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
          <p>© 2026 Rafitness Gym. Todos os direitos reservados.</p>
          <p>Várzea Grande - Mato Grosso</p>
        </div>
      </div>
    </footer>
  );
}
