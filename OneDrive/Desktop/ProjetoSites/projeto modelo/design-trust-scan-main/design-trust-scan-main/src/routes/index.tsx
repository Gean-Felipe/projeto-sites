import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ADDRESS,
  Footer,
  Header,
  INSTAGRAM,
  LOCATION_REF,
  Lightbox,
  MAPS,
  PHONE,
  PHONE_DISPLAY,
  useScrollReveal,
  WHATSAPP,
} from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dra. Luhara Carvalho | Dentista em Cuiabá - MT" },
      {
        name: "description",
        content:
          "Conheça a Dra. Luhara Carvalho, dentista em Cuiabá. Saiba mais sobre facetas de resina, botox, aparelhos ortodônticos e alinhadores. Entre em contato para agendar uma avaliação.",
      },
      { property: "og:title", content: "Dra. Luhara Carvalho | Dentista em Cuiabá - MT" },
      {
        property: "og:description",
        content:
          "Odontologia estética com cuidado, naturalidade e atenção a cada detalhe. Cuido do seu sorriso e da sua autoestima.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/dra_luhara_hero.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ─── Tratamentos Oficiais ─────────────────────────────────── */

const TREATMENTS = [
  {
    num: "01",
    t: "Facetas de resina",
    d: "Uma alternativa estética para harmonizar o sorriso, com planejamento individualizado de acordo com as características de cada paciente.",
    tag: "Harmonia & Estética",
    img: "/images/sorriso_resultado_facetas.jpg",
    aspect: "16/10",
  },
  {
    num: "02",
    t: "Botox",
    d: "Tratamento estético que deve ser planejado após avaliação individual, considerando as necessidades e os objetivos de cada paciente.",
    tag: "Equilíbrio & Bem-Estar",
    img: "/images/antes_depois_caso2.jpg",
    aspect: "4/3",
  },
  {
    num: "03",
    t: "Aparelhos ortodônticos",
    d: "Opções de tratamento ortodôntico para auxiliar no alinhamento dos dentes e na organização da mordida, conforme avaliação profissional.",
    tag: "Alinhamento & Oclusão",
    img: "/images/detalhe_facetas_lateral.jpg",
    aspect: "16/10",
  },
  {
    num: "04",
    t: "Alinhadores ortodônticos",
    d: "Uma alternativa para o tratamento ortodôntico com alinhadores, indicada conforme as condições clínicas e o planejamento de cada caso.",
    tag: "Conforto & Discrição",
    img: "/images/antes_depois_caso1.jpg",
    aspect: "16/10",
  },
];

/* ─── Pilares de Posicionamento ────────────────────────────── */

const PILLARS = [
  {
    num: "01",
    t: "Acolhimento e escuta",
    d: "Cada atendimento começa com tempo e atenção para ouvir suas expectativas, compreender sua história e acolher suas necessidades com empatia.",
  },
  {
    num: "02",
    t: "Planejamento individualizado",
    d: "Apresentamos alternativas clínicas com transparência, detalhamento e ética, respeitando a anatomia natural e os desejos de cada paciente.",
  },
  {
    num: "03",
    t: "Naturalidade e autoestima",
    d: "Nosso propósito é valorizar o seu sorriso de forma sutil e equilibrada, preservando a sua identidade e restaurando a sua segurança ao sorrir.",
  },
];

/* ─── Galeria de Casos Clínicos ─────────────────────────────── */

const GALLERY = [
  {
    src: "/images/sorriso_resultado_facetas.jpg",
    alt: "Resultado de tratamento estético odontológico — sorriso harmonioso e natural",
    label: "Harmonia do sorriso",
  },
  {
    src: "/images/antes_depois_caso1.jpg",
    alt: "Comparativo antes e depois de planejamento odontológico individualizado",
    label: "Planejamento estético",
  },
  {
    src: "/images/detalhe_facetas_lateral.jpg",
    alt: "Registro de detalhe e acabamento estético em odontologia",
    label: "Atenção aos detalhes",
  },
  {
    src: "/images/antes_depois_caso2.jpg",
    alt: "Comparativo de alinhamento e proporção dental",
    label: "Equilíbrio facial",
  },
];

/* ─── Helper WhatsApp com Contexto ──────────────────────────── */

const waTratamento = (procedimento: string) =>
  "https://wa.me/5565999220212?text=" +
  encodeURIComponent(
    `Olá, Dra. Luhara! Gostaria de saber mais sobre ${procedimento.toLowerCase()} e tirar algumas dúvidas para agendar uma consulta.`
  );

/* ─── Componente Principal ──────────────────────────────────── */

function Index() {
  useScrollReveal();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // Schema estruturado JSON-LD para SEO Local
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Dra. Luhara Carvalho — Odontologia Estética",
    "description":
      "Cirurgiã-dentista em Cuiabá, MT. Facetas de resina, botox, aparelhos ortodônticos e alinhadores com atendimento acolhedor e humanizado.",
    "telephone": "+55-65-99922-0212",
    "url": "https://luharacarvalho.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Tancredo Neves, 747, Sala 04, Jardim Petrópolis",
      "addressLocality": "Cuiabá",
      "addressRegion": "MT",
      "postalCode": "78070-122",
      "addressCountry": "BR",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "58",
    },
    "sameAs": ["https://www.instagram.com/draluharacarvalho/"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* ═══════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════ */}
        <section id="inicio" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-28 lg:pt-16">
            <div className="flex flex-col justify-center lg:col-span-7 reveal-left">
              <div className="inline-flex items-center gap-3">
                <span className="hairline" />
                <p className="eyebrow text-muted-foreground">
                  Cirurgiã-Dentista · Cuiabá, MT
                </p>
              </div>

              <h1 className="mt-7 text-4xl leading-[1.05] sm:text-6xl lg:text-[4.75rem] text-navy">
                Seu sorriso, <br />
                <span className="font-serif italic font-normal text-accent">sua essência.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Odontologia estética com cuidado, naturalidade e atenção a cada detalhe.
                Um atendimento planejado para valorizar a sua saúde bucal e fortalecer a sua autoestima.
              </p>

              {/* Botões de Ação */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink"
                  id="hero-cta-agendar"
                >
                  Agende sua consulta <span aria-hidden>→</span>
                </a>
                <a href="#tratamentos" className="btn-line" id="hero-cta-tratamentos">
                  Conheça os tratamentos
                </a>
              </div>

              {/* Selo de Confiança Discreto */}
              <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-border/70 pt-8">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500" aria-label="Avaliação 5 estrelas">
                    {"★".repeat(5)}
                  </div>
                  <span className="font-serif text-lg font-semibold text-navy">5,0</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground font-semibold">58 avaliações</strong> no Google · {LOCATION_REF}
                </p>
              </div>
            </div>

            {/* Imagem Hero com moldura editorial */}
            <div className="relative lg:col-span-5 reveal-right">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm shadow-2xl img-zoom border border-accent/20">
                <img
                  src="/images/dra_luhara_hero.jpg"
                  alt="Dra. Luhara Carvalho — Cirurgiã-Dentista em consultório odontológico estético em Cuiabá, MT"
                  className="h-full w-full object-cover object-top"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-md px-4 py-3 rounded-xs border border-border/80">
                  <p className="font-serif text-base font-semibold text-navy">Dra. Luhara Carvalho</p>
                  <p className="text-[0.6875rem] text-muted-foreground uppercase tracking-wider">
                    Cirurgiã-Dentista · Odontologia Estética
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SOBRE A DENTISTA
        ═══════════════════════════════════════════════════════ */}
        <section id="sobre" className="scroll-mt-20 bg-secondary/40 py-24 lg:py-32 border-y border-border/60">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-5 reveal-left order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl img-zoom border border-accent/30 bg-muted">
                <img
                  src="/images/dra_luhara_hero.jpg"
                  alt="Dra. Luhara Carvalho no consultório em Cuiabá"
                  className="h-full w-full object-cover object-[center_20%]"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -right-6 hidden lg:block w-36 h-36 rounded-full border border-accent/40 pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-7 reveal-right order-1 lg:order-2">
              <p className="eyebrow text-accent">Sobre a dentista</p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight text-navy">
                “Cuido do seu sorriso e da sua autoestima.”
              </h2>

              <div className="mt-8 space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85">
                <p>
                  Cada sorriso tem sua própria história. Meu objetivo é cuidar de você com
                  atenção, acolhimento e planejamento individualizado, valorizando a saúde bucal, a
                  autoestima e a naturalidade dos resultados.
                </p>
                <p>
                  Quero que você se sinta segura em cada etapa do atendimento, com uma experiência
                  marcada pelo cuidado, pela transparência e pela atenção aos detalhes.
                </p>
              </div>

              <div className="mt-8 border-l-2 border-accent pl-5 py-1">
                <p className="font-serif text-xl italic text-navy">
                  Atendimento individualizado e cuidadoso no Espaço Saúde em Cuiabá, MT.
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Avenida Tancredo Neves, 747 · Jardim Petrópolis
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-ink">
                  Falar diretamente no WhatsApp
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-line"
                >
                  Seguir no Instagram @draluharacarvalho
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TRATAMENTOS
        ═══════════════════════════════════════════════════════ */}
        <section id="tratamentos" className="scroll-mt-20 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Cabeçalho */}
            <div className="grid gap-6 lg:grid-cols-12 reveal">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="hairline" />
                  <p className="eyebrow text-muted-foreground">Tratamentos odontológicos</p>
                </div>
                <h2 className="mt-5 text-4xl sm:text-5xl leading-tight text-navy">
                  Cuidados planejados para <br className="hidden sm:block" />
                  <span className="font-serif italic font-normal text-accent">o seu sorriso.</span>
                </h2>
              </div>
              <p className="self-end text-base leading-relaxed text-muted-foreground lg:col-span-5">
                Cada tratamento é precedido de uma avaliação atenta para compreender seus objetivos
                e indicar as condutas mais adequadas à sua saúde e estética.
              </p>
            </div>

            {/* Grid Editorial de Tratamentos */}
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-10">
              {TREATMENTS.map((item) => (
                <article
                  key={item.t}
                  className="treatment-card flex flex-col justify-between rounded-sm border border-border/80 bg-card p-6 sm:p-8 shadow-sm transition-all hover:border-accent/60 hover:shadow-md reveal"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-xs img-zoom bg-muted">
                      <img
                        src={item.img}
                        alt={`Tratamento odontológico: ${item.t}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="eyebrow text-accent">{item.tag}</span>
                      <span className="font-serif text-3xl font-light text-muted-foreground/60">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl sm:text-3xl font-medium text-navy">{item.t}</h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {item.d}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border/60">
                    <a
                      href={waTratamento(item.t)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-line text-xs uppercase tracking-wider"
                    >
                      Tirar dúvidas sobre {item.t.toLowerCase()} →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            RESULTADOS — GALERIA
        ═══════════════════════════════════════════════════════ */}
        <section id="resultados" className="scroll-mt-20 bg-secondary/30 py-24 lg:py-32 border-y border-border/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl reveal">
              <p className="eyebrow text-accent">Galeria de sorrisos</p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl text-navy">
                Atenção aos detalhes em cada sorriso.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Cada paciente possui características anatômicas e biológicas próprias. Conheça alguns
                registros que ilustram a busca contínua por equilíbrio, harmonia e naturalidade.
              </p>
            </div>

            {/* Grid de Fotos com Lightbox */}
            <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6 reveal-stagger">
              {/* Caso 1 — Destaque amplo */}
              <button
                type="button"
                className="col-span-2 md:col-span-7 md:row-span-2 img-zoom cursor-zoom-in overflow-hidden rounded-sm border border-border/70 reveal"
                onClick={() => setLightbox(GALLERY[0]!)}
                aria-label={`Ampliar registro: ${GALLERY[0]!.alt}`}
              >
                <div className="relative h-full">
                  <img
                    src={GALLERY[0]!.src}
                    alt={GALLERY[0]!.alt}
                    className="h-full w-full object-cover object-[center_55%]"
                    style={{ aspectRatio: "4/3" }}
                    loading="lazy"
                  />
                  <span className="absolute bottom-4 left-4 eyebrow bg-background/90 backdrop-blur-sm px-3.5 py-2 text-foreground text-[0.625rem] rounded-xs shadow-xs">
                    {GALLERY[0]!.label}
                  </span>
                </div>
              </button>

              {/* Caso 2 */}
              <button
                type="button"
                className="col-span-2 sm:col-span-1 md:col-span-5 img-zoom cursor-zoom-in overflow-hidden rounded-sm border border-border/70 reveal"
                onClick={() => setLightbox(GALLERY[1]!)}
                aria-label={`Ampliar registro: ${GALLERY[1]!.alt}`}
              >
                <div className="relative h-full">
                  <img
                    src={GALLERY[1]!.src}
                    alt={GALLERY[1]!.alt}
                    className="h-full w-full object-cover object-center"
                    style={{ aspectRatio: "5/3" }}
                    loading="lazy"
                  />
                  <span className="absolute bottom-4 left-4 eyebrow bg-background/90 backdrop-blur-sm px-3.5 py-2 text-foreground text-[0.625rem] rounded-xs shadow-xs">
                    {GALLERY[1]!.label}
                  </span>
                </div>
              </button>

              {/* Caso 3 */}
              <button
                type="button"
                className="col-span-2 sm:col-span-1 md:col-span-5 img-zoom cursor-zoom-in overflow-hidden rounded-sm border border-border/70 reveal"
                onClick={() => setLightbox(GALLERY[2]!)}
                aria-label={`Ampliar registro: ${GALLERY[2]!.alt}`}
              >
                <div className="relative h-full">
                  <img
                    src={GALLERY[2]!.src}
                    alt={GALLERY[2]!.alt}
                    className="h-full w-full object-cover object-center"
                    style={{ aspectRatio: "5/3" }}
                    loading="lazy"
                  />
                  <span className="absolute bottom-4 left-4 eyebrow bg-background/90 backdrop-blur-sm px-3.5 py-2 text-foreground text-[0.625rem] rounded-xs shadow-xs">
                    {GALLERY[2]!.label}
                  </span>
                </div>
              </button>

              {/* Caso 4 — Panorâmico */}
              <button
                type="button"
                className="col-span-2 md:col-span-12 img-zoom cursor-zoom-in overflow-hidden rounded-sm border border-border/70 reveal"
                onClick={() => setLightbox(GALLERY[3]!)}
                aria-label={`Ampliar registro: ${GALLERY[3]!.alt}`}
              >
                <div className="relative">
                  <img
                    src={GALLERY[3]!.src}
                    alt={GALLERY[3]!.alt}
                    className="w-full object-cover object-center"
                    style={{ aspectRatio: "16/7" }}
                    loading="lazy"
                  />
                  <span className="absolute bottom-4 left-4 eyebrow bg-background/90 backdrop-blur-sm px-3.5 py-2 text-foreground text-[0.625rem] rounded-xs shadow-xs">
                    {GALLERY[3]!.label}
                  </span>
                </div>
              </button>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Registros reais publicados mediante autorização dos pacientes. Resultados clínicos variam conforme
              as particularidades de cada caso e exigem avaliação odontológica prévia.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            AVALIAÇÕES & PROVA SOCIAL
        ═══════════════════════════════════════════════════════ */}
        <section id="avaliacoes" className="scroll-mt-20 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-sm border border-border/80 bg-card p-8 sm:p-12 lg:p-16 shadow-sm reveal">
              <div className="grid gap-10 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5">
                  <p className="eyebrow text-accent">Avaliações e confiança</p>
                  <h2 className="mt-4 text-3xl sm:text-4xl text-navy">
                    Reconhecimento pelo cuidado e acolhimento.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    A pontuação máxima reflete a dedicação contínua ao conforto, à transparência no
                    planejamento e à atenção aos detalhes em cada consulta realizada.
                  </p>
                </div>

                <div className="lg:col-span-6 lg:col-start-7 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-around border-t sm:border-t-0 sm:border-l border-border/80 pt-8 sm:pt-0 sm:pl-8">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center gap-2 text-amber-500 text-2xl" aria-hidden>
                      {"★".repeat(5)}
                    </div>
                    <p className="font-serif text-5xl font-semibold text-navy mt-2">5,0</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                      Nota máxima no Google
                    </p>
                  </div>

                  <div className="h-16 w-px bg-border/60 hidden sm:block" />

                  <div className="text-center sm:text-left">
                    <p className="font-serif text-5xl font-semibold text-accent">58</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                      Avaliações registradas
                    </p>
                    <p className="text-[0.6875rem] text-muted-foreground mt-0.5">
                      {LOCATION_REF}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            DIFERENCIAIS — PILARES DE ATENDIMENTO
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-ink text-ink-foreground py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 reveal-left">
                <span className="hairline" />
                <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl leading-tight text-ink-foreground">
                  Um atendimento centrado em você.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-ink-muted">
                  Mais do que procedimentos, priorizamos a relação de confiança e o respeito à sua
                  individualidade em todas as fases do tratamento.
                </p>
              </div>

              <ol className="lg:col-span-7 reveal-stagger space-y-8">
                {PILLARS.map((p) => (
                  <li
                    key={p.t}
                    className="grid gap-4 border-t border-ink-foreground/15 pt-8 sm:grid-cols-[4rem_1fr] reveal"
                  >
                    <span className="eyebrow text-accent pt-1">{p.num}</span>
                    <div>
                      <h3 className="text-2xl font-medium text-ink-foreground">{p.t}</h3>
                      <p className="mt-2.5 text-base leading-relaxed text-ink-muted">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CTA — CONVERSAR SOBRE O SORRISO
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-sm border border-accent/40 bg-gradient-to-r from-card to-secondary/30 p-8 sm:p-14 lg:p-16 shadow-md reveal">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <h2 className="text-3xl sm:text-5xl text-navy leading-tight">
                    Vamos conversar sobre <br className="hidden sm:block" />
                    <span className="font-serif italic font-normal text-accent">o seu sorriso?</span>
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
                    Entre em contato para esclarecer suas dúvidas e verificar a disponibilidade de uma
                    avaliação personalizada no consultório.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink w-full sm:w-auto text-center"
                    id="cta-agendar-whatsapp"
                  >
                    Agendar pelo WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            LOCALIZAÇÃO & CONTATO
        ═══════════════════════════════════════════════════════ */}
        <section id="contato" className="scroll-mt-20 bg-secondary/30 py-24 lg:py-32 border-t border-border/70">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-5 reveal-left">
              <p className="eyebrow text-accent">Localização e contato</p>
              <h2 className="mt-4 text-3xl sm:text-4xl text-navy">Dra. Luhara Carvalho</h2>
              <p className="mt-1 text-sm font-medium text-foreground/80">{LOCATION_REF}</p>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="eyebrow text-muted-foreground">Endereço</dt>
                  <dd className="mt-2 text-base text-foreground leading-relaxed">
                    <a
                      href={MAPS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {ADDRESS}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow text-muted-foreground">Telefone e WhatsApp</dt>
                  <dd className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-base">
                    <a href={PHONE} className="font-medium text-foreground transition-colors hover:text-accent">
                      {PHONE_DISPLAY}
                    </a>
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-4 transition-colors hover:text-navy"
                    >
                      Abrir conversa no WhatsApp
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow text-muted-foreground">Instagram</dt>
                  <dd className="mt-2 text-base">
                    <a
                      href={INSTAGRAM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      @draluharacarvalho
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow text-muted-foreground">Horários de atendimento</dt>
                  <dd className="mt-2 text-base text-muted-foreground">
                    Consulte os horários e datas disponíveis para avaliação diretamente com nossa equipe pelo WhatsApp.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7 reveal-right">
              <div className="h-[430px] w-full overflow-hidden rounded-sm border border-border shadow-sm">
                <iframe
                  title="Mapa de localização — Dra. Luhara Carvalho, Avenida Tancredo Neves 747, Cuiabá - MT"
                  src="https://www.google.com/maps?q=Avenida+Tancredo+Neves,+747,+Jardim+Petr%C3%B3polis,+Cuiab%C3%A1,+MT,+78070-122&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox Modal */}
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}
