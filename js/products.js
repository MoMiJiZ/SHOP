const PRODUCTS = [
  {
    id: "magazine-wonbin",
    fit: "cover",
    name: "MAGAZINE VER.WONBIN",
    price: 1825,
    oldPrice: 2010,
    category: "GIVE A WAY",
    badge: "NEW",
    added: 2,
    sold: 0,
    images: ["images/p/magazine-wonbin-01.webp", "images/p/magazine-wonbin-02.webp"],
    options: [
      { label: "Options 01", image: "images/p/magazine-wonbin-01.webp" },
      { label: "Options 02", image: "images/p/magazine-wonbin-02.webp" }
    ],
    details: ["A4 Size Poster", "Quantity: 1 ea"]
  },
  {
    id: "id-card-sungchan",
    name: "EMPLOYEE ID CARD VER.SUNGCHAN",
    price: 2010,
    category: "GIVE A WAY",
    badge: "BEST SELLER",
    added: 1,
    sold: 1,
    images: ["images/p/id-card-sungchan.webp"],
    details: []
  },
  {
    id: "newspaper-sungchan",
    name: "NEWS PAPER VER.SUNGCHAN",
    price: 1309,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/newspaper-sungchan.webp"],
    details: []
  },
  {
    id: "price-tag",
    name: "PRICE TAG",
    price: 1020,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/price-tag-01.webp", "images/p/price-tag-02.webp"],
    options: [
      { label: "Options 01", image: "images/p/price-tag-01.webp" },
      { label: "Options 02", image: "images/p/price-tag-02.webp" }
    ],
    details: []
  },
  {
    id: "lanyard",
    name: "LANYARD",
    price: 32,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/lanyard.webp"],
    options: [
      { label: "Options 01", image: "images/p/lanyard.webp" },
      { label: "Options 02", image: "images/p/lanyard.webp" }
    ],
    details: []
  },
  {
    id: "magazine-sungchan",
    fit: "cover",
    name: "MAGAZINE VER.SUNGCHAN",
    price: 1825,
    oldPrice: 2010,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/magazine-sungchan-01.webp", "images/p/magazine-sungchan-02.webp"],
    options: [
      { label: "Options 01", image: "images/p/magazine-sungchan-01.webp" },
      { label: "Options 02", image: "images/p/magazine-sungchan-02.webp" }
    ],
    details: []
  },
  {
    id: "plastic-bag",
    name: "PLASTIC BAG",
    price: 20,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/plastic-bag.webp"],
    details: []
  },
  {
    id: "id-card-wonbin",
    name: "EMPLOYEE ID CARD VER.WONBIN",
    price: 2010,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/id-card-wonbin.webp"],
    details: ["A7 Size", "Quantity: 1 ea"]
  },
  {
    id: "id-photo-wonbin",
    name: "ID PHOTO VER.WONBIN",
    price: 2002,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/id-photo-wonbin.webp"],
    details: []
  },
  {
    id: "sticker",
    name: "STICKER VER.SUNGCHAN AND WONBIN",
    price: 2023,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/sticker.webp"],
    details: []
  },
  {
    id: "newspaper-wonbin",
    name: "NEWS PAPER VER.WONBIN",
    price: 1309,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/newspaper-wonbin.webp"],
    details: []
  },
  {
    id: "id-card-workshop",
    name: "EMPLOYEE ID CARD VER.WORKSHOP",
    price: 2010,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/id-card-workshop.webp"],
    details: []
  },
  {
    id: "paper-cup",
    name: "PAPER CUP",
    price: 2301,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/paper-cup.webp"],
    options: [
      { label: "Options 01", image: "images/p/paper-cup.webp" },
      { label: "Options 02", image: "images/p/paper-cup.webp" }
    ],
    details: []
  },
  {
    id: "photoboots",
    name: "PHOTOBOOTS",
    price: 1302,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/photoboots.webp"],
    details: []
  },
  {
    id: "keycap-sungchan",
    name: "KEYCAB VER.SUNGCHAN",
    price: 10,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/keycap-sungchan.webp"],
    details: []
  },
  {
    id: "id-photo-sungchan",
    name: "ID PHOTO VER.SUNGCHAN",
    price: 2001,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/id-photo-sungchan.webp"],
    details: []
  },
  {
    id: "postcard-fanart",
    name: "POST CARD FANART",
    price: 4923,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/postcard-fanart.webp"],
    details: []
  },
  {
    id: "keycap-wonbin",
    name: "KEYCAB VER.WONBIN",
    price: 10,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    images: ["images/p/keycap-wonbin.webp"],
    details: []
  },
  {
    id: "set-01",
    name: "SET 01 VANILLA LATTE, BINNIE (STRAW) BERRY BABE",
    price: 255,
    category: "SET MENU",
    added: 1,
    sold: 0,
    images: [],
    details: []
  },
  {
    id: "set-02",
    name: "SET 02 SUNGCHAN'S CHOCO HEART, LEMON (CHEESE) CRUSH",
    price: 255,
    category: "SET MENU",
    added: 1,
    sold: 0,
    images: [],
    details: []
  },
  {
    id: "set-03",
    name: "SET 03 LEMON TASTE, WITH (SUNG)CHANPAN",
    price: 255,
    category: "SET MENU",
    added: 1,
    sold: 0,
    images: [],
    details: []
  },
  {
    id: "special",
    name: "SPECIAL",
    price: 1020,
    category: "GIVE A WAY",
    added: 1,
    sold: 0,
    soldOut: true,
    placeholder: "SPECIAL",
    images: [],
    details: []
  }
];
