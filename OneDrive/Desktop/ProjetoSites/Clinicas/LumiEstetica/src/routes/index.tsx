import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Star,
  Clock,
  ArrowUpRight,
  Heart,
  Eye,
  HelpCircle,
  Building2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Header,
  Footer,
  WhatsAppFloatingButton,
  Lightbox,
  useScrollReveal,
  CLINIC_NAME,
  TAGLINE,
  PHONE_DISPLAY,
  PHONE_RAW,
  ADDRESS_FULL,
  ADDRESS_STREET,
  ADDRESS_NEIGHBORHOOD,
  ADDRESS_CITY_STATE,
  ADDRESS_CEP,
  COREN_NUMBER,
  MAPS_URL,
  WHATSAPP_MAIN,
  getWhatsAppUrl,
} from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Lumi Estética e Saúde — Consultório na Cidade Alta, Cuiabá MT",
      },
      {
        name: "description",
        content:
          "Estética facial, corporal e ozonioterapia com atendimento humanizado em Cuiabá – MT. Sua pele merece cuidado, estratégia e constância. Agendamento pelo WhatsApp.",
      },
      {
        property: "og:title",
        content: "Lumi Estética e Saúde — Cuiabá, MT",
      },
      {
        property: "og:description",
        content:
          "Sua pele merece cuidado, estratégia e constância. Atendimento exclusivo na Cidade Alta, Cuiabá.",
      },
      {
        property: "og:image",
        content: "/images/profissional_lumi.jpg",
      },
      {
        property: "og:locale",
        content: "pt_BR",
      },
    ],
  }),
  component: IndexPage,
});

/* ─── Dados Reais e Factuais (Sem Clichês de IA) ─────────────────── */

const SERVICES_DATA = [
  {
    number: "01",
    id: "facial",
    title: "Estética Facial",
    badge: "Rosto & Harmonização",
    lead: "Planejamento que respeita a sua anatomia original, sem fórmulas prontas ou exageros.",
    description:
      "Cuidado voltado à harmonia, linhas de expressão, rejuvenescimento e vitalidade da pele. A avaliação inicial analisa a estrutura do seu rosto, proporções e histórico de pele para indicar apenas o que realmente faz sentido para você.",
    image: "/images/marcacao_facial.jpg",
    alt: "Demarcação e planejamento anatômico para procedimento facial na clínica Lumi em Cuiabá",
    details: [
      "Demarcação facial criteriosa e individualizada",
      "Foco absoluto na naturalidade dos traços",
      "Materiais esterilizados e insumos certificados",
    ],
    whatsappMsg:
      "Olá! Conheci a Lumi pelo site e gostaria de conversar sobre a avaliação de Estética Facial.",
  },
  {
    number: "02",
    id: "corporal",
    title: "Estética Corporal",
    badge: "Corpo & Bem-Estar",
    lead: "Protocolos pensados para a saúde da pele, contorno e sensação real de leveza.",
    description:
      "Abordagens para melhorar a firmeza, circulação e textura da pele em áreas específicas do corpo. Um momento de desaceleração e autocuidado em cabine privativa, com acompanhamento próximo da resposta do seu organismo.",
    image: "/images/atendimento_clinico.jpg",
    alt: "Ambiente clínico privativo para procedimentos corporais na Lumi Estética e Saúde",
    details: [
      "Atendimento calmo em cabine privativa",
      "Acompanhamento da evolução a cada sessão",
      "Conforto e acolhimento do início ao fim",
    ],
    whatsappMsg:
      "Olá! Conheci a Lumi pelo site e gostaria de consultar informações sobre os cuidados de Estética Corporal.",
  },
  {
    number: "03",
    id: "ozonioterapia",
    title: "Ozonioterapia",
    badge: "Prática Integrativa",
    lead: "Avaliação criteriosa de indicação e segurança antes de qualquer aplicação.",
    description:
      "Prática que utiliza o ozônio com foco no suporte à oxigenação, resposta inflamatória e bem-estar geral. No consultório, a profissional realiza uma triagem prévia para esclarecer contraindicações e verificar a real adequação da técnica ao seu caso.",
    image: "/images/cuidado_facial_humanizado.jpg",
    alt: "Profissional realizando acolhimento e avaliação atenta na clínica Lumi",
    details: [
      "Triagem de segurança e contraindicações prévia",
      "Conduta ética e orientação sem promessas milagrosas",
      "Esclarecimento minucioso antes de iniciar",
    ],
    whatsappMsg:
      "Olá! Conheci a Lumi pelo site e gostaria de esclarecer dúvidas sobre a indicação da Ozonioterapia.",
  },
];

