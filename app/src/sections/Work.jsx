import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import data from "../data/portfolio.json";
import { categories, selectedTitles } from "../content";
import { ChapterHead, Container } from "../components/shared";
import { Lightbox } from "../components/Lightbox";
import { cn } from "../lib/utils";

const CAT_LABEL = Object.fromEntries(categories.map((c) => [c.id, c.label]));
// the original titles are mixed case ("wati", "birra baladin"): capitalise only the all-lowercase ones
const nice = (t) => (t === t.toLowerCase() ? t.replace(/\b\p{L}/gu, (c) => c.toUpperCase()) : t);

const videoItem = (v) => ({
  type: "video",
  title: nice(v.title),
  youtube: v.youtube,
  image: v.image,
  kind: CAT_LABEL[v.category] ?? v.category,
  meta: `${v.format} · ${v.use}`,
});
const photoItem = (p) => ({ type: "photo", title: p.title, image: p.image, kind: "Photography", meta: "by Janthima Verri" });

function VideoCard({ v, onOpen, big, delay = 0 }) {
  const it = videoItem(v);
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="Play"
      aria-label={`Guarda ${it.title}`}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "group relative block w-full animate-fade-up overflow-hidden rounded-xl bg-card text-left ring-1 ring-border transition-shadow duration-300 hover:ring-primary",
        big ? "aspect-[4/3]" : "aspect-video"
      )}
    >
      <img
        src={v.image}
        alt=""
        width={v.w}
        height={v.h}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.06]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 ease-out-soft group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      >
        <Play className="size-6 fill-current" />
      </span>
      <span aria-hidden="true" className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background/70 backdrop-blur">
        <Play className="size-4 fill-current" />
      </span>
      <span className="absolute inset-x-4 bottom-4 block">
        <span className="tag-mono block text-primary">{it.kind}</span>
        <span className={cn("mt-1 block font-bold tracking-tight", big ? "text-2xl sm:text-3xl" : "text-lg")}>{it.title}</span>
        <span className="tag-mono mt-1 block text-foreground/60">{it.meta}</span>
      </span>
    </button>
  );
}

export default function Work({ filter, setFilter }) {
  const [lb, setLb] = useState(null); // { list, index }

  const selected = useMemo(
    () => selectedTitles.map((t) => data.videos.find((v) => v.title.toLowerCase() === t.toLowerCase())).filter(Boolean),
    []
  );
  const counts = useMemo(() => {
    const c = { all: data.videos.length + data.photos.length, photography: data.photos.length };
    data.videos.forEach((v) => (c[v.category] = (c[v.category] ?? 0) + 1));
    return c;
  }, []);

  const videos = filter === "all" ? data.videos : data.videos.filter((v) => v.category === filter);
  const showPhotos = filter === "all" || filter === "photography";
  const filters = [{ id: "all", label: "Tutti" }, ...categories];

  const open = (list, index) => setLb({ list, index });
  const step = (d) => setLb((s) => (s ? { ...s, index: (s.index + d + s.list.length) % s.list.length } : s));
  const current = lb ? lb.list[lb.index] : null;

  return (
    <section id="lavori" className="border-t border-border py-28 sm:py-40">
      <Container>
        <ChapterHead n="02" label="Lavori selezionati" title="Storie che hanno un obiettivo.">
          <p className="mt-6 max-w-[560px] text-lg text-muted-foreground">
            Una selezione dei progetti più recenti, poi il portfolio completo: {data.videos.length} video e{" "}
            {data.photos.length} fotografie.
          </p>
        </ChapterHead>

        {/* selezione della home */}
        <ul className="grid gap-4 md:grid-cols-3">
          {selected.map((v, i) => (
            <li key={v.image}>
              <VideoCard
                v={v}
                big
                delay={i * 90}
                onOpen={() => open(selected.map(videoItem), i)}
              />
            </li>
          ))}
        </ul>

        {/* portfolio completo */}
        <div id="portfolio" className="mt-24 sm:mt-32">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-2xl font-extrabold sm:text-3xl">Portfolio completo</h3>
            <div role="group" aria-label="Filtra per categoria" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "tag-mono inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors duration-200",
                    filter === f.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground/80 hover:border-foreground/60"
                  )}
                >
                  {f.label}
                  <span className={filter === f.id ? "opacity-70" : "text-muted-foreground"}>{counts[f.id] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          {videos.length > 0 && (
            <ul key={`v-${filter}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v, i) => (
                <li key={v.image}>
                  <VideoCard v={v} delay={Math.min(i, 8) * 40} onOpen={() => open(videos.map(videoItem), i)} />
                </li>
              ))}
            </ul>
          )}

          {showPhotos && (
            <div key={`p-${filter}`} className={cn(videos.length > 0 && "mt-20")}>
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <h3 className="text-xl font-extrabold sm:text-2xl">Fotografia</h3>
                <p className="tag-mono text-muted-foreground">by Janthima Verri</p>
              </div>
              <ul className="columns-2 gap-3 md:columns-3 lg:columns-4">
                {data.photos.map((p, i) => (
                  <li key={p.image} className="mb-3 break-inside-avoid">
                    <button
                      type="button"
                      onClick={() => open(data.photos.map(photoItem), i)}
                      data-cursor="Vedi"
                      aria-label={`Apri la foto ${p.title}`}
                      className="group relative block w-full overflow-hidden rounded-lg bg-card ring-1 ring-border hover:ring-primary"
                    >
                      <img
                        src={p.image}
                        alt={`${p.title}, fotografia di Janthima Verri`}
                        width={p.w}
                        height={p.h}
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                      />
                      <span className="tag-mono absolute inset-x-3 bottom-3 translate-y-2 text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        {p.title}
                      </span>
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>

      <Lightbox item={current} onClose={() => setLb(null)} onPrev={() => step(-1)} onNext={() => step(1)} hasNav={!!lb && lb.list.length > 1} />
    </section>
  );
}
