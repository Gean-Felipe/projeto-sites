import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Arc } from "./Arc";
import { Reveal } from "./Reveal";
import { clinica } from "./data";

export function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-24">
      <Arc
        className="absolute -bottom-10 left-1/2 h-40 w-[130%] -translate-x-1/2 text-primary-foreground/20"
        width={2}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
            Seu novo sorriso pode começar hoje.
          </h2>
          <p className="mt-5 text-base text-primary-foreground/85 sm:text-lg">
            Agende uma avaliação na Dente Sim e descubra o cuidado que o seu sorriso merece.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-background px-7 text-base text-primary hover:bg-ice"
            >
              <a href={clinica.telefoneLink}>
                <Phone className="mr-1 size-4" aria-hidden="true" /> {clinica.telefone}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-primary-foreground/40 bg-transparent px-7 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="#contato">
                Ver localização <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
