import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { clinica, img, unidades } from "./data";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-deep pt-28 pb-20 lg:pt-36 lg:pb-0"
    >
      {/* Subtle geometric accent */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 30%, oklch(0.50 0.10 185) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-0">
        <div className="flex flex-col pb-4 lg:pb-20">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold uppercase">
              <span
                className="inline-block h-px w-6 bg-gold"
                aria-hidden="true"
              />
              {clinica.experiencia} cuidando do seu sorriso
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-7 text-4xl leading-[1.1] text-deep-foreground sm:text-5xl xl:text-[3.5rem]">
              Saúde e bem-estar
              <br />
              através do{" "}
              <span className="relative inline-block">
                sorriso
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gold"
                  aria-hidden="true"
                />
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-deep-foreground/70 sm:text-lg">
              A DenteSim nasceu do compromisso com a odontologia de qualidade.
              Há mais de 16 anos e mais de 15 mil pacientes atendidos, nossa
              missão é devolver confiança, função e estética ao seu sorriso.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-13 rounded-lg bg-primary px-7 text-base font-semibold hover:bg-primary/90"
              >
                <a
                  href={unidades[0].whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar consulta{" "}
                  <ArrowRight className="ml-1.5 size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-lg border-deep-foreground/20 bg-transparent px-7 text-base text-deep-foreground hover:bg-deep-foreground/5 hover:text-deep-foreground"
              >
                <a href="#sobre">Conheça a clínica</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="font-display text-2xl text-deep-foreground">
                  {clinica.pacientes}
                </p>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-deep-foreground/50 uppercase">
                  pacientes atendidos
                </p>
              </div>
              <span
                className="h-8 w-px bg-deep-foreground/15"
                aria-hidden="true"
              />
              <div>
                <p className="font-display text-2xl text-deep-foreground">
                  2 unidades
                </p>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-deep-foreground/50 uppercase">
                  em Cuiabá — MT
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="relative self-end">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <img
              src={img.antesDepois}
              alt="Resultado de tratamento odontológico na DenteSim — antes e depois"
              className="aspect-[3/4] w-full rounded-t-2xl object-cover object-top lg:rounded-t-3xl"
              width={1080}
              height={1920}
              fetchPriority="high"
            />
            {/* Gradient overlay at bottom for seamless transition */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep to-transparent"
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