const DIFFERENTIALS = [
  {
    icon: Heart,
    title: "Escuta antes da agulha",
    description:
      "Nenhuma conduta é tomada às pressas. Antes de qualquer procedimento, conversamos sobre o que incomoda você e o que é viável realizar com segurança.",
  },
  {
    icon: Sparkles,
    title: "Estratégia e constância",
    description:
      "Bons resultados na pele dependem de plano e continuidade, não de intervenções agressivas que descaracterizam a sua fisionomia.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança de enfermagem",
    description:
      "Atuação sob responsabilidade técnica com registro COREN-MT 548.790, adotando rigor absoluto na esterilização e descarte de materiais.",
  },
  {
    icon: Building2,
    title: "Consultório calmo e privativo",
    description:
      "Localizado na Cidade Alta em Cuiabá, um ambiente sem correria onde você é atendida no seu horário, com atenção exclusiva.",
  },
];

const REVIEWS_DATA = [
  {
    quote: "Preços acessíveis e profissional totalmente qualificada.",
    context: "Comentário sobre a combinação de segurança técnica e clareza de valores.",
    tag: "Qualificação & Transparência",
  },
  {
    quote: "Tirou minhas olheiras ja na primeira sessao.",
    context:
      "Relato individual de paciente no consultório (resultados variam conforme anatomia e tipo de pele).",
    tag: "Atenção ao Olhar",
  },
  {
    quote: "Seguimos no planejamento.",
    context:
      "A essência da nossa conduta: acompanhamento constante, passo a passo, sem afobação.",
    tag: "Constância do Tratamento",
  },
  {
    quote: "Ambiente muito organizado, acolhedor e atendimento com muita paciência.",
    context: "Percepção espontânea sobre o consultório privativo na Cidade Alta.",
    tag: "Acolhimento Real",
  },
];

const GALLERY_ITEMS = [
  {
    src: "/images/profissional_lumi.jpg",
    alt: "Profissional responsável no consultório da Lumi Estética e Saúde em Cuiabá",
    label: "Espaço Lumi · Cidade Alta",
    tag: "Consultório",
  },
  {
    src: "/images/atendimento_clinico.jpg",
    alt: "Atendimento clínico em maca na Lumi Estética e Saúde",
    label: "Atendimento Individualizado",
    tag: "Cabine",
  },
  {
    src: "/images/marcacao_facial.jpg",
    alt: "Demarcação anatômica minuciosa para estética facial",
    label: "Planejamento Anatômico",
    tag: "Procedimento",
  },
  {
    src: "/images/cuidado_facial_humanizado.jpg",
    alt: "Avaliação e cuidado humanizado na maca clínica",
    label: "Avaliação Minuciosa",
    tag: "Cuidado",
  },
  {
    src: "/images/materiais_clinicos.jpg",
    alt: "Materiais descartáveis e seringa para toxina botulínica",
    label: "Biossegurança e Insumos",
    tag: "Materiais",
  },
  {
    src: "/images/institucional_lumi.jpg",
    alt: "Orientações sobre toxina botulínica e dúvidas comuns",
    label: "Informação e Transparência",
    tag: "Orientação",
  },
];

