import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { clinica, img, nav, unidades } from "./data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:py-4">
        <a
          href="#inicio"
          className="flex items-center"
          aria-label={`${clinica.nomeCompleto} — início`}
        >
          <img
            src={img.logo}
            alt={`Logo ${clinica.nome}`}
            className="h-10 w-auto sm:h-11"
            width={260}
            height={56}
          />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            className="ml-4 rounded-lg bg-primary px-6 text-sm font-semibold tracking-wide hover:bg-primary/90"
          >
            <a href={unidades[0].whatsappLink} target="_blank" rel="noreferrer">
              Agendar consulta
            </a>
          </Button>
        </nav>

        <button
          className="grid size-11 place-items-center rounded-lg text-foreground transition-colors hover:bg-secondary lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav
            aria-label="Navegação mobile"
            className="mx-auto max-w-7xl px-5 py-5"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              {unidades.map((u) => (
                <Button
                  key={u.nome}
                  asChild
                  className="h-12 w-full rounded-lg text-base font-semibold"
                >
                  <a
                    href={u.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    WhatsApp {u.nome}
                  </a>
                </Button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
