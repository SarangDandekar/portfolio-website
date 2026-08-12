export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  halfPrice?: number;
  bestseller?: boolean;
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  icon: string;
  highlight?: boolean;
  items: MenuItem[];
};

const halfFull = (half: number, full: number, note?: string) =>
  note
    ? `${note} · Half ₹${half} · Full ₹${full}`
    : `Half ₹${half} · Full ₹${full}`;

/** Customer favourites from Jugadu Cafe menu */
export const featuredItems: MenuItem[] = [
  {
    id: "f1",
    name: "Chilli Paneer",
    description: halfFull(79, 139, "Spicy Indo-Chinese favourite"),
    price: 139,
    halfPrice: 79,
    bestseller: true,
    featured: true,
  },
  {
    id: "f2",
    name: "Manchurian Noodles",
    description: halfFull(39, 79, "Classic Chinese noodles"),
    price: 79,
    halfPrice: 39,
    bestseller: true,
    featured: true,
  },
  {
    id: "f3",
    name: "Paneer Cocktail Rice",
    description: halfFull(69, 129, "Loaded rice with paneer"),
    price: 129,
    halfPrice: 69,
    bestseller: true,
    featured: true,
  },
  {
    id: "f4",
    name: "Double Cheese Burger",
    description: "Double patty with melted cheese",
    price: 89,
    bestseller: true,
    featured: true,
  },
  {
    id: "f5",
    name: "Veg Paneer Pizza",
    description: "Paneer cubes with veggies & cheese",
    price: 159,
    bestseller: true,
    featured: true,
  },
  {
    id: "f6",
    name: "Peri-Peri Fries",
    description: halfFull(89, 129, "Spicy crispy fries"),
    price: 129,
    halfPrice: 89,
    bestseller: true,
    featured: true,
  },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "chinese",
    name: "Chinese",
    icon: "🥢",
    highlight: true,
    items: [
      {
        id: "cn1",
        name: "Dry Manchurian",
        description: halfFull(39, 79),
        price: 79,
        halfPrice: 39,
        bestseller: true,
      },
      {
        id: "cn2",
        name: "Chilli Paneer",
        description: halfFull(79, 139),
        price: 139,
        halfPrice: 79,
        bestseller: true,
      },
      {
        id: "cn3",
        name: "Crispy Chilli Potato",
        description: halfFull(89, 139),
        price: 139,
        halfPrice: 89,
      },
      {
        id: "cn4",
        name: "Veg Noodles",
        description: halfFull(39, 69),
        price: 69,
        halfPrice: 39,
        bestseller: true,
      },
      {
        id: "cn5",
        name: "Manchurian Noodles",
        description: halfFull(39, 79),
        price: 79,
        halfPrice: 39,
        bestseller: true,
      },
      {
        id: "cn6",
        name: "Manchurian Gravy",
        description: halfFull(39, 79),
        price: 79,
        halfPrice: 39,
        bestseller: true,
      },
      {
        id: "cn7",
        name: "Veg Fried Rice",
        description: halfFull(39, 79),
        price: 79,
        halfPrice: 39,
      },
      {
        id: "cn8",
        name: "Manchurian Rice",
        description: halfFull(39, 79),
        price: 79,
        halfPrice: 39,
        bestseller: true,
      },
      {
        id: "cn9",
        name: "Paneer Fried Rice",
        description: halfFull(69, 119),
        price: 119,
        halfPrice: 69,
      },
      {
        id: "cn10",
        name: "Veg Cocktail Rice",
        description: halfFull(45, 79),
        price: 79,
        halfPrice: 45,
      },
      {
        id: "cn11",
        name: "Paneer Cocktail Rice",
        description: halfFull(69, 129),
        price: 129,
        halfPrice: 69,
        bestseller: true,
      },
    ],
  },
  {
    id: "momos",
    name: "Momos",
    icon: "🥟",
    highlight: true,
    items: [
      {
        id: "mo1",
        name: "Vegetable Momos (Steam)",
        description: halfFull(39, 69),
        price: 69,
        halfPrice: 39,
        bestseller: true,
      },
      {
        id: "mo2",
        name: "Manchurian Momos (Steam)",
        description: halfFull(45, 79),
        price: 79,
        halfPrice: 45,
        bestseller: true,
      },
      {
        id: "mo3",
        name: "Paneer Momos (Steam)",
        description: halfFull(59, 99),
        price: 99,
        halfPrice: 59,
        bestseller: true,
      },
      {
        id: "mo4",
        name: "Veg Fried Momos",
        description: halfFull(49, 79),
        price: 79,
        halfPrice: 49,
      },
      {
        id: "mo5",
        name: "Manchurian Fried Momos",
        description: halfFull(49, 89),
        price: 89,
        halfPrice: 49,
      },
      {
        id: "mo6",
        name: "Paneer Fried Momos",
        description: halfFull(59, 109),
        price: 109,
        halfPrice: 59,
      },
      {
        id: "mo7",
        name: "Veg Kurkure Momos",
        description: halfFull(59, 109),
        price: 109,
        halfPrice: 59,
      },
      {
        id: "mo8",
        name: "Paneer Kurkure Momos",
        description: halfFull(69, 129),
        price: 129,
        halfPrice: 69,
        bestseller: true,
      },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    icon: "🍔",
    highlight: true,
    items: [
      {
        id: "bg1",
        name: "Veg Burger",
        description: "Classic veg patty burger",
        price: 59,
      },
      {
        id: "bg2",
        name: "Cheese Burger",
        description: "Veg burger with cheese",
        price: 69,
        bestseller: true,
      },
      {
        id: "bg3",
        name: "Double Cheese Burger",
        description: "Double cheese, extra filling",
        price: 89,
        bestseller: true,
      },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    icon: "🍕",
    highlight: true,
    items: [
      {
        id: "pz1",
        name: "Onion Pizza",
        description: "Cheesy pizza with onions",
        price: 109,
      },
      {
        id: "pz2",
        name: "Vegetable Pizza",
        description: "Loaded with fresh vegetables",
        price: 129,
        bestseller: true,
      },
      {
        id: "pz3",
        name: "Veg Cheese Corn Pizza",
        description: "Sweet corn with extra cheese",
        price: 139,
      },
      {
        id: "pz4",
        name: "Veg Paneer Pizza",
        description: "Paneer cubes on cheesy base",
        price: 159,
        bestseller: true,
      },
    ],
  },
  {
    id: "fries",
    name: "Fries & Snacks",
    icon: "🍟",
    highlight: true,
    items: [
      {
        id: "fr1",
        name: "French Fries",
        description: halfFull(79, 109),
        price: 109,
        halfPrice: 79,
        bestseller: true,
      },
      {
        id: "fr2",
        name: "Peri-Peri Fries",
        description: halfFull(89, 129),
        price: 129,
        halfPrice: 89,
        bestseller: true,
      },
      {
        id: "fr3",
        name: "Plain Maggi",
        description: "Classic masala maggi",
        price: 49,
      },
      {
        id: "fr4",
        name: "Masala Maggi",
        description: "Extra masala twist",
        price: 59,
        bestseller: true,
      },
      {
        id: "fr5",
        name: "Cheese Masala Maggi",
        description: "Maggi loaded with cheese",
        price: 69,
        bestseller: true,
      },
    ],
  },
  {
    id: "wraps",
    name: "Wraps & Rolls",
    icon: "🌯",
    items: [
      {
        id: "wr1",
        name: "Veg Schezwan Roll",
        description: "Spicy schezwan veg roll",
        price: 49,
        bestseller: true,
      },
      {
        id: "wr2",
        name: "Chilli Paneer Roll",
        description: "Chilli paneer stuffed roll",
        price: 59,
        bestseller: true,
      },
    ],
  },
];

export const formatPrice = (price: number, halfPrice?: number) =>
  halfPrice ? `₹${halfPrice} / ₹${price}` : `₹${price}`;

export const menuPdfPath = "/menu/jugadu-cafe-menu.pdf";
