/* Testi e dati presi dal sito originale larochellestudio.it (Home, Portfolio, Contatti). */

export const BRAND = "La Rochelle Studio";
export const TAGLINE = "We tell your story";
export const PHONE_LABEL = "+39 324 680 9752";
export const PHONE_HREF = "tel:+393246809752";
export const EMAIL = "info@larochellestudio.it";
export const ADDRESS = "via Seychelles 18A, SpazioHolo, Olbia, 07026";
export const FOUNDERS = [
  { name: "Dimitri Tedde", email: "dimitritedde@larochellestudio.it" },
  { name: "Mirko Decandia", email: "mirkodecandia@larochellestudio.it" },
];

export const nav = [
  { href: "#studio", n: "01", label: "Studio" },
  { href: "#lavori", n: "02", label: "Lavori" },
  { href: "#servizi", n: "03", label: "Servizi" },
  { href: "#contatti", n: "04", label: "Contatti" },
];

/* Chi siamo: testo originale, con minimi ritocchi di punteggiatura. */
export const story = {
  title: "Siamo appassionati di cinema e produzione video.",
  paragraphs: [
    "La Rochelle Studio è un'agenzia di produzione video con sede a Olbia, Sardegna. È stata fondata nel 2020 da Dimitri Tedde e Mirko Decandia, entrambi appassionati di cinema e produzione video. L'agenzia ha rapidamente guadagnato una solida reputazione grazie alla sua abilità nel creare contenuti video di qualità per aziende e privati.",
    "Dimitri e Mirko hanno iniziato a lavorare insieme molti anni fa, quando hanno deciso di seguire la loro passione per il cinema e iniziare a produrre i primi video clip musicali e cortometraggi. Grazie alla loro esperienza acquisita nel corso degli anni, hanno deciso di creare La Rochelle Studio per offrire servizi di produzione video professionali alle aziende della Sardegna e non solo.",
    "Il nostro team è composto da professionisti creativi e tecnici, impegnati a fornire i migliori servizi nella realizzazione di video personalizzati per il tuo brand. Siamo appassionati di ciò che facciamo e ci impegniamo a fornire i migliori risultati possibili.",
  ],
  closing: "La Rochelle Studio è garanzia di qualità e professionalità per chiunque cerchi servizi di produzione video di alto livello.",
  timeline: [
    { when: "Prima", what: "Video clip musicali e cortometraggi" },
    { when: "2020", what: "Nasce La Rochelle Studio a Olbia" },
    { when: "Oggi", what: "Video personalizzati per aziende e privati, in Sardegna e non solo" },
  ],
};

/* Le sei categorie del portfolio originale sono anche i servizi. */
export const categories = [
  { id: "commercial", label: "Commercial", line: "Video commercial in 16:9, pensati per TV e social." },
  { id: "corporate", label: "Corporate", line: "Ristoranti, aziende e brand, da Il Mattacchione a Mizuna e Novamarine." },
  { id: "event", label: "Event", line: "Eventi raccontati dal vivo, come Nikki Beach e SNO." },
  { id: "wedding", label: "Wedding", line: "Storie di matrimonio, come Ann & Alessandro e Stefania & Fabio." },
  { id: "real-estate", label: "Real estate", line: "Ville e proprietà della Costa Smeralda." },
  { id: "photography", label: "Photography", line: "Nautica, food, moda, eventi, tradizioni e artigianato. Firmato Janthima Verri." },
];

/* Home originale: "Lavori selezionati, storie che hanno un obiettivo". */
export const selectedTitles = ["wati", "birra baladin", "Ristorante Il Mattacchione"];

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

/* Contatti: testo originale. */
export const contact = {
  eyebrow: "Siamo a tua disposizione",
  title: "Raccontaci la tua idea!",
  text: "Siamo qui per aiutarti a trasformarla in realtà con la nostra esperienza. Insieme possiamo creare il tuo video perfetto, personalizzato su misura per le tue esigenze. Contattaci e scopri come possiamo lavorare insieme.",
};

export const serviceOptions = [...categories.map((c) => c.label), "Non so ancora, aiutatemi"];
