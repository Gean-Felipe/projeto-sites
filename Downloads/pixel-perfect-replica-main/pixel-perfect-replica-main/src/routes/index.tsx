import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, SectionHead, ClosingCta } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/lib/seo";
import hero from "@/assets/hero-campo.jpg";
import empresarial from "@/assets/empresarial.jpg";
import documentos from "@/assets/documentos.jpg";

export const Route = createFileRoute("/")({
  head: () => seo("Estratégia jurídica para o patrimônio e a atividade produtiva", "Advocacia e consultoria estratégica para produtores rurais, empresários e gestores, com análise técnica e franca de cada demanda."),
  component: Index,
});

const areas = [
  { to: "/advocacia-empresarial", title: "Advocacia empresarial", text: "Contratos, passivos, execuções fiscais, demandas trabalhistas e relações bancárias de pequenas e médias empresas.", tags: ["Contratos", "Execuções fiscais", "Relações bancárias"] },
  { to: "/direito-rural", title: "Direito rural e crédito rural", text: "Questões envolvendo contratos rurais, financiamentos, cédulas de crédito e execuções ligadas à atividade agrícola.", tags: ["Crédito rural", "Contratos rurais", "Execuções"] },
  { to: "/defesa-patrimonial", title: "Defesa patrimonial", text: "Análise de situações envolvendo imóveis, maquinário e atos de constrição judicial, dentro dos limites da lei.", tags: ["Imóveis", "Penhora", "Leilões judiciais"] },
  { to: "/contato", title: "Recuperação de crédito", text: "Avaliação de valores a receber e dos caminhos jurídicos possíveis para sua cobrança. Escopo a confirmar.", tags: ["A confirmar"] },
] as const;

const steps = [
  "Recebimento da solicitação de contato.",
  "Organização inicial das informações e documentos pertinentes.",
  "Entrevista e avaliação minuciosa por advogado responsável.",
  "Explicação sobre viabilidade, riscos e caminhos jurídicos possíveis.",
  "Definição de escopo e eventual contratação, quando houver fundamento.",
];

