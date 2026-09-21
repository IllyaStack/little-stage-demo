/**
 * LITTLE STAGE — Site Data
 * ========================
 * All editable website content in one place.
 * To update events, menu, hours, etc. — edit this file.
 *
 * ⚠️ Opening hours and menu prices are UNVERIFIED PLACEHOLDERS.
 * Confirm with the venue owner before publishing.
 */

const SITE_DATA = {

  // ─── Business ─────────────────────────────
  business: {
    name: 'Little Stage',
    tagline: 'Pub · Live Music · Wien',
    description: 'Live-Musik, gutes Bier und Wiener Beislkultur mitten in Margareten.',
    address: {
      street: 'Ramperstorffergasse 66',
      zip: '1050',
      city: 'Wien',
      country: 'AT'
    },
    phone: '+43 1 544 26 90',
    phoneDisplay: '01 544 26 90',
    phoneHref: 'tel:+4315442690',
    email: 'info@littlestage.at',
    owner: 'Fa. Manfred Szendi',
    foundedYear: 1998,
    googleMapsUrl: 'https://www.google.com/maps/place/Little+Stage/@48.1852,16.3548,17z',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660!2d16.3548!3d48.1852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLittle+Stage!5e0!3m2!1sde!2sat',
  },

  // ─── Opening Hours ────────────────────────
  // ⚠️ UNVERIFIED — confirm before launch
  hours: [
    { days: 'Mo – Fr', open: '17:00', close: '02:00' },
    { days: 'Sa & Feiertag', open: '17:00', close: '02:00' },
    { days: 'So', open: '17:00', close: '01:00' }
  ],
  hoursNote: 'Änderungen vorbehalten — bei Fragen einfach anrufen.',
  hoursUnverified: true,

  // ─── Social Media ─────────────────────────
  social: {
    facebook: 'https://www.facebook.com/LittleStage',
    instagram: '#', // TODO: Add real Instagram URL
  },

  // ─── Google Rating ────────────────────────
  google: {
    rating: 4.7,
    reviewCount: null, // TODO: Set real review count
    url: 'https://g.page/littlestage-wien'
  },

  // ─── Upcoming Events ──────────────────────
  // Add/remove events here. Status: 'upcoming', 'past', 'cancelled'
  events: [
    {
      id: 'e001',
      slug: 'jazz-night-oktober',
      title: 'Jazz Night',
      date: '2026-10-04',
      time: '20:00',
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&q=80',
      genre: 'Jazz',
      description: 'Ein Abend voller Jazz — mit lokalen Musikern auf unserer kleinen Bühne. Reservierung empfohlen.',
      ticketInfo: 'Freier Eintritt',
      status: 'upcoming'
    },
    {
      id: 'e002',
      slug: 'acoustic-session-oktober',
      title: 'Acoustic Session',
      date: '2026-10-11',
      time: '20:30',
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80',
      genre: 'Singer/Songwriter',
      description: 'Unplugged und persönlich — Singer/Songwriter auf der Little Stage.',
      ticketInfo: 'Freier Eintritt',
      status: 'upcoming'
    },
    {
      id: 'e003',
      slug: 'pub-quiz-oktober',
      title: 'Pub Quiz Night',
      date: '2026-10-18',
      time: '19:30',
      image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&q=80',
      genre: 'Pub Quiz',
      description: 'Rätseln, raten, gewinnen — unser legendäres Pub Quiz ist zurück. Teams bis 6 Personen.',
      ticketInfo: 'Freier Eintritt',
      status: 'upcoming'
    }
  ],

  // ─── Menu ─────────────────────────────────
  // ⚠️ Prices are PLACEHOLDERS — confirm with owner
  menu: {
    fassbier: {
      title: 'Fassbier',
      icon: '🍺',
      items: [
        { name: 'Trumer Pils', description: '0,3l / 0,5l', price: '3,90 / 4,90', available: true },
        { name: 'Guinness', description: '0,4l', price: '5,50', available: true },
      ]
    },
    flaschenbier: {
      title: 'Flaschenbier',
      icon: '🍻',
      items: [
        { name: 'Stiegl Goldbräu', description: '0,33l', price: '3,90', available: true },
        { name: 'Erdinger Weißbier', description: '0,5l', price: '4,90', available: true },
      ]
    },
    wein: {
      title: 'Wein',
      icon: '🍷',
      items: [
        { name: 'Grüner Veltliner', description: '1/8l', price: '3,50', available: true },
        { name: 'Zweigelt', description: '1/8l', price: '3,50', available: true },
        { name: 'Spritzer', description: 'sauer / süß', price: '2,90', available: true },
      ]
    },
    alkoholfrei: {
      title: 'Alkoholfrei',
      icon: '🥤',
      items: [
        { name: 'Mineral', description: '0,33l', price: '2,50', available: true },
        { name: 'Apfelsaft gespritzt', description: '0,5l', price: '3,20', available: true },
      ]
    },
    speisen: {
      title: 'Speisen',
      icon: '🍽️',
      items: [
        { name: 'Würstel mit Senf & Brot', description: '', price: '5,50', available: true },
        { name: 'Käsebrot', description: 'mit Gurkerl', price: '4,50', available: true },
      ]
    },
    tageskarte: {
      title: 'Tageskarte',
      icon: '📋',
      note: 'Unsere Tageskarte wechselt täglich — einfach nachfragen!',
      items: []
    }
  },

  // ─── Reviews ──────────────────────────────
  // Replace with verified real reviews before launch
  reviews: [
    {
      text: 'Super gemütlich, tolle Live-Musik und freundliche Leute. Unser Stammlokal im Fünften!',
      author: 'Stammgast',
      source: 'Google',
      rating: 5
    },
    {
      text: 'Kleine Bühne, großer Sound. Perfekt für einen entspannten Abend mit gutem Bier.',
      author: 'Musikfan',
      source: 'Google',
      rating: 5
    },
    {
      text: 'Wie ein Wohnzimmer mit Bühne. Man fühlt sich sofort willkommen.',
      author: 'Gelegenheitsbesucher',
      source: 'Facebook',
      rating: 5
    }
  ],

  // ─── Gallery ──────────────────────────────
  // Replace with real venue photos before launch
  gallery: [
    { src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&q=80', alt: 'Live-Musik auf der Bühne', category: 'live' },
    { src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80', alt: 'Die Bar im Little Stage', category: 'bar' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', alt: 'Essen im Little Stage', category: 'food' },
    { src: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80', alt: 'Gitarrist auf der kleinen Bühne', category: 'live' },
    { src: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&q=80', alt: 'Geselliger Abend', category: 'people' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', alt: 'Speisen aus der Küche', category: 'food' },
    { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', alt: 'Konzertstimmung im Lokal', category: 'live' },
    { src: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&q=80', alt: 'Frisch gezapftes Bier', category: 'drinks' },
  ]
};
