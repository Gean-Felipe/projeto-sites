import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, PageIntro } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/conteudo")({
  head: () => seo("Conteúdo Jurídico", "Análises jurídicas informativas sobre crédito rural, contratos empresariais, execuções e organização documental."),
  component: Conteudo,
});

const categorias = ["Todos", "Crédito rural", "Contratos empresariais", "Execuções e constrição", "Prevenção"] as const;

// Artigos publicados entram aqui após revisão profissional.
const artigos: { categoria: string; data: string; titulo: string; resumo: string }[] = [];

function Conteudo() {
  const [cat, setCat] = useState<(typeof categorias)[number]>("Todos");
  const lista = artigos.filter((a) => cat === "Todos" || a.categoria === cat);
  return (
    <Page>
      <PageIntro label="Conteúdo jurídico" title="Informação jurídica revisada, organizada por assunto." lead="Textos de caráter informativo, escritos e revisados pela equipe do escritório. Eles não substituem a análise individual de cada caso." />
      <section className="container-ed py-20 md:py-28">
        <div role="group" aria-label="Filtrar por assunto" className="flex flex-wrap gap-2.5 border-b border-border pb-8">
          {categorias.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`min-h-11 rounded-sm border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                cat === c
                  ? "border-olive bg-olive text-on-dark shadow-xs"
                  : "border-input bg-card/60 text-foreground hover:border-coffee hover:bg-card"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {lista.length === 0 ? (
          <div className="py-24 text-center my-6 rounded-sm border border-dashed border-border/80 bg-card/40 p-8">
            <p className="text-4xl font-serif italic text-sand">—</p>
            <p className="mt-4 font-serif text-3xl text-foreground">Os primeiros textos estão em preparação.</p>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
              Os artigos e análises jurídicas serão publicados após revisão profissional e homologação do conselho editorial.
            </p>
          </div>
        ) : (
          <ul>
            {lista.map((a) => (
              <li key={a.titulo} className="grid gap-3 border-b py-10 md:grid-cols-12">
                <p className="eyebrow text-muted-foreground md:col-span-3">{a.categoria} · {a.data}</p>
                <div className="md:col-span-8">
                  <h2 className="text-3xl">{a.titulo}</h2>
                  <p className="mt-3 text-muted-foreground">{a.resumo}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Page>
  );
}
