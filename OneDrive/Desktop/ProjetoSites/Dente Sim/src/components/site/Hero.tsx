import { ArrowRight, Sparkles, HeartHandshake, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Arc } from "./Arc";
import { Reveal } from "./Reveal";
import { clinica, img } from "./data";

const indicadores = [
  { icon: Sparkles, label: "Excelência técnica" },
  { icon: Cpu, label: "Tecnologia moderna" },
  { icon: HeartHandshake, label: "Atendimento humanizado" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ice pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Arc
        className="absolute -top-24 left-1/2 h-72 w-[140%] -translate-x-1/2 text-soft"
        width={1.2}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col">
          <Reveal delay={0}>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
              Clínica odontológica em Cristo Rei, Várzea Grande - MT
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="mt-6 text-4xl leading-[1.05] font-bold sm:text-5xl xl:text-6xl">
              Cuidado com a sua saúde bucal.{" "}
              <span className="relative inline-block">
                Confiança
                <Arc className="absolute -bottom-3 left-0 h-4 w-full text-magenta" width={5} />
              </span>{" "}
              para o seu sorriso.
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Na Dente Sim, oferecemos atendimento odontológico completo no Centro Comercial Cristo
              Rei. Estrutura moderna, cuidado dedicado e foco no bem-estar de cada paciente.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-13 rounded-full px-7 text-base">
                <a href="#contato">
                  Agende sua avaliação <ArrowRight className="ml-1 size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-primary/30 bg-background px-7 text-base text-primary hover:bg-soft"
              >
                <a href={clinica.mapsRota} target="_blank" rel="noreferrer">
                  Como chegar
                </a>
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {indicadores.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-bold text-deep">
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="group relative mx-auto max-w-md lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-[2.5rem] bg-soft/70 transition-transform duration-700 group-hover:scale-[1.02]"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] bg-background shadow-[0_24px_60px_-30px_oklch(0.443_0.101_243.5_/_0.45)]">
              <img
                src={img.dentistaJaleco}
                alt="Atendimento odontológico humanizado na Dente Sim em Várzea Grande"
                className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                width={1080}
                height={1920}
                fetchPriority="high"
              />
            </div>
            <div className="animate-float-slow absolute -bottom-6 -left-4 rounded-2xl border border-border bg-background/95 p-5 shadow-xl backdrop-blur-md sm:left-2">
              <p className="font-display text-2xl font-bold text-deep">{clinica.nota} ★</p>
              <p className="text-xs text-muted-foreground">
                {clinica.avaliacoes} avaliações no Google
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
