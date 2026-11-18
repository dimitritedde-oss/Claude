export const PHONE_LABEL = "+39 324 680 9752";
export const PHONE_HREF = "tel:+393246809752";
export const EMAIL = "info@larochellestudio.it";
export const VIDEO_URL = "https://youtu.be/8QCPyKRfU48";

export const nav = [
  { href: "#servizi", label: "Servizi" },
  { href: "#processo", label: "Processo" },
  { href: "#lavori", label: "Lavori" },
  { href: "#faq", label: "Domande" },
];

export const pains = [
  {
    title: "Le immagini non rendono giustizia",
    text: "Foto amatoriali o video generici non trasmettono la qualità reale di ciò che offri.",
  },
  {
    title: "Il video c'è, ma non porta risultati",
    text: "Girato senza strategia, senza una call to action e senza pensare a dove verrà pubblicato.",
  },
  {
    title: "Troppi fornitori, zero responsabilità",
    text: "Regia, riprese, montaggio e grafica sparsi tra persone diverse. Noi gestiamo tutto in un unico flusso.",
  },
];

export const services = [
  {
    tag: "Product video",
    title: "Video prodotto che fanno acquistare",
    featured: true,
    span: "md:col-span-4",
    points: [
      "Lancio di prodotto e demo pratiche",
      "Versioni pronte per Instagram, TikTok, sito ed e-commerce",
      "Script orientato alla conversione",
    ],
  },
  {
    tag: "Brand corporate",
    title: "Video aziendali che costruiscono fiducia",
    span: "md:col-span-2",
    points: [
      "Presentazione dell'azienda e dei valori",
      "Interviste a dipendenti e fondatori",
      "Materiale per recruiting e investitori",
    ],
  },
  {
    tag: "Real estate",
    title: "Video immobiliari che accorciano le trattative",
    span: "md:col-span-2",
    points: ["Tour cinematografici di ville, hotel e immobili", "Ideali per annunci, portali e agenzie"],
  },
  {
    tag: "Aftermovie",
    title: "Eventi che si ricordano e si rivendono",
    span: "md:col-span-2",
    points: ["Riprese dietro le quinte e highlight", "Racconto di artisti e performer"],
  },
  {
    tag: "Photography",
    title: "Foto per matrimoni, immobili, eventi e sessioni commerciali",
    span: "md:col-span-4",
    points: [
      "Servizi fotografici per aziende, brand e privati",
      "Stile coerente con il video, così il tuo brand è uno solo",
    ],
  },
];

export const steps = [
  { title: "Brief", text: "Ci racconti obiettivo, pubblico e budget in una call di 20 minuti." },
  { title: "Proposta", text: "Ricevi un preventivo chiaro con cosa è incluso e i tempi di consegna." },
  { title: "Produzione", text: "Riprese e regia del nostro team, con te coinvolto nelle decisioni chiave." },
  { title: "Consegna", text: "Video montato, colorato e adattato ai formati dei tuoi canali." },
];

export const clients = [
  ["nikki-beach", "Nikki Beach"],
  ["siddura", "Siddura"],
  ["tenuta-asinara", "Tenuta Asinara"],
  ["highfield", "Highfield"],
  ["mizuma", "Mizuma"],
  ["il-mattacchione", "Il Mattacchione"],
  ["alise", "Alise"],
  ["amalia", "Amalia"],
  ["bresca-dorada", "Bresca Dorada"],
  ["macchia-mediterranea", "Macchia Mediterranea"],
  ["novamarine", "Novamarine"],
  ["nss", "NSS"],
  ["rena41", "Rena41"],
  ["robymarton", "Robymarton"],
  ["sno", "SNO"],
].map(([file, name]) => ({ src: `media/clients/${file}.png`, name }));

export const cases = [
  { src: "media/cases/copertina-wati.png", name: "Wati", kind: "Lifestyle · Brand" },
  { src: "media/cases/copertina-pop.png", name: "Pop", kind: "Product · Lancio" },
  { src: "media/cases/copertina-il-mattacchione.png", name: "Il Mattacchione", kind: "Hospitality · Aftermovie" },
];

export const faqs = [
  {
    q: "Quanto costa un video?",
    a: "Dipende da durata, numero di riprese, location e tipo di post-produzione. Dopo una call di brief ti inviamo un preventivo chiaro con tutto incluso.",
  },
  {
    q: "Lavorate solo in Sardegna?",
    a: "La base è a Olbia, ma lavoriamo in tutta Italia per progetti di brand, eventi e immobili.",
  },
  {
    q: "Quanto tempo serve per avere il video?",
    a: "Dipende dalla complessità. Nel preventivo indichiamo tempi di produzione e consegna precisi.",
  },
  {
    q: "Posso avere più formati (verticale, orizzontale, quadrato)?",
    a: "Sì. Consegniamo i formati più adatti ai canali su cui pubblicherai: Reels, TikTok, YouTube, sito e annunci.",
  },
  {
    q: "Vi occupate anche della strategia e dello script?",
    a: "Sì. Possiamo aiutarti a definire messaggio, struttura e call to action prima di girare.",
  },
];

export const serviceOptions = [
  "Product video",
  "Brand corporate",
  "Real estate",
  "Aftermovie",
  "Photography",
  "Non so ancora, aiutatemi",
];

export const budgetOptions = ["Fino a 1.000 €", "1.000 – 3.000 €", "3.000 – 6.000 €", "Oltre 6.000 €"];
