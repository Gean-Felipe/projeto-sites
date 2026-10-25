import { createFileRoute } from "@tanstack/react-router";
import { EditorialTopicPage } from "@/components/site/EditorialTopicPage";
import { seo } from "@/lib/seo";
import img from "@/assets/rural-silos.jpg";

export const Route = createFileRoute("/direito-rural")({
  head: () =>
    seo(
      "Direito Rural e Crédito Rural",
      "Orientação jurídica para produtores rurais sobre crédito rural, contratos, execuções e questões patrimoniais, em linguagem clara."
    ),
  component: () => (
    <EditorialTopicPage

      label="Direito rural e crédito rural"
      title={
        <>
          Quem produz precisa entender os{" "}
          <em className="text-sand">contratos</em> que assina.
        </>
      }
      lead="Atendemos produtores rurais em questões ligadas ao crédito, aos contratos e às execuções que podem afetar a terra, o maquinário e a continuidade da safra."
      image={{
        src: img,
        alt: "Silos de grãos e galpão de armazenagem em propriedade rural",
        w: 1408,
        h: 1008,
        caption: "Imagem ilustrativa.",
        aspectClass: "aspect-[4/3] md:aspect-[16/11] lg:aspect-[4/3]",
        maxHClass: "max-h-[320px] sm:max-h-[360px] lg:max-h-[390px] xl:max-h-[410px]",
        objectPosition: "object-[center_55%]",
      }}
      situationsTitle="Temas frequentes na atividade rural."
      situations={[
        {
          title: "Crédito rural",
          text: "Análise de financiamentos de custeio, investimento e comercialização, e das condições previstas em lei para esse tipo de crédito.",
        },
        {
          title: "Contratos rurais",
          text: "Leitura de arrendamentos, parcerias e contratos de compra e venda de safra.",
        },
        {
          title: "Renegociação e alongamento",
          text: "Avaliação da possibilidade jurídica de rever prazos e condições diante de perdas na produção.",
        },
        {
          title: "Execuções",
          text: "Orientação quando há cobrança judicial de dívidas e risco de penhora de bens ligados à produção.",
        },
      ]}
      glossary={[
        {
          title: "Cédula de crédito rural",
          text: "Documento usado pelo banco para formalizar o financiamento. Nele constam valores, prazos, juros e garantias.",
        },
        {
          title: "Alongamento",
          text: "Extensão do prazo de pagamento de uma dívida rural, em situações previstas nas normas do crédito rural.",
        },
        {
          title: "Execução",
          text: "Processo em que o credor cobra judicialmente uma dívida representada por um título, como a cédula.",
        },
        {
          title: "Penhora",
          text: "Ato do juiz que reserva um bem do devedor para garantir o pagamento da dívida cobrada.",
        },
      ]}
      note="As informações desta página são gerais. Cada contrato e cada processo precisam ser analisados individualmente antes de qualquer orientação."
    />
  ),
});