const FAQ_ITEMS = [
  {
    q: "Como faço para agendar uma consulta na Lumi?",
    a: "Basta nos mandar uma mensagem pelo WhatsApp no número (65) 99274-1317. Você nos diz se tem interesse em estética facial, corporal ou ozonioterapia, e nós encontramos o melhor horário disponível na agenda da clínica.",
  },
  {
    q: "Onde fica o consultório em Cuiabá?",
    a: `Estamos na ${ADDRESS_STREET}, no bairro ${ADDRESS_NEIGHBORHOOD}, Cuiabá – MT (${ADDRESS_CEP}). É uma localização calma e com fácil estacionamento nas proximidades.`,
  },
  {
    q: "Preciso passar por avaliação antes de fazer qualquer procedimento?",
    a: "Sim. Toda pele é única e tem suas particularidades. A avaliação prévia é o momento em que a profissional examina seu rosto ou corpo, entende seu histórico de saúde e explica as opções possíveis com total honestidade.",
  },
  {
    q: "Quais procedimentos de estética são realizados?",
    a: "Atuamos em três frentes: Estética Facial (cuidados de pele, linhas, revitalização e harmonização), Estética Corporal (firmeza e textura tecidual) e Ozonioterapia (prática integrativa complementar).",
  },
  {
    q: "Quem é a responsável técnica pelo atendimento?",
    a: `Os atendimentos da clínica contam com apresentação profissional com registro técnico ${COREN_NUMBER}, assegurando conformidade com normas sanitárias e éticas de enfermagem estética.`,
  },
];

