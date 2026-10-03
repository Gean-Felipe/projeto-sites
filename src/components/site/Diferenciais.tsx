import { Award, Cpu, HeartHandshake, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { clinica } from "./data";

const blocos = [
  {
    icon: Award,
    titulo: "16+ Anos de Tradição",
    texto: "Vasta experiência sob liderança técnica do Dr. Rafael Andrade, garantindo tratamentos previsíveis e seguros.",
  },
  {
    icon: Cpu,
    titulo: "Tecnologia de Ponta",
    texto: "Equipamentos modernos para diagnósticos precisos, tornando os procedimentos mais rápidos e confortáveis.",
  },
  {
    icon: HeartHandshake,
    titulo: "Atendimento Humanizado",
    texto: "Acolhimento personalizado em cada consulta, priorizando o bem-estar e o conforto de cada paciente.",
  },
  {
    icon: Sparkles,
    titulo: "2 Unidades Estratégicas",
    texto: "Unidades no Cristo Rei e CPA preparadas com infraestrutura completa para conveniência e facilidade.",
  },
];

export function Diferenciais() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
            Excelência Odontológica
          </span>
          <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            Por que escolher a {clinica.nome}?
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Combinação perfeita entre inovação clínica, infraestrutura moderna e cuidado dedicado à sua saúde bucal.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {blocos.map(({ icon: Icon, titulo, texto }, i) => (
            <Reveal
              as="li"
              key={titulo}
              delay={i * 80}
              className="group relative rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-medium text-foreground">{titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{texto}</p>
              <span className="mt-6 block h-0.5 w-10 bg-amber-500/80 transition-all duration-300 group-hover:w-20 group-hover:bg-amber-500" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
