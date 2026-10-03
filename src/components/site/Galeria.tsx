import { Reveal } from "./Reveal";
import { clinica, img } from "./data";

const fotos = [
  {
    src: img.clinicaAmbiente,
    alt: "Ambiente moderno e acolhedor das clínicas DenteSim",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: img.cirurgia,
    alt: "Equipamentos cirúrgicos e clínica especializada",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    src: img.protese,
    alt: "Próteses e reabilitação oral de alta precisão",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    src: img.logoMarca,
    alt: "Logomarca e identidade DenteSim",
    span: "sm:col-span-2 sm:row-span-1",
  },
];

export function Galeria() {
  return (
    <section id="galeria" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
            Estrutura & Galeria
          </span>
          <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            Ambientes modernos em Cristo Rei e CPA.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Instalações preparadas com acessibilidade, conforto acústico, equipamentos esterilizados e tecnologia para o seu bem-estar.
          </p>
        </Reveal>

        <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-4">
          {fotos.map((f, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className={`group relative overflow-hidden rounded-3xl border border-border/60 shadow-sm ${f.span}`}
            >
              <img
                src={f.src}
                alt={f.alt}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs font-medium text-white/90">{f.alt}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
