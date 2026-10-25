import { createFileRoute } from "@tanstack/react-router";
import { Page, PageIntro, SectionHead, ClosingCta } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/lib/seo";
import documentos from "@/assets/documentos.jpg";

export const Route = createFileRoute("/metodologia")({
  head: () => seo("Metodologia de Atendimento", "Como funciona a análise inicial: entrevista minuciosa, leitura dos documentos e explicação franca sobre a viabilidade jurídica de cada demanda."),
  component: Metodologia,
});

const steps = [
  { t: "Solicitação de contato", d: "Você informa um canal de retorno e, se quiser, uma descrição breve da situação. Não é preciso enviar documentos nesse momento." },
  { t: "Organização das informações", d: "Indicamos quais documentos podem ser relevantes para entender o caso, como contratos, cédulas, notificações e peças processuais." },
  { t: "Entrevista minuciosa", d: "Um advogado responsável conversa com você para entender os fatos em detalhe — o que aconteceu, quando e em que contexto." },
  { t: "Análise de viabilidade", d: "Explicamos, com franqueza, se existe fundamento jurídico, quais riscos estão envolvidos e quais caminhos são possíveis." },
  { t: "Escopo e decisão", d: "Se houver fundamento para prosseguir, definimos o escopo do trabalho. Se não houver, dizemos isso com clareza." },
];

function Metodologia() {
  return (
    <Page>
      <PageIntro label="Metodologia" title={<>Franqueza técnica antes de qualquer <em className="text-sand">promessa.</em></>} lead="Não prometemos resultados e nem toda demanda será aceita. O que oferecemos é uma análise séria dos fatos e uma explicação honesta sobre o que é possível." />
      <section className="container-ed py-24 md:py-32">
        <SectionHead label="Etapas" title="O que esperar da avaliação." />
        <ol className="mt-14">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.t} className="grid gap-4 border-t py-10 md:grid-cols-12">
              <h3 className="text-2xl md:col-span-5">{s.t}</h3>
              <p className="text-muted-foreground md:col-span-7">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="bg-coffee text-on-dark">
        <div className="container-ed grid gap-12 py-24 md:grid-cols-12 md:items-center">
          <div className="img-frame overflow-hidden rounded-sm border border-line-dark shadow-xl md:col-span-6">
            <img
              src={documentos}
              alt="Documentos organizados sobre uma mesa"
              width={1408}
              height={1008}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-sand">Por que os documentos importam</p>
            <p className="mt-6 font-serif text-3xl leading-snug">
              A mesma situação pode ter respostas diferentes conforme o que está escrito em cada contrato e em cada processo.
            </p>
            <p className="mt-6 text-on-dark-muted leading-relaxed">
              Por isso, a orientação só é dada depois da leitura dos documentos. Para sua segurança, eles são solicitados por canal reservado — nunca por formulário público.
            </p>
          </div>
        </div>
      </section>
      <ClosingCta />
    </Page>
  );
}
