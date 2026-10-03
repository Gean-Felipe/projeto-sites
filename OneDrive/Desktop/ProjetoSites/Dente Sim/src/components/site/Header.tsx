import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { clinica, img, nav } from "./data";

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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border/70 bg-background/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <a href="#inicio" className="flex min-w-0 items-center" aria-label="Dente Sim — início">
          <img
            src={img.logo}
            alt="Logo Dente Sim"
            className="h-9 w-auto shrink-0 sm:h-10"
            width={936}
            height={324}
          />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-bold text-foreground/80 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {item.label}
            </a>
          ))}
          <Button asChild className="ml-3 rounded-full px-5">
            <a href="#contato">Agendar consulta</a>
          </Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            asChild
            size="icon"
            variant="outline"
            className="min-h-11 min-w-11 rounded-full"
            aria-label={`Ligar para ${clinica.telefone}`}
          >
            <a href={clinica.telefoneLink}>
              <Phone className="size-4" />
            </a>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="min-h-11 min-w-11"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Navegação mobile" className="mx-auto max-w-7xl px-4 py-4">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3 text-base font-bold text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-3 h-12 w-full rounded-full text-base">
              <a href="#contato" onClick={() => setOpen(false)}>
                Agendar consulta
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
