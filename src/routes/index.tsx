import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { Transformamos } from "@/components/site/Transformamos";
import { Diferenciais } from "@/components/site/Diferenciais";
import { FormaDeCuidar } from "@/components/site/FormaDeCuidar";
import { Tecnologia } from "@/components/site/Tecnologia";
import { Tratamentos } from "@/components/site/Tratamentos";
import { Equipe } from "@/components/site/Equipe";
import { Resultados } from "@/components/site/Resultados";
import { Depoimentos } from "@/components/site/Depoimentos";
import { Galeria } from "@/components/site/Galeria";
import { CTAFinal } from "@/components/site/CTAFinal";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";

const TITLE = "Dente Sim | Clínica Odontológica em Várzea Grande — MT";
const DESCRIPTION =
  "Odontologia com experiência, tecnologia e atendimento humanizado em Várzea Grande — MT. Agende sua avaliação na Dente Sim.";

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
          name: "Dente Sim",
          telephone: "+55 65 3026-8119",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Ary Paes Barreto, 1830 - Cristo Rei",
            addressLocality: "Várzea Grande",
            addressRegion: "MT",
            postalCode: "78118-090",
            addressCountry: "BR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.4",
            reviewCount: "38",
          },
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
        <Transformamos />
        <Diferenciais />
        <FormaDeCuidar />
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
