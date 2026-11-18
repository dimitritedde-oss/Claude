import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Container({ className, ...props }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)} {...props} />;
}

/* Fade-up on scroll. Starts visible when motion is reduced or observers are missing. */
export function Reveal({ as: Tag = "div", className, delay = 0, children, ...rest }) {
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
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
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

/* Intestazione di capitolo: numero, etichetta mono e filetto, poi il titolo. */
export function ChapterHead({ n, label, title, children, className }) {
  return (
    <header className={cn("mb-14 sm:mb-20", className)}>
      <div className="mb-8 flex items-center gap-4">
        <span className="tag-mono text-primary">{n}</span>
        <span className="tag-mono text-muted-foreground">{label}</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <h2 className="max-w-[18ch] text-[clamp(2.4rem,6vw,5.2rem)] font-extrabold">{title}</h2>
      {children}
    </header>
  );
}
