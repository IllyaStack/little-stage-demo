/**
 * LITTLE STAGE — Site Data (Zentraler Datenspeicher)
 * ==================================================
 * Alle pflegbaren Inhalte der Website an einem Ort.
 * 
 * HINWEIS FÜR DEN INHABER:
 * Diese Datei dient als Single Source of Truth.
 * Vor der offiziellen Veröffentlichung werden hier die verifizierten
 * Öffnungszeiten, die finale Speise-/Getränkekarte und echte Events eingepflegt.
 */

const SITE_DATA = {

  // ─── Betrieb & Kontakt ─────────────────────────────
  business: {
    name: 'Little Stage',
    tagline: 'Pub · Live Music · Wien',
    description: 'Live-Musik, gutes Bier und Wiener Beislkultur mitten in Margareten.',
    address: {
      street: 'Ramperstorffergasse 66',
      zip: '1050',
      city: 'Wien',
      district: 'Margareten',
      country: 'Österreich'
    },
    phone: '+43 1 544 26 90',
    phoneDisplay: '01 544 26 90',
    phoneHref: 'tel:+4315442690',
    email: 'info@littlestage.at',
    owner: 'Fa. Manfred Szendi',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Ramperstorffergasse+66,+1050+Wien',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d16.3526!3d48.1859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d078f5c8a5555%3A0x0!2sRamperstorffergasse%2066%2C%201050%20Wien!5e0!3m2!1sde!2sat'
  },

  // ─── Öffnungszeiten (Sicherer Status) ───────────────
  hoursText: 'Aktuelle Öffnungszeiten bitte telefonisch erfragen.',
  hours: {
    statusText: 'Aktuelle Öffnungszeiten bitte telefonisch erfragen.'
  },

  // ─── Social Media ──────────────────────────────────
  // Nur tatsächlich verifizierte Profile aufführen. Keine toten "#"-Links.
  social: {
    facebook: 'https://www.facebook.com/LittleStage'
    // Instagram: Noch nicht offiziell verifiziert – wird ergänzt, sobald bestätigt.
  },

  // ─── Events (Beispielhafte Darstellung) ──────────────
  // Transparent als Demo-Inhalte gekennzeichnet.
  eventsDemoNotice: 'Beispielhafte Darstellung – aktuelle Veranstaltungen können später einfach eingepflegt werden.',
  events: [
    {
      id: 'e001',
      slug: 'beispiel-jazz-session',
      title: 'Jazz & Groove Session',
      isDemo: true,
      badge: 'Beispiel-Event',
      date: '2026-10-09',
      time: '20:00',
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80',
      genre: 'Jazz / Improvisation',
      description: 'Beispiel-Veranstaltung zur Demonstration des Event-Kalenders. Im Live-Betrieb stehen hier Musikerbiografie, Programm und Details zum jeweiligen Abend.',
      ticketInfo: 'Freier Eintritt · Spenden willkommen',
      status: 'upcoming'
    },
    {
      id: 'e002',
      slug: 'beispiel-acoustic-night',
      title: 'Acoustic Songwriter Night',
      isDemo: true,
      badge: 'Beispiel-Event',
      date: '2026-10-16',
      time: '20:30',
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
      genre: 'Acoustic / Songwriter',
      description: 'Beispiel-Veranstaltung für Unplugged-Konzerte auf der ~8 m² Bühne des Little Stage. Zeigt die saubere Darstellung von Künstlerinfos und Beginnzeiten.',
      ticketInfo: 'Freier Eintritt · Reservierung empfohlen',
      status: 'upcoming'
    },
    {
      id: 'e003',
      slug: 'beispiel-pub-quiz',
      title: 'Little Stage Pub Quiz',
      isDemo: true,
      badge: 'Beispiel-Event',
      date: '2026-10-23',
      time: '19:30',
      image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800&q=80',
      genre: 'Pub Quiz / Community',
      description: 'Beispiel für regelmäßige Kneipen- und Themenabende. Teams bis 6 Personen können vorab einen Tisch reservieren.',
      ticketInfo: 'Teilnahme frei · Anmeldung vorab erbeten',
      status: 'upcoming'
    }
  ],

  // ─── Speisen & Getränke (Strukturierte Demo-Karte) ────
  // Hinweis: Preise und Produkte sind als Beispielpositionen strukturiert,
  // damit der Inhaber sieht, wie Kategorien, Mengenangaben und Hinweise aussehen.
  menuNotice: 'Beispielhafte Darstellung – aktuelle Karte und Preise werden vor Veröffentlichung direkt vom Inhaber übernommen.',
  menu: {
    fassbier: {
      title: 'Fassbier',
      icon: '🍺',
      note: 'Frisch gezapft vom Fass – z.B. Trumer Pils und Guinness.',
      items: [
        { name: 'Trumer Pils vom Fass', description: 'Feinherbes Salzburger Pils, frisch gezapft', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Guinness Draught', description: 'Original irisches Stout vom Fass', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Saisonales Fassbier / Zwickl', description: 'Wechselnde Spezialität nach Tagesangebot', price: 'Preis n. V.', available: false, isDemo: true }
      ]
    },
    flaschenbier: {
      title: 'Flaschenbier & Cider',
      icon: '🍻',
      note: 'Regionale und internationale Flaschenbiere.',
      items: [
        { name: 'Österreichisches Märzenbier', description: 'Klassisches Helles, 0,5l Flasche', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Weißbier / Weizen', description: 'Hefe-Hell oder Dunkel, 0,5l Flasche', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Alkoholfreies Bier', description: 'Erfrischend hopfig, 0,5l Flasche', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Cider / Apfelwein', description: 'Fruchtig-herb, 0,33l Flasche', price: 'Preis n. V.', available: true, isDemo: true }
      ]
    },
    wein: {
      title: 'Wein & Spritzer',
      icon: '🍷',
      note: 'Ausgewählte Weiß- und Rotweine sowie echte Wiener Spritzer.',
      items: [
        { name: 'Grüner Veltliner', description: 'Klassischer Wiener oder Weinviertler Weißwein, 1/8l', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Zweigelt / Blaufränkisch', description: 'Österreichischer Rotwein, samtig trocken, 1/8l', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Wiener Spritzer (Weiß)', description: 'Wein mit Sodawasser gespritzt, 1/4l', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Kaiserspritzer', description: 'Mit einem Schuss Holundersirup, 1/4l', price: 'Preis n. V.', available: true, isDemo: true }
      ]
    },
    alkoholfrei: {
      title: 'Alkoholfrei',
      icon: '🥤',
      note: 'Erfrischungen, Säfte und Sodas.',
      items: [
        { name: 'Mineralwasser', description: 'Prickelnd oder still, 0,33l', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Fruchtsäfte & Nektare', description: 'Apfel, Johannisbeere oder Orange (pur oder mit Soda)', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Cola / Kräuterlimonade', description: 'Klassische alkoholfreie Erfrischungen, 0,33l', price: 'Preis n. V.', available: true, isDemo: true }
      ]
    },
    drinks: {
      title: 'Drinks & Spirituosen',
      icon: '🥃',
      note: 'Pub-Klassiker, Longdrinks und feine Tropfen an der Bar.',
      items: [
        { name: 'Gin & Tonic', description: 'Klassisch serviert mit Zitrone oder Gurke', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Irish Whiskey & Scotch', description: 'Auswahl an der Bar – z.B. Jameson oder Tullamore', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Rum & Cola', description: 'Klassischer Longdrink auf Eis', price: 'Preis n. V.', available: true, isDemo: true }
      ]
    },
    speisen: {
      title: 'Kleine Beislküche & Snacks',
      icon: '🍽️',
      note: 'Ehrliche, warme und kalte Schmankerl zum Bier.',
      items: [
        { name: 'Wiener Würstel', description: 'Mit Estragonsenf, Kren und frischem Gebäck', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Debreziner / Käsekrainer', description: 'Heiß serviert mit Senf und Brot', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Herzhaftes Beisl-Käsebrot', description: 'Mit Essiggurkerl und Pfefferoni garniert', price: 'Preis n. V.', available: true, isDemo: true },
        { name: 'Toast & Knabbereien', description: 'Schinken-Käse-Toast und Pub-Snacks', price: 'Preis n. V.', available: true, isDemo: true }
      ]
    },
    tageskarte: {
      title: 'Tageskarte & Spezialitäten',
      icon: '📋',
      note: 'Unsere Tagesgerichte wechseln regelmäßig und bieten bodenständige Spezialitäten – bitte direkt beim Service nachfragen!',
      items: []
    }
  },

  // ─── Galerie ───────────────────────────────────────
  // Bildhinweis: Vor Veröffentlichung durch Originalfotos der Little Stage ersetzen.
  gallery: [
    { src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80', alt: 'Atmosphäre eines Live-Konzerts auf der kleinen Bühne', category: 'live' },
    { src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80', alt: 'Gemütlicher Barbereich mit Zapfhähnen und Gläsern', category: 'bar' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Gastronomie und frisch zubereitete Beislspeisen', category: 'food' },
    { src: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80', alt: 'Gitarrenspiel bei einer intimen Akustik-Session', category: 'live' },
    { src: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800&q=80', alt: 'Geselliges Beisammensein im Lokal', category: 'people' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', alt: 'Klassische Snacks und Speisen aus der Pub-Küche', category: 'food' },
    { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', alt: 'Stimmungsvolles Bühnenlicht während eines Gigs', category: 'live' },
    { src: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&q=80', alt: 'Frisch gezapftes kaltes Bier mit Schaumkrone', category: 'drinks' }
  ]
};
