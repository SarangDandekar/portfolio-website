export type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const siteConfig = {
  name: "Jugadu Cafe",
  tagline: "Taste the Jugadu Way",
  description:
    "Jugadu Cafe in Samudrapur — 100% Pure Veg. Chinese specials, burgers, pizza, momos & fries near Panchayat Samiti. Good food, good mood, great vibes!",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jugaducafe.com",

  contact: {
    address: "Near Panchayat Samiti, Samudrapur",
    phone: "+91 95884 47056",
    instagram: "https://instagram.com/jugadu_cafe.anil_dadmal_",
    instagramHandle: "@jugadu_cafe.anil_dadmal_",
    email: "jugaducafe@gmail.com",
  },

  hours: {
    weekdays: "8:00 AM – 10:00 PM",
    weekends: "8:00 AM – 11:00 PM",
    label: "Open Daily",
  },

  map: {
    embedUrl:
      "https://maps.google.com/maps?q=Near+Panchayat+Samiti,+Samudrapur,+Maharashtra&output=embed",
    link: "https://maps.app.goo.gl/j5FMTcr6wqRuQEJ56?g_st=ac",
  },

  storeVideo: "/videos/store-tour.mp4",

  social: {
    instagram: "https://instagram.com/jugadu_cafe.anil_dadmal_",
    /** Replace with your g.page review link from Google Business Profile */
    googleReview:
      process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ??
      "https://www.google.com/maps/search/?api=1&query=Jugadu+Cafe+Near+Panchayat+Samiti+Samudrapur+Maharashtra",
  },

  nav: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Menu", href: "/#menu" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Visit Us", href: "/#visit" },
    { label: "Feedback", href: "/feedback", highlight: true },
  ] satisfies NavItem[],
} as const;
