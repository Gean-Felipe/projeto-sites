import { Reveal } from "./Reveal";
import { Arc } from "./Arc";
import { img } from "./data";

const equipe = [
  {
    foto: img.profissionalMagenta,
    alt: "Dra. Gabriela Aparecida Galiego Reis",
    nome: "Dra. Gabriela Aparecida Galiego Reis",
    especialidade: "Implantodontia • Ortodontia • Ortopedia Facial • Clínico Geral",
    cro: "CRO 5550",
    bio: "Cirurgiã-dentista com atuação em Implantodontia, Ortodontia, Ortopedia Facial e Clínico Geral, oferecendo atendimento personalizado e soluções completas para a saúde, função e estética do sorriso.",
    objeto: "object-top",
  },
  {
    foto: img.dentistaJaleco,
    alt: "Dr. Valdir Silva Reis",
    nome: "Dr. Valdir Silva Reis",
    especialidade: "Ortodontia • Ortopedia Facial • Clínico Geral",
    cro: "CRO 7681",
    bio: "Cirurgião-dentista com atuação em Ortodontia, Ortopedia Facial e Clínico Geral, com foco no cuidado integral da saúde bucal e no acompanhamento personalizado de cada paciente.",
    objeto: "object-center",
  },
];

export function Equipe() {
  return (
    <section id="equipe" className="bg-ice py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Reveal delay={0}>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Equipe</p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Quem está por trás de cada sorriso.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {equipe.map((p, i) => (
            <Reveal
              as="li"
              key={i}
              delay={200 + i * 150}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={p.foto}
                  alt={p.alt}
                  className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${p.objeto}`}
                  width={1080}
                  height={1350}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{p.nome}</h3>
                  <p className="mt-1.5 text-xs font-bold tracking-wide text-primary uppercase">
                    {p.especialidade}
                  </p>
                  <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                </div>
                <p className="mt-5 text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                  {p.cro}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal
            as="li"
            delay={500}
            className="col-span-full lg:col-span-1 flex flex-col justify-center h-full my-auto py-2"
          >
            {/* Detalhe geométrico discreto */}
            <div className="mb-6 flex items-center gap-2" aria-hidden="true">
              <span className="inline-block size-2 rounded-full bg-primary/40" />
              <span className="inline-block size-2 rounded-full bg-primary/20" />
            </div>

            {/* Título com destaque sutil em 'sorriso' */}
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.125rem] xl:text-[2.25rem] font-bold leading-tight text-deep">
              Cada{" "}
              <span className="relative inline-block">
                sorriso
                <Arc className="absolute -bottom-1.5 left-0 h-2.5 w-full text-magenta" width={3} />
              </span>{" "}
              é único. E cada profissional também.
            </h3>

            {/* Linha azul estrutural decorativa */}
            <span className="mt-6 block h-px w-14 bg-primary/30" aria-hidden="true" />

            {/* Texto descritivo refinado */}
            <p className="mt-6 text-base sm:text-[1.0625rem] leading-relaxed text-muted-foreground">
              A equipe da Dente Sim reúne diferentes áreas da odontologia para acompanhar cada paciente de forma cuidadosa e individual. Dra.&nbsp;Gabriela e Dr.&nbsp;Valdir atuam em diferentes especialidades, unindo seus conhecimentos para oferecer possibilidades de tratamento voltadas à saúde, à função e à estética do sorriso.
            </p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
