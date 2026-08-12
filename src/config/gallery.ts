export type GalleryMedia = {
  id: string;
  src: string;
  alt: string;
  type: "image" | "video";
  category: "food" | "interior" | "moments" | "videos";
  span?: "tall" | "wide" | "normal";
};

/** Real Jugadu Cafe photos & videos from the project folder */
export const galleryImages: GalleryMedia[] = [
  {
    id: "g1",
    src: "/gallery/241356.jpg",
    alt: "Fresh veg pizza with cheese drizzle — Jugadu Cafe special",
    type: "image",
    category: "food",
    span: "tall",
  },
  {
    id: "g2",
    src: "/gallery/241352.jpg",
    alt: "Jugadu Cafe storefront near Panchayat Samiti, Samudrapur",
    type: "image",
    category: "interior",
    span: "tall",
  },
  {
    id: "g3",
    src: "/gallery/241355.jpg",
    alt: "Happy moments with friends inside Jugadu Cafe",
    type: "image",
    category: "moments",
  },
  {
    id: "g4",
    src: "/gallery/241354.jpg",
    alt: "Lucky draw celebration with customers at Jugadu Cafe",
    type: "image",
    category: "moments",
    span: "wide",
  },
  {
    id: "g5",
    src: "/gallery/241337.mp4",
    alt: "Cafe ambience video — Jugadu Cafe",
    type: "video",
    category: "videos",
    span: "tall",
  },
  {
    id: "g6",
    src: "/gallery/store.mp4",
    alt: "Store tour video — Jugadu Cafe Samudrapur",
    type: "video",
    category: "videos",
  },
  {
    id: "g7",
    src: "/gallery/241350.mp4",
    alt: "Jugadu Cafe video clip",
    type: "video",
    category: "videos",
  },
  {
    id: "g8",
    src: "/gallery/241353.mp4",
    alt: "Food & moments at Jugadu Cafe",
    type: "video",
    category: "videos",
    span: "wide",
  },
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "interior", label: "Store" },
  { id: "moments", label: "Moments" },
  { id: "videos", label: "Videos" },
] as const;
