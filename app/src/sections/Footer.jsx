import { Container } from "../components/shared";
import { ADDRESS, EMAIL, PHONE_HREF, PHONE_LABEL, TAGLINE } from "../content";

export default function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <Container className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-end">
        <span className="inline-grid w-fit rounded-xl bg-white p-3">
          <img src="media/logos/logo-crop.webp" alt="La Rochelle Studio" width="388" height="520" loading="lazy" className="h-32 w-auto object-contain" />
        </span>
        <div>
          <p className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[-0.045em] uppercase">
            {TAGLINE}
            <span className="text-primary">.</span>
          </p>
          <p className="tag-mono mt-3 text-muted-foreground">All rights reserved · © 2020–{new Date().getFullYear()} La Rochelle Studio</p>
        </div>
        <address className="text-sm leading-relaxed text-muted-foreground not-italic md:text-right">
          {ADDRESS}
          <br />
          <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-primary">
            {EMAIL}
          </a>
          <br />
          <a href={PHONE_HREF} className="transition-colors hover:text-primary">
            {PHONE_LABEL}
          </a>
        </address>
      </Container>
    </footer>
  );
}
