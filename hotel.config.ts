/**
 * FICTIONAL DEMO CLIENT — all identity data is placeholder.
 *
 * Ardgowrie House does not exist. It is a mock client used to exercise the
 * fable-template build (content model, i18n, SEO, CRO) end to end without
 * attaching real business data to the template. `isDemo: true` below drives
 * noindex robots meta + sitemap exclusion (see app/robots.ts, app/sitemap.ts)
 * so this mock can never surface in real search results. Contact details use
 * ranges reserved for fiction (Ofcom drama phone numbers, example.com email)
 * — see AGENTS.md §4 for what a *real* client rewrite of this file entails.
 *
 * hotel.config.ts — single source of truth for client identity.
 * Cloning for a new hotel: edit this file, swap the Tailwind colour
 * tokens (lib/tokens.ts), point env vars at the new Sanity project +
 * booking engine. Every field below must carry the client's real value
 * before launch — see NEW-CLIENT-CHECKLIST.md §2.
 *
 * Translatable fields use the LocaleField shape ({ en: '...' }) — see
 * lib/locales.ts. Only fill in the locales you have real copy for; a
 * missing locale falls back to the default (AGENTS.md §9). Everything
 * else here (address parts, contact info, coordinates, ISO times) stays
 * a flat, unlocalized value.
 */
import type { LocaleField } from './lib/locales';

