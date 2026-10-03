import { Reveal } from "./Reveal";
import { img } from "./data";

const fotos = [
  {
    src: img.sedacao,
    alt: "Paciente em atendimento com sedação consciente na Dente Sim",
    span: "sm:col-span-2 sm:row-span-2",
  },
  { src: img.sorrisoPaciente, alt: "Close do sorriso de uma paciente da Dente Sim", span: "" },
  {
    src: img.fotografiaOdonto,
    alt: "Documentação fotográfica do sorriso em equipamento profissional",
    span: "",
  },
];

export function Galeria() {
  return (
    <section id="galeria" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            A clínica
          </p>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Um ambiente pensado para o seu conforto.
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[180px] gap-4 sm:auto-rows-[200px] sm:grid-cols-4">
          {fotos.map((f, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className={`overflow-hidden rounded-2xl ${f.span}`}
            >
              <img
                src={f.src}
                alt={f.alt}
                className="size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
