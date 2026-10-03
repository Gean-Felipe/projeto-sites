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
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.55fr_0.45fr] lg:gap-20">
          <div>
            <Reveal delay={0}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                <span
                  className="inline-block h-px w-5 bg-gold"
                  aria-hidden="true"
                />
                Resultados
              </span>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
                Transformações reais
                <br />
                que falam por si.
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Cada caso é único e merece atenção individual. Arraste para
                comparar o antes e o depois de tratamentos realizados na
                DenteSim.
              </p>
              <p className="mt-4 text-xs text-muted-foreground/60">
                Resultados individuais podem variar.
              </p>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div
              ref={areaRef}
              className="relative mx-auto max-w-lg touch-none overflow-hidden rounded-2xl border border-border select-none"
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                setFromClientX(e.clientX);
              }}
              onPointerMove={(e) =>
                dragging.current && setFromClientX(e.clientX)
              }
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
            >
              <img
                src={img.profissional}
                alt="Sorriso após tratamento reabilitador na DenteSim"
                className="aspect-[4/5] w-full object-cover"
                width={570}
                height={713}
                loading="lazy"
              />
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${pos}%` }}
                aria-hidden="true"
              >
                <img
                  src={img.cirurgia}
                  alt=""
                  className="aspect-[4/5] h-full w-auto max-w-none object-cover"
                  style={{
                    width: areaRef.current
                      ? `${areaRef.current.clientWidth}px`
                      : "100%",
                  }}
                  loading="lazy"
                />
              </div>

              <span className="absolute top-4 left-4 rounded-md bg-deep/80 px-3 py-1 text-xs font-medium text-deep-foreground">
                Antes
              </span>
              <span className="absolute top-4 right-4 rounded-md bg-primary/85 px-3 py-1 text-xs font-medium text-primary-foreground">
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
                className="pointer-events-none absolute top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-primary shadow-md"
                style={{ left: `${pos}%` }}
                aria-hidden="true"
              >
                <MoveHorizontal className="size-4" />
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
