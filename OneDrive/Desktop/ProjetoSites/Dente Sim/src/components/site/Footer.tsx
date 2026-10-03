import { Instagram, Phone } from "lucide-react";
import { clinica, img, nav } from "./data";

export function Footer() {
  return (
    <footer className="bg-deep py-14 text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img
            src={img.logoBranco}
            alt="Logo Dente Sim"
            className="h-10 w-auto"
            width={936}
            height={324}
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-deep-foreground/70">
            Odontologia com experiência, tecnologia e cuidado humano em Várzea Grande — MT.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h3 className="font-display text-sm font-bold tracking-wide uppercase">Navegação</h3>
          <ul className="mt-4 space-y-2 text-sm text-deep-foreground/75">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-deep-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-bold tracking-wide uppercase">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-deep-foreground/75">
            <li>
              {clinica.endereco}
              <br />
              {clinica.bairro}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <a href={clinica.telefoneLink} className="hover:text-deep-foreground">
                {clinica.telefone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="size-4 shrink-0" aria-hidden="true" />
              <a
                href="https://www.instagram.com/dentesim/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-deep-foreground"
              >
                @dentesim
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-deep-foreground/15 px-4 pt-6 text-xs text-deep-foreground/60 sm:px-6">
        <p>
          © {new Date().getFullYear()} {clinica.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
