import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import { Button } from "./ui/button";

/* Lightbox per video (YouTube, caricato solo all'apertura) e foto.
   Usa <dialog>: focus intrappolato, Esc e ripristino del focus sono nativi. */
export function Lightbox({ item, onClose, onPrev, onNext, hasNav }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
  }, [item]);

  const onKeyDown = (e) => {
    if (!hasNav) return;
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  const isVideo = item?.type === "video";

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={item ? `${item.title}` : "Anteprima"}
      className="m-auto max-h-[94svh] w-[min(1180px,94vw)] overflow-hidden rounded-2xl border border-border bg-card p-0 text-foreground backdrop:bg-black/85 open:animate-fade-in"
    >
      {item && (
        <div className="flex flex-col">
          <div className="relative bg-black">
            {isVideo ? (
              <div className="aspect-video w-full">
                <iframe
                  title={item.title}
                  src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="size-full"
                />
              </div>
            ) : (
              <img src={item.image} alt={item.title} className="mx-auto max-h-[72svh] w-auto max-w-full object-contain" />
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
            <div>
              <p className="tag-mono text-primary">{item.kind}</p>
              <h3 className="mt-1 text-xl font-bold sm:text-2xl">{item.title}</h3>
              {item.meta && <p className="tag-mono mt-1 text-muted-foreground">{item.meta}</p>}
            </div>
            <div className="flex items-center gap-2">
              {isVideo && (
                <Button asChild variant="outline" size="sm">
                  <a href={`https://www.youtube.com/watch?v=${item.youtube}`} target="_blank" rel="noopener">
                    Apri su YouTube <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              )}
              {hasNav && (
                <>
                  <Button variant="ghost" size="icon" onClick={onPrev} aria-label="Precedente">
                    <ArrowLeft className="size-5" aria-hidden="true" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onNext} aria-label="Successivo">
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Chiudi">
                <X className="size-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
