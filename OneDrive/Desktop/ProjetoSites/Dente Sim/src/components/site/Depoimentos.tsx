import { Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { clinica } from "./data";

const depoimentoOficial = {
  texto:
    "Sou paciente a anos, sempre muito bem atendido, excelentes profissionais para colocar aparelho, prótese, implantes, limpeza. Nota 10 recomendo",
  autor: "Paciente Verificado no Google",
};

export function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-ice py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={0}>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Avaliações Fatuais
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              O que os pacientes dizem sobre a Dente Sim.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-sm font-semibold text-deep shadow-xs">
              <Star className="size-4 fill-magenta text-magenta" aria-hidden="true" />
              {clinica.nota} estrelas ({clinica.avaliacoes} avaliações no Google)
            </p>
          </Reveal>
        </div>

        <div className="mt-12 mx-auto max-w-3xl">
          <Reveal delay={350}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-8 sm:p-10 shadow-sm">
              <Quote className="size-8 text-magenta/70" aria-hidden="true" />
              <blockquote className="mt-6 text-base sm:text-lg leading-relaxed text-foreground font-medium">
                "{depoimentoOficial.texto}"
              </blockquote>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <div>
                  <p className="font-display text-sm font-bold text-deep">
                    {depoimentoOficial.autor}
                  </p>
                  <p className="text-xs text-muted-foreground">Avaliação real no Google Maps</p>
                </div>
                <div className="flex gap-1 text-magenta">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-magenta text-magenta" />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
