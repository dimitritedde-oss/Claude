import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Container, Reveal } from "../components/shared";
import { contact } from "../content";

/* Fascia di conversione tra servizi e contatti, con il testo originale del sito. */
export default function Cta() {
  return (
    <section aria-labelledby="cta-title" className="pb-28 sm:pb-40">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-secondary p-8 sm:p-14 lg:p-20">
          <div aria-hidden="true" className="film-grain" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/25 blur-3xl" />
          <p className="tag-mono relative text-primary">{contact.eyebrow}</p>
          <h2 id="cta-title" className="relative mt-5 max-w-[16ch] text-[clamp(2.4rem,6vw,5.4rem)] font-black tracking-[-0.045em]">
            {contact.title}
          </h2>
          <p className="relative mt-6 max-w-[560px] text-lg text-foreground/85">{contact.text}</p>
          <div className="relative mt-9">
            <Button asChild size="lg">
              <a href="#contatti">
                Contattaci <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
