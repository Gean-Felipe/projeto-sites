import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Cta, WHATSAPP_CLIENTE } from "./primitives";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#barbearia", label: "Barbearia" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#escola", label: "Escola" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/95 shadow-xl backdrop-blur-md border-b border-primary/20 py-3"
          : "bg-gradient-to-b from-ink/90 via-ink/40 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#inicio"
          className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-primary/70 font-display text-sm font-bold text-primary shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-primary">
            DT
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base tracking-[0.22em] text-foreground font-semibold">
              DOM THIAGO
            </span>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-primary">
              Barbearia
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
          aria-label="Navegação principal"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-all duration-200 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Cta href={WHATSAPP_CLIENTE} className="px-6 py-3 text-[11px]">
            Agendar horário
          </Cta>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="rounded-sm border border-primary/50 bg-ink-soft/80 p-2.5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-primary/20 bg-ink/98 px-6 pb-8 pt-4 backdrop-blur-xl lg:hidden shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-1" aria-label="Navegação mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border/40 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary hover:pl-2"
              >
                <span>{l.label}</span>
                <span className="text-[10px] text-primary/60">→</span>
              </a>
            ))}
          </nav>
          <Cta href={WHATSAPP_CLIENTE} className="mt-6 w-full py-4 text-xs font-bold">
            Agendar horário no WhatsApp
          </Cta>
        </div>
      ) : null}
    </header>
  );
}
