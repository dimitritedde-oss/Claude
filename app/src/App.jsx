import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { Cursor, ScrollProgress, useMagnetic } from "./components/Cursor";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Studio from "./sections/Studio";
import Work from "./sections/Work";
import Services from "./sections/Services";
import Clients from "./sections/Clients";
import Cta from "./sections/Cta";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function StickyCta() {
  // only after the hero: it already carries the same call to action
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-3 z-50 transition-all duration-300 ease-out-soft sm:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      style={{ bottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
    >
      <Button asChild className="w-full shadow-[0_14px_30px_-10px_rgba(0,0,0,0.8)]">
        <a href="#contatti">
          Raccontaci la tua idea <ArrowRight className="size-5" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}

export default function App() {
  // the portfolio filter is shared so the services chapter can open a category
  const [filter, setFilter] = useState("all");
  useMagnetic();

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[200] -translate-y-20 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground focus:translate-y-0"
      >
        Vai al contenuto
      </a>
      <ScrollProgress />
      <Cursor />
      <Header />
      <main id="main" className="max-sm:pb-20">
        <Hero />
        <Studio />
        <Work filter={filter} setFilter={setFilter} />
        <Services setFilter={setFilter} />
        <Clients />
        <div className="pt-28 sm:pt-40">
          <Cta />
        </div>
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
