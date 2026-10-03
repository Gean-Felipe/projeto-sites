import { MapPin, Phone } from "lucide-react";
import { clinica, img, nav } from "./data";

export function Footer() {
  return (
    <footer className="bg-deep py-14 text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr_1.1fr]">
        <div>
          <img
            src={img.logoBranco}
            alt="Logo Dente Sim — Clínica Odontológica"
            className="h-10 w-auto"
            width={380}
            height={90}
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-deep-foreground/75">
            <strong>Dente Sim — Clínica odontológica</strong>
            <br />
            Atendimento odontológico com cuidado, tecnologia e respeito ao paciente em Várzea Grande
            — MT.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h3 className="font-display text-sm font-bold tracking-wide uppercase text-deep-foreground">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-deep-foreground/80">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-deep-foreground transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-bold tracking-wide uppercase text-deep-foreground">
            Endereço & Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-deep-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin
                className="size-4 shrink-0 mt-0.5 text-primary-foreground/70"
                aria-hidden="true"
              />
              <span>
                {clinica.endereco} — {clinica.bairro}
                <br />
                {clinica.cidade} - {clinica.estado}
                <br />
                CEP {clinica.cep}
                <br />
                <span className="text-xs text-deep-foreground/60">{clinica.pontoReferencia}</span>
              </span>
            </li>
            <li className="flex items-center gap-2 pt-1">
              <Phone className="size-4 shrink-0 text-primary-foreground/70" aria-hidden="true" />
              <a
                href={clinica.telefoneLink}
                className="font-semibold hover:text-deep-foreground transition-colors"
              >
                {clinica.telefone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-deep-foreground/15 px-4 pt-6 text-xs text-deep-foreground/60 sm:px-6">
        <p>
          © {new Date().getFullYear()} {clinica.nome} — {clinica.categoria}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
