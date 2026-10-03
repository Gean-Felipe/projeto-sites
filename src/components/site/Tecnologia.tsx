import { Reveal } from "./Reveal";
import { img } from "./data";

const diferenciaisTec = [
  { n: "01", titulo: "Planejamento Digital 3D", desc: "Simulações avançadas que permitem prever o resultado final do tratamento com exatidão." },
  { n: "02", titulo: "Diagnóstico de Alta Precisão", desc: "Equipamentos modernos para identificação precoce e mapeamento completo da saúde bucal." },
  { n: "03", titulo: "Procedimentos Minimamente Invasivos", desc: "Técnicas que proporcionam tratamentos mais rápidos, confortáveis e com pós-operatório tranquilo." },
];

export function Tecnologia() {
  return (
    <section className="bg-primary py-20 text-primary-foreground lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="text-xs font-semibold tracking-widest text-amber-300 uppercase">
            Tecnologia & Inovação
          </span>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Precisão e inovação para o seu sorriso.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-primary-foreground/80">
            Na DenteSim, investimos em tecnologia de ponta para elevar o padrão de atendimento odontológico.
            Nossas ferramentas possibilitam diagnósticos detalhados e planejamentos sob medida para cada paciente.
          </p>

          <ol className="mt-10 space-y-6">
            {diferenciaisTec.map((e, i) => (
              <Reveal as="li" key={e.n} delay={i * 90} className="group rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 transition-colors hover:bg-primary-foreground/10">
                <div className="flex items-start gap-4">
                  <span className="font-serif text-2xl font-normal text-amber-300">
                    {e.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-primary-foreground">{e.titulo}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-primary-foreground/75">{e.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/20 shadow-2xl">
            <img
              src={img.procedimento}
              alt="Atendimento odontológico de precisão com equipamentos modernos na DenteSim"
              className="aspect-[4/5] w-full object-cover"
              width={1200}
              height={1500}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/40 p-4 backdrop-blur-md">
              <p className="text-xs font-medium text-amber-300">Infraestrutura Completa</p>
              <p className="text-sm text-white/90">Ambos os consultórios equipados com a mais alta tecnologia clínica.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
