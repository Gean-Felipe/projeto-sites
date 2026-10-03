import { Button } from "@/components/ui/button";
import { Arc } from "./Arc";
import { Reveal } from "./Reveal";
import { img } from "./data";

export function FormaDeCuidar() {
  return (
    <section id="clinica" className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={img.profissionalMagenta}
              alt="Profissional da Dente Sim com uniforme magenta durante atendimento"
              className="aspect-[4/5] w-full object-cover"
              width={1080}
              height={1920}
              loading="lazy"
            />
          </div>
          <Arc className="absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 text-magenta/60" width={4} />
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-magenta uppercase">
            Nossa forma de cuidar
          </p>
          <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
            Seu tratamento começa antes da cadeira odontológica.
          </h2>
          <p className="mt-6 font-display text-lg font-semibold text-primary">
            Começa no acolhimento. Na escuta. Na confiança.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Na Dente Sim, acreditamos que um bom atendimento vai além do procedimento. Cada
            paciente possui uma história, uma necessidade e um objetivo diferente.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Por isso, buscamos oferecer uma experiência personalizada desde o primeiro contato.
          </p>
          <Button asChild size="lg" variant="outline" className="mt-9 h-12 rounded-full border-primary/30 px-7 text-primary hover:bg-soft">
            <a href="#galeria">Conheça nossa clínica</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
