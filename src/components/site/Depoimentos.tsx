import { Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { clinica } from "./data";

const depoimentos = [
  {
    texto:
      "Excelente atendimento! Toda a equipe DenteSim é extremamente atenciosa e profissional. Meu tratamento de implante foi super tranquilo e o resultado ficou incrível.",
    autor: "Gilvana Martins",
    local: "Unidade Cristo Rei",
  },
  {
    texto:
      "Dr. Rafael e toda a equipe prestaram um atendimento impecável. Estrutura impecável, equipamentos modernos e pontualidade nos horários.",
    autor: "Jorge Anderson",
    local: "Unidade CPA",
  },
  {
    texto:
      "Super recomendo a DenteSim! Atendimento humanizado, equipe altamente capacitada e condições facilitadas. Devolveram minha confiança ao sorrir.",
    autor: "Julianne dos Santos Silva",
    local: "Unidade Cristo Rei",
  },
];

export function Depoimentos() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
              Depoimentos de Pacientes
            </span>
            <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
              Histórias reais de quem confia na {clinica.nome}.
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-700">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                ))}
              </div>
              <span>Referência em atendimento e satisfação dos pacientes</span>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <Reveal
              as="li"
              key={d.autor}
              delay={i * 100}
              className="flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <Quote className="size-8 text-amber-500/60" aria-hidden="true" />
                <div className="mt-2 flex text-amber-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="size-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                <div>
                  <p className="font-serif text-base font-medium text-foreground">{d.autor}</p>
                  <p className="text-xs text-muted-foreground">{d.local}</p>
                </div>
                <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  Verificado
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
