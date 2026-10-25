import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Page, PageIntro } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contato")({
  head: () => seo("Contato", "Solicite um contato inicial com o Dr. Resolve. Informe apenas seu nome, um canal de retorno e, se quiser, uma descrição breve."),
  component: Contato,
});

type Errors = Partial<Record<"nome" | "retorno", string>>;

function Contato() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "pending">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") || "").trim();
    const retorno = String(f.get("retorno") || "").trim();
    const next: Errors = {};
    if (nome.length < 2) next.nome = "Informe seu nome.";
    if (retorno.length < 6) next.retorno = "Informe um telefone ou e-mail para retorno.";
    setErrors(next);
    if (Object.keys(next).length === 0) setStatus("pending");
  }

  const field =
    "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3.5 text-base text-foreground transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-coffee focus:outline-none focus:ring-2 focus:ring-coffee/20";

  return (
    <Page>
      <PageIntro

        label="Contato"
        title="Conte-nos, em poucas palavras, do que se trata."
        lead="Pedimos apenas o necessário para retornar o contato com segurança. Documentos e detalhes sensíveis do caso serão tratados depois, por canal reservado."
      />
      <section className="container-ed grid gap-16 py-20 md:grid-cols-12 md:py-28">
        <form noValidate onSubmit={onSubmit} className="md:col-span-7" aria-describedby="aviso-form">
          <div className="space-y-8">
            <div>
              <label htmlFor="nome" className="text-sm font-medium text-foreground">
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                autoComplete="name"
                placeholder="Ex: João da Silva"
                className={field}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "e-nome" : undefined}
              />
              {errors.nome && <p id="e-nome" className="mt-2 text-sm text-destructive">{errors.nome}</p>}
            </div>
            <div>
              <label htmlFor="retorno" className="text-sm font-medium text-foreground">
                Telefone ou e-mail para retorno
              </label>
              <input
                id="retorno"
                name="retorno"
                placeholder="Ex: (11) 98765-4321 ou contato@empresa.com"
                className={field}
                aria-invalid={!!errors.retorno}
                aria-describedby={errors.retorno ? "e-retorno" : undefined}
              />
              {errors.retorno && <p id="e-retorno" className="mt-2 text-sm text-destructive">{errors.retorno}</p>}
            </div>
            <div>
              <label htmlFor="descricao" className="text-sm font-medium text-foreground">
                Descrição breve <span className="font-normal text-muted-foreground">(opcional)</span>
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={4}
                maxLength={500}
                placeholder="Conte de forma resumida o contexto da sua dúvida ou necessidade..."
                className={field}
              />
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Por sigilo e segurança jurídica, não inclua números de processo, senhas, dados bancários ou documentos anexos.
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 min-h-12 rounded-sm bg-olive px-8 text-sm font-medium text-on-dark transition-all duration-200 hover:bg-coffee hover:shadow-md focus-visible:outline-2 focus-visible:outline-coffee"
          >
            Enviar solicitação
          </button>
          <div aria-live="polite">
            {status === "pending" && (
              <div className="mt-6 border-l-4 border-sand bg-card p-5 text-sm rounded-r-sm shadow-xs">
                <p className="font-medium text-foreground">Formulário demonstrativo de atendimento</p>
                <p className="mt-1 text-muted-foreground">
                  O canal de recebimento direto ainda está em fase de homologação pelo escritório. <strong>Nenhum dado pessoal foi transmitido externamente</strong>. O envio entrará em produção assim que os canais corporativos forem validados.
                </p>
              </div>
            )}
          </div>
        </form>
        <aside className="space-y-10 md:col-span-5 lg:col-span-4 lg:col-start-9" id="aviso-form">
          <div className="border-t border-border pt-6">
            <p className="eyebrow text-coffee">Importante</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              O envio da solicitação não estabelece relação advogado-cliente e não garante contratação prévia ou resultado específico.
            </p>
          </div>
          <div className="border-t border-border pt-6">
            <p className="eyebrow text-coffee">Canais institucionais</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center justify-between">
                <span>WhatsApp corporativo:</span>
                <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-mono font-medium tracking-wide bg-sand/15 text-coffee border border-sand/30">A confirmar</span>
              </li>
              <li className="flex items-center justify-between">
                <span>E-mail institucional:</span>
                <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-mono font-medium tracking-wide bg-sand/15 text-coffee border border-sand/30">A confirmar</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Atendimento presencial:</span>
                <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-mono font-medium tracking-wide bg-sand/15 text-coffee border border-sand/30">A confirmar</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </Page>
  );
}
