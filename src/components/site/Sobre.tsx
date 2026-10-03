import { Reveal } from "./Reveal";
import { clinica, img } from "./data";

export function Sobre() {
  return (
    <section id="sobre" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={img.heroAtendimento}
                alt="Equipe DenteSim realizando atendimento na clínica em Cuiabá"
                className="aspect-[4/5] w-full object-cover"
                width={1080}
                height={1350}
                loading="lazy"
              />
              {/* Gold accent line */}
              <div
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-gold/80 via-gold/40 to-transparent"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal delay={0}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                <span
                  className="inline-block h-px w-5 bg-gold"
                  aria-hidden="true"
                />
                Sobre a clínica
              </span>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
                Mais de 16 anos dedicados
                <br />
                à saúde do seu sorriso.
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A {clinica.nomeCompleto} é referência em Cuiabá com duas
                unidades — Cristo Rei e CPA. Sob a responsabilidade do{" "}
                {clinica.responsavel}, já atendemos mais de 15 mil pacientes com
                foco em acolhimento, cuidado e resultados que transformam vidas.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Aqui, cada paciente é único. Desde a primeira consulta até o
                acompanhamento pós-tratamento, buscamos oferecer uma experiência
                atenciosa, transparente e personalizada.
              </p>
            </Reveal>

            <Reveal delay={480}>
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="font-display text-3xl text-deep">
                    {clinica.experiencia}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    anos de experiência
                  </p>
                </div>
                <div className="border-l-2 border-gold/40 pl-4">
                  <p className="font-display text-3xl text-deep">
                    {clinica.pacientes}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    pacientes atendidos
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
