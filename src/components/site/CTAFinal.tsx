import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { clinica, unidades } from "./data";

export function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-24">
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
        <Reveal>
          <span className="text-xs font-semibold tracking-widest text-amber-300 uppercase">
            Agendamento Simples e Rápido
          </span>
          <h2 className="mt-3 font-serif text-3xl font-normal text-primary-foreground sm:text-4xl lg:text-5xl">
            Seu novo sorriso começa com uma conversa.
          </h2>
          <p className="mt-5 text-base text-primary-foreground/85 sm:text-lg">
            Escolha a unidade mais próxima de você e agende sua avaliação diretamente pelo WhatsApp com a equipe da {clinica.nome}.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            {unidades.map((u) => (
              <Button
                key={u.nome}
                asChild
                size="lg"
                className="h-13 rounded-xl bg-amber-500 px-7 font-medium text-slate-950 shadow-lg transition-all hover:bg-amber-400 hover:scale-[1.02]"
              >
                <a href={u.whatsappLink} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 size-5 fill-slate-950 text-amber-500" aria-hidden="true" />
                  Agendar na Unidade {u.nome}
                </a>
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
