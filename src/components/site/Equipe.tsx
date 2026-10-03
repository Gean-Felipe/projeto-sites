import { Reveal } from "./Reveal";
import { clinica, img } from "./data";

const profissionais = [
  {
    foto: img.profissional,
    alt: "Dr. Rafael Andrade — Responsável Técnico na DenteSim",
    nome: "Dr. Rafael Andrade",
    cargo: "Responsável Técnico & Especialista",
    bio: "Com mais de 16 anos de atuação dedicados à odontologia de alta performance e acolhedora, lidera a equipe DenteSim focando em transformar a saúde bucal e a autoestima de cada paciente.",
    destaque: "Liderança Técnica",
  },
];

export function Equipe() {
  return (
    <section id="equipe" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
              Corpo Clínico
            </span>
            <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
              Profissionais dedicados ao seu sorriso.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              A equipe da {clinica.nome} é liderada por profissionais experientes e comprometidos com a saúde e estética odontológica.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          {profissionais.map((p, i) => (
            <Reveal
              key={p.nome}
              delay={i * 100}
              className="group lg:col-span-6 flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:shadow-lg sm:flex-row"
            >
              <div className="aspect-[4/5] w-full overflow-hidden sm:w-1/2">
                <img
                  src={p.foto}
                  alt={p.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  width={800}
                  height={1000}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 sm:w-1/2 sm:p-8">
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {p.destaque}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-normal text-foreground">{p.nome}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-wider text-amber-600 uppercase">
                    {p.cargo}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    Atendimento humanizado nas 2 unidades.
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={200} className="lg:col-span-6 rounded-3xl border border-primary/20 bg-primary/5 p-8 lg:p-12">
            <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
              Nosso Compromisso
            </span>
            <h3 className="mt-3 font-serif text-2xl font-normal text-foreground lg:text-3xl">
              Cuidado personalizado em cada etapa do seu tratamento.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
              Na DenteSim, entendemos que cada paciente tem necessidades e desejos únicos. Toda a nossa equipe é treinada para oferecer uma experiência acolhedora, sem pressa, esclarecendo dúvidas e garantindo tranquilidade do início ao fim.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
              <div>
                <p className="font-serif text-2xl font-normal text-primary">+16 Anos</p>
                <p className="text-xs text-muted-foreground">Experiência acumulada</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-normal text-primary">+15.000</p>
                <p className="text-xs text-muted-foreground">Pacientes atendidos</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
