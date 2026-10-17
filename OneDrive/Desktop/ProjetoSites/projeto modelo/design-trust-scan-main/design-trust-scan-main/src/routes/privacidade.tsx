import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header, PHONE_DISPLAY, WHATSAPP } from "@/components/site";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Dra. Luhara Carvalho" },
      {
        name: "description",
        content:
          "Como o site institucional da Dra. Luhara Carvalho, cirurgiã-dentista em Cuiabá - MT, trata as informações dos visitantes.",
      },
      { property: "og:title", content: "Política de Privacidade — Dra. Luhara Carvalho" },
      {
        property: "og:description",
        content: "Informações sobre privacidade e navegação no site da Dra. Luhara Carvalho.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
        <p className="eyebrow text-accent">Informações legais</p>
        <h1 className="mt-4 text-4xl sm:text-5xl text-navy">Política de Privacidade</h1>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/85">
          <p>
            Este é um site institucional da <strong>Dra. Luhara Carvalho</strong>, cirurgiã-dentista em Cuiabá — MT. Nosso compromisso é respeitar sua privacidade e zelar pela transparência das informações.
          </p>
          <p>
            O site não realiza cadastro obrigatório de usuários, não possui área restrita de login e não armazena diretamente dados bancários ou cadastrais sensíveis através de formulários automáticos.
          </p>
          <p>
            Ao clicar nos botões de contato e agendamento, você é direcionado diretamente para canais oficiais externos como o <strong>WhatsApp</strong>, <strong>Instagram</strong> ou <strong>Google Maps</strong>, serviços que possuem suas próprias políticas e termos de privacidade.
          </p>
          <p>
            O mapa de localização integrado é fornecido pela plataforma Google Maps, sujeito às diretrizes de privacidade do respectivo provedor.
          </p>
          <p>
            Para esclarecer quaisquer dúvidas sobre a privacidade ou agendamento de consultas, você pode entrar em contato diretamente com nossa equipe pelo WhatsApp no número{" "}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              {PHONE_DISPLAY}
            </a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
