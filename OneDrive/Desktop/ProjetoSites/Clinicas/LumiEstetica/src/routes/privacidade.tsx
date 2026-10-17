import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header, CLINIC_NAME, PHONE_DISPLAY, WHATSAPP_MAIN } from "@/components/site";
import { ShieldCheck, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: `Política de Privacidade — ${CLINIC_NAME}` },
      {
        name: "description",
        content: `Como a ${CLINIC_NAME} trata as informações e a privacidade dos visitantes em seu site institucional.`,
      },
      { property: "og:title", content: `Política de Privacidade — ${CLINIC_NAME}` },
      {
        property: "og:description",
        content: "Informações sobre privacidade e navegação no site da clínica.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] text-[#1C1A18]">
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacidade & Transparência</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1C1A18] mb-8">
          Política de Privacidade
        </h1>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#69635D] bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DDD3] shadow-sm">
          <p>
            A <strong>{CLINIC_NAME}</strong> preza pela transparência, privacidade e proteção dos dados de todos os visitantes que acessam nosso site institucional.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1C1A18] pt-2">
            1. Coleta de Informações
          </h2>
          <p>
            Este site tem caráter estritamente institucional e informativo. Não coletamos nem armazenamos informações financeiras, senhas ou dados sensíveis através de formulários neste domínio.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1C1A18] pt-2">
            2. Canais Externos de Atendimento
          </h2>
          <p>
            Ao utilizar os links de atendimento, você será direcionado para serviços de terceiros, como o WhatsApp e o Google Maps, que possuem políticas de privacidade e termos de uso próprios. Recomendamos consultar os termos desses respectivos provedores.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1C1A18] pt-2">
            3. Cookies e Navegação
          </h2>
          <p>
            Podem ser utilizados cookies técnicos essenciais apenas para garantir o correto funcionamento da navegação, responsividade e preferências de acessibilidade.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1C1A18] pt-2">
            4. Dúvidas e Contato
          </h2>
          <p>
            Para quaisquer esclarecimentos relacionados à privacidade ou para agendar seu atendimento, entre em contato diretamente pelo telefone/WhatsApp <strong>{PHONE_DISPLAY}</strong>.
          </p>

          <div className="pt-4">
            <a
              href={WHATSAPP_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar com a equipe no WhatsApp</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
