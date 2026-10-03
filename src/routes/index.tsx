import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { Sobre } from "@/components/site/Sobre";
import { Diferenciais } from "@/components/site/Diferenciais";
import { Tecnologia } from "@/components/site/Tecnologia";
import { Tratamentos } from "@/components/site/Tratamentos";
import { Equipe } from "@/components/site/Equipe";
import { Resultados } from "@/components/site/Resultados";
import { Depoimentos } from "@/components/site/Depoimentos";
import { Galeria } from "@/components/site/Galeria";
import { CTAFinal } from "@/components/site/CTAFinal";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";

const TITLE = "DenteSim Clínica Odontológica | Cristo Rei e CPA — Cuiabá MT";
const DESCRIPTION =
  "Odontologia com +16 anos de experiência, tecnologia e atendimento humanizado em Cuiabá — MT. Duas unidades: Cristo Rei e CPA. Agende sua avaliação na DenteSim.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: "DenteSim Clínica Odontológica",
          description: DESCRIPTION,
          url: "/",
          sameAs: ["https://www.instagram.com/dentesimadm/"],
          address: [
            {
              "@type": "PostalAddress",
              addressLocality: "Cuiabá",
              addressRegion: "MT",
              addressCountry: "BR",
              description: "Unidade Cristo Rei",
            },
            {
              "@type": "PostalAddress",
              addressLocality: "Cuiabá",
              addressRegion: "MT",
              addressCountry: "BR",
              description: "Unidade CPA",
            },
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+55-65-99333-7878",
              contactType: "customer service",
              areaServed: "BR",
              availableLanguage: "Portuguese",
              description: "Unidade Cristo Rei",
            },
            {
              "@type": "ContactPoint",
              telephone: "+55-65-98457-9420",
              contactType: "customer service",
              areaServed: "BR",
              availableLanguage: "Portuguese",
              description: "Unidade CPA",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Sobre />
        <Diferenciais />
        <Tecnologia />
        <Tratamentos />
        <Equipe />
        <Resultados />
        <Depoimentos />
        <Galeria />
        <CTAFinal />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
