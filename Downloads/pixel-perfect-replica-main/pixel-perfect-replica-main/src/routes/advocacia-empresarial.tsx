import { createFileRoute } from "@tanstack/react-router";
import { EditorialTopicPage } from "@/components/site/EditorialTopicPage";
import { seo } from "@/lib/seo";
import img from "@/assets/empresarial.jpg";

export const Route = createFileRoute("/advocacia-empresarial")({
  head: () =>
    seo(
      "Advocacia Empresarial",
      "Assessoria jurídica para empresários e gestores de PMEs: contratos, passivos, execuções fiscais, demandas trabalhistas e relações bancárias."
    ),
  component: () => (
    <EditorialTopicPage

      label="Advocacia empresarial"
      title={
        <>
          Clareza jurídica para decisões de{" "}
          <em className="text-sand">negócio.</em>
        </>
      }
      lead="Para empresários e gestores que precisam entender os riscos jurídicos da empresa e organizar respostas proporcionais a eles."
      image={{
        src: img,
        alt: "Fachada de arquitetura corporativa em concreto e madeira",
        w: 1200,
        h: 1408,
        caption: "Imagem ilustrativa.",
        aspectClass: "aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/4.8]",
        maxHClass: "max-h-[340px] sm:max-h-[380px] lg:max-h-[420px] xl:max-h-[440px]",
        objectPosition: "object-center",
      }}
      situationsTitle="Questões que costumam chegar até nós."
      situations={[
        {
          title: "Contratos empresariais",
          text: "Elaboração, revisão e análise de contratos com fornecedores, clientes e parceiros, com atenção a cláusulas de risco.",
        },
        {
          title: "Passivos e organização jurídica",
          text: "Levantamento e leitura dos passivos existentes, para que a empresa saiba com o que está lidando.",
        },
        {
          title: "Execuções fiscais",
          text: "Análise de cobranças fiscais em andamento e das defesas cabíveis em cada caso.",
        },
        {
          title: "Demandas trabalhistas",
          text: "Acompanhamento de reclamações e orientação preventiva sobre relações de trabalho.",
        },
        {
          title: "Relações bancárias",
          text: "Avaliação de contratos de financiamento, renegociações e cobranças envolvendo instituições financeiras.",
        },
        {
          title: "Assessoria preventiva",
          text: "Orientação contínua para reduzir riscos antes que se transformem em litígio.",
        },
      ]}
      note="Cada empresa tem uma realidade própria. A atuação é definida após a análise dos documentos e não envolve promessa de resultado."
    />
  ),
});
