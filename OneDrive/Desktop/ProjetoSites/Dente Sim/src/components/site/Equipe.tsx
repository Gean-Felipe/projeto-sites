import { Reveal } from "./Reveal";
import { Arc } from "./Arc";
import { img } from "./data";
import { ShieldCheck, Stethoscope, Users } from "lucide-react";

export function Equipe() {
  return (
    <section id="equipe" className="bg-ice py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Reveal delay={0}>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Corpo Clínico
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Cuidado integrado e profissional para o seu sorriso.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 items-stretch">
          <Reveal
            delay={200}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-soft/50 flex items-center justify-center relative">
              <img
                src={img.dentistaJaleco}
                alt="Atendimento e cuidados odontológicos na Dente Sim"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                width={1080}
                height={1350}
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-primary uppercase">
                  <Stethoscope className="size-4" /> Atendimento Especializado
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                  Acompanhamento Individualizado
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Cada paciente é avaliado com atenção detalhada às suas necessidades funcionais e
                  estéticas, garantindo um plano de tratamento exclusivo.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={350}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-soft/50 flex items-center justify-center relative">
              <img
                src={img.profissionalMagenta}
                alt="Equipe preparada e estrutura odontológica na Dente Sim"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                width={1080}
                height={1350}
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-primary uppercase">
                  <ShieldCheck className="size-4" /> Compromisso com a Saúde
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                  Multidisciplinaridade
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Diferentes áreas da odontologia integradas em um só lugar, facilitando
                  diagnósticos precisos e tratamentos mais eficientes.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={500}
            className="flex flex-col justify-between rounded-3xl border border-border bg-background p-8 sm:p-10 shadow-sm"
          >
            <div>
              <div className="mb-6 flex items-center gap-2" aria-hidden="true">
                <Users className="size-6 text-primary" />
                <span className="inline-block size-2 rounded-full bg-primary/40" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-deep">
                Cada{" "}
                <span className="relative inline-block">
                  sorriso
                  <Arc
                    className="absolute -bottom-1.5 left-0 h-2.5 w-full text-magenta"
                    width={3}
                  />
                </span>{" "}
                tem a sua história.
              </h3>

              <span className="mt-6 block h-px w-14 bg-primary/30" aria-hidden="true" />

              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                A clínica Dente Sim reúne profissionais comprometidos em oferecer uma experiência
                acolhedora e segura em Várzea Grande, priorizando a saúde bucal e o bem-estar dos
                nossos pacientes.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-ice p-4 text-xs font-medium text-muted-foreground">
              📍 Atendimento no Centro Comercial Cristo Rei
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
