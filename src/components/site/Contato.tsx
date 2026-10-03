import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { clinica, unidades } from "./data";

export function Contato() {
  return (
    <section id="unidades" className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
            Nossas Unidades
          </span>
          <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            Encontre a unidade mais perto de você.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A {clinica.nome} conta com duas unidades em Cuiabá — MT, com estrutura completa e equipe pronta para atendê-lo.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {unidades.map((u, i) => (
            <Reveal
              key={u.nome}
              delay={i * 120}
              className="flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm"
            >
              {/* Cabeçalho da unidade */}
              <div className="flex items-center justify-between border-b border-border/60 bg-primary/5 px-8 py-5">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
                    Unidade
                  </p>
                  <h3 className="font-serif text-2xl font-normal text-foreground">{u.nome}</h3>
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="size-5" aria-hidden="true" />
                </div>
              </div>

              {/* Informações */}
              <div className="flex flex-1 flex-col justify-between p-8">
                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      <strong className="block font-medium text-foreground">Bairro {u.bairro}</strong>
                      {u.cidade} — {u.estado}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      <strong className="block font-medium text-foreground">WhatsApp</strong>
                      {u.whatsapp}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Instagram className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      <strong className="block font-medium text-foreground">Instagram</strong>
                      <a
                        href={clinica.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {clinica.instagramHandle}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="mt-8 border-t border-border/50 pt-6">
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-xl bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <a href={u.whatsappLink} target="_blank" rel="noreferrer">
                      <MessageCircle className="mr-2 size-5" aria-hidden="true" />
                      Agendar via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bloco de horário */}
        <Reveal delay={300} className="mt-8 rounded-3xl border border-border/60 bg-card p-8">
          <div className="grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-border/60">
            <div>
              <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Segunda a Sexta</p>
              <p className="mt-2 font-serif text-xl text-foreground">08:00 – 11:00</p>
              <p className="font-serif text-xl text-foreground">13:00 – 18:00</p>
            </div>
            <div className="sm:pl-6">
              <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Sábado</p>
              <p className="mt-2 font-serif text-xl text-foreground">08:00 – 12:00</p>
            </div>
            <div className="sm:pl-6">
              <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase">Atendimento Humanizado</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Equipe preparada para atender com respeito, clareza e cuidado em todas as etapas do seu tratamento.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
