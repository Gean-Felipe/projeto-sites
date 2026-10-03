import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Reveal } from "./Reveal";
import { img } from "./data";

export function Resultados() {
  const [pos, setPos] = useState(50);
  const areaRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = areaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <section id="resultados" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Resultados
          </p>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Resultados que falam por si.</h2>
          <p className="mt-5 text-base text-muted-foreground">
            Arraste para comparar o antes e o depois de um caso real atendido na Dente Sim.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div
            ref={areaRef}
            className="relative mx-auto max-w-3xl touch-none overflow-hidden rounded-[2rem] border border-border select-none"
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <img
              src={img.casoDepois}
              alt="Sorriso do paciente depois do tratamento reabilitador na Dente Sim"
              className="aspect-[6/5] w-full object-cover"
              width={570}
              height={450}
              loading="lazy"
            />
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${pos}%` }}
              aria-hidden="true"
            >
              <img
                src={img.casoAntes}
                alt=""
                className="aspect-[6/5] h-full w-auto max-w-none object-cover"
                style={{ width: areaRef.current ? `${areaRef.current.clientWidth}px` : "100%" }}
                loading="lazy"
              />
            </div>

            <span className="absolute top-4 left-4 rounded-full bg-deep/85 px-3 py-1 text-xs font-semibold text-deep-foreground">
              Antes
            </span>
            <span className="absolute top-4 right-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
              Depois
            </span>

            <div
              className="absolute inset-y-0 w-0.5 bg-background/90"
              style={{ left: `${pos}%` }}
              aria-hidden="true"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(pos)}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Comparar antes e depois"
              className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
            />
            <span
              className="pointer-events-none absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-primary shadow-lg"
              style={{ left: `${pos}%` }}
              aria-hidden="true"
            >
              <MoveHorizontal className="size-5" />
            </span>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Resultados individuais podem variar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
