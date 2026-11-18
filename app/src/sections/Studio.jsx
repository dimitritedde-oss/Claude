import { ChapterHead, Container, Reveal } from "../components/shared";
import { story, FOUNDERS } from "../content";

/* Capitolo 01: la storia dello studio, dai testi originali di "Chi siamo". */
export default function Studio() {
  return (
    <section id="studio" className="py-28 sm:py-40">
      <Container>
        <ChapterHead n="01" label="Chi siamo" title={story.title} />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <figure className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-border">
                <img
                  src="media/story/corto.webp"
                  alt="Un operatore con la camera su gimbal durante le riprese di un cortometraggio"
                  width="400"
                  height="600"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div aria-hidden="true" className="film-grain" />
                <figcaption className="tag-mono absolute inset-x-5 bottom-5 flex items-center justify-between text-foreground/90">
                  <span>Dal set</span>
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary" aria-hidden="true" /> Cortometraggio
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-foreground/85 sm:text-xl">
              {story.paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 80}>
                  {p}
                </Reveal>
              ))}
            </div>

            <Reveal as="p" className="mt-12 border-l-2 border-primary pl-6 text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
              {story.closing}
            </Reveal>

            <ol className="mt-16 grid gap-0 border-t border-border sm:grid-cols-3">
              {story.timeline.map((t, i) => (
                <Reveal as="li" key={t.when} delay={i * 100} className="border-b border-border py-6 sm:border-r sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                  <p className="tag-mono text-primary">{t.when}</p>
                  <p className="mt-3 text-base font-semibold leading-snug">{t.what}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-14 flex flex-wrap gap-x-10 gap-y-3">
              {FOUNDERS.map((f) => (
                <p key={f.name}>
                  <span className="tag-mono block text-muted-foreground">Fondatore</span>
                  <span className="text-lg font-bold">{f.name}</span>
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
