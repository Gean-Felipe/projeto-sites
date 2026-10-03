import { Award, Cpu, HandHeart, Smile } from "lucide-react";
import { Reveal } from "./Reveal";

const blocos = [
  {
    icon: Award,
    titulo: "Experiência",
    texto: "Conhecimento e experiência para cuidar de cada etapa do seu tratamento.",
  },
  {
    icon: Cpu,
    titulo: "Tecnologia",
    texto: "Recursos modernos para auxiliar em avaliações e planejamentos mais precisos.",
  },
  {
    icon: HandHeart,
    titulo: "Humanização",
    texto: "Um atendimento próximo, cuidadoso e pensado para cada paciente.",
  },
  {
    icon: Smile,
    titulo: "Transformação",
    texto: "Resultados que buscam devolver confiança para sorrir.",
  },
];

export function Diferenciais() {
  return (
    <section className="bg-ice py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Por que escolher a Dente Sim?</h2>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {blocos.map(({ icon: Icon, titulo, texto }, i) => (
            <Reveal
              as="li"
              key={titulo}
              delay={i * 80}
              className="group bg-background p-8 transition-colors hover:bg-background"
            >
              <Icon className="size-6 text-primary transition-transform duration-300 group-hover:scale-105" aria-hidden="true" />
              <h3 className="mt-6 font-display text-lg font-bold">{titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{texto}</p>
              <span className="mt-6 block h-0.5 w-8 bg-magenta/70 transition-all duration-300 group-hover:w-14" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
