import type { ReactNode } from "react";
import { Page, SectionHead, ClosingCta } from "./Layout";
import { Reveal } from "./Reveal";

export type Topic = { title: string; text: string };

export type EditorialImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption: string;
  aspectClass?: string;
  maxHClass?: string;
  objectPosition?: string;
};

export function EditorialTopicPage({
  label,
  title,
  lead,
  image,
  situationsTitle,
  situations,
  glossary,
  note,
  children,
}: {
  label: string;
  title: ReactNode;
  lead: string;
  image?: EditorialImage;
  situationsTitle: string;
  situations: Topic[];
  glossary?: Topic[];
  note: string;
  children?: ReactNode;
}) {
  return (
    <Page>
      {/* Seção Principal Hero: Editorial Split (Texto à esquerda, Imagem à direita) */}
      <section className="border-b border-line-dark/60 bg-olive pt-32 pb-16 text-on-dark md:pt-40 md:pb-24">
        <div className="container-ed">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 xl:gap-14">
            {/* Coluna de Conteúdo Textual (Esquerda) */}
            <div className="flex flex-col justify-center lg:col-span-7 xl:col-span-7">
              <div className="mb-4">
                <p className="eyebrow text-sand">{label}</p>
              </div>

              <h1 className="mb-6 text-left font-serif text-[clamp(2.1rem,3.8vw,3.6rem)] font-normal leading-[1.12] tracking-tight text-on-dark text-balance">
                {title}
              </h1>

              <p className="w-full font-sans text-base leading-relaxed text-on-dark-muted sm:text-lg lg:text-[1.125rem] text-justify [text-justify:inter-word]">
                {lead}
              </p>
            </div>

            {/* Coluna da Imagem Principal (Direita) */}
            {image && (
              <div className="flex flex-col items-center lg:col-span-5 lg:items-end xl:col-span-5">
                <figure className="w-full max-w-lg lg:max-w-none">
                  <div className="img-frame overflow-hidden rounded-sm border border-line-dark/70 bg-graphite/40 p-1.5 shadow-2xl backdrop-blur-xs md:p-2">
                    <div className="overflow-hidden rounded-[1px]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.w}
                        height={image.h}
                        loading="eager"
                        className={`${image.aspectClass || "aspect-[4/3]"} ${
                          image.maxHClass || "max-h-[380px] lg:max-h-[420px]"
                        } w-full object-cover ${
                          image.objectPosition || "object-center"
                        } transition-transform duration-700 hover:scale-[1.02]`}
                      />
                    </div>
                  </div>
                  <figcaption className="mt-2.5 px-1 font-sans text-xs tracking-wide text-on-dark-muted/75">
                    {image.caption}
                  </figcaption>
                </figure>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seção: Situações frequentes */}
      <section className="container-ed py-20 md:py-28 lg:py-32">
        <SectionHead label="Situações" title={situationsTitle} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16">
          {situations.map((s, i) => (
            <Reveal
              key={s.title}
              delay={(i % 2) * 80}
              className="group flex flex-col justify-start rounded-sm border border-border/70 bg-card p-7 shadow-xs transition-all duration-300 hover:border-sand/60 hover:shadow-md md:p-9"
            >
              <h3 className="text-left font-serif text-xl font-normal leading-snug text-foreground md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground md:text-base text-justify [text-justify:inter-word] w-full">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Seção: Glossário (se fornecido) */}
      {glossary && (
        <section className="border-y border-border/70 bg-card/60">
          <div className="container-ed py-20 md:py-28">
            <SectionHead
              label="Termos explicados"
              title="O que significam algumas palavras que aparecem nos processos."
            />
            <dl className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2">
              {glossary.map((g) => (
                <div key={g.title} className="border-t border-border/70 pt-6">
                  <dt className="text-left font-serif text-xl font-medium tracking-tight text-foreground">
                    {g.title}
                  </dt>
                  <dd className="mt-2.5 font-sans text-sm leading-relaxed text-muted-foreground md:text-base text-justify [text-justify:inter-word] w-full">
                    {g.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {children}

      {/* Seção: Nota Legal e Limitações */}
      <section className="container-ed py-14 md:py-16">
        <div className="mx-auto max-w-4xl rounded-r-sm border-l-2 border-sand bg-sand/10 p-6 shadow-xs md:p-8">
          <p className="font-sans text-sm leading-relaxed text-foreground/85 md:text-base text-justify [text-justify:inter-word] w-full">
            {note}
          </p>
        </div>
      </section>

      {/* Chamada para contato final */}
      <ClosingCta />
    </Page>
  );
}
