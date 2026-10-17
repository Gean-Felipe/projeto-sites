import { useState, useEffect, useCallback } from "react";
import { MessageCircle, MapPin, Phone, Clock, ChevronDown, X, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";

/* ─── Informações Oficiais Confirmadas ──────────────────────────── */
export const CLINIC_NAME = "Lumi Estética e Saúde";
export const TAGLINE = "Sua pele merece cuidado, estratégia e constância.";
export const PHONE_DISPLAY = "(65) 99274-1317";
export const PHONE_RAW = "+5565992741317";
export const WHATSAPP_NUMBER = "5565992741317";
export const ADDRESS_STREET = "Avenida Jornalista Alves de Oliveira";
export const ADDRESS_NEIGHBORHOOD = "Cidade Alta";
export const ADDRESS_CITY_STATE = "Cuiabá – MT";
export const ADDRESS_CEP = "CEP 78030-445";
export const ADDRESS_FULL = `${ADDRESS_STREET}, ${ADDRESS_NEIGHBORHOOD}, ${ADDRESS_CITY_STATE}, ${ADDRESS_CEP}`;
export const COREN_NUMBER = "COREN-MT 548.790";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Lumi Estética e Saúde Cuiabá MT");

export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    "Olá! Conheci a Lumi Estética e Saúde pelo site e gostaria de saber mais sobre os atendimentos e a disponibilidade de horários.";
  const text = customMessage || defaultMsg;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_MAIN = getWhatsAppUrl();

export const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre a Lumi" },
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#galeria", label: "Galeria" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

/* ─── Hook de Revelação ao Rolar a Página ───────────────────────── */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
        el.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ─── Logotipo Oficial Vetorial da Lumi ─────────────────────────── */
export function LumiLogo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex flex-col items-center select-none text-center ${className}`}>
      {/* Astro / Sol Dourado Radiante Oficial */}
      <svg
        className="w-7 h-7 mb-0.5"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="12" fill={light ? "#E8D5B0" : "#C5A059"} />
        {/* Raios solares cardeais longos */}
        <line x1="50" y1="8" x2="50" y2="34" stroke={light ? "#E8D5B0" : "#C5A059"} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="66" x2="50" y2="92" stroke={light ? "#E8D5B0" : "#C5A059"} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="50" x2="34" y2="50" stroke={light ? "#E8D5B0" : "#C5A059"} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="66" y1="50" x2="92" y2="50" stroke={light ? "#E8D5B0" : "#C5A059"} strokeWidth="2.5" strokeLinecap="round" />
        {/* Raios diagonais intermediários */}
        <line x1="20" y1="20" x2="38" y2="38" stroke={light ? "#DFCAB0" : "#D4AF67"} strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="20" x2="62" y2="38" stroke={light ? "#DFCAB0" : "#D4AF67"} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="80" x2="38" y2="62" stroke={light ? "#DFCAB0" : "#D4AF67"} strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="80" x2="62" y2="62" stroke={light ? "#DFCAB0" : "#D4AF67"} strokeWidth="2" strokeLinecap="round" />
        {/* Pontos de brilho suaves */}
        <circle cx="50" cy="50" r="18" stroke={light ? "#E8D5B0" : "#C5A059"} strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
      </svg>
      {/* Texto LUMI com serifa refinada */}
      <span
        className={`font-serif text-2xl tracking-[0.22em] font-semibold uppercase leading-none transition-colors ${
          light ? "text-[#FAF7F2]" : "text-[#1C1A18]"
        }`}
      >
        LUMI
      </span>
      {/* Subtítulo Estética e Saúde */}
      <span
        className={`text-[0.62rem] tracking-[0.32em] font-medium uppercase mt-1 transition-colors ${
          light ? "text-[#D8C6AC]" : "text-[#C5A059]"
        }`}
      >
        Estética e Saúde
      </span>
    </div>
  );
}

/* ─── Header Principal ──────────────────────────────────────────── */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Previne rolagem do body quando menu mobile está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#E5DDD3] bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_2px_16px_rgba(28,26,24,0.06)]"
          : "border-[#E5DDD3]/50 bg-[#FAF7F2]/85 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#inicio" aria-label="Lumi Estética e Saúde — início" className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#C5A059] rounded-sm p-1">
          <LumiLogo />
        </a>

        {/* Navegação Desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#1C1A18]/80 hover:text-[#C5A059] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C5A059] after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-1 focus:ring-[#C5A059] rounded"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_MAIN}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-sm shadow-sm"
            aria-label="Agendar atendimento no WhatsApp (abre em nova aba)"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Agendar pelo WhatsApp</span>
          </a>
        </nav>

        {/* Botão Mobile Hamburger */}
        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden rounded-md border border-[#E5DDD3] bg-white/70 text-[#1C1A18] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
          aria-label={open ? "Fechar menu" : "Abrir menu de navegação"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-0.5 w-5 bg-[#1C1A18] transition-all duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#1C1A18] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#1C1A18] transition-all duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      <div
        id="menu-mobile"
        className={`fixed inset-x-0 top-20 bottom-0 bg-[#FAF7F2]/98 backdrop-blur-xl border-t border-[#E5DDD3] overflow-y-auto px-6 py-8 transition-all duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Menu móvel"
      >
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-[#E5DDD3]/60 pb-3 font-serif text-xl text-[#1C1A18] hover:text-[#C5A059] transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-4 flex flex-col gap-3">
            <a
              href={WHATSAPP_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-gold w-full text-center py-3.5"
            >
              <MessageCircle className="w-5 h-5 mr-1" />
              <span>Agendar pelo WhatsApp</span>
            </a>

            <div className="mt-4 p-4 rounded-xl bg-white/80 border border-[#E5DDD3] text-xs text-[#69635D] space-y-1">
              <p className="font-medium text-[#1C1A18]">Lumi Estética e Saúde</p>
              <p>{ADDRESS_FULL}</p>
              <p>Contato: {PHONE_DISPLAY}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Botão Flutuante de WhatsApp ───────────────────────────────── */
export function WhatsAppFloatingButton() {
  return (
    <aside
      aria-label="Contato direto no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      <a
        href={WHATSAPP_MAIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar agora pelo WhatsApp da Lumi Estética e Saúde (abre em nova aba)"
        className="pulse-whatsapp flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-xl hover:bg-[#20ba59] hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-semibold">Agendar no WhatsApp</span>
      </a>
    </aside>
  );
}

/* ─── Lightbox Acessível para Imagens ────────────────────────────── */
export function Lightbox({
  src,
  alt,
  label,
  onClose,
}: {
  src: string;
  alt: string;
  label?: string | undefined;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada da imagem"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Fechar ampliação"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-black/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] w-auto max-w-full object-contain mx-auto"
        />
        {label && (
          <div className="bg-[#1C1A18]/90 px-6 py-3 text-center text-sm text-[#FAF7F2]">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Footer Institucional ──────────────────────────────────────── */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5DDD3] bg-[#F7F2EB] text-[#1C1A18] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E5DDD3]">
          {/* Coluna 1: Apresentação da Marca */}
          <div className="space-y-4">
            <div className="flex justify-start">
              <LumiLogo className="items-start text-left" />
            </div>
            <p className="text-sm text-[#69635D] leading-relaxed pt-2">
              Centro de saúde e beleza dedicado à estética facial, corporal e ozonioterapia em Cuiabá – MT. Cuidado com rigor técnico, acolhimento e respeito à sua individualidade.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DDD3] text-xs font-medium text-[#69635D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Responsabilidade Técnica: {COREN_NUMBER}</span>
              </span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#1C1A18] tracking-wide">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-[#69635D]">
              {NAV_LINKS.slice(0, 5).map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-[#C5A059] transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="hover:text-[#C5A059] transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#C5A059] transition-colors">
                  Localização e Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Áreas de Atendimento */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#1C1A18] tracking-wide">
              Áreas de Atendimento
            </h3>
            <ul className="space-y-2.5 text-sm text-[#69635D]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Estética Facial</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Estética Corporal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Ozonioterapia</span>
              </li>
            </ul>
            <p className="text-xs text-[#69635D]/80 pt-2 leading-relaxed">
              Consulte a indicação personalizada e a disponibilidade diretamente com a clínica.
            </p>
          </div>

          {/* Coluna 4: Contato e Endereço */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#1C1A18] tracking-wide">
              Atendimento em Cuiabá
            </h3>
            <div className="space-y-2.5 text-sm text-[#69635D]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{ADDRESS_FULL}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${PHONE_RAW}`} className="hover:text-[#C5A059] transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </p>
              <div className="pt-2">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] font-medium hover:underline"
                >
                  <span>Abrir localização no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#69635D]">
          <p>© {currentYear} {CLINIC_NAME}. Todos os direitos reservados.</p>
          <p className="text-center md:text-right">
            Desenvolvido com excelência técnica e design exclusivo pela GFSites.
          </p>
        </div>
      </div>
    </footer>
  );
}
