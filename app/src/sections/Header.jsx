import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Container } from "../components/shared";
import { cn } from "../lib/utils";
import { nav } from "../content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-lg" : "border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-[72px]">
        <a href="#top" className="text-[1.05rem] font-extrabold tracking-tight">
          La Rochelle<span className="text-primary">.</span>Studio
        </a>
        <nav aria-label="Principale" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group flex items-baseline gap-2 text-sm font-semibold">
                  <span className="tag-mono text-primary">{item.n}</span>
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out-soft group-hover:scale-x-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="sm">
          <a href="#contatti">Contattaci</a>
        </Button>
      </Container>
    </header>
  );
}
