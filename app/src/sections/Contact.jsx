import { useState } from "react";
import { ArrowRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input, Label, Select, Textarea } from "../components/ui/form-controls";
import { ChapterHead, Container } from "../components/shared";
import { ADDRESS, EMAIL, FOUNDERS, PHONE_HREF, PHONE_LABEL, contact, serviceOptions } from "../content";

const rows = [
  { icon: Phone, label: "Telefono", value: PHONE_LABEL, href: PHONE_HREF },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  ...FOUNDERS.map((f) => ({ icon: Mail, label: f.name, value: f.email, href: `mailto:${f.email}` })),
  { icon: MapPin, label: "Studio", value: ADDRESS },
];

export default function Contact() {
  const [leadText, setLeadText] = useState("");
  const [copied, setCopied] = useState(false);

  // no backend yet: the request is composed as text the visitor can copy and send
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
        `Richiesta: ${d.servizio}`,
        "",
        `Nome: ${d.nome}`,
        `Azienda: ${d.azienda || "-"}`,
        `Email: ${d.email}`,
        `Telefono: ${d.telefono || "-"}`,
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
    <section id="contatti" className="border-t border-border py-28 sm:py-40">
      <Container>
        <ChapterHead n="04" label="Contatti" title="Siamo a tua disposizione." />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-lg text-foreground/85 sm:text-xl">
              <strong className="font-bold text-foreground">{contact.title}</strong> {contact.text}
            </p>
            <ul className="mt-10 border-t border-border">
              {rows.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="flex items-center gap-3">
                      <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                      <span className="tag-mono text-muted-foreground">{label}</span>
                    </span>
                    <span className="text-right text-sm font-medium break-all sm:text-base">{value}</span>
                  </>
                );
                const cls = "flex items-center justify-between gap-4 border-b border-border py-5";
                return (
                  <li key={label + value}>
                    {href ? (
                      <a href={href} className={cls + " transition-colors duration-200 hover:text-primary"}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border border-border bg-card p-6 sm:p-9 lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="f-nome">Nome *</Label>
                <Input id="f-nome" name="nome" required autoComplete="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="f-azienda">Azienda / brand</Label>
                <Input id="f-azienda" name="azienda" autoComplete="organization" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
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
              <Label htmlFor="f-msg">Raccontaci la tua idea *</Label>
              <Textarea id="f-msg" name="messaggio" required placeholder="Che cosa vuoi raccontare, dove sarà pubblicato, entro quando..." />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Invia la richiesta <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <div role="status" aria-live="polite">
              {leadText && (
                <div className="grid gap-3 rounded-xl border border-primary/50 bg-primary/10 p-5">
                  <p className="font-semibold">
                    Richiesta pronta. Copia il testo e inviacelo a <span className="text-primary">{EMAIL}</span>, oppure chiamaci al{" "}
                    {PHONE_LABEL}.
                  </p>
                  <Button type="button" variant="outline" onClick={copy}>
                    {copied ? <Check className="size-5" aria-hidden="true" /> : <Copy className="size-5" aria-hidden="true" />}
                    {copied ? "Copiato" : "Copia la richiesta"}
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">I tuoi dati servono solo per rispondere alla tua richiesta.</p>
          </form>
        </div>
      </Container>
    </section>
  );
}
