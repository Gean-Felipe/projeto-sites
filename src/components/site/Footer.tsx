import { Instagram, MessageCircle } from "lucide-react";
import { clinica, img, nav, unidades } from "./data";

export function Footer() {
  return (
    <footer className="bg-primary py-14 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Marca */}
        <div>
          <img
            src={img.logoBranco}
            alt={`Logo ${clinica.nomeCompleto}`}
            className="h-10 w-auto"
            width={520}
            height={112}
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/65">
            {clinica.posicionamento}
          </p>
          <a
            href={clinica.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-amber-300"
            aria-label="Instagram da DenteSim"
          >
            <Instagram className="size-4" aria-hidden="true" />
            {clinica.instagramHandle}
          </a>
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé">
          <h3 className="text-xs font-semibold tracking-widest text-primary-foreground/50 uppercase">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-primary-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Unidades */}
        {unidades.map((u) => (
          <div key={u.nome}>
            <h3 className="text-xs font-semibold tracking-widest text-primary-foreground/50 uppercase">
              Unidade {u.nome}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
              <li>
                Bairro {u.bairro}
                <br />
                {u.cidade} — {u.estado}
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0 text-amber-300" aria-hidden="true" />
                <a
                  href={u.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary-foreground"
                >
                  {u.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-primary-foreground/15 px-5 pt-6 text-xs text-primary-foreground/45 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {clinica.nomeCompleto}. Todos os direitos reservados.</p>
          <p>CRO-MT — Dr. Rafael Andrade</p>
        </div>
      </div>
    </footer>
  );
}
