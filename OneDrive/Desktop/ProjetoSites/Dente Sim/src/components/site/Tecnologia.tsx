import { Reveal } from "./Reveal";
import { img } from "./data";

const etapas = [
  { n: "01", titulo: "Avaliação detalhada" },
  { n: "02", titulo: "Planejamento personalizado" },
  { n: "03", titulo: "Acompanhamento da evolução" },
];

export function Tecnologia() {
  return (
    <section className="bg-deep py-20 text-deep-foreground lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-deep-foreground/70 uppercase">
            Tecnologia
          </p>
          <h2 className="mt-5 text-3xl leading-tight font-bold text-deep-foreground sm:text-4xl">
            Precisão para enxergar cada detalhe.
          </h2>
          <p className="mt-6 text-lg font-semibold text-deep-foreground/90">
            A tecnologia faz parte da nossa forma de cuidar.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-deep-foreground/75">
            Recursos de avaliação e documentação podem auxiliar na análise, planejamento e
            acompanhamento de cada tratamento.
          </p>
          <ol className="mt-10 space-y-6">
            {etapas.map((e, i) => (
              <Reveal as="li" key={e.n} delay={i * 90} className="flex items-center gap-5">
                <span className="font-display text-2xl font-bold text-deep-foreground/35">
                  {e.n}
                </span>
                <span className="h-px flex-1 bg-deep-foreground/20" />
                <span className="text-right text-sm font-semibold text-deep-foreground sm:text-base">
                  {e.titulo}
                </span>
              </Reveal>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={img.fotografiaOdonto}
              alt="Câmera fotográfica registrando o sorriso de um paciente durante documentação odontológica"
              className="aspect-[4/5] w-full object-cover"
              width={1237}
              height={1416}
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
