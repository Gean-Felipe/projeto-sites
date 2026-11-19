import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero, meta } from "@/components/site/PageHero";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/galeria")({
  head: () => meta("Galeria — ONG CES-MT", "Registros das ações sociais, oficinas e eventos comunitários da ONG Cristo é o Salvador."),
  component: Galeria,
});

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  fallbackUrl: string;
}

// Carregamento automático de todas as imagens em src/assets/images/galeria/
const imageModules = import.meta.glob(
  "../assets/images/galeria/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

function formatTitleFromFilename(path: string): string {
  const filename = path.split("/").pop() || "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const formatted = nameWithoutExt.replace(/[-_]+/g, " ").trim();
  return formatted ? formatted.charAt(0).toUpperCase() + formatted.slice(1) : "Registro da Ação";
}

function resolveImageUrl(mod: unknown, filename: string): string {
  if (typeof mod === "string") return mod;
  if (mod && typeof mod === "object") {
    const record = mod as Record<string, unknown>;
    if (typeof record["default"] === "string") return record["default"];
    if (typeof record["default"] === "function") return String(record["default"]());
  }
  return `/images/galeria/${filename}`;
}

const sortedPaths = Object.keys(imageModules).sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
);

const ITEMS: GalleryItem[] = sortedPaths.map((path, index) => {
  const filename = path.split("/").pop() || "";
  const mod = imageModules[path];
  const imageUrl = resolveImageUrl(mod, filename);
  const fallbackUrl = `/images/galeria/${filename}`;

  return {
    id: index + 1,
    title: formatTitleFromFilename(path),
    imageUrl,
    fallbackUrl,
  };
});

function Galeria() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % ITEMS.length));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + ITEMS.length) % ITEMS.length));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex]);

  const activeItem = selectedIndex !== null ? (ITEMS[selectedIndex] ?? null) : null;

  return (
    <>
      <PageHero eyebrow="Galeria" title="Registros de quem faz acontecer.">
        As fotos oficiais das ações serão publicadas aqui.
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, idx) => (
            <figure key={item.id}>
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Ampliar imagem: ${item.title}`}
                className="group relative block w-full aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== item.fallbackUrl && !target.src.endsWith(item.fallbackUrl)) {
                      target.src = item.fallbackUrl;
                    }
                  }}
                />
              </button>
              <figcaption className="mt-3">
                <p className="font-semibold text-navy">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
          <DialogContent className="max-w-4xl border-border bg-card p-4 sm:p-6">
            {activeItem && selectedIndex !== null && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 pr-8">
                  <div>
                    <DialogTitle className="text-lg font-semibold text-navy">
                      {activeItem.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs font-bold uppercase tracking-widest text-cta">
                      Foto {selectedIndex + 1} de {ITEMS.length}
                    </DialogDescription>
                  </div>
                </div>
                <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-surface">
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    className="max-h-[70vh] w-auto object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== activeItem.fallbackUrl && !target.src.endsWith(activeItem.fallbackUrl)) {
                        target.src = activeItem.fallbackUrl;
                      }
                    }}
                  />
                  {ITEMS.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelectedIndex((selectedIndex - 1 + ITEMS.length) % ITEMS.length)}
                        aria-label="Foto anterior"
                        className="absolute left-3 grid h-10 w-10 place-items-center rounded-full bg-navy/85 text-primary-foreground transition-colors hover:bg-cta cursor-pointer"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedIndex((selectedIndex + 1) % ITEMS.length)}
                        aria-label="Próxima foto"
                        className="absolute right-3 grid h-10 w-10 place-items-center rounded-full bg-navy/85 text-primary-foreground transition-colors hover:bg-cta cursor-pointer"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}
