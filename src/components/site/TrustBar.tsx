import { Reveal } from "./Reveal";
import { clinica } from "./data";

const itens = [
  { valor: clinica.experiencia, label: "de tradição e dedicação" },
  { valor: clinica.pacientes, label: "sorrisos transformados" },
  { valor: "2 Unidades", label: "Cristo Rei e CPA (MT)" },
  { valor: "Excelência", label: "em odontologia moderna" },
];

export function TrustBar() {
  return (
    <section aria-label="Indicadores de confiança" className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:py-10">
        {itens.map((item, i) => (
          <Reveal
            key={item.label}
            delay={i * 70}
            className="px-4 text-center lg:border-r lg:border-border/60 lg:last:border-r-0"
          >
            <p className="font-serif text-3xl font-normal tracking-tight text-primary sm:text-4xl">
              {item.valor}
            </p>
            <p className="mt-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {item.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

