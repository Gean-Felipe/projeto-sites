import { Instagram, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { clinica, img } from "./data";

export function Contato() {
  return (
    <section id="contato" className="bg-ice py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col">
          <Reveal delay={0}>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Contato</p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Venha nos visitar.</h2>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-9 space-y-6 text-sm">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">
                  <strong className="block font-semibold text-deep">Endereço</strong>
                  {clinica.endereco}
                  <br />
                  {clinica.bairro} — CEP {clinica.cep}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">
                  <strong className="block font-semibold text-deep">Telefone</strong>
                  <a href={clinica.telefoneLink} className="hover:text-primary">
                    {clinica.telefone}
                  </a>
                </span>
              </li>
              <li className="flex gap-4">
                <Instagram className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">
                  <strong className="block font-semibold text-deep">Instagram</strong>
                  <a
                    href="https://www.instagram.com/dentesim/"
                    target="_blank"
                    rel="noreferrer"
                    className="break-words hover:text-primary"
                  >
                    @dentesim
                  </a>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-6 text-sm text-muted-foreground space-y-1">
              <strong className="block font-semibold text-deep mb-2">Horário de Funcionamento</strong>
              <p className="font-bold text-foreground">Segunda a sexta-feira:</p>
              <p>08:00 às 11:00</p>
              <p>13:00 às 18:00</p>
              <p className="pt-2 font-bold text-foreground">Sábado:</p>
              <p>08:00 às 12:00</p>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full px-7">
                <a href={clinica.telefoneLink}>Ligar para a clínica</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-primary/30 bg-background px-7 text-primary hover:bg-soft"
              >
                <a href={clinica.mapsRota} target="_blank" rel="noreferrer">
                  Como chegar
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="group overflow-hidden rounded-[2rem] border border-border bg-background">
          <iframe
            src={clinica.mapsEmbed}
            title={`Mapa com a localização da ${clinica.nome} em Várzea Grande`}
            className="h-80 w-full transition-transform duration-700 group-hover:scale-105 lg:h-full lg:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>

      <img src={img.logo} alt="" aria-hidden="true" className="sr-only" />
    </section>
  );
}