/* ─── Componente Principal ───────────────────────────────────────── */
function IndexPage() {
  useScrollReveal();
  const [activeLightbox, setActiveLightbox] = useState<{
    src: string;
    alt: string;
    label?: string | undefined;
  } | null>(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: CLINIC_NAME,
    description:
      "Centro de saúde e beleza dedicado à estética facial, corporal e ozonioterapia em Cuiabá, MT.",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: "Cuiabá",
      addressRegion: "MT",
      postalCode: "78030-445",
      addressCountry: "BR",
    },
    telephone: PHONE_RAW,
    url: "https://lumiestetica.com.br",
    image: "/images/profissional_lumi.jpg",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "6",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#1A1816] selection:bg-[#C5A059]/20 selection:text-[#1A1816]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ─── 1. HEADER ─── */}
      <Header />

      <main id="conteudo-principal" className="flex-1">
        {/* ─── 2. HERO: Editorial, Autoral e Humanizado ─── */}
        <section
          id="inicio"
          className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EAE3D9]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Barra superior de status local */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-8 border-b border-[#EAE3D9]/70 text-xs text-[#5F5953]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="font-medium text-[#1A1816]">Cidade Alta, Cuiabá – MT</span>
                <span className="text-[#C5A059]">/</span>
                <span>Atendimento com hora marcada</span>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <span>{COREN_NUMBER}</span>
                <span className="text-[#C5A059]">✦</span>
                <span className="font-medium text-[#1A1816]">(65) 99274-1317</span>
              </div>
            </div>

            {/* Grid Principal do Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Coluna Editorial de Conteúdo */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="tag-badge">
                  ✦ Centro de Saúde e Beleza
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1816] leading-[1.12]">
                  Cuidado com a sua pele.{" "}
                  <span className="font-editorial-italic text-gold-gradient block sm:inline">
                    Atenção com você.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#5F5953] leading-relaxed max-w-xl font-light">
                  Estética e saúde com um olhar dedicado ao seu cuidado, respeitando suas necessidades e sua individualidade. Sem exageros, sem fórmulas prontas: apenas o que valoriza você.
                </p>

                {/* Manifesto da Marca em Destaque */}
                <div className="p-4 rounded-xl bg-white border border-[#EAE3D9] shadow-sm max-w-lg">
                  <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-1">
                    Nosso posicionamento
                  </p>
                  <p className="font-serif text-lg text-[#1A1816] italic leading-snug">
                    “{TAGLINE}”
                  </p>
                </div>

                {/* Ações Diretas */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={WHATSAPP_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-center py-3.5 px-8"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Agendar pelo WhatsApp</span>
                  </a>

                  <a
                    href="#tratamentos"
                    className="btn-outline-gold text-center py-3.5 px-7"
                  >
                    <span>Conhecer tratamentos</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </div>

                {/* Indicadores Factuais de Confiança */}
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#5F5953]">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-[#C5A059]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <strong className="text-[#1A1816] font-semibold">5,0 de 5 estrelas</strong>
                    <span className="text-[#5F5953]/80">(6 avaliações informadas)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>Registro {COREN_NUMBER}</span>
                  </div>
                </div>
              </div>

              {/* Coluna Fotográfica Assimétrica */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Foto Principal: Atendimento Real em Maca */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#EAE3D9] bg-white shadow-xl aspect-[4/5]">
                    <img
                      src="/images/atendimento_clinico.jpg"
                      alt="Atendimento clínico cuidadoso na Lumi Estética e Saúde em Cuiabá"
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1816]/85 via-[#1A1816]/30 to-transparent p-6 text-[#FAF8F5]">
                      <span className="text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-[#EBDDC8]">
                        Cuiabá · MT
                      </span>
                      <p className="font-serif text-lg font-medium">
                        Atendimento calmo e atencioso
                      </p>
                    </div>
                  </div>

                  {/* Foto Secundária Sobreposta (Técnica e Luvas) */}
                  <div className="hidden sm:block absolute -bottom-6 -left-6 w-44 rounded-xl overflow-hidden border-2 border-white shadow-2xl bg-white aspect-[3/4]">
                    <img
                      src="/images/marcacao_facial.jpg"
                      alt="Demarcação facial e planejamento anatômico minucioso"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5 text-white text-[0.65rem] font-medium">
                      Planejamento facial
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. SOBRE A LUMI: Diagramação Estilo Revista ─── */}
        <section id="sobre" className="py-20 md:py-28 bg-white border-b border-[#EAE3D9]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Foto da Profissional no Consultório */}
              <div className="lg:col-span-5 reveal-left">
                <div className="relative mx-auto max-w-md">
                  <div className="rounded-2xl overflow-hidden border border-[#EAE3D9] shadow-md bg-[#FAF8F5] aspect-[3/4]">
                    <img
                      src="/images/profissional_lumi.jpg"
                      alt="Profissional responsável no consultório da Lumi Estética e Saúde em Cuiabá"
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  {/* Legenda de Consultório */}
                  <div className="mt-3 flex items-center justify-between text-xs text-[#5F5953] px-2">
                    <span className="font-medium text-[#1A1816]">Consultório na Cidade Alta</span>
                    <span className="text-[#C5A059] font-medium">Cuiabá – MT</span>
                  </div>
                </div>
              </div>

              {/* Narrativa Real e Sincera */}
              <div className="lg:col-span-7 space-y-6 reveal-right">
                <span className="tag-badge">
                  ✦ A Proposta da Lumi
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1816] leading-tight">
                  Seu momento de cuidado{" "}
                  <span className="font-editorial-italic text-gold-gradient">começa aqui.</span>
                </h2>

                <p className="text-base sm:text-lg text-[#5F5953] leading-relaxed font-light">
                  A <strong className="font-medium text-[#1A1816]">Lumi Estética e Saúde</strong> foi criada para ser um refúgio de tranquilidade no centro de Cuiabá. Aqui, acreditamos que procedimentos estéticos não servem para transformar você em outra pessoa, mas sim para cuidar com carinho da saúde da sua pele e valorizar a sua identidade natural.
                </p>

                <p className="text-sm sm:text-base text-[#5F5953] leading-relaxed">
                  Trabalhamos exclusivamente com as áreas de <strong>Estética Facial</strong>, <strong>Estética Corporal</strong> e <strong>Ozonioterapia</strong>. Cada consulta é realizada sem pressa, em ambiente higienizado e com acolhimento direto da profissional responsável.
                </p>

                {/* Grid dos 2 Compromissos Práticos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-[#EAE3D9] bg-[#FAF8F5]">
                    <h3 className="font-serif font-semibold text-base text-[#1A1816] mb-1">
                      Atenção e Escuta Atenta
                    </h3>
                    <p className="text-xs text-[#5F5953] leading-relaxed">
                      Entendemos sua rotina e seus objetivos antes de sugerir qualquer protocolo.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#EAE3D9] bg-[#FAF8F5]">
                    <h3 className="font-serif font-semibold text-base text-[#1A1816] mb-1">
                      Rigor Técnico em Enfermagem
                    </h3>
                    <p className="text-xs text-[#5F5953] leading-relaxed">
                      Segurança biológica e técnica pautada pelo registro {COREN_NUMBER}.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={WHATSAPP_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Falar diretamente com a clínica</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. TRATAMENTOS: Curadoria Clínica sem Formato Genérico ─── */}
        <section id="tratamentos" className="py-20 md:py-28 bg-[#FAF8F5]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Header da Seção */}
            <div className="max-w-2xl text-left space-y-3 mb-14 reveal">
              <span className="tag-badge">
                ✦ Áreas de Atuação
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1816]">
                Tratamentos pensados para o seu{" "}
                <span className="font-editorial-italic text-gold-gradient">bem-estar</span>
              </h2>
              <p className="text-sm sm:text-base text-[#5F5953] leading-relaxed font-light">
                Conheça as três áreas de cuidado disponíveis na Lumi. Cada procedimento é planejado sob medida, após avaliação individual.
              </p>
            </div>

            {/* Lista Editorial de Tratamentos */}
            <div className="space-y-8">
              {SERVICES_DATA.map((service, index) => (
                <article
                  key={service.id}
                  className="rounded-2xl bg-white border border-[#EAE3D9] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-6 sm:p-8 lg:p-10 reveal"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Coluna Visual com Foto Real */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                      <div className="relative rounded-xl overflow-hidden border border-[#EAE3D9] aspect-[4/3] bg-[#FAF8F5]">
                        <img
                          src={service.image}
                          alt={service.alt}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-[#EAE3D9] text-[0.7rem] font-semibold tracking-wider text-[#1A1816]">
                          {service.badge}
                        </div>
                      </div>
                    </div>

                    {/* Coluna Descritiva */}
                    <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-2xl font-light text-[#C5A059]">
                          {service.number}
                        </span>
                        <div className="h-px flex-1 bg-[#EAE3D9]" />
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1816]">
                        {service.title}
                      </h3>

                      <p className="text-sm sm:text-base font-medium text-[#1A1816]/90">
                        {service.lead}
                      </p>

                      <p className="text-xs sm:text-sm text-[#5F5953] leading-relaxed font-light">
                        {service.description}
                      </p>

                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#EAE3D9]/60">
                        {service.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-[#1A1816]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2">
                        <a
                          href={getWhatsAppUrl(service.whatsappMsg)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold text-xs py-3 px-6"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Consultar sobre {service.title}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Aviso Ético Responsável */}
            <div className="mt-8 p-4 rounded-xl bg-[#F4EDE2]/70 border border-[#E5D9C7] text-center text-xs text-[#5F5953] leading-relaxed">
              <strong className="text-[#1A1816]">Orientação ética e transparente:</strong> Resultados e indicações de procedimentos estéticos e de ozonioterapia dependem de avaliação clínica individual. Não realizamos diagnósticos prévios nem prometemos resultados milagrosos.
            </div>
          </div>
        </section>

        {/* ─── 5. DIFERENCIAIS: Valores Reais da Conduta Clínica ─── */}
        <section id="diferenciais" className="py-20 md:py-28 bg-white border-y border-[#EAE3D9]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl text-left space-y-3 mb-14 reveal">
              <span className="tag-badge">
                ✦ Por Que Escolher a Lumi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1816]">
                Diferenciais que você percebe no{" "}
                <span className="font-editorial-italic text-gold-gradient">atendimento</span>
              </h2>
              <p className="text-sm sm:text-base text-[#5F5953] leading-relaxed font-light">
                Mais do que procedimentos, priorizamos a relação de confiança e respeito com cada paciente que entra no nosso consultório.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIFFERENTIALS.map((diff, index) => {
                const Icon = diff.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] space-y-4 hover:border-[#C5A059]/50 transition-colors reveal"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#EAE3D9] flex items-center justify-center text-[#C5A059] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#1A1816]">
                      {diff.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5F5953] leading-relaxed font-light">
                      {diff.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 6. GALERIA VISUAL: Mosaico Fotográfico Real ─── */}
        <section id="galeria" className="py-20 md:py-28 bg-[#FAF8F5]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
              <div className="max-w-xl space-y-3">
                <span className="tag-badge">
                  ✦ Registros do Consultório
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1816]">
                  Nosso espaço e{" "}
                  <span className="font-editorial-italic text-gold-gradient">atendimentos</span>
                </h2>
                <p className="text-sm text-[#5F5953] leading-relaxed font-light">
                  Fotografias autênticas do ambiente, materiais e momentos de cuidado na Lumi Estética e Saúde em Cuiabá.
                </p>
              </div>
              <p className="text-xs text-[#5F5953] self-start md:self-end">
                Clique nas fotos para ampliar os detalhes.
              </p>
            </div>

            {/* Grid Mosaico Estilo Galeria */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_ITEMS.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveLightbox(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#EAE3D9] bg-white aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300 reveal"
                  style={{ animationDelay: `${index * 80}ms` }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ampliar imagem: ${item.label}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveLightbox(item);
                    }
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-[#EAE3D9] text-[0.65rem] font-semibold uppercase tracking-wider text-[#1A1816]">
                    {item.tag}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-5 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                    <div>
                      <p className="font-serif text-base font-medium">{item.label}</p>
                      <p className="text-[0.7rem] text-[#EBDDC8]">Toque para ver em tela cheia</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/80" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal Lightbox */}
        {activeLightbox && (
          <Lightbox
            src={activeLightbox.src}
            alt={activeLightbox.alt}
            label={activeLightbox.label}
            onClose={() => setActiveLightbox(null)}
          />
        )}

        {/* ─── 7. AVALIAÇÕES E PROVA SOCIAL: Depoimentos Reais ─── */}
        <section id="avaliacoes" className="py-20 md:py-28 bg-white border-y border-[#EAE3D9]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl text-left space-y-3 mb-14 reveal">
              <span className="tag-badge">
                ✦ Experiências Compartilhadas
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1816]">
                O que dizem sobre o nosso{" "}
                <span className="font-editorial-italic text-gold-gradient">cuidado</span>
              </h2>
              <p className="text-sm sm:text-base text-[#5F5953] leading-relaxed font-light">
                Comentários e feedbacks autênticos informados por pacientes atendidas na Lumi.
              </p>
            </div>

            {/* Painel de Nota e Relatos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Card Destaque de Nota Informada */}
              <div className="lg:col-span-4 p-8 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] text-left space-y-4 reveal-left">
                <div className="flex text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-4xl font-light text-[#1A1816]">5,0 / 5,0</p>
                <p className="text-xs text-[#5F5953] leading-relaxed">
                  Avaliação máxima registrada no perfil comercial em Cuiabá (6 avaliações informadas).
                </p>
                <div className="pt-2 border-t border-[#EAE3D9]">
                  <p className="text-[0.75rem] font-medium text-[#1A1816]">
                    Compromisso com cada paciente
                  </p>
                  <p className="text-[0.7rem] text-[#5F5953] mt-0.5">
                    Atendimento individualizado e constância no plano estético.
                  </p>
                </div>
              </div>

              {/* Grid dos Comentários Reais */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-right">
                {REVIEWS_DATA.map((rev, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] flex flex-col justify-between space-y-4 hover:border-[#C5A059]/40 transition-colors"
                  >
                    <div className="space-y-3">
                      <span className="text-[0.65rem] uppercase tracking-wider font-semibold text-[#C5A059]">
                        {rev.tag}
                      </span>
                      <p className="font-serif text-lg text-[#1A1816] italic leading-relaxed">
                        “{rev.quote}”
                      </p>
                    </div>
                    <p className="text-[0.75rem] text-[#5F5953] border-t border-[#EAE3D9]/60 pt-3">
                      {rev.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. COMO AGENDAR: Simples, Rápido e Humanizado ─── */}
        <section className="py-20 md:py-28 bg-[#FAF8F5]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl text-left space-y-3 mb-14 reveal">
              <span className="tag-badge">
                ✦ Passo a Passo
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1816]">
                Como agendar seu{" "}
                <span className="font-editorial-italic text-gold-gradient">atendimento</span>
              </h2>
              <p className="text-sm text-[#5F5953] leading-relaxed font-light">
                Sem formulários complicados: você conversa diretamente com nossa equipe no WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl bg-white border border-[#EAE3D9] space-y-3 reveal">
                <span className="font-serif text-3xl font-light text-[#C5A059]">01</span>
                <h3 className="font-serif text-xl font-semibold text-[#1A1816]">
                  Clique no WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-[#5F5953] leading-relaxed font-light">
                  Inicie a conversa pelo botão aqui no site ou salve nosso número (65) 99274-1317.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#EAE3D9] space-y-3 reveal">
                <span className="font-serif text-3xl font-light text-[#C5A059]">02</span>
                <h3 className="font-serif text-xl font-semibold text-[#1A1816]">
                  Fale sobre seu interesse
                </h3>
                <p className="text-xs sm:text-sm text-[#5F5953] leading-relaxed font-light">
                  Diga se deseja saber mais sobre Estética Facial, Corporal ou Ozonioterapia.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#EAE3D9] space-y-3 reveal">
                <span className="font-serif text-3xl font-light text-[#C5A059]">03</span>
                <h3 className="font-serif text-xl font-semibold text-[#1A1816]">
                  Combine o melhor dia
                </h3>
                <p className="text-xs sm:text-sm text-[#5F5953] leading-relaxed font-light">
                  Verificamos os horários vagos no consultório e reservamos sua consulta com tranquilidade.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <a
                href={WHATSAPP_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold py-3.5 px-8"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Conversar com a Lumi no WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── 9. PERGUNTAS FREQUENTES (FAQ) ─── */}
        <section id="faq" className="py-20 md:py-28 bg-white border-y border-[#EAE3D9]">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <div className="text-left space-y-3 mb-12 reveal">
              <span className="tag-badge">
                ✦ Dúvidas Frequentes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1816]">
                Perguntas e{" "}
                <span className="font-editorial-italic text-gold-gradient">respostas</span>
              </h2>
              <p className="text-sm text-[#5F5953] leading-relaxed font-light">
                Esclarecimentos diretos e honestos sobre o consultório e a rotina de atendimentos.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3 reveal">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-[#EAE3D9] bg-[#FAF8F5] px-6 py-1 data-[state=open]:border-[#C5A059]/60 data-[state=open]:bg-white transition-colors"
                >
                  <AccordionTrigger className="font-serif text-lg font-medium text-[#1A1816] hover:text-[#C5A059] text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-[#5F5953] leading-relaxed pt-2 pb-4 font-light">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── 10. LOCALIZAÇÃO E CONTATO ─── */}
        <section id="contato" className="py-20 md:py-28 bg-[#FAF8F5]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl text-left space-y-3 mb-14 reveal">
              <span className="tag-badge">
                ✦ Consultório em Cuiabá
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1816]">
                Localização e{" "}
                <span className="font-editorial-italic text-gold-gradient">contato</span>
              </h2>
              <p className="text-sm text-[#5F5953] leading-relaxed font-light">
                Nosso consultório está localizado na Cidade Alta em Cuiabá, em ponto de fácil acesso.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Dados Práticos */}
              <div className="lg:col-span-5 rounded-2xl bg-white border border-[#EAE3D9] p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-8 reveal-left">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#1A1816]">
                      {CLINIC_NAME}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mt-1">
                      Centro de Saúde e Beleza
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-[#5F5953]">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1A1816] font-medium">Endereço</strong>
                        <span>{ADDRESS_STREET}</span>
                        <br />
                        <span>{ADDRESS_NEIGHBORHOOD}, {ADDRESS_CITY_STATE}</span>
                        <br />
                        <span className="text-[#5F5953]/80">{ADDRESS_CEP}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1A1816] font-medium">Telefone & WhatsApp</strong>
                        <a href={`tel:${PHONE_RAW}`} className="hover:text-[#C5A059] transition-colors">
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1A1816] font-medium">Horários</strong>
                        <span>Atendimento com hora marcada via WhatsApp.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1A1816] font-medium">Responsabilidade Técnica</strong>
                        <span>{COREN_NUMBER}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-[#EAE3D9]">
                  <a
                    href={WHATSAPP_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full text-center py-3.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Falar no WhatsApp</span>
                  </a>

                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold w-full text-center py-3 text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir no Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Mapa Responsivo */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#EAE3D9] bg-white shadow-sm min-h-[380px] reveal-right">
                <iframe
                  title="Localização da Lumi Estética e Saúde em Cuiabá"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3842.8276185848525!2d-56.1150!3d-15.5950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x939db1b9c9f4d1e1%3A0x6b8a8b8b8b8b8b8b!2sAv.%20Jornalista%20Alves%20de%20Oliveira%20-%20Cidade%20Alta%2C%20Cuiab%C3%A1%20-%20MT!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
                  className="w-full h-full min-h-[400px] border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 11. CTA FINAL: Elegante e Sóbrio ─── */}
        <section className="py-20 md:py-28 bg-[#1A1816] text-[#FAF8F5] relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center space-y-6 relative z-10 reveal">
            <span className="tag-badge bg-white/10 border-white/20 text-[#EBDDC8]">
              ✦ Agendamento Direto
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FAF8F5] leading-tight">
              Reserve um momento para{" "}
              <span className="font-editorial-italic text-gold-gradient block sm:inline">
                cuidar de você.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#FAF8F5]/80 max-w-2xl mx-auto leading-relaxed font-light">
              Entre em contato com a Lumi Estética e Saúde para conhecer as opções de atendimento e esclarecer suas dúvidas com tranquilidade.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold py-4 px-9 text-base bg-[#C5A059] text-white hover:bg-[#B89249] shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Agendar pelo WhatsApp</span>
              </a>

              <a
                href={`tel:${PHONE_RAW}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Ligar: {PHONE_DISPLAY}</span>
              </a>
            </div>

            <p className="text-xs text-[#FAF8F5]/50 pt-4">
              Cidade Alta, Cuiabá – MT · Resposta direta no WhatsApp
            </p>
          </div>
        </section>
      </main>

      {/* ─── 12. FOOTER ─── */}
      <Footer />

      {/* Botão Flutuante */}
      <WhatsAppFloatingButton />
    </div>
  );
}
