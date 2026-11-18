import { useEffect, useRef, useState } from "react";
import { ArrowDown, Pause, Play } from "lucide-react";
import { Button } from "../components/ui/button";
import { Container } from "../components/shared";

const REDUCE = "(prefers-reduced-motion: reduce)";

/* Hero cinematografica: il video originale dello studio a tutto schermo, bande da cinema,
   vignettatura e grana di pellicola. Il video si ferma se il sistema chiede meno movimento,
   quando esce dallo schermo e con il pulsante di pausa. */
export default function Hero() {
  const videoRef = useRef(null);
  const timeRef = useRef(null);
  const wantsPlay = useRef(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia(REDUCE);
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);

    const start = () => {
      if (mq.matches || !wantsPlay.current) return;
      v.play().catch(() => {});
    };
    const onMotion = () => (mq.matches ? v.pause() : start());
    mq.addEventListener("change", onMotion);
    if (mq.matches) wantsPlay.current = false;
    start();

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : v.pause()), { threshold: 0.1 });
    io.observe(v);

    // timecode decorativo
    const t0 = performance.now();
    const tick = setInterval(() => {
      if (v.paused || !timeRef.current) return;
      const s = Math.floor((performance.now() - t0) / 1000);
      const p = (n) => String(n).padStart(2, "0");
      timeRef.current.textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
    }, 1000);

    return () => {
      clearInterval(tick);
      io.disconnect();
      mq.removeEventListener("change", onMotion);
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      wantsPlay.current = true;
      v.play().catch(() => {});
    } else {
      wantsPlay.current = false;
      v.pause();
    }
  };

  return (
    <section id="top" className="relative isolate min-h-svh overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        poster="media/hero/poster.webp"
        aria-hidden="true"
        className="absolute inset-0 -z-30 size-full animate-drift object-cover will-change-transform"
      >
        <source src="media/hero/larochellestudio.mp4" type="video/mp4" />
        <source src="media/hero/larochellestudio.webm" type="video/webm" />
      </video>

      {/* overlay 60% per la leggibilita' e vignettatura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,var(--color-background)_0%,rgba(8,23,28,0.5)_38%,rgba(8,23,28,0.32)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]"
      />
      <div aria-hidden="true" className="film-grain -z-10" />

      {/* bande da cinema */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-0 h-[4.5svh] bg-black" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 h-[4.5svh] bg-black" />

      <Container className="relative z-10 flex min-h-svh flex-col justify-end pt-32 pb-[calc(4.5svh+2rem)]">
        <p className="tag-mono mb-6 flex items-center gap-3 text-foreground/80 animate-fade-up [animation-delay:.1s]">
          <span className="h-px w-10 bg-primary" aria-hidden="true" />
          Produzione video e foto · Olbia, Sardegna
        </p>

        <h1 className="text-[clamp(3.2rem,13.2vw,11.5rem)] leading-[0.86] font-black tracking-[-0.06em] uppercase">
          <span className="block overflow-hidden pb-[0.07em]">
            <span className="block animate-rise">We tell</span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <span className="block animate-rise [animation-delay:.12s]">
              your story<span className="text-primary">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 animate-fade-up [animation-delay:.55s] md:flex-row md:items-end md:justify-between">
          <div className="max-w-[520px]">
            <p className="text-lg text-foreground/85 sm:text-xl">
              Agenzia di produzione video con sede a Olbia. Dal 2020 raccontiamo aziende, luoghi e persone con immagini in
              movimento.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#lavori">Guarda i lavori</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contatti">Raccontaci la tua idea</a>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <p className="tag-mono hidden items-center gap-2 text-foreground/70 sm:flex" aria-hidden="true">
              <span className={playing ? "size-2 animate-pulse rounded-full bg-primary" : "size-2 rounded-full bg-foreground/40"} />
              <span ref={timeRef}>00:00:00</span>
            </p>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label={playing ? "Metti in pausa il video" : "Riproduci il video"}>
              {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5" aria-hidden="true" />}
            </Button>
            <a
              href="#studio"
              className="tag-mono hidden items-center gap-2 text-foreground/70 transition-colors hover:text-primary sm:flex"
            >
              Scorri <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
