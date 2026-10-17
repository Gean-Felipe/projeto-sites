import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle,
  MapPin,
  Phone,
  Calendar,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Heart,
  Eye,
  Award,
  HelpCircle,
  Building2,
  ExternalLink,
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
        title: "Lumi Estética e Saúde — Centro de Saúde e Beleza em Cuiabá, MT",
      },
      {
        name: "description",
        content:
          "Estética facial, estética corporal e ozonioterapia em Cuiabá – MT. Sua pele merece cuidado, estratégia e constância. Agende pelo WhatsApp na Lumi Estética e Saúde.",
      },
      {
        property: "og:title",
        content: "Lumi Estética e Saúde — Centro de Saúde e Beleza em Cuiabá, MT",
      },
      {
        property: "og:description",
        content:
          "Estética facial, corporal e ozonioterapia com atendimento personalizado, ambiente acolhedor e responsabilidade técnica na Cidade Alta, Cuiabá.",
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

/* ─── Dados Estruturados de Conteúdo ───────────────────────────── */

const SERVICES_DATA = [
  {
    id: "facial",
    title: "Estética Facial",
    category: "Cuidado e Harmonia Facial",
    description:
      "Abordagens personalizadas dedicadas à renovação, equilíbrio e bem-estar da pele facial. Cada procedimento é planejado respeitando sua anatomia única, textura e objetivos.",
    image: "/images/marcacao_facial.jpg",
    alt: "Procedimento de avaliação e demarcação para estética facial na Lumi Estética e Saúde",
    highlights: [
      "Planejamento facial individualizado",
      "Foco na naturalidade e harmonia",
      "Avaliação atenta das características da pele",
    ],
    whatsappMsg:
      "Olá! Gostaria de consultar informações sobre os procedimentos de Estética Facial na Lumi Estética e Saúde.",
  },
  {
    id: "corporal",
    title: "Estética Corporal",
    category: "Saúde e Bem-Estar Corporal",
    description:
      "Cuidados integrados focados na vitalidade, firmeza e textura da pele corporal. Técnicas planejadas para promover relaxamento, autoestima e equilíbrio estético.",
    image: "/images/atendimento_clinico.jpg",
    alt: "Atendimento estético corporal e acolhimento na clínica Lumi em Cuiabá",
    highlights: [
      "Protocolos ajustados à sua rotina",
      "Conforto e acolhimento profissional",
      "Acompanhamento constante dos resultados",
    ],
    whatsappMsg:
      "Olá! Gostaria de consultar informações sobre os cuidados de Estética Corporal na Lumi Estética e Saúde.",
  },
  {
    id: "ozonioterapia",
    title: "Ozonioterapia",
    category: "Prática Integrativa e Complementar",
    description:
      "Modalidade integrativa que emprega o ozônio como suporte à saúde e oxigenação celular. Consulte a profissional para uma avaliação prévia, orientações sobre indicações, segurança e adequação ao seu organismo.",
    image: "/images/cuidado_facial_humanizado.jpg",
    alt: "Profissional realizando atendimento atencioso na clínica Lumi Estética e Saúde",
    highlights: [
      "Aplicação com rigor técnico e higiênico",
      "Orientação transparente antes de qualquer indicação",
      "Avaliação de elegibilidade e segurança",
    ],
    whatsappMsg:
      "Olá! Gostaria de esclarecer dúvidas e consultar a indicação da Ozonioterapia na Lumi Estética e Saúde.",
  },
];

const DIFFERENTIALS = [
  {
    icon: Heart,
    title: "Atenção Individualizada",
    description:
      "Cada pessoa possui particularidades e ritmos próprios. Nossos atendimentos começam com uma escuta sensível para entender suas reais expectativas.",
  },
  {
    icon: Sparkles,
    title: "Estratégia e Constância",
    description:
      "Acreditamos que beleza e saúde são construídas de forma contínua e responsável, priorizando a saúde tecidual e a naturalidade duradoura.",
  },
  {
    icon: ShieldCheck,
    title: "Rigor Técnico e Higiene",
    description:
      "Materiais rigorosamente descartáveis, ambiente esterilizado e conduta pautada pelas boas práticas profissionais e responsabilidade em enfermagem estética.",
  },
  {
    icon: Building2,
    title: "Ambiente Acolhedor em Cuiabá",
    description:
      "Localizado na Cidade Alta, o espaço da Lumi foi pensado para oferecer tranquilidade, conforto e um momento genuíno de desconexão e cuidado com você.",
  },
];

const GALLERY_ITEMS = [
  {
    src: "/images/profissional_lumi.jpg",
    alt: "Profissional responsável no consultório da Lumi Estética e Saúde em Cuiabá",
    label: "Espaço de Atendimento Lumi",
    caption: "Atendimento acolhedor na Cidade Alta",
  },
  {
    src: "/images/atendimento_clinico.jpg",
    alt: "Paciente recebendo atendimento em maca com profissional da Lumi",
    label: "Ambiente Clínico e Conforto",
    caption: "Estrutura moderna e higienizada",
  },
  {
    src: "/images/marcacao_facial.jpg",
    alt: "Marcação precisa e técnica para harmonização e estética facial",
    label: "Planejamento Anatômico Facial",
    caption: "Precisão e rigor em cada etapa",
  },
  {
    src: "/images/cuidado_facial_humanizado.jpg",
    alt: "Avaliação manual tátil cuidadosa da pele em ambiente clínico",
    label: "Cuidado e Atenção aos Detalhes",
    caption: "Escuta atenta e conduta segura",
  },
  {
    src: "/images/materiais_clinicos.jpg",
    alt: "Materiais descartáveis e produtos de alta qualidade utilizados na clínica",
    label: "Procedimentos e Insumos",
    caption: "Materiais certificados e seguros",
  },
  {
    src: "/images/institucional_lumi.jpg",
    alt: "Comunicação visual e orientação sobre procedimentos estéticos na Lumi",
    label: "Orientação e Clareza",
    caption: "Transparência antes de qualquer escolha",
  },
];

const REVIEWS_DATA = [
  {
    quote: "Preços acessíveis e profissional totalmente qualificada.",
    detail: "Relato de cliente sobre o custo-benefício e a segurança profissional.",
    highlight: "Qualificação & Acessibilidade",
  },
  {
    quote: "Tirou minhas olheiras ja na primeira sessao.",
    detail:
      "Experiência individual compartilhada por cliente (resultados podem variar de acordo com o organismo e indicação).",
    highlight: "Atenção ao Olhar",
  },
  {
    quote: "Seguimos no planejamento.",
    detail:
      "Demonstração do compromisso com o cuidado contínuo, estratégico e de longo prazo.",
    highlight: "Constância & Cuidado",
  },
  {
    quote: "Ambiente super organizado, agradável e atendimento que transmite muita paz.",
    detail: "Percepção espontânea sobre a experiência acolhedora no consultório da Lumi.",
    highlight: "Ambiente Acolhedor",
  },
];

const FAQ_ITEMS = [
  {
    q: "Como posso entrar em contato ou agendar meu atendimento?",
    a: "O agendamento na Lumi Estética e Saúde é realizado com comodidade diretamente pelo WhatsApp (65) 99274-1317. Você nos envia uma mensagem informando a área de seu interesse e combinamos o melhor dia e horário de acordo com a disponibilidade da clínica.",
  },
  {
    q: "Onde a clínica está localizada em Cuiabá?",
    a: `Estamos localizados na ${ADDRESS_FULL}, com fácil acesso e estacionamento nas proximidades. Você também pode consultar o trajeto pelo Google Maps através dos links disponíveis no site.`,
  },
  {
    q: "Quais áreas de atendimento a Lumi oferece?",
    a: "Atuamos em três áreas principais: Estética Facial, Estética Corporal e Ozonioterapia. Todos os procedimentos são orientados conforme avaliação individualizada das suas necessidades.",
  },
  {
    q: "Como posso tirar dúvidas específicas sobre indicação de procedimentos?",
    a: "Você pode nos chamar diretamente no WhatsApp. Nossa profissional esclarecerá todas as suas dúvidas sobre contraindicações, etapas do procedimento e orientações de cuidados.",
  },
  {
    q: "A clínica possui registro profissional?",
    a: `Sim, a atuação técnica da clínica conta com apresentação profissional sob o registro ${COREN_NUMBER}, assegurando conformidade com as normas éticas e sanitárias vigentes.`,
  },
];

/* ─── Componente Principal da Página ───────────────────────────── */
function IndexPage() {
  useScrollReveal();
  const [activeLightbox, setActiveLightbox] = useState<{
    src: string;
    alt: string;
    label?: string;
  } | null>(null);

  // Schema.org JSON-LD para SEO Local
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: CLINIC_NAME,
    description:
      "Centro de saúde e beleza especializado em estética facial, corporal e ozonioterapia em Cuiabá, MT.",
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
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] text-[#1C1A18] selection:bg-[#C5A059]/20 selection:text-[#1C1A18]">
      {/* Script JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ─── SEÇÃO 1: HEADER ─── */}
      <Header />

      <main id="conteudo-principal" className="flex-1">
        {/* ─── SEÇÃO 2: HERO ─── */}
        <section
          id="inicio"
          className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-[#F7F2EB] to-[#FAF7F2]"
        >
          {/* Elementos sutis decorativos de fundo */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Coluna de Texto */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Badge de Posicionamento e Cidade */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E5DDD3] bg-white/90 px-4 py-1.5 text-xs font-medium text-[#69635D] shadow-sm backdrop-blur-sm mx-auto lg:mx-0">
                  <span className="flex h-2 w-2 rounded-full bg-[#C5A059]" />
                  <span>Cidade Alta · Cuiabá – MT</span>
                  <span className="text-[#C5A059]">✦</span>
                  <span className="font-semibold text-[#1C1A18]">Estética e Saúde</span>
                </div>

                {/* Headline Principal */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1C1A18] leading-[1.12]">
                  Cuidado com a sua pele.{" "}
                  <span className="italic font-normal text-gold-gradient block sm:inline">
                    Atenção com você.
                  </span>
                </h1>

                {/* Subtítulo Acolhedor */}
                <p className="text-base sm:text-lg text-[#69635D] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  Estética e saúde com um olhar dedicado ao seu cuidado, respeitando suas necessidades e sua individualidade. Tratamentos faciais, corporais e ozonioterapia em Cuiabá.
                </p>

                {/* CTAs de Conversão */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href={WHATSAPP_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full sm:w-auto text-center py-3.5 px-8 text-base shadow-md"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Agendar pelo WhatsApp</span>
                  </a>

                  <a
                    href="#tratamentos"
                    className="btn-outline-gold w-full sm:w-auto text-center py-3.5 px-8 text-base"
                  >
                    <span>Conhecer tratamentos</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>

                {/* Micro-prova de confiança */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#69635D]">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-[#C5A059]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-[#C5A059]" />
                      ))}
                    </div>
                    <span className="font-medium text-[#1C1A18]">
                      5,0/5 estrelas
                    </span>
                    <span>(6 avaliações informadas)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>{COREN_NUMBER}</span>
                  </div>
                </div>
              </div>

              {/* Coluna de Imagem Hero */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Moldura elegante com acabamento dourado e sombra suave */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-[0_20px_50px_rgba(28,26,24,0.12)] bg-[#EFE7DC]/40 aspect-[4/5]">
                    <img
                      src="/images/atendimento_clinico.jpg"
                      alt="Atendimento clínico cuidadoso na Lumi Estética e Saúde em Cuiabá"
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                      fetchPriority="high"
                    />

                    {/* Gradiente sutil no rodapé da foto */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C1A18]/80 via-[#1C1A18]/30 to-transparent p-6 text-white">
                      <p className="text-xs font-light uppercase tracking-widest text-[#E8D5B0]">
                        Lumi Estética e Saúde
                      </p>
                      <p className="font-serif text-lg font-medium">
                        “Sua pele merece cuidado, estratégia e constância.”
                      </p>
                    </div>
                  </div>

                  {/* Card Flutuante de Confiança */}
                  <div className="absolute -bottom-6 -left-4 sm:left-4 rounded-xl bg-white/95 backdrop-blur-md p-4 border border-[#E5DDD3] shadow-lg max-w-[240px] text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-xs font-semibold text-[#1C1A18]">Atendimento Dedicado</span>
                    </div>
                    <p className="text-[0.75rem] text-[#69635D] leading-snug">
                      Ambiente planejado para seu relaxamento e segurança na Cidade Alta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SEÇÃO 3: APRESENTAÇÃO DA LUMI ─── */}
        <section id="sobre" className="py-20 md:py-28 bg-white border-y border-[#E5DDD3]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Foto da Profissional no Consultório */}
              <div className="lg:col-span-5 order-2 lg:order-1 reveal-left">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="rounded-2xl overflow-hidden border border-[#E5DDD3] shadow-md bg-[#FAF7F2] aspect-[3/4]">
                    <img
                      src="/images/profissional_lumi.jpg"
                      alt="Profissional da Lumi Estética e Saúde em seu consultório acolhedor em Cuiabá"
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD3] flex items-center justify-between text-xs text-[#69635D]">
                    <span className="font-medium text-[#1C1A18]">Consultório Lumi · Cuiabá – MT</span>
                    <span className="text-[#C5A059] font-medium">{COREN_NUMBER}</span>
                  </div>
                </div>
              </div>

              {/* Texto Institucional */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 reveal-right">
                <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#C5A059]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sobre a Clínica</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18] leading-tight">
                  Seu momento de cuidado{" "}
                  <span className="italic font-normal text-gold-gradient">começa aqui.</span>
                </h2>

                <p className="text-base sm:text-lg text-[#69635D] leading-relaxed font-light">
                  A <strong className="font-medium text-[#1C1A18]">Lumi Estética e Saúde</strong> é um centro de saúde e beleza em Cuiabá concebido para quem valoriza atendimento humanizado, precisão técnica e um olhar atento às reais necessidades da pele e do corpo.
                </p>

                <blockquote className="border-l-2 border-[#C5A059] pl-4 italic text-base text-[#1C1A18]/90 font-serif">
                  “Sua pele merece cuidado, estratégia e constância.”
                </blockquote>

                <p className="text-sm sm:text-base text-[#69635D] leading-relaxed">
                  Trabalhamos com foco na naturalidade, compreendendo que cada pessoa possui sua própria identidade estética. Cada protocolo é conduzido com calma, transparência e respeito à individualidade, em um ambiente silencioso, higienizado e totalmente seguro.
                </p>

                {/* Pilares Resumidos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2]">
                    <h3 className="font-serif font-semibold text-base text-[#1C1A18] mb-1">
                      Acolhimento & Escuta
                    </h3>
                    <p className="text-xs text-[#69635D] leading-relaxed">
                      Atendimento que prioriza a conversa clara antes de qualquer decisão clínica.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2]">
                    <h3 className="font-serif font-semibold text-base text-[#1C1A18] mb-1">
                      Segurança em Saúde
                    </h3>
                    <p className="text-xs text-[#69635D] leading-relaxed">
                      Procedimentos realizados em conformidade com as boas práticas sanitárias.
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
                    <span>Conversar com a Lumi</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SEÇÃO 4: TRATAMENTOS ─── */}
        <section id="tratamentos" className="py-20 md:py-28 bg-[#FAF7F2]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Cabeçalho da Seção */}
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 reveal">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nossas Áreas de Atuação</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18]">
                Tratamentos pensados para o seu{" "}
                <span className="italic text-gold-gradient font-normal">bem-estar</span>
              </h2>
              <p className="text-sm sm:text-base text-[#69635D] leading-relaxed">
                Conheça as áreas confirmadas de atendimento na Lumi Estética e Saúde. Cada cuidado é planejado de acordo com a sua necessidade particular.
              </p>
            </div>

            {/* Grid dos 3 Serviços Confirmados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES_DATA.map((service, index) => (
                <article
                  key={service.id}
                  className="rounded-2xl bg-white border border-[#E5DDD3] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group reveal"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Foto Real do Tratamento */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E5DDD3] text-[0.7rem] font-medium text-[#1C1A18]">
                      {service.category}
                    </div>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl font-semibold text-[#1C1A18] tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#69635D] leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 pt-2 border-t border-[#E5DDD3]/60">
                        {service.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-[#1C1A18]/90">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#E5DDD3]">
                      <a
                        href={getWhatsAppUrl(service.whatsappMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold w-full text-center text-xs py-3"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Consultar via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Aviso ético e de responsabilidade */}
            <div className="mt-12 p-4 rounded-xl bg-white border border-[#E5DDD3] text-center max-w-3xl mx-auto text-xs text-[#69635D] leading-relaxed">
              <span className="font-medium text-[#1C1A18]">Nota de orientação ética:</span> Os procedimentos estéticos e a ozonioterapia dependem de prévia avaliação individualizada. A clínica não promete resultados milagrosos ou diagnósticos prévios sem atendimento presencial.
            </div>
          </div>
        </section>

        {/* ─── SEÇÃO 5: DIFERENCIAIS ─── */}
        <section id="diferenciais" className="py-20 md:py-28 bg-[#F7F2EB] border-y border-[#E5DDD3]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 reveal">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Por Que Escolher a Lumi</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18]">
                Diferenciais que você sente no{" "}
                <span className="italic text-gold-gradient font-normal">atendimento</span>
              </h2>
              <p className="text-sm sm:text-base text-[#69635D] leading-relaxed">
                Valores reais presentes na conduta diária da clínica, proporcionando acolhimento, ética e segurança em Cuiabá.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIFFERENTIALS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white border border-[#E5DDD3] shadow-sm hover:border-[#C5A059]/40 hover:shadow-md transition-all duration-300 space-y-4 reveal"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E5DDD3] flex items-center justify-center text-[#C5A059]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#1C1A18]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#69635D] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── SEÇÃO 6: GALERIA VISUAL ─── */}
        <section id="galeria" className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-14 reveal">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                <Eye className="w-3.5 h-3.5" />
                <span>Galeria Real da Clínica</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18]">
                Nosso espaço e{" "}
                <span className="italic text-gold-gradient font-normal">atendimentos</span>
              </h2>
              <p className="text-sm sm:text-base text-[#69635D] leading-relaxed">
                Fotografias reais do consultório, da profissional e dos momentos de cuidado na Lumi Estética e Saúde em Cuiabá.
              </p>
            </div>

            {/* Grid Fotográfico Editorial */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_ITEMS.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveLightbox(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E5DDD3] bg-[#FAF7F2] aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300 reveal"
                  style={{ animationDelay: `${index * 100}ms` }}
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
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Overlay ao passar o mouse */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <p className="text-xs uppercase tracking-wider text-[#E8D5B0] font-medium">
                      {item.caption}
                    </p>
                    <h3 className="font-serif text-lg font-medium">{item.label}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-white/80 mt-2 font-light">
                      <span>Clique para ampliar</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-xs text-[#69635D]">
                Todas as fotos são reais e captadas no espaço da Lumi Estética e Saúde.
              </p>
            </div>
          </div>
        </section>

        {/* Lightbox Modal se ativado */}
        {activeLightbox && (
          <Lightbox
            src={activeLightbox.src}
            alt={activeLightbox.alt}
            label={activeLightbox.label}
            onClose={() => setActiveLightbox(null)}
          />
        )}

        {/* ─── SEÇÃO 7: AVALIAÇÕES E PROVA SOCIAL ─── */}
        <section id="avaliacoes" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E5DDD3]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 reveal">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Experiências e Avaliações</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18]">
                O que dizem sobre o nosso{" "}
                <span className="italic text-gold-gradient font-normal">cuidado</span>
              </h2>
              <p className="text-sm sm:text-base text-[#69635D] leading-relaxed">
                Trechos de comentários compartilhados por clientes que vivenciaram a experiência na Lumi Estética e Saúde.
              </p>
            </div>

            {/* Destaque da Nota Geral */}
            <div className="mb-12 max-w-md mx-auto p-6 rounded-2xl bg-white border border-[#E5DDD3] text-center shadow-sm reveal">
              <div className="flex justify-center text-[#C5A059] mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-[#C5A059]" />
                ))}
              </div>
              <p className="font-serif text-3xl font-semibold text-[#1C1A18]">5,0 / 5,0</p>
              <p className="text-xs text-[#69635D] mt-1">
                Avaliação informada no perfil comercial · 6 avaliações registradas
              </p>
            </div>

            {/* Grid dos Trechos Reais de Avaliações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REVIEWS_DATA.map((rev, index) => (
                <div
                  key={index}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5DDD3] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#C5A059]/40 transition-colors reveal"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#C5A059]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[0.7rem] uppercase font-semibold tracking-wider text-[#C5A059] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD3]">
                        {rev.highlight}
                      </span>
                    </div>
                    <p className="font-serif text-lg sm:text-xl text-[#1C1A18] italic leading-relaxed">
                      “{rev.quote}”
                    </p>
                  </div>
                  <p className="text-xs text-[#69635D] border-t border-[#E5DDD3]/60 pt-3">
                    {rev.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SEÇÃO 8: COMO AGENDAR ─── */}
        <section className="py-20 md:py-28 bg-[#F7F2EB] border-y border-[#E5DDD3]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 reveal">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Simplicidade no Contato</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18]">
                Como agendar seu{" "}
                <span className="italic text-gold-gradient font-normal">atendimento</span>
              </h2>
              <p className="text-sm sm:text-base text-[#69635D] leading-relaxed">
                Sem cadastros demorados: o contato é direto e personalizado pelo WhatsApp da clínica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Passo 1 */}
              <div className="p-8 rounded-2xl bg-white border border-[#E5DDD3] text-center space-y-4 relative reveal">
                <span className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-[#C5A059] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                  1
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#1C1A18]">
                  Inicie a conversa
                </h3>
                <p className="text-xs sm:text-sm text-[#69635D] leading-relaxed">
                  Clique no botão de WhatsApp aqui no site para iniciar uma conversa diretamente com nossa equipe.
                </p>
              </div>

              {/* Passo 2 */}
              <div className="p-8 rounded-2xl bg-white border border-[#E5DDD3] text-center space-y-4 relative reveal">
                <span className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-[#C5A059] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                  2
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#1C1A18]">
                  Indique seu interesse
                </h3>
                <p className="text-xs sm:text-sm text-[#69635D] leading-relaxed">
                  Informe qual área deseja conhecer: Estética Facial, Corporal ou Ozonioterapia, e tire suas primeiras dúvidas.
                </p>
              </div>

              {/* Passo 3 */}
              <div className="p-8 rounded-2xl bg-white border border-[#E5DDD3] text-center space-y-4 relative reveal">
                <span className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-[#C5A059] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                  3
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#1C1A18]">
                  Combine seu horário
                </h3>
                <p className="text-xs sm:text-sm text-[#69635D] leading-relaxed">
                  Verificamos os horários disponíveis e confirmamos seu atendimento com tranquilidade.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href={WHATSAPP_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex py-3.5 px-8 text-base shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Conversar com a Lumi no WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SEÇÃO 9: PERGUNTAS FREQUENTES (FAQ) ─── */}
        <section id="faq" className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <div className="text-center space-y-4 mb-14 reveal">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Dúvidas Frequentes</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18]">
                Perguntas e{" "}
                <span className="italic text-gold-gradient font-normal">respostas</span>
              </h2>
              <p className="text-sm sm:text-base text-[#69635D] leading-relaxed">
                Respostas diretas e factuais sobre o funcionamento da clínica, localização e atendimentos.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4 reveal">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] px-6 py-1 data-[state=open]:border-[#C5A059]/60 data-[state=open]:bg-white transition-colors"
                >
                  <AccordionTrigger className="font-serif text-lg font-medium text-[#1C1A18] hover:text-[#C5A059] text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#69635D] leading-relaxed pt-2 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── SEÇÃO 10: LOCALIZAÇÃO E CONTATO ─── */}
        <section id="contato" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E5DDD3]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 reveal">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Onde Estamos</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18]">
                Localização e{" "}
                <span className="italic text-gold-gradient font-normal">contato</span>
              </h2>
              <p className="text-sm sm:text-base text-[#69635D] leading-relaxed">
                Fácil localização na Cidade Alta em Cuiabá, com espaço privativo e confortável.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Card de Informações de Contato */}
              <div className="lg:col-span-5 rounded-2xl bg-white border border-[#E5DDD3] p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-8 reveal-left">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#1C1A18]">
                      {CLINIC_NAME}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#C5A059] mt-1 font-medium">
                      Centro de Saúde e Beleza
                    </p>
                  </div>

                  <div className="space-y-4 text-sm text-[#69635D]">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1C1A18] font-medium">Endereço</strong>
                        <span>{ADDRESS_STREET}</span>
                        <br />
                        <span>{ADDRESS_NEIGHBORHOOD}, {ADDRESS_CITY_STATE}</span>
                        <br />
                        <span className="text-xs text-[#69635D]/80">{ADDRESS_CEP}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1C1A18] font-medium">Telefone & WhatsApp</strong>
                        <a href={`tel:${PHONE_RAW}`} className="hover:text-[#C5A059] transition-colors">
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1C1A18] font-medium">Horários de Atendimento</strong>
                        <span>Consulte a disponibilidade de agenda diretamente pelo WhatsApp.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1C1A18] font-medium">Responsabilidade Técnica</strong>
                        <span>{COREN_NUMBER}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-[#E5DDD3]">
                  <a
                    href={WHATSAPP_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full text-center py-3.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Fale com a Lumi pelo WhatsApp</span>
                  </a>

                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold w-full text-center py-3 text-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Abrir no Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Mapa ou Bloco Visual de Localização */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E5DDD3] bg-white shadow-sm min-h-[380px] relative reveal-right">
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

        {/* ─── SEÇÃO 11: CTA FINAL ─── */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-[#1C1A18] to-[#2B2825] text-white relative overflow-hidden">
          {/* Brilho dourado de fundo */}
          <div
            className="absolute -top-24 right-0 w-[450px] h-[450px] bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center space-y-6 relative z-10 reveal">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8D5B0]">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Dedicado a Você</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FAF7F2] leading-tight">
              Reserve um momento para{" "}
              <span className="italic text-gold-gradient font-normal">cuidar de você.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#EFE7DC]/80 max-w-2xl mx-auto leading-relaxed font-light">
              Entre em contato com a Lumi Estética e Saúde para conhecer as opções de atendimento e esclarecer suas dúvidas com tranquilidade.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold py-4 px-9 text-base shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Agendar pelo WhatsApp</span>
              </a>

              <a
                href={`tel:${PHONE_RAW}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FAF7F2]/30 px-7 py-3.5 text-sm font-medium text-[#FAF7F2] hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Ligar: {PHONE_DISPLAY}</span>
              </a>
            </div>

            <p className="text-xs text-[#EFE7DC]/60 pt-4">
              Atendimento na Cidade Alta, Cuiabá – MT · Resposta rápida no WhatsApp
            </p>
          </div>
        </section>
      </main>

      {/* ─── SEÇÃO 12: FOOTER ─── */}
      <Footer />

      {/* Botão Flutuante de WhatsApp */}
      <WhatsAppFloatingButton />
    </div>
  );
}
