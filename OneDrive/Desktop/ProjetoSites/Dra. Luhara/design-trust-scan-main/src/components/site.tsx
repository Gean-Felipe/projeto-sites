import { Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";

export const WHATSAPP =
  "https://wa.me/5565999220212?text=" +
  encodeURIComponent("Olá! Gostaria de saber mais sobre os tratamentos da Dra. Luhara Carvalho e agendar uma consulta.");

export const INSTAGRAM = "https://www.instagram.com/draluharacarvalho/";
export const PHONE = "tel:+5565999220212";
export const PHONE_DISPLAY = "(65) 99922-0212";
export const ADDRESS = "Avenida Tancredo Neves, 747, Sala 04 — Jardim Petrópolis, Cuiabá — MT, CEP 78070-122";
export const LOCATION_REF = "Espaço Saúde Odontologia, Estética e Bem-Estar";
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Avenida Tancredo Neves, 747, Sala 04, Jardim Petrópolis, Cuiabá, MT, 78070-122");

export const NAV = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#tratamentos", label: "Tratamentos" },
  { href: "/#resultados", label: "Resultados" },
  { href: "/#avaliacoes", label: "Avaliações" },
  { href: "/#contato", label: "Contato" },
];

/* ─── Scroll Reveal Hook ────────────────────────────────────── */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-stagger").forEach((el) => {
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-stagger");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ─── Assinatura / Identidade da Marca ────────────────────────── */
export function Signature({ light = false }: { light?: boolean }) {
  return (
    <span className="flex flex-col leading-none select-none">
      <span className={`font-serif text-2xl tracking-tight ${light ? "text-ink-foreground" : "text-foreground"}`}>
        Dra. Luhara Carvalho
      </span>
      <span
        className={`mt-1.5 text-[0.625rem] tracking-[0.22em] uppercase font-semibold ${
          light ? "text-accent" : "text-muted-foreground"
        }`}
      >
        Odontologia & Estética · Cuiabá
      </span>
    </span>
  );
}

/* ─── Header ────────────────────────────────────────────────── */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
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
          ? "border-border/80 bg-background/95 backdrop-blur-md shadow-[0_4px_20px_rgba(11,25,44,0.06)]"
          : "border-border/40 bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" aria-label="Dra. Luhara Carvalho — início">
          <Signature />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-sm font-medium text-foreground/75 transition-colors duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-ink">
            Agendar consulta
          </a>
        </nav>
        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="menu-movel"
        className={`overflow-hidden transition-all duration-400 ease-in-out lg:hidden ${
          open ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-label="Menu móvel"
        role="navigation"
      >
        <div className="border-t border-border bg-background px-6 pb-8 pt-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-4 font-serif text-2xl transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink mt-6 w-full justify-center"
          >
            Agendar consulta
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Signature light />
          <p className="mt-5 text-sm font-medium text-accent">{LOCATION_REF}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">{ADDRESS}</p>
          <p className="mt-4 text-xs text-ink-muted/80">
            Odontologia, cirurgia-dentista e odontologia estética com cuidado e atenção aos detalhes.
          </p>
        </div>
        <div>
          <p className="eyebrow text-accent">Navegação</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-ink-muted transition-colors duration-300 hover:text-ink-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-accent">Contato & Agendamento</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted transition-colors duration-300 hover:text-ink-foreground flex items-center gap-2"
              >
                <span>WhatsApp: {PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted transition-colors duration-300 hover:text-ink-foreground"
              >
                Instagram: @draluharacarvalho
              </a>
            </li>
            <li>
              <a
                href="https://luharacarvalho.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted transition-colors duration-300 hover:text-ink-foreground"
              >
                Website: luharacarvalho.com.br
              </a>
            </li>
            <li>
              <Link
                to="/privacidade"
                className="text-ink-muted transition-colors duration-300 hover:text-ink-foreground"
              >
                Política de privacidade
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-ink-muted sm:flex-row lg:px-10">
          <p>
            © {new Date().getFullYear()} Dra. Luhara Carvalho · Cirurgiã-Dentista · Cuiabá, MT. Todos os direitos reservados.
          </p>
          <p className="text-[0.7rem] text-ink-muted/70">
            Atendimento odontológico individualizado com foco em saúde bucal, estética e autoestima.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Lightbox ──────────────────────────────────────────────── */
export function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualização de imagem"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/95 p-4 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Fechar visualização"
        className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-accent hover:text-navy"
      >
        ✕
      </button>
      <div
        className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-md border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} className="max-h-[85vh] w-auto object-contain" />
        <p className="bg-navy px-4 py-3 text-center text-xs tracking-wider text-ink-muted">{alt}</p>
      </div>
    </div>
  );
}
