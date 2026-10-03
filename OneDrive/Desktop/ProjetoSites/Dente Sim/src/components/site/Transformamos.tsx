import { HeartPulse, ShieldCheck, UserRound } from "lucide-react";
import { ArcDivider } from "./Arc";
import { Reveal } from "./Reveal";
import { img } from "./data";

const pilares = [
  {
    icon: HeartPulse,
    titulo: "Cuidado",
    texto: "Tecnologia e dedicação para realizar o melhor para você.",
  },
  {
    icon: ShieldCheck,
    titulo: "Resultado",
    texto: "Transformações que vão além da estética.",
  },
  {
    icon: UserRound,
    titulo: "Exclusividade",
    texto: "Cada sorriso é único. Cada paciente é especial.",
  },
];

export function Transformamos() {
  return (
    <section id="transformacoes" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Transformamos sorrisos. Transformamos histórias.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Mais que estética, cada transformação representa confiança, autoestima e qualidade de
            vida.
          </p>
          <ArcDivider className="mt-8" />
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <figure className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-ice">
            <img
              src={img.antesDepois}
              alt="Comparativo antes e depois de reabilitação de sorriso realizada na Dente Sim"
              className="w-full object-cover"
              width={1254}
              height={1254}
              loading="lazy"
            />
          </figure>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Resultados individuais podem variar.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {pilares.map(({ icon: Icon, titulo, texto }, i) => (
            <Reveal as="li" key={titulo} delay={i * 90} className="text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-soft text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{texto}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
