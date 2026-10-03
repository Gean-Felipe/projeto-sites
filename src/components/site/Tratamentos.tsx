import { Sparkles, Anchor, Layers, AlignHorizontalDistributeCenter, Sun, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const tratamentos = [
  {
    icon: Sparkles,
    nome: "Estética Dental",
    desc: "Cuidados odontológicos voltados à harmonia e à aparência do sorriso, com soluções personalizadas para melhorar a estética e a confiança ao sorrir.",
  },
  {
    icon: Anchor,
    nome: "Implantes",
    desc: "Soluções para a reposição de um ou mais dentes ausentes, buscando recuperar a autoestima, funcionalidade, a segurança e a naturalidade do sorriso.",
  },
  {
    icon: Layers,
    nome: "Próteses",
    desc: "Tratamentos destinados à reposição de dentes perdidos, contribuindo para recuperar a função mastigatória, a estética e o conforto.",
  },
  {
    icon: AlignHorizontalDistributeCenter,
    nome: "Ortodontia",
    desc: "Tratamentos para correção do posicionamento dos dentes e da mordida, promovendo um sorriso mais alinhado e uma melhor função oral.",
  },
  {
    icon: Sun,
    nome: "Clareamento",
    desc: "Procedimento estético destinado a deixar os dentes mais claros e valorizar a aparência do sorriso, de acordo com a avaliação profissional.",
  },
  {
    icon: Stethoscope,
    nome: "Dentística",
    desc: "Área da odontologia dedicada à prevenção e ao tratamento de alterações nos dentes, preservando sua estrutura, função e estética.",
  },
];

export function Tratamentos() {
  return (
    <section id="tratamentos" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Reveal delay={0}>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Tratamentos
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Encontre o cuidado que seu sorriso precisa.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tratamentos.map(({ icon: Icon, nome, desc }, i) => (
            <Reveal
              as="li"
              key={nome}
              delay={200 + (i % 3) * 150}
              className="group flex flex-col rounded-2xl border border-border bg-background p-7 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-ice text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{nome}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <Button
                asChild
                variant="ghost"
                className="mt-5 h-11 w-fit px-0 text-primary hover:bg-transparent hover:text-deep"
              >
                <a href="#contato" aria-label={`Saiba mais sobre ${nome}`}>
                  Saiba mais →
                </a>
              </Button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
