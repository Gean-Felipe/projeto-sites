import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/advocacia-empresarial", label: "Empresarial" },
  { to: "/direito-rural", label: "Rural" },
  { to: "/defesa-patrimonial", label: "Patrimonial" },
  { to: "/metodologia", label: "Metodologia" },
  { to: "/conteudo", label: "Conteúdo" },
] as const;

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif text-[1.45rem] leading-none tracking-tight inline-flex items-baseline ${className}`}>
      Dr. Resolve
      <span className="ml-2.5 hidden align-middle font-sans text-[0.62rem] uppercase tracking-[0.18em] opacity-75 sm:inline font-medium text-sand">
        Advocacia e Consultoria
      </span>
    </span>
  );
}

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Fecha o menu móvel ao redimensionar para telas maiores
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const solid = !overlay || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-line-dark bg-olive/95 backdrop-blur-md text-on-dark shadow-sm"
          : "bg-transparent text-on-dark"
      }`}
    >
      <div className="container-ed flex h-20 items-center justify-between">
        <Link to="/" aria-label="Dr. Resolve — página inicial" className="group flex items-center">
          <Wordmark className="transition-opacity group-hover:opacity-90" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-line text-sm text-on-dark-muted transition-colors hover:text-on-dark"
              activeProps={{ className: "!text-on-dark font-medium after:content-[''] after:block after:h-[1px] after:bg-sand after:mt-0.5" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contato"
            className="border border-sand/80 px-5 py-2.5 text-sm font-medium text-on-dark transition-all duration-200 hover:bg-sand hover:text-graphite hover:border-sand shadow-sm"
          >
            Contato
          </Link>
        </nav>
        <button
          type="button"
          className="flex items-center gap-2 rounded-sm border border-line-dark bg-olive/40 px-3 py-2 text-sm text-on-dark transition-colors hover:bg-olive hover:border-sand/60 lg:hidden focus-visible:outline-2 focus-visible:outline-sand"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu de navegação"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-4 w-4 text-sand" /> : <Menu className="h-4 w-4 text-sand" />}
          <span className="text-xs font-medium uppercase tracking-wider">{open ? "Fechar" : "Menu"}</span>
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Principal móvel"
          className="container-ed max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-line-dark bg-olive/98 backdrop-blur-lg pb-10 pt-4 shadow-2xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <ul className="flex flex-col divide-y divide-line-dark">
            {[...nav, { to: "/contato", label: "Contato" } as const].map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-2xl text-on-dark transition-colors hover:text-sand"
                  activeProps={{ className: "text-sand font-medium" }}
                >
                  <span>{n.label}</span>
                  <span className="text-sm font-sans text-sand/60">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-graphite text-on-dark">
      <div className="container-ed grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-dark-muted">
            Advocacia e consultoria estratégica para produtores rurais, empresários e gestores, com atuação técnica, preventiva e contenciosa.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-sand">Atuação</p>
          <ul className="mt-5 space-y-3 text-sm text-on-dark-muted">
            <li><Link to="/advocacia-empresarial" className="link-line hover:text-on-dark">Advocacia empresarial</Link></li>
            <li><Link to="/direito-rural" className="link-line hover:text-on-dark">Direito rural e crédito rural</Link></li>
            <li><Link to="/defesa-patrimonial" className="link-line hover:text-on-dark">Defesa patrimonial</Link></li>
            <li><Link to="/metodologia" className="link-line hover:text-on-dark">Metodologia</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-sand">Informações institucionais</p>
          <ul className="mt-5 space-y-3 text-sm text-on-dark-muted">
            <li className="flex items-center gap-2">
              <span>Inscrição OAB:</span>
              <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-mono font-medium tracking-wide bg-sand/15 text-sand border border-sand/30">A confirmar</span>
            </li>
            <li className="flex items-center gap-2">
              <span>Endereço:</span>
              <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-mono font-medium tracking-wide bg-sand/15 text-sand border border-sand/30">A confirmar</span>
            </li>
            <li className="pt-1">
              <Link to="/contato" className="link-line hover:text-on-dark text-sand font-medium">Solicitar contato direto →</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-ed flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 text-xs leading-relaxed text-on-dark-muted">
          <p>© {new Date().getFullYear()} Dr. Resolve — Advocacia e Consultoria Estratégica. Todos os direitos reservados.</p>
          <p className="max-w-xl text-on-dark-muted/80">
            Conteúdo de caráter exclusivamente informativo, que não substitui a análise individualizada de cada caso. O contato pelo site não estabelece relação advogado-cliente.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Page({ children, overlay = false }: { children: ReactNode; overlay?: boolean }) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:text-graphite focus:shadow-md focus:border focus:border-olive"
      >
        Pular para o conteúdo
      </a>
      <Header overlay={overlay} />
      <main id="conteudo">{children}</main>
      <Footer />
    </>
  );
}

export function PageIntro({
  index: _index,
  label,
  title,
  lead,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lead: string;
}) {
  return (
    <section className="bg-olive pt-32 pb-16 text-on-dark md:pt-40 md:pb-24">
      <div className="container-ed">
        <p className="eyebrow text-sand">{label}</p>
        <h1 className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.08] tracking-tight">{title}</h1>
        <p className="mt-6 w-full text-lg leading-relaxed text-on-dark-muted text-justify [text-justify:inter-word]">{lead}</p>
      </div>
    </section>
  );
}

export function SectionHead({ label, title }: { label: string; title: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow text-muted-foreground">{label}</p>
      <h2 className="h-section">{title}</h2>
    </div>
  );
}

export function ClosingCta() {
  return (
    <section className="bg-coffee text-on-dark">
      <div className="container-ed grid gap-10 py-24 md:grid-cols-12 md:py-32 items-center">
        <h2 className="h-section md:col-span-7">
          Cada situação tem fatos, documentos e riscos próprios. A análise começa por eles.
        </h2>
        <div className="flex flex-col justify-end gap-6 md:col-span-5 lg:col-span-4 lg:col-start-9">
          <p className="text-on-dark-muted leading-relaxed text-justify [text-justify:inter-word] w-full">
            O contato inicial serve para entender a demanda. Ele não representa garantia de contratação ou de resultado.
          </p>
          <Link
            to="/contato"
            className="group inline-flex w-fit items-center gap-3 border-b border-sand pb-1 text-on-dark transition-all duration-200 hover:border-white hover:text-sand"
          >
            <span>Solicitar uma análise inicial</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5 text-sand">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