function Index() {
  return (
    <Page overlay>
      {/* Abertura */}
      <section className="relative min-h-[100svh] overflow-hidden bg-olive text-on-dark flex flex-col justify-end">
        <img
          src={hero}
          alt="Estrada de terra entre lavouras ao entardecer"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity duration-1000"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive via-olive/50 to-olive/75" aria-hidden />
        <div className="container-ed relative z-10 flex flex-col justify-end pb-16 pt-36 md:pb-24">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7 lg:col-span-8">
              <p className="eyebrow text-sand tracking-widest">Advocacia e consultoria estratégica</p>
              <h1 className="display mt-6 leading-[1.04]">
                Estratégia jurídica para o patrimônio e a <em className="text-sand italic">atividade produtiva.</em>
              </h1>
            </div>
            <div className="flex flex-col justify-end gap-8 md:col-span-5 lg:col-span-4">
              <p className="text-on-dark-muted leading-relaxed text-justify [text-justify:inter-word]">
                Atuamos com produtores rurais e empresários em questões de crédito, contratos, execuções e patrimônio — começando sempre pela análise criteriosa dos fatos e documentos.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#atuacao"
                  className="bg-sand px-6 py-3.5 text-sm font-medium text-graphite transition-all duration-200 hover:bg-paper hover:shadow-md"
                >
                  Conhecer a atuação
                </a>
                <Link
                  to="/contato"
                  className="link-line text-sm text-on-dark transition-colors hover:text-sand"
                >
                  Falar com o escritório
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apresentação */}
      <section className="container-ed py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4 lg:col-span-3">
            <p className="eyebrow text-muted-foreground">Como trabalhamos</p>
          </Reveal>
          <Reveal className="md:col-span-8 lg:col-span-9" delay={80}>
            <p className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.25] text-coffee text-justify [text-justify:inter-word] w-full">
              Antes de qualquer definição, buscamos compreender os fatos, examinar os documentos e avaliar a viabilidade jurídica da demanda.
            </p>
            <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground w-full text-justify [text-justify:inter-word]">
              Nem toda situação comporta a mesma resposta — e algumas não comportam medida judicial. Por isso, cada atendimento começa por uma entrevista detalhada e pela leitura técnica do caso. Só então explicamos, com franqueza, quais caminhos existem, quais riscos envolvem e se faz sentido prosseguir.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Públicos */}
      <section className="border-y bg-card/60">
        <div className="container-ed grid md:grid-cols-2">
          {[
            {
              img: hero,
              alt: "Paisagem rural produtiva com lavoura",
              who: "Produtores rurais",
              text: "Crédito rural, contratos, execuções e questões que envolvem a terra, o maquinário e a continuidade da produção.",
              to: "/direito-rural" as const,
            },
            {
              img: empresarial,
              alt: "Ambiente empresarial corporativo",
              who: "Empresários e gestores",
              text: "Contratos, passivos, execuções fiscais e relações bancárias, com leitura dos riscos para a sustentabilidade do negócio.",
              to: "/advocacia-empresarial" as const,
            },
          ].map((p, i) => (
            <Reveal
              key={p.who}
              delay={i * 100}
              className={`py-16 md:py-24 flex flex-col justify-between ${
                i === 0 ? "md:border-r md:pr-14" : "border-t md:border-t-0 md:pl-14"
              }`}
            >
              <div>
                <div className="img-frame aspect-[16/10] overflow-hidden rounded-sm mb-8 border border-border/50 shadow-sm bg-muted">
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="eyebrow text-muted-foreground">Para quem</p>
                <h2 className="mt-3 text-3xl md:text-4xl">{p.who}</h2>
                <p className="mt-4 w-full text-base leading-relaxed text-muted-foreground text-justify [text-justify:inter-word]">{p.text}</p>
              </div>
              <div>
                <Link
                  to={p.to}
                  className="group mt-8 inline-flex items-center gap-3 border-b border-sand pb-1 text-sm font-medium transition-all duration-200 hover:border-graphite"
                >
                  <span>Ver a atuação especializada</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 text-coffee">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Áreas */}
      <section id="atuacao" className="container-ed scroll-mt-24 py-24 md:py-36">
        <SectionHead label="Áreas de atuação" title="Frentes de trabalho definidas, com escopo claro." />
        <ul className="mt-16 border-t divide-y">
          {areas.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 60}>
              <Link
                to={a.to}
                className="group grid gap-4 py-10 transition-all duration-300 hover:bg-card/80 hover:px-6 rounded-sm md:grid-cols-12 md:items-baseline"
              >
                <h3 className="text-2xl md:text-3xl md:col-span-5 transition-colors group-hover:text-coffee">{a.title}</h3>
                <div className="md:col-span-6">
                  <p className="text-muted-foreground leading-relaxed">{a.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium tracking-wide bg-sand/15 text-coffee border border-sand/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-xl text-sand transition-transform duration-300 group-hover:translate-x-2 md:text-right"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Metodologia */}
      <section className="bg-olive text-on-dark">
        <div className="container-ed grid gap-16 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-5">
            <p className="eyebrow text-sand">Metodologia</p>
            <h2 className="h-section mt-6">Um processo transparente, do primeiro contato à decisão.</h2>
            <div className="img-frame mt-10 hidden overflow-hidden rounded-sm border border-line-dark shadow-xl md:block">
              <img
                src={documentos}
                alt="Pastas e documentos organizados sobre uma mesa de madeira"
                width={1408}
                height={1008}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          <ol className="md:col-span-6 md:col-start-7">
            {steps.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 70} className="border-b border-line-dark py-7 first:border-t">
                <span className="text-lg leading-relaxed">{s}</span>
              </Reveal>
            ))}
            <p className="mt-8 text-sm text-on-dark-muted">O contato inicial não representa garantia de contratação ou de resultado.</p>
            <div className="mt-8">
              <Link
                to="/metodologia"
                className="inline-flex items-center gap-3 border-b border-sand pb-1 text-sm font-medium transition-all hover:border-white hover:text-sand"
              >
                <span>Entender cada etapa</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </ol>
        </div>
      </section>

      {/* Institucional */}
      <section className="container-ed py-24 md:py-36">
        <SectionHead label="O escritório" title="Dr. Resolve — Advocacia e Consultoria Estratégica." />
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-7 lg:col-span-6 lg:col-start-4">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify [text-justify:inter-word]">
              Um escritório dedicado a questões que afetam a atividade produtiva e o patrimônio de quem trabalha no campo e na empresa. A atuação combina análise técnica, linguagem acessível e honestidade sobre as possibilidades reais de cada caso.
            </p>
          </Reveal>
          <Reveal className="border-l-2 border-sand pl-6 md:col-span-5 lg:col-span-3" delay={100}>
            <p className="eyebrow text-coffee">Equipe responsável</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-justify [text-justify:inter-word]">
              Nomes, inscrições na OAB e trajetória profissional serão publicados após validação pelo escritório.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="border-t bg-card/60">
        <div className="container-ed py-24 md:py-32">
          <SectionHead label="Conteúdo jurídico" title="Análises informativas, em preparação." />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {["Crédito rural", "Contratos empresariais", "Execuções e constrição patrimonial", "Prevenção e organização documental"].map((t) => (
              <li
                key={t}
                className="bg-card p-8 rounded-sm border border-border/60 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-sand/60"
              >
                <p className="eyebrow text-sand">Tema</p>
                <p className="mt-4 font-serif text-2xl leading-tight text-foreground">{t}</p>
                <p className="mt-6 text-xs uppercase tracking-wider font-mono text-muted-foreground/80">Em breve</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              to="/conteudo"
              className="inline-flex items-center gap-3 border-b border-sand pb-1 text-sm font-medium transition-all hover:border-graphite"
            >
              <span>Ver a área de conteúdo</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </Page>
  );
}
