import { Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { clinica } from "./data";

const depoimentos = [
  {
    texto:
      "Estou satisfeita com o resultado. Dr. Valdir e Dra. Gabriela me atenderam super bem, e amei o resultado final. Excelentes profissionais.",
    autor: "Gilvana Martins",
  },
  {
    texto:
      "Equipe muito boa, destaque para o Dr. Valdir e Dra. Gabriela — excelentes profissionais!",
    autor: "Jorge Anderson",
  },
  {
    texto:
      "Muito bom. Recomendo! O atendimento é feito por uma equipe de profissionais comprometidos e os valores do tratamento dentário são acessíveis.",
    autor: "Julianne dos Santos Silva",
  },
];

export function Depoimentos() {
  return (
    <section className="bg-ice py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={0}>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Depoimentos
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Histórias de quem voltou a sorrir.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-5 flex justify-center items-center gap-2 text-sm text-muted-foreground">
              <Star className="size-4 fill-magenta text-magenta" aria-hidden="true" />
              {clinica.nota} de média em {clinica.avaliacoes} avaliações no Google.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <Reveal
              as="li"
              key={i}
              delay={300 + (i * 150)}
              className="rounded-3xl border border-border bg-background p-8"
            >
              <Quote className="size-6 text-magenta/70" aria-hidden="true" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
              <p className="mt-6 font-display text-sm font-bold text-deep">{d.autor}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
