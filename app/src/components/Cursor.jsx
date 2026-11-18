import { useEffect, useRef } from "react";

const FINE = "(hover: hover) and (pointer: fine)";
const REDUCE = "(prefers-reduced-motion: reduce)";
const INTERACTIVE = "a, button, summary, input, select, textarea, label, [role='button']";

/* Anello che segue il cursore. Il cursore nativo resta visibile (accessibilita'):
   l'anello cresce sui link e diventa una pillola con etichetta sugli elementi [data-cursor]. */
export function Cursor() {
  const root = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia(FINE);
    const reduce = window.matchMedia(REDUCE);
    if (!fine.matches || reduce.matches) return;

    const el = root.current;
    const r = ring.current;
    const l = label.current;
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let raf = 0;
    let mode = "idle";
    let pressed = false;

    const apply = () => {
      const scale = pressed ? 0.85 : 1;
      const size = mode === "label" ? 84 : mode === "link" ? 54 : 34;
      r.style.width = r.style.height = `${size}px`;
      r.style.transform = `translate(-50%, -50%) scale(${scale})`;
      r.dataset.mode = mode;
    };

    const tick = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      el.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
    };
    const onOver = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      const tagged = t?.closest("[data-cursor]");
      if (tagged) {
        mode = "label";
        l.textContent = tagged.getAttribute("data-cursor");
      } else if (t?.closest(INTERACTIVE)) {
        mode = "link";
        l.textContent = "";
      } else {
        mode = "idle";
        l.textContent = "";
      }
      apply();
    };
    const onDown = () => ((pressed = true), apply());
    const onUp = () => ((pressed = false), apply());
    const onLeave = () => (el.style.opacity = "0");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    apply();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] opacity-0 transition-opacity duration-200 max-[1023px]:hidden"
    >
      <div
        ref={ring}
        className="grid place-items-center rounded-full border-[1.5px] border-primary transition-[width,height,transform,background-color] duration-300 ease-out-soft data-[mode=label]:border-transparent data-[mode=label]:bg-primary data-[mode=link]:bg-primary/15"
      >
        <span ref={label} className="text-[11px] font-extrabold tracking-[0.12em] text-primary-foreground uppercase" />
      </div>
    </div>
  );
}

/* Barra sottile di avanzamento della lettura, in alto. */
export function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-primary" />
    </div>
  );
}

/* Effetto magnetico: i pulsanti [data-magnetic] seguono leggermente il cursore. */
export function useMagnetic() {
  useEffect(() => {
    const ok = window.matchMedia(FINE).matches && !window.matchMedia(REDUCE).matches;
    if (!ok) return;
    const cleanups = [...document.querySelectorAll("[data-magnetic]")].map((el) => {
      const move = (e) => {
        const b = el.getBoundingClientRect();
        const dx = e.clientX - (b.left + b.width / 2);
        const dy = e.clientY - (b.top + b.height / 2);
        el.style.transform = `translate(${(dx * 0.22).toFixed(1)}px, ${(dy * 0.3).toFixed(1)}px)`;
      };
      const leave = () => (el.style.transform = "");
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        el.style.transform = "";
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}
