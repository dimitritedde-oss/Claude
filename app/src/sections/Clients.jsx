import { Container } from "../components/shared";
import { clients } from "../content";

function Row({ hidden }) {
  return (
    <ul className="flex shrink-0 gap-3 pr-3" aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li key={c.name} className="grid h-28 w-44 shrink-0 place-items-center rounded-xl bg-white p-5">
          <img src={c.src} alt={hidden ? "" : c.name} loading="lazy" className="max-h-[68px] max-w-full object-contain" />
        </li>
      ))}
    </ul>
  );
}

/* Prova sociale: i loghi originali, in un nastro che scorre (fermo con movimento ridotto). */
export default function Clients() {
  return (
    <section aria-labelledby="clients-title" className="border-y border-border py-16 sm:py-20">
      <Container className="mb-10 flex items-center gap-4">
        <span className="tag-mono text-primary">★</span>
        <h2 id="clients-title" className="tag-mono text-muted-foreground">
          Hanno scelto La Rochelle Studio
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </Container>
      <div className="overflow-hidden motion-reduce:overflow-x-auto" style={{ maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}>
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