export const hotelConfig = {
  /** Fictional demo client — see file banner. Gates noindex + sitemap exclusion. */
  isDemo: true,
  name: 'Ardgowrie House',
  tagline: {
    en: 'A Highland retreat, invented for the occasion.',
    fr: 'Une retraite des Highlands, inventée pour l’occasion.',
    de: 'Ein Rückzugsort im Hochland, eigens ersonnen.',
    es: 'Un retiro en las Highlands, creado para la ocasión.',
  } as LocaleField,
  description: {
    en: 'An eighteen-room country house hotel in the Perthshire hills, built entirely as a demo client for the Fable template. Open fires, quiet corridors, and no booking ever reaches a real front desk.',
    fr: 'Un hôtel de charme de dix-huit chambres dans les collines du Perthshire, conçu entièrement comme client de démonstration pour le modèle Fable. Feux de cheminée, couloirs paisibles, et aucune réservation n’atteint jamais une véritable réception.',
    de: 'Ein Landhotel mit achtzehn Zimmern in den Hügeln von Perthshire, ausschließlich als Demo-Kunde für die Fable-Vorlage angelegt. Offene Kamine, ruhige Flure – keine Buchung erreicht je eine echte Rezeption.',
    es: 'Un hotel rural de dieciocho habitaciones en las colinas de Perthshire, creado enteramente como cliente de demostración para la plantilla Fable. Chimeneas encendidas, pasillos tranquilos, y ninguna reserva llega jamás a una recepción real.',
  } as LocaleField,
  location: {
    // Structured parts — used for schema.org PostalAddress and local SEO.
    // Fictional street + village: not Paisley or St Andrews (real hotels
    // of a similar name exist there) and not any identifiable real address.
    street: 'Balcorrie Brae',
    locality: 'Balcorrie',
    region: 'Perthshire',
    postalCode: 'PH11 9ZZ',
    country: 'GB',
    // Human-readable single line for footers / contact page.
    address: 'Balcorrie Brae, Balcorrie, Perthshire, PH11 9ZZ',
    // Longer display label used in hero eyebrows / footer legal line.
    regionLabel: {
      en: 'Perthshire, Scotland',
      fr: 'Perthshire, Écosse',
      de: 'Perthshire, Schottland',
      es: 'Perthshire, Escocia',
    } as LocaleField,
    // Fictional rural coordinates — open Perthshire hill country, not tied
    // to any real property. Demo only; see isDemo above.
    lat: 56.54892,
    lng: -3.94217,
  },
  contact: {
    // Ofcom drama-reserved range (01632 960xxx) — cannot dial a real number.
    phone: '+44 (0)1632 960 512',
    phoneHref: '+441632960512',
    email: 'enquiries@ardgowriehouse.example.com',
    instagram: 'https://instagram.com/ardgowriehouse',
    facebook: 'https://facebook.com/ardgowriehouse',
  },
  /** Reception desk hours — display string plus 24h forms for schema. */
  reception: {
    display: {
      en: '7am – 11pm daily. Night porter on duty after hours.',
      fr: 'De 7h à 23h tous les jours. Un veilleur de nuit assure une présence en dehors de ces horaires.',
      de: 'Täglich von 7 bis 23 Uhr besetzt. Außerhalb dieser Zeiten ist ein Nachtportier im Dienst.',
      es: 'De 7:00 a 23:00 todos los días. Portero nocturno de guardia fuera de ese horario.',
    } as LocaleField,
    opens: '07:00',
    closes: '23:00',
  },
  /** Guest-facing amenities — drives schema amenityFeature and can be
   *  surfaced on-page. Fictional but plausible for an 18-room house. */
  amenities: [
    { en: 'Free on-site parking', fr: 'Parking gratuit sur place', de: 'Kostenlose Parkplätze vor Ort', es: 'Aparcamiento gratuito en el hotel' },
    { en: 'EV charging', fr: 'Bornes de recharge électrique', de: 'Ladestationen für Elektrofahrzeuge', es: 'Puntos de recarga eléctrica' },
    { en: 'Dog-friendly rooms', fr: 'Chambres acceptant les chiens', de: 'Hundefreundliche Zimmer', es: 'Habitaciones que admiten perros' },
    { en: 'Restaurant & whisky bar', fr: 'Restaurant et bar à whisky', de: 'Restaurant und Whiskybar', es: 'Restaurante y bar de whisky' },
    { en: 'Free breakfast', fr: 'Petit-déjeuner offert', de: 'Kostenloses Frühstück', es: 'Desayuno incluido' },
    { en: 'Step-free access to ground-floor rooms', fr: 'Accès de plain-pied aux chambres du rez-de-chaussée', de: 'Stufenfreier Zugang zu Erdgeschosszimmern', es: 'Acceso sin escalones a las habitaciones de la planta baja' },
    { en: 'Family rooms', fr: 'Chambres familiales', de: 'Familienzimmer', es: 'Habitaciones familiares' },
    { en: 'Free Wi-Fi', fr: 'Wi-Fi gratuit', de: 'Kostenloses WLAN', es: 'Wi-Fi gratuito' },
  ] as LocaleField[],
  petsAllowed: true,
  /** SEO copy that varies per client. */
  seo: {
    /** Short human descriptor used in the homepage <title> and hero eyebrows. */
    descriptor: {
      en: 'Country House Hotel',
      fr: 'Hôtel de charme',
      de: 'Landhotel',
      es: 'Hotel rural de lujo',
    } as LocaleField,
    /** Location phrase appended to titles and used in fallback meta. */
    locationLabel: {
      en: 'Balcorrie, Perthshire',
      fr: 'Balcorrie, Perthshire',
      de: 'Balcorrie, Perthshire',
      es: 'Balcorrie, Perthshire',
    } as LocaleField,
    /**
     * Emit an aggregateRating in the Hotel JSON-LD, derived from the
     * featured testimonials. Only set true once those testimonials are
     * genuine, verifiable guest reviews — a fabricated rating risks a
     * Google manual action. Always false for the fictional demo client.
     */
    publishAggregateRating: false,
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ardgowriehouse.example.com',
  rooms: 18,
  starRating: 4,
  priceRange: '£££',
  // Display strings for the page; checkInISO / checkOutISO are the
  // schema.org Time values (ISO 8601, "HH:MM:SS") — keep both in sync,
  // schema.org needs the unlocalized ISO form regardless of locale.
  checkIn: { en: '3.00pm', fr: '15h00', de: '15:00 Uhr', es: '15:00 h' } as LocaleField,
  checkOut: { en: '11.00am', fr: '11h00', de: '11:00 Uhr', es: '11:00 h' } as LocaleField,
  checkInISO: '15:00:00',
  checkOutISO: '11:00:00',
  trustItems: [
    { en: 'Best Rate Guaranteed', fr: 'Meilleur tarif garanti', de: 'Bestpreisgarantie', es: 'Mejor tarifa garantizada' },
    { en: 'No Booking Fees', fr: 'Aucun frais de réservation', de: 'Keine Buchungsgebühren', es: 'Sin comisiones de reserva' },
    { en: 'Complimentary Welcome Dram', fr: 'Dram de bienvenue offert', de: 'Kostenloser Willkommens-Dram', es: 'Dram de bienvenida de cortesía' },
    { en: 'Loved by Our Guests', fr: 'Plébiscité par nos hôtes', de: 'Von unseren Gästen geliebt', es: 'Adorado por nuestros huéspedes' },
  ] as LocaleField[],
};

export type HotelConfig = typeof hotelConfig;
