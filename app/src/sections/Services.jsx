import { ArrowUpRight } from "lucide-react";
import data from "../data/portfolio.json";
import { categories } from "../content";
import { ChapterHead, Container, Reveal } from "../components/shared";

/* Capitolo 03: i servizi sono le sei categorie del portfolio originale. */
export default function Services({ setFilter }) {
  const count = (id) =>
    id === "photography" ? data.photos.length : data.videos.filter((v) => v.category === id).length;

  return (
    <section id="servizi" className="py-28 sm:py-40">
      <Container>
        <ChapterHead n="03" label="Servizi" title="Scegli il contenuto che ti serve. Lo costruiamo su misura." />

        <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 3) * 80} className="border-r border-b border-border">
              <a
                href="#portfolio"
                onClick={() => setFilter(c.id)}
                data-cursor="Vedi"
                className="group relative flex h-full min-h-[280px] flex-col justify-between gap-10 p-7 transition-colors duration-300 hover:bg-secondary sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="tag-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="size-6 text-muted-foreground transition-all duration-300 ease-out-soft group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{c.label}</h3>
                  <p className="mt-3 text-muted-foreground">{c.line}</p>
                  <p className="tag-mono mt-5 text-foreground/70">
                    {count(c.id)} {c.id === "photography" ? "fotografie" : count(c.id) === 1 ? "progetto" : "progetti"}
                  </p>
                </div>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out-soft group-hover:scale-x-100" />
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
