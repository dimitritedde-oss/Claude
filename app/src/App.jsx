import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Mail, MapPin, Phone, Play } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Input, Label, Select, Textarea } from "./components/ui/form-controls";
import { cn } from "./lib/utils";
import {
  EMAIL,
  PHONE_HREF,
  PHONE_LABEL,
  VIDEO_URL,
  budgetOptions,
  cases,
  clients,
  faqs,
  nav,
  pains,
  serviceOptions,
  services,
  steps,
} from "./content";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Fade-up on scroll. Starts visible when motion is reduced or observers are missing. */
function Reveal({ className, children, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => prefersReducedMotion() || !("IntersectionObserver" in window));
  useEffect(() => {
    if (shown || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out-soft",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Container({ className, ...props }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5", className)} {...props} />;
}

function Kicker({ className, children }) {
  return (
    <span
      className={cn(
        "mb-6 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em] before:h-0.5 before:w-7 before:bg-primary before:content-['']",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3.5 z-50">
      <nav
        aria-label="Principale"
        className={cn(
          "pointer-events-auto mx-auto flex w-[calc(100%-40px)] max-w-[1240px] items-center justify-between gap-6 rounded-full border border-border bg-background/75 py-2.5 pr-2.5 pl-6 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_10px_30px_-12px_rgba(16,51,61,0.35)]"
        )}
      >
        <a href="#" className="text-[1.05rem] font-extrabold tracking-tight">
          La Rochelle<span className="text-primary">.</span>Studio
        </a>
        <ul className="hidden gap-1.5 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild variant="dark" size="sm">
          <a href="#contatti">Preventivo</a>
        </Button>
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */
function ReelRing() {
  const faces = [
    ...cases.map((c) => ({ key: c.name, src: c.src, alt: c.name, href: "#lavori" })),
    { key: "logo", src: "media/logos/logo-hd.png", alt: "La Rochelle Studio", logo: true },
  ];
  return (
    <div className="stage group relative grid h-[360px] place-items-center overflow-hidden sm:h-[460px]" aria-label="Lavori selezionati">
      <div className="ring relative h-[260px] w-[200px] animate-spin-ring [--r:135px] group-hover:[animation-play-state:paused] sm:h-[380px] sm:w-[300px] sm:[--r:230px]">
        {faces.map((f, i) => {
          const Tag = f.logo ? "div" : "a";
          return (
            <Tag
              key={f.key}
              href={f.logo ? undefined : f.href}
              className={cn(
                "ring-item shadow-[0_30px_60px_-30px_rgba(16,51,61,0.6)] ring-1 ring-secondary-foreground/25",
                f.logo ? "grid place-items-center bg-white p-11" : "bg-secondary"
              )}
              style={{ "--i": i }}
            >
              <img
                src={f.src}
                alt={f.alt}
                className={f.logo ? "max-h-full max-w-full object-contain" : "size-full object-cover"}
              />
            </Tag>
          );
        })}
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 h-14 w-[230px] -translate-x-1/2 rounded-[50%] sm:w-[340px]"
        style={{ background: "radial-gradient(closest-side, rgba(16,51,61,0.35), rgba(16,51,61,0))" }}
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-24 sm:pt-44 sm:pb-28">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div>
            <Kicker>Produzione video e foto · Olbia</Kicker>
            <h1 className="text-[clamp(3rem,8.4vw,7.4rem)] font-extrabold">
              Video che <em className="text-primary not-italic">portano clienti</em>, non solo visualizzazioni.
            </h1>
          </div>
          <div>
            <p className="max-w-[600px] text-[clamp(1.05rem,1.4vw,1.25rem)] text-muted-foreground">
              Aiutiamo brand, aziende e proprietà immobiliari a mostrare il valore di ciò che vendono, con immagini che
              convincono e una produzione gestita dall'idea alla consegna.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#contatti">
                  Preventivo gratuito <ArrowRight className="size-5" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={VIDEO_URL} target="_blank" rel="noopener">
                  <Play className="size-4 fill-current" aria-hidden="true" /> Guarda il video
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ReelRing />
          <div className="mx-auto mt-2 grid max-w-[520px] grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5 rounded-xl bg-primary p-6 text-primary-foreground">
              <span className="text-sm font-semibold">Fondati a Olbia</span>
              <strong className="text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-extrabold tracking-tighter">2020</strong>
            </div>
            <div className="flex flex-col gap-1.5 rounded-xl bg-secondary p-6 text-secondary-foreground">
              <span className="text-sm font-semibold">Risposta sui preventivi</span>
              <strong className="text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-extrabold tracking-tighter text-primary">24h</strong>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const words = ["Product video", "Brand corporate", "Aftermovie", "Real estate", "Photography"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden bg-primary py-4 text-primary-foreground" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((n) => (
          <div key={n} className="flex">
            {row.map((w, i) => (
              <span
                key={i}
                className="px-7 text-[clamp(1.3rem,2.4vw,1.9rem)] font-extrabold tracking-tight whitespace-nowrap after:ml-14 after:font-semibold after:content-['✳']"
              >
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Problem ---------- */
function Problem() {
  return (
    <section className="bg-secondary py-24 text-secondary-foreground sm:py-32">
      <Container>
        <Kicker>Il problema</Kicker>
        <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] font-extrabold">
          Il tuo prodotto è buono.
          <br />
          Se non si vede, non si vende.
        </h2>
        <p className="mt-6 max-w-[600px] text-lg opacity-80">
          L'attenzione dura pochi secondi. Se il tuo video non comunica subito valore e fiducia, il cliente scorre e va dalla
          concorrenza.
        </p>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.title}>
              <Card className="h-full border-secondary-foreground/20 bg-secondary-foreground/[0.06] text-secondary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-secondary-foreground/[0.12]">
                <CardHeader className="gap-0 p-9">
                  <span className="mb-8 grid size-12 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <CardTitle className="mb-3 text-[1.45rem] leading-tight">{p.title}</CardTitle>
                  <p className="opacity-80">{p.text}</p>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Services (3D tilt) ---------- */
function TiltCard({ className, children, ...props }) {
  const canTilt = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches && !prefersReducedMotion(),
    []
  );
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e) => {
    if (!canTilt) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ ry: px * 8, rx: -py * 8 });
  };
  return (
    <a
      onPointerMove={onMove}
      onPointerLeave={() => setT({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transformStyle: "preserve-3d" }}
      className={cn("transition-[transform,box-shadow] duration-300 ease-out-soft", className)}
      {...props}
    >
      {children}
    </a>
  );
}

function Services() {
  return (
    <section id="servizi" className="py-24 sm:py-32">
      <Container>
        <Kicker>Servizi</Kicker>
        <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] font-extrabold">
          Scegli il contenuto che ti serve.
          <br />
          Lo costruiamo su misura.
        </h2>
        <p className="mt-6 max-w-[600px] text-lg text-muted-foreground">
          Ogni progetto parte da un obiettivo preciso: vendere un prodotto, convincere un investitore, attirare un acquirente
          o raccontare un evento.
        </p>
        <div className="mt-16 grid gap-4 md:grid-cols-6">
          {services.map((s) => (
            <Reveal key={s.tag} className={s.span}>
              <TiltCard
                href="#contatti"
                className={cn(
                  "relative flex h-full flex-col gap-3.5 rounded-2xl border p-9 hover:shadow-[0_34px_60px_-30px_rgba(16,51,61,0.5)]",
                  s.featured
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-card-foreground"
                )}
              >
                {s.featured && (
                  <span className="absolute top-7 right-7 rounded-full bg-primary px-3 py-1.5 text-[0.7rem] font-extrabold tracking-wide text-primary-foreground uppercase">
                    Più richiesto
                  </span>
                )}
                <span className="text-xs font-bold tracking-[0.12em] text-primary uppercase [transform:translateZ(24px)]">
                  {s.tag}
                </span>
                <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-tight [transform:translateZ(24px)]">{s.title}</h3>
                <ul className="grid gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="relative pl-5 text-[0.95rem] opacity-85 before:absolute before:top-[0.65em] before:left-0 before:size-2 before:rounded-full before:bg-primary before:content-['']">
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-3.5 font-bold [transform:translateZ(24px)]">
                  Richiedi preventivo <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  return (
    <section id="processo" className="pb-24 sm:pb-32">
      <Container>
        <Kicker>Come lavoriamo</Kicker>
        <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] font-extrabold">
          Dal primo contatto al video finito,
          <br />
          senza sorprese.
        </h2>
        <ol className="relative mt-16 grid gap-x-4 gap-y-11 sm:grid-cols-2 lg:grid-cols-4 before:absolute before:top-[26px] before:right-0 before:left-0 before:hidden before:h-0.5 before:bg-border lg:before:block">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="relative">
              <div
                className={cn(
                  "relative z-10 mb-7 grid size-[54px] place-items-center rounded-full border-2 text-sm font-extrabold",
                  i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-foreground bg-background"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2.5 text-[1.45rem] font-bold">{s.title}</h3>
              <p className="text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------- Clients ---------- */
function Clients() {
  return (
    <div className="border-y border-border py-20">
      <Container>
        <Kicker>Hanno scelto La Rochelle Studio</Kicker>
        <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c) => (
            <li
              key={c.name}
              className="grid h-24 place-items-center rounded-[20px] border border-border bg-white p-5 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-[0_18px_36px_-20px_rgba(16,51,61,0.5)] sm:h-[124px]"
            >
              <img src={c.src} alt={c.name} loading="lazy" className="max-h-[70px] max-w-full object-contain" />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

/* ---------- Cases ---------- */
function Cases() {
  return (
    <section id="lavori" className="py-24 sm:py-32">
      <Container>
        <Kicker>Lavori selezionati</Kicker>
        <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] font-extrabold">Storie che hanno un obiettivo.</h2>
        <p className="mt-6 max-w-[600px] text-lg text-muted-foreground">
          Ogni lavoro nasce da una domanda: cosa deve fare questo video per il cliente?
        </p>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.name} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <a
                href="#contatti"
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-secondary text-secondary-foreground hover:ring-4 hover:ring-primary"
              >
                <img
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent to-60%" aria-hidden="true" />
                <span className="absolute inset-x-6 bottom-5 font-bold">
                  <small className="mb-1.5 block text-[0.72rem] tracking-[0.12em] text-primary uppercase">{c.kind}</small>
                  <span className="text-[1.7rem] tracking-tight">{c.name}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  return (
    <section id="faq" className="pb-24 sm:pb-32">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Kicker>Domande frequenti</Kicker>
          <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] font-extrabold">
            Hai dubbi?
            <br />
            Eccoli.
          </h2>
        </div>
        <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-border">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

/* ---------- CTA band ---------- */
function CtaBand() {
  return (
    <div className="pb-24 sm:pb-32">
      <Container>
        <Reveal className="rounded-[40px] bg-primary p-[clamp(2rem,6vw,6rem)] text-primary-foreground">
          <Kicker className="before:bg-secondary">Inizia adesso</Kicker>
          <h2 className="max-w-[14ch] text-[clamp(2.2rem,5.2vw,4.4rem)] font-extrabold">Il primo passo costa zero.</h2>
          <p className="mt-6 max-w-[520px] text-lg">
            Ti diamo un'analisi gratuita del tuo obiettivo e un preventivo dettagliato entro 24 ore lavorative. Nessun impegno.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="dark">
              <a href="#contatti">
                Voglio il preventivo gratuito <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-secondary text-secondary">
              <a href={PHONE_HREF}>{PHONE_LABEL}</a>
            </Button>
          </div>
          <p className="mt-6 text-[0.95rem] font-semibold">
            Se il video non rispecchia il brief concordato, lo rivediamo fino a quando è corretto.
          </p>
        </Reveal>
      </Container>
    </div>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [leadText, setLeadText] = useState("");
  const [copied, setCopied] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    setCopied(false);
    setLeadText(
      [
        `Richiesta preventivo: ${d.servizio}`,
        "",
        `Nome: ${d.nome}`,
        `Azienda: ${d.azienda || "-"}`,
        `Email: ${d.email}`,
        `Telefono: ${d.telefono || "-"}`,
        `Budget: ${d.budget || "-"}`,
        "",
        d.messaggio,
      ].join("\n")
    );
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(leadText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contatti" className="pb-24 sm:pb-32">
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Kicker>Contatti</Kicker>
          <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] font-extrabold">Raccontaci la tua idea.</h2>
          <p className="mt-6 max-w-[600px] text-lg text-muted-foreground">
            Compila il modulo: ti rispondiamo entro 24 ore lavorative con una proposta concreta. Oppure scrivici direttamente.
          </p>
          <ul className="mt-10 grid gap-2.5">
            {[
              { icon: Phone, label: "Telefono", value: PHONE_LABEL, href: PHONE_HREF },
              { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
              { icon: MapPin, label: "Studio", value: "via Seychelles 18A, SpazioHolo, Olbia (07026)" },
            ].map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="flex items-center gap-3 font-bold">
                    <Icon className="size-5 text-primary" aria-hidden="true" /> {label}
                  </span>
                  <span className="text-right text-sm opacity-80">{value}</span>
                </>
              );
              const cls =
                "flex items-center justify-between gap-4 rounded-[20px] border border-border bg-background/60 px-6 py-5";
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className={cn(cls, "transition-all duration-300 hover:translate-x-1 hover:bg-secondary hover:text-secondary-foreground")}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <Card className="border-0 bg-secondary text-secondary-foreground">
          <form onSubmit={onSubmit} noValidate className="grid gap-4 p-7 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="f-nome">Nome *</Label>
                <Input id="f-nome" name="nome" required autoComplete="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="f-azienda">Azienda / brand</Label>
                <Input id="f-azienda" name="azienda" autoComplete="organization" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="f-email">Email *</Label>
                <Input id="f-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="f-tel">Telefono</Label>
                <Input id="f-tel" name="telefono" type="tel" autoComplete="tel" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="f-servizio">Di cosa hai bisogno? *</Label>
              <Select id="f-servizio" name="servizio" required defaultValue="">
                <option value="" disabled>
                  Seleziona un servizio
                </option>
                {serviceOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="f-budget">Budget indicativo</Label>
              <Select id="f-budget" name="budget" defaultValue="">
                <option value="">Preferisco non dirlo</option>
                {budgetOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="f-msg">Raccontaci il progetto *</Label>
              <Textarea id="f-msg" name="messaggio" required placeholder="Obiettivo, dove pubblicherai il video, scadenza..." />
            </div>
            <Button type="submit" className="mt-1.5 w-full">
              Richiedi il preventivo gratuito <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <div role="status" aria-live="polite">
              {leadText && (
                <div className="grid gap-3">
                  <p className="font-semibold text-primary">
                    Richiesta pronta. Copia il testo e inviacelo a {EMAIL}, oppure chiamaci al {PHONE_LABEL}.
                  </p>
                  <Button type="button" variant="outline-light" onClick={copy}>
                    {copied ? <Check className="size-5" aria-hidden="true" /> : <Copy className="size-5" aria-hidden="true" />}
                    {copied ? "Copiato" : "Copia la richiesta"}
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm opacity-70">
              Rispondiamo entro 24 ore lavorative. I tuoi dati servono solo per rispondere alla richiesta.
            </p>
          </form>
        </Card>
      </Container>
    </section>
  );
}

/* ---------- Footer + sticky CTA ---------- */
function Footer() {
  return (
    <footer className="bg-secondary py-14 text-secondary-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-5">
        <span className="inline-grid rounded-2xl bg-white p-3">
          <img src="media/logos/logo-hd.png" alt="La Rochelle Studio" className="size-[84px] object-contain" />
        </span>
        <span className="text-sm opacity-75">© 2020–2026 La Rochelle Studio · Olbia, Sardegna</span>
        <span className="text-sm opacity-75">
          {EMAIL} · {PHONE_LABEL}
        </span>
      </Container>
    </footer>
  );
}

function StickyCta() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:hidden" style={{ bottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}>
      <Button asChild className="w-full shadow-[0_14px_30px_-10px_rgba(16,51,61,0.6)]">
        <a href="#contatti">
          Preventivo gratuito <ArrowRight className="size-5" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main className="pb-0 max-sm:pb-20">
        <Hero />
        <Marquee />
        <Problem />
        <Services />
        <Process />
        <Clients />
        <Cases />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
