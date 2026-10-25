import type { ReactNode } from "react";
import { Page, PageIntro, SectionHead, ClosingCta } from "./Layout";
import { Reveal } from "./Reveal";

export type Topic = { title: string; text: string };

export function TopicPage({
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
  image?: { src: string; alt: string; w: number; h: number; caption: string };
  situationsTitle: string;
  situations: Topic[];
  glossary?: Topic[];
  note: string;
  children?: ReactNode;
}) {
  return (
    <Page>
      <PageIntro label={label} title={title} lead={lead} />
      {image && (
        <figure className="container-ed -mt-8 md:-mt-12 relative z-20">
          <div className="img-frame overflow-hidden rounded-sm border border-border/50 shadow-xl bg-card">
            <img
              src={image.src}
              alt={image.alt}
              width={image.w}
              height={image.h}
              className="aspect-[21/9] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground/80 font-mono tracking-wide">{image.caption}</figcaption>
        </figure>
      )}
      <section className="container-ed py-24 md:py-32">
        <SectionHead label="Situações" title={situationsTitle} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {situations.map((s, i) => (
            <Reveal
              key={s.title}
              delay={(i % 2) * 80}
              className="bg-card p-8 md:p-10 rounded-sm border border-border/60 shadow-xs transition-all duration-300 hover:shadow-md hover:border-sand/50"
            >
              <h3 className="text-2xl font-serif text-foreground">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground text-justify [text-justify:inter-word] w-full">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      {glossary && (
        <section className="border-y bg-card/60">
          <div className="container-ed py-24 md:py-32">
            <SectionHead label="Termos explicados" title="O que significam algumas palavras que aparecem nos processos." />
            <dl className="mt-14 grid gap-8 md:grid-cols-2">
              {glossary.map((g) => (
                <div key={g.title} className="border-t border-border/70 pt-6">
                  <dt className="font-serif text-xl text-foreground font-medium">{g.title}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-muted-foreground text-justify [text-justify:inter-word] w-full">{g.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
      {children}
      <section className="container-ed py-16">
        <div className="mx-auto max-w-3xl border-l-2 border-sand bg-sand/5 p-6 rounded-r-sm">
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground text-justify [text-justify:inter-word] w-full">{note}</p>
        </div>
      </section>
      <ClosingCta />
    </Page>
  );
}
