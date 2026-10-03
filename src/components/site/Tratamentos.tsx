import { Reveal } from "./Reveal";
import { unidades } from "./data";

const tratamentos = [
  {
    nome: "Implantes Dentários",
    desc: "Reposição de dentes ausentes com segurança e naturalidade, devolvendo função mastigatória e confiança ao sorriso.",
  },
  {
    nome: "Ortodontia",
    desc: "Correção do posicionamento dos dentes e da mordida, promovendo alinhamento, saúde oral e harmonia facial.",
  },
  {
    nome: "Próteses",
    desc: "Soluções para reposição de dentes perdidos, recuperando estética, conforto e qualidade de vida.",
  },
  {
    nome: "Estética Dental",
    desc: "Procedimentos que valorizam a aparência do sorriso — clareamento, lentes de contato, restaurações estéticas.",
  },
  {
    nome: "Endodontia",
    desc: "Tratamento de canal com precisão, preservando a estrutura natural do dente e aliviando dores.",
  },
  {
    nome: "Clínica Geral",
    desc: "Prevenção, diagnóstico e tratamento das principais condições bucais com acompanhamento personalizado.",
  },
];

export function Tratamentos() {
  return (
    <section id="tratamentos" className="bg-warm py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal delay={0}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            <span className="inline-block h-px w-5 bg-gold" aria-hidden="true" />
            Tratamentos
          </span>
        </Reveal>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal delay={120}>
            <h2 className="max-w-lg text-3xl leading-tight sm:text-4xl">
              Cuidados completos para cada fase do seu sorriso.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <a
              href={unidades[0].whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Agendar avaliação →
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {tratamentos.map((t, i) => (
            <Reveal
              key={t.nome}
              delay={100 + (i % 3) * 100}
              className="group flex flex-col bg-background p-8 transition-colors duration-300 hover:bg-warm-light"
            >
              <span className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground/50 uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl">{t.nome}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {t.desc}
              </p>
              <span
                className="mt-6 block h-[2px] w-8 bg-gold/60 transition-all duration-500 group-hover:w-16 group-hover:bg-gold"
                aria-hidden="true"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
