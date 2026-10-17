import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <div className="max-w-md text-center p-8 rounded-2xl bg-white border border-[#E5DDD3] shadow-sm">
        <span className="font-serif text-6xl font-light text-[#C5A059]">404</span>
        <h1 className="mt-4 font-serif text-2xl font-semibold text-[#1C1A18]">
          Página não encontrada
        </h1>
        <p className="mt-2 text-sm text-[#69635D] leading-relaxed">
          O endereço que você tentou acessar não existe ou foi modificado.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="btn-gold inline-flex text-sm"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error("Erro capturado:", error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
      <div className="max-w-md text-center p-8 rounded-2xl bg-white border border-[#E5DDD3] shadow-sm">
        <h1 className="font-serif text-2xl font-semibold text-[#1C1A18]">
          Não foi possível carregar a página
        </h1>
        <p className="mt-2 text-sm text-[#69635D] leading-relaxed">
          Ocorreu uma instabilidade momentânea. Você pode tentar recarregar ou voltar para a página inicial.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gold text-sm"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="btn-outline-gold text-sm"
          >
            Página inicial
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Lumi Estética e Saúde" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAF7F2" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#FAF7F2] text-[#1C1A18] antialiased selection:bg-[#C5A059]/20 selection:text-[#1C1A18]">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
