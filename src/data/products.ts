import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Packwoods x Runtz Skywalker OG 1g",
    slug: "packwoods-runtz-skywalker-og",
    price: 149.90,
    description: "O Packwoods x Runtz Disposable Vape é uma colaboração entre duas marcas icônicas no mundo do cannabis, combinando sabores frutados e um efeito potente em um dispositivo descartável fácil de usar.",
    details: [
      "Tipo: Vape descartável com óleo de cannabis premium",
      "Sabor: notas doces e frutadas típicas de Runtz",
      "Capacidade: 1g (~1000 mg)",
      "Rendimento: Aproximadamente 500 tragos",
      "Uso: ativado pela puxada — sem botões",
      "Ideal para quem busca conveniência e potência",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/skywalker-og-1.jpg?v=20251222",
      "/images/skywalker-og-2.png"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      { id: "r1-1", author: "Lucas M.", rating: 5, date: "2026-01-18", comment: "Esse é brabo demais! Brisa muito boa, curti demais mano." },
      { id: "r1-2", author: "Ana P.", rating: 5, date: "2026-01-12", comment: "Melhor vape que já dei um tapa. Chegou rapidão e é original memo." },
      { id: "r1-3", author: "Carlos R.", rating: 4, date: "2025-12-28", comment: "Muito top, só achei que poderia render mais tragos." },
      { id: "r1-4", author: "Mariana T.", rating: 5, date: "2025-12-15", comment: "Skywalker pra relaxar à noite é outro nível, brisa suave!" },
      { id: "r1-5", author: "Bruno S.", rating: 5, date: "2025-11-28", comment: "Qualidade insana, já peguei 3x. Vicia demais kkk" },
      { id: "r1-6", author: "Rodrigo F.", rating: 5, date: "2025-11-10", comment: "Skywalker OG trava gostoso, pra relaxar no sofá é perfeito mano." },
      { id: "r1-7", author: "Jéssica A.", rating: 4, date: "2025-10-22", comment: "Sabor muito bom, vapor denso. Só o preço que pesa um pouco." }
    ]
  },
  {
    id: "2",
    name: "Packwoods x Runtz Pink Rozay 1g",
    slug: "packwoods-runtz-pink-rozay",
    price: 149.90,
    description: "Pink Rozay oferece um sabor floral e doce com notas de champagne rosé. Perfeito para momentos de relaxamento e celebração.",
    details: [
      "Tipo: Vape descartável premium",
      "Sabor: floral, champagne rosé",
      "Capacidade: 1g (~1000 mg)",
      "Rendimento: Aproximadamente 500 puxadas",
      "Uso: ativado pela puxada",
      "Efeito relaxante e eufórico",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/pink-rozay-1.jpg",
      "/images/pink-rozay-2.png"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    reviews: [
      { id: "r2-1", author: "Fernanda S.", rating: 5, date: "2026-01-15", comment: "Sabor chavoso demais! Parece champagne memo, amei." },
      { id: "r2-2", author: "João V.", rating: 5, date: "2026-01-08", comment: "Pra relaxar no final do dia é brabo. Qualidade absurda!" },
      { id: "r2-3", author: "Patrícia L.", rating: 5, date: "2025-12-20", comment: "Pink Rozay é elegância pura! Sabor floral que dá uma vibe diferenciada." },
      { id: "r2-4", author: "Caio M.", rating: 4, date: "2025-11-28", comment: "Muito top, brisa leve e relaxante. Curti o sabor rosé." }
    ]
  },
  {
    id: "3",
    name: "Packwoods x Runtz White Gummy 1g",
    slug: "packwoods-runtz-white-gummy",
    price: 149.90,
    description: "White Gummy traz o sabor nostálgico de ursinhos de goma brancos com um punch potente. Uma experiência doce e memorável.",
    details: [
      "Tipo: Vape descartável",
      "Sabor: gummy bear branco, doce",
      "Capacidade: 1g (~1000 mg)",
      "Rendimento: Aproximadamente 500 puxadas",
      "Uso: ativado pela puxada",
      "Perfeito para uso durante o dia",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/white-gummy-1.png",
      "/images/white-gummy-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.7,
    reviewCount: 56,
    reviews: [
      { id: "r3-1", author: "Rafael C.", rating: 5, date: "2026-01-10", comment: "Gosto de infância mano! Muito doce, curti demais." },
      { id: "r3-2", author: "Beatriz A.", rating: 4, date: "2025-12-22", comment: "Daora demais, sabor diferentão. Recomendo!" },
      { id: "r3-3", author: "Pedro H.", rating: 5, date: "2025-12-10", comment: "Pra usar de dia é perfeito, brisa leve e não trava." },
      { id: "r3-4", author: "Camila F.", rating: 5, date: "2025-11-30", comment: "White Gummy é insano! Sabor único, vicia." },
      { id: "r3-5", author: "André K.", rating: 5, date: "2025-11-15", comment: "Mano, esse gummy é nostálgico demais! Lembra doce de infância." },
      { id: "r3-6", author: "Larissa M.", rating: 4, date: "2025-10-20", comment: "Sabor docinho top, brisa suave. Bom pra trampar sem travar." }
    ]
  },
  {
    id: "4",
    name: "Packwoods x Runtz Grape Ape 2g",
    slug: "packwoods-runtz-grape-ape",
    price: 189.90,
    description: "Grape Ape é uma indica poderosa com sabor intenso de uva e efeitos relaxantes profundos. Versão 2g para sessões mais longas.",
    details: [
      "Tipo: Vape descartável XL",
      "Sabor: uva intensa, doce",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada",
      "Ideal para noites relaxantes",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/grape-ape-1.jpg",
      "/images/grape-ape-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
    reviews: [
      { id: "r4-1", author: "Gabriel F.", rating: 5, date: "2026-01-17", comment: "Melhor sabor de uva que já dei um tapa! Rende pra caramba." },
      { id: "r4-2", author: "Juliana M.", rating: 5, date: "2026-01-05", comment: "Versão 2g vale muito, qualidade absurda mano." },
      { id: "r4-3", author: "Thiago B.", rating: 5, date: "2025-12-18", comment: "Pra relaxar à noite é outro nível. Brisa forte e longa!" },
      { id: "r4-4", author: "Amanda R.", rating: 5, date: "2025-12-06", comment: "Grape Ape é meu preferido! Sabor de uva insano." },
      { id: "r4-5", author: "Diego L.", rating: 4, date: "2025-11-25", comment: "Muito brabo, brisa relaxante que dura horas." },
      { id: "r4-6", author: "Renata S.", rating: 5, date: "2025-11-10", comment: "2g de Grape Ape é investimento! Rende muito e sabor de uva autêntico." },
      { id: "r4-7", author: "Marcos V.", rating: 5, date: "2025-10-22", comment: "Esse é pra quem gosta de indica braba! Trava gostoso mano." }
    ]
  },
  {
    id: "5",
    name: "Packwoods Blunt - Blue Dream",
    slug: "packwoods-blunt-blue-dream",
    price: 30.00,
    description: "Blunt premium pré-enrolado com a clássica Blue Dream. 2g de flor de alta qualidade em um blunt artesanal.",
    details: [
      "Tipo: Blunt pré-enrolado",
      "Strain: Blue Dream (Sativa-dominant)",
      "Peso: 2g de flor premium",
      "Queima lenta e uniforme",
      "Efeito equilibrado e criativo",
      "Contém alta concentração de THC"
    ],
    images: [
      "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=600&h=600&fit=crop",
      "/images/blue-dream-2.jpg"
    ],
    category: "Blunts",
    inStock: true,
    rating: 4.6,
    reviewCount: 78,
    reviews: [
      { id: "r5-1", author: "Marcos T.", rating: 5, date: "2026-01-14", comment: "Blunt chavoso demais! Queima perfeitinha e sabor brabo." },
      { id: "r5-2", author: "Carolina A.", rating: 5, date: "2025-12-28", comment: "Blue Dream clássico! Brisa criativa que deixa focado, muito top." },
      { id: "r5-3", author: "Felipe R.", rating: 4, date: "2025-12-15", comment: "Queima lenta e uniforme, sabor frutado. Curti demais mano." },
      { id: "r5-4", author: "Tatiana S.", rating: 5, date: "2025-11-20", comment: "Blunt artesanal de qualidade! Rendeu uma sessão braba." }
    ]
  },
  {
    id: "6",
    name: "Runtz Comestíveis - Rainbow Pack",
    slug: "runtz-comestiveis-rainbow-pack",
    price: 39.90,
    originalPrice: 65.90,
    description: "Pack de gummies coloridos com sabores variados. 100mg total dividido em 10 peças de 10mg cada.",
    details: [
      "Tipo: Gummies comestíveis",
      "Dosagem: 100mg total (10x10mg)",
      "Sabores: frutas variadas",
      "Vegano e sem glúten",
      "Efeito duradouro",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/rainbow-pack-1.jpg",
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&h=600&fit=crop"
    ],
    category: "Comestíveis",
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    reviews: [
      { id: "r6-1", author: "Amanda L.", rating: 5, date: "2026-01-16", comment: "Muito gostoso mano! Sabores top e brisa perfeita." },
      { id: "r6-2", author: "Bruno K.", rating: 5, date: "2026-01-02", comment: "Preço justo com o desconto. Cola demais, recomendo!" },
      { id: "r6-3", author: "Letícia P.", rating: 4, date: "2025-12-22", comment: "Delicinha, brisa vem suave e vai aumentando." },
      { id: "r6-4", author: "Ricardo M.", rating: 5, date: "2025-12-10", comment: "Rainbow Pack é insano! Cada cor um sabor diferente." },
      { id: "r6-5", author: "Natália C.", rating: 5, date: "2025-11-28", comment: "Gummies muito saborosos! Dosagem certinha pra não travar demais." },
      { id: "r6-6", author: "Henrique B.", rating: 5, date: "2025-11-15", comment: "Desconto muito bom! Sabores variados, cada um melhor que o outro." }
    ]
  },
  {
    id: "7",
    name: "Packwoods x Runtz Sour Banana Kush 1g",
    slug: "packwoods-runtz-sour-banana-kush",
    price: 149.90,
    description: "Sour Banana Kush combina notas ácidas de banana com um toque terroso. Efeito relaxante e equilibrado perfeito para qualquer momento.",
    details: [
      "Tipo: Vape descartável com óleo de cannabis premium",
      "Sabor: banana ácida, terroso",
      "Capacidade: 1g (~1000 mg)",
      "Rendimento: Aproximadamente 500 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Ideal para quem busca conveniência e potência",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/sour-banana-kush-1.jpg",
      "/images/sour-banana-kush-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
    reviews: [
      { id: "r7-1", author: "Felipe G.", rating: 5, date: "2026-01-12", comment: "Sabor de banana é outro nível! Muito diferentão, curti demais." },
      { id: "r7-2", author: "Isabela C.", rating: 4, date: "2025-12-28", comment: "Banana com aquele toque terroso surpreende! Virou meu preferido." },
      { id: "r7-3", author: "Rodrigo P.", rating: 5, date: "2025-12-15", comment: "Sour Banana Kush é brabo! Sabor azedinho gostoso de banana." },
      { id: "r7-4", author: "Daniela M.", rating: 5, date: "2025-11-28", comment: "Curti demais esse sabor! Diferente de tudo que já provei." }
    ]
  },
  {
    id: "8",
    name: "Packwoods x Runtz Melonade 2g",
    slug: "packwoods-runtz-melonade",
    price: 189.90,
    description: "Melonade oferece um sabor refrescante de melão com notas cítricas. Versão 2g de alta potência para sessões prolongadas.",
    details: [
      "Tipo: Vape descartável XL",
      "Sabor: melão, cítrico, refrescante",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Perfeito para momentos de relaxamento",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/melonade-1.webp",
      "/images/melonade-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 45,
    reviews: [
      { id: "r8-1", author: "Natália V.", rating: 5, date: "2026-01-18", comment: "Sabor refrescante que é brabo! Perfeito pro calor." },
      { id: "r8-2", author: "André L.", rating: 5, date: "2026-01-08", comment: "Melão com cítrico é combo perfeito mano!" },
      { id: "r8-3", author: "Carolina S.", rating: 4, date: "2025-12-25", comment: "Muito gostoso, sabor leve. Curti demais a brisa." },
      { id: "r8-4", author: "Paulo F.", rating: 5, date: "2025-12-12", comment: "Melonade é insano, muito refrescante!" },
      { id: "r8-5", author: "Fernanda B.", rating: 5, date: "2025-11-27", comment: "2g rende pra caramba, vale muito a grana." },
      { id: "r8-6", author: "Vinícius R.", rating: 5, date: "2025-11-15", comment: "Melão no verão é a combinação perfeita! Brisa suave e refrescante." },
      { id: "r8-7", author: "Mariana L.", rating: 4, date: "2025-10-28", comment: "Sabor muito bom, lembra limonada de melão. Curti a vibe." }
    ]
  },
  {
    id: "9",
    name: "Packwoods x Runtz Venom OG 2g",
    slug: "packwoods-runtz-venom-og",
    price: 189.90,
    description: "Venom OG é uma indica potente com sabor terroso e notas de pinho. Versão 2g de alta potência para efeitos intensos e duradouros.",
    details: [
      "Tipo: Vape descartável XL",
      "Sabor: terroso, pinho, picante",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Ideal para relaxamento profundo",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/venom-og-1.jpg",
      "/images/venom-og-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.8,
    reviewCount: 72,
    reviews: [
      { id: "r9-1", author: "Henrique D.", rating: 5, date: "2026-01-15", comment: "Indica braba demais! Brisa relaxante que trava legal." },
      { id: "r9-2", author: "Priscila T.", rating: 5, date: "2025-12-30", comment: "Venom OG pra dormir é perfeito! Trava gostoso e relaxa total." },
      { id: "r9-3", author: "Bruno M.", rating: 4, date: "2025-12-18", comment: "Sabor terroso muito autêntico, brisa forte. Curti demais mano." },
      { id: "r9-4", author: "Luciana S.", rating: 5, date: "2025-11-28", comment: "2g de Venom é investimento! Rende muito e efeito insano." }
    ]
  },
  {
    id: "10",
    name: "Packwoods x Runtz Sour Apple Punch 2g",
    slug: "packwoods-runtz-sour-apple-punch",
    price: 189.90,
    description: "Sour Apple Punch combina o sabor ácido de maçã verde com notas doces e refrescantes. Versão 2g para sessões intensas e duradouras.",
    details: [
      "Tipo: Vape descartável XL",
      "Sabor: maçã verde ácida, doce, refrescante",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Perfeito para uso durante o dia",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/sour-apple-punch-1.jpg?v=20251222",
      "/images/sour-apple-punch-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 58,
    reviews: [
      { id: "r10-1", author: "Mariana F.", rating: 5, date: "2026-01-19", comment: "Maçã verde é o melhor sabor! Vicia demais mano." },
      { id: "r10-2", author: "Eduardo P.", rating: 5, date: "2026-01-10", comment: "Sabor azedinho brabo, muito refrescante!" },
      { id: "r10-3", author: "Aline M.", rating: 4, date: "2025-12-28", comment: "Top pra usar de dia, não trava e a brisa é leve." },
      { id: "r10-4", author: "Gustavo T.", rating: 5, date: "2025-12-15", comment: "Sour Apple é insano! Curti demais." },
      { id: "r10-5", author: "Roberta C.", rating: 5, date: "2025-11-28", comment: "Sabor de maçã ácida muito autêntico! Melhor pra uso diurno." },
      { id: "r10-6", author: "Diego A.", rating: 5, date: "2025-11-12", comment: "Punch de maçã verde é brabo! Vapor denso e saboroso demais." }
    ]
  },
  {
    id: "11",
    name: "Packwoods x Runtz Strawberry Cough 1g",
    slug: "packwoods-runtz-strawberry-cough",
    price: 149.90,
    description: "Strawberry Cough é uma sativa clássica com sabor doce de morango e efeito energizante. Perfeita para momentos criativos.",
    details: [
      "Tipo: Vape descartável com óleo de cannabis premium",
      "Sabor: morango doce, frutado",
      "Capacidade: 1g (~1000 mg)",
      "Rendimento: Aproximadamente 500 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Ideal para uso durante o dia",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/strawberry-cough-1.jpg",
      "/images/strawberry-cough-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.8,
    reviewCount: 93,
    reviews: [
      { id: "r11-1", author: "Vanessa T.", rating: 5, date: "2026-01-16", comment: "Morango perfeito! Sabor doce e brisa energizante, muito top." },
      { id: "r11-2", author: "Leonardo R.", rating: 5, date: "2025-12-30", comment: "Brabo pra trampar, deixa focado e criativo demais." },
      { id: "r11-3", author: "Fernanda G.", rating: 5, date: "2025-12-18", comment: "Strawberry Cough é clássico! Sativa que dá energia sem ansiedade." },
      { id: "r11-4", author: "Márcio L.", rating: 4, date: "2025-11-30", comment: "Sabor doce de morango muito bom, brisa leve. Curti mano." },
      { id: "r11-5", author: "Bianca S.", rating: 5, date: "2025-11-15", comment: "Pra usar de dia é perfeito! Foco total e criatividade na veia." }
    ]
  },
  {
    id: "12",
    name: "Packwoods x Runtz Fruta Proibida 1g",
    slug: "packwoods-runtz-fruta-proibida",
    price: 149.90,
    description: "Fruta Proibida oferece um sabor exótico e misterioso com notas frutadas intensas. Perfeito para qualquer momento.",
    details: [
      "Tipo: Vape descartável com óleo de cannabis premium",
      "Sabor: frutado exótico, doce",
      "Capacidade: 1g (~1000 mg)",
      "Rendimento: Aproximadamente 500 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Ideal para qualquer momento",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/fruta-proibida-1.webp",
      "/images/fruta-proibida-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 34,
    reviews: [
      { id: "r12-1", author: "Daniel G.", rating: 5, date: "2026-01-14", comment: "Sabor exótico insano! Muito diferentão, curti demais." },
      { id: "r12-2", author: "Priscila H.", rating: 5, date: "2026-01-05", comment: "Nome combina com o sabor. Misterioso e brabo!" },
      { id: "r12-3", author: "Gustavo N.", rating: 4, date: "2025-12-22", comment: "Curti muito, sabor único. Vale a pena." },
      { id: "r12-4", author: "Carla M.", rating: 5, date: "2025-12-10", comment: "Fruta Proibida é meu novo vício! Brisa top." },
      { id: "r12-5", author: "Roberto A.", rating: 5, date: "2025-11-25", comment: "Sabor exótico que vale cada real, mano." },
      { id: "r12-6", author: "Tatiana V.", rating: 5, date: "2025-11-10", comment: "Fruta Proibida é diferentão! Sabor misterioso que surpreende." },
      { id: "r12-7", author: "André F.", rating: 4, date: "2025-10-25", comment: "Muito bom, sabor frutado intenso. Curti a brisa relaxante." }
    ]
  },
  {
    id: "13",
    name: "Packwoods x Runtz Sour Blue Dream 2g",
    slug: "packwoods-runtz-sour-blue-dream",
    price: 189.90,
    description: "Sour Blue Dream combina o sabor clássico de Blue Dream com notas ácidas e refrescantes. Versão 2g para sessões intensas e duradouras.",
    details: [
      "Tipo: Vape descartável XL",
      "Sabor: blue dream ácido, frutado",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Perfeito para uso durante o dia",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/sour-blue-dream-1.jpg?v=20251222",
      "/images/sour-blue-dream-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.8,
    reviewCount: 47,
    reviews: [
      { id: "r13-1", author: "Renata S.", rating: 5, date: "2026-01-18", comment: "Blue Dream versão ácida é insano! Brisa muito boa." },
      { id: "r13-2", author: "Lucas P.", rating: 5, date: "2026-01-08", comment: "Sour Blue Dream combina o clássico com toque azedo! Muito top." },
      { id: "r13-3", author: "Carla T.", rating: 4, date: "2025-12-22", comment: "2g rende demais, sabor frutado ácido. Brisa equilibrada mano." },
      { id: "r13-4", author: "Ricardo M.", rating: 5, date: "2025-11-30", comment: "Blue Dream sempre foi brabo, versão sour é ainda melhor!" }
    ]
  },
  {
    id: "14",
    name: "Euphoria Cannabis Candies THC 10mg",
    slug: "euphoria-cannabis-candies-cbd",
    price: 25.90,
    originalPrice: 55.90,
    description: "Balas de cannabis com THC da marca Euphoria. Cada bala contém 10mg de THC, proporcionando efeitos relaxantes e eufóricos de forma discreta e saborosa.",
    details: [
      "Tipo: Balas comestíveis com THC",
      "Dosagem: 10mg THC por unidade",
      "Ingredientes: THC, açúcar, aromatizantes naturais",
      "Sem açúcar (Sugar Free)",
      "Efeito: relaxamento, euforia, bem-estar",
      "Contém THC",
      "Ideal para iniciantes - começar com 1 unidade"
    ],
    images: [
      "/images/euphoria-cbd-candies-1.jpg?v=20251222"
    ],
    category: "Comestíveis",
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    reviews: [
      { id: "r14-1", author: "Sandra M.", rating: 5, date: "2026-01-12", comment: "Balinhas top demais! Brisa suave e gostosa." },
      { id: "r14-2", author: "Fábio L.", rating: 4, date: "2025-12-28", comment: "Daora pra quem tá começando, dose certinha." },
      { id: "r14-3", author: "Cristina R.", rating: 5, date: "2025-12-18", comment: "Preço bom e qualidade braba! Recomendo." },
      { id: "r14-4", author: "Marcelo P.", rating: 5, date: "2025-11-30", comment: "Euphoria Candies são as melhores, curti demais!" },
      { id: "r14-5", author: "Juliana V.", rating: 5, date: "2025-11-15", comment: "Balas discretas e saborosas! Perfeito pra usar em qualquer lugar." },
      { id: "r14-6", author: "Anderson R.", rating: 4, date: "2025-10-28", comment: "10mg é dose certa pra iniciante, brisa suave. Curti mano." }
    ]
  },
  {
    id: "15",
    name: "Packwoods x Runtz Long Edition Blow Pop 2g",
    slug: "packwoods-runtz-blow-pop",
    price: 159.90,
    originalPrice: 209.90,
    description: "🚀 LANÇAMENTO EXCLUSIVO NO BRASIL! O Blow Pop é a nova sensação da Packwoods x Runtz na versão Long Edition. Sabor irresistível de pirulito com chiclete, combinando doçura nostálgica com potência premium. Edição limitada de lançamento com preço especial!",
    details: [
      "Tipo: Vape descartável Long Edition Premium",
      "Sabor: Blow Pop - pirulito com chiclete, doce e frutado",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Cepa: Híbrida balanceada",
      "Potência: Alta concentração de THC",
      "PROMOÇÃO DE LANÇAMENTO - Edição limitada!"
    ],
    images: [
      "/images/blow-pop-1.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 5.0,
    reviewCount: 12,
    reviews: [
      { id: "r15-1", author: "Rodrigo M.", rating: 5, date: "2026-01-20", comment: "Sabor de pirulito que vicia demais! Brisa híbrida perfeita, equilibrada certinha." },
      { id: "r15-2", author: "Patrícia L.", rating: 5, date: "2026-01-15", comment: "Lançamento brabo! Peguei na promoção e curti demais, sabor nostálgico." },
      { id: "r15-3", author: "Vinícius C.", rating: 5, date: "2026-01-08", comment: "Blow Pop é insano mano! Gosto de chiclete com aquela brisa boa." },
      { id: "r15-4", author: "Juliana S.", rating: 5, date: "2025-12-28", comment: "Melhor lançamento do ano! Preço de promoção tá valendo muito." },
      { id: "r15-5", author: "Fernando T.", rating: 5, date: "2025-12-18", comment: "Pirulito nostálgico com brisa braba! Long Edition rende muito." },
      { id: "r15-6", author: "Mariana G.", rating: 5, date: "2025-12-10", comment: "Blow Pop virou meu favorito da linha Long! Sabor chiclete insano." }
    ]
  },
  {
    id: "16",
    name: "Packwoods x Runtz Long Edition Strawberry Shortcake 2g",
    slug: "packwoods-runtz-strawberry-shortcake-long",
    price: 159.90,
    originalPrice: 209.90,
    description: "🚀 LANÇAMENTO EXCLUSIVO NO BRASIL! O Strawberry Shortcake é a nova sensação da Packwoods x Runtz na versão Long Edition. Sabor irresistível de morango com bolo, combinando doçura cremosa com potência premium. Edição limitada de lançamento com preço especial!",
    details: [
      "Tipo: Vape descartável Long Edition Premium",
      "Sabor: Strawberry Shortcake - morango com bolo, cremoso e doce",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Cepa: Híbrida balanceada",
      "Potência: Alta concentração de THC",
      "PROMOÇÃO DE LANÇAMENTO - Edição limitada!"
    ],
    images: [
      "/images/strawberry-shortcake-long-1.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 5.0,
    reviewCount: 8,
    reviews: [
      { id: "r16-1", author: "Amanda F.", rating: 5, date: "2026-01-19", comment: "Sabor de morango com bolo é insano! Doce na medida certa, brisa top." },
      { id: "r16-2", author: "Bruno T.", rating: 5, date: "2026-01-12", comment: "Lançamento brabo demais! Peguei na promoção e curti muito." },
      { id: "r16-3", author: "Carolina M.", rating: 5, date: "2026-01-05", comment: "Strawberry Shortcake virou meu preferido! Sabor cremoso que vicia." },
      { id: "r16-4", author: "Diego L.", rating: 5, date: "2025-12-25", comment: "Preço de lançamento muito bom! Qualidade premium." },
      { id: "r16-5", author: "Patrícia R.", rating: 5, date: "2025-12-16", comment: "Morango com bolo é combinação perfeita! Long Edition rende demais." },
      { id: "r16-6", author: "Lucas M.", rating: 4, date: "2025-12-05", comment: "Sabor cremoso muito bom, brisa híbrida equilibrada. Curti mano." }
    ]
  },
  {
    id: "17",
    name: "Packwoods x Runtz Long Edition Key Lime Pie 2g",
    slug: "packwoods-runtz-key-lime-pie",
    price: 159.90,
    originalPrice: 209.90,
    description: "🚀 LANÇAMENTO EXCLUSIVO NO BRASIL! O Key Lime Pie é a nova sensação da Packwoods x Runtz na versão Long Edition. Sabor irresistível de torta de limão, combinando acidez cítrica refrescante com doçura cremosa e potência premium. Edição limitada de lançamento com preço especial!",
    details: [
      "Tipo: Vape descartável Long Edition Premium",
      "Sabor: Key Lime Pie - torta de limão, cítrico e cremoso",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Cepa: Híbrida balanceada",
      "Potência: Alta concentração de THC",
      "PROMOÇÃO DE LANÇAMENTO - Edição limitada!"
    ],
    images: [
      "/images/key-lime-pie-1.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 5.0,
    reviewCount: 6,
    reviews: [
      { id: "r17-1", author: "Lucas R.", rating: 5, date: "2026-01-18", comment: "Sabor de torta de limão perfeito! Cítrico na medida certa, brisa suave." },
      { id: "r17-2", author: "Fernanda S.", rating: 5, date: "2026-01-10", comment: "Lançamento incrível! Key Lime Pie virou meu favorito." },
      { id: "r17-3", author: "Thiago M.", rating: 5, date: "2026-01-02", comment: "Sabor refrescante e potência braba! Recomendo muito." },
      { id: "r17-4", author: "Camila P.", rating: 5, date: "2025-12-22", comment: "Promoção de lançamento valeu muito a pena! Qualidade top." },
      { id: "r17-5", author: "Rodrigo A.", rating: 5, date: "2025-12-12", comment: "Key Lime Pie é o melhor da linha Long! Cítrico refrescante demais." },
      { id: "r17-6", author: "Bianca L.", rating: 4, date: "2025-12-02", comment: "Torta de limão com brisa boa! Sabor azedinho muito top mano." }
    ]
  },
  {
    id: "19",
    name: "Packwoods x Runtz Long Edition Blue Berry Souffle 2g",
    slug: "packwoods-runtz-blue-berry-souffle",
    price: 159.90,
    originalPrice: 209.90,
    description: "🚀 LANÇAMENTO EXCLUSIVO NO BRASIL! O Blue Berry Souffle é a nova sensação da Packwoods x Runtz na versão Long Edition. Sabor irresistível de suflê de mirtilo, combinando doçura frutada com cremosidade e potência premium. Edição limitada de lançamento com preço especial!",
    details: [
      "Tipo: Vape descartável Long Edition Premium",
      "Sabor: Blue Berry Souffle - suflê de mirtilo, doce e cremoso",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Cepa: Híbrida balanceada",
      "Potência: Alta concentração de THC",
      "PROMOÇÃO DE LANÇAMENTO - Edição limitada!"
    ],
    images: [
      "/images/blue-berry-souffle-1.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 5.0,
    reviewCount: 10,
    reviews: [
      { id: "r19-1", author: "Mariana C.", rating: 5, date: "2026-01-20", comment: "Mano, esse mirtilo é sinistro! Cremosidade na veia, chapou legal." },
      { id: "r19-2", author: "Felipe A.", rating: 5, date: "2026-01-14", comment: "Pô, Blue Berry Souffle destruiu! Sabor absurdo, virou o queridinho." },
      { id: "r19-3", author: "Gabriela T.", rating: 4, date: "2026-01-05", comment: "Curti muito o sabor doce, brisa boa. Só achei que podia render mais." },
      { id: "r19-4", author: "Ricardo N.", rating: 5, date: "2025-12-28", comment: "Promoção de lançamento tá insana! Peguei dois já, qualidade braba." },
      { id: "r19-5", author: "Beatriz M.", rating: 5, date: "2025-12-18", comment: "Esse suflê de blueberry é outro nível! Vapor denso e saboroso demais." },
      { id: "r19-6", author: "André P.", rating: 5, date: "2025-12-08", comment: "Blue Berry Souffle é brabo! Sabor de mirtilo cremoso vicia demais." },
      { id: "r19-7", author: "Tatiana S.", rating: 5, date: "2025-11-28", comment: "Suflê de blueberry é diferentão! Long Edition vale cada centavo." }
    ]
  },
  {
    id: "20",
    name: "Packwoods x Runtz Long Edition Red Velvet Cake 2g",
    slug: "packwoods-runtz-red-velvet-cake",
    price: 159.90,
    originalPrice: 209.90,
    description: "🚀 LANÇAMENTO EXCLUSIVO NO BRASIL! O Red Velvet Cake é a nova sensação da Packwoods x Runtz na versão Long Edition. Sabor irresistível de bolo red velvet, combinando chocolate suave com toque aveludado e potência premium. Edição limitada de lançamento com preço especial!",
    details: [
      "Tipo: Vape descartável Long Edition Premium",
      "Sabor: Red Velvet Cake - bolo aveludado, chocolate suave",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Cepa: Híbrida balanceada",
      "Potência: Alta concentração de THC",
      "PROMOÇÃO DE LANÇAMENTO - Edição limitada!"
    ],
    images: [
      "/images/red-velvet-cake-1.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 7,
    reviews: [
      { id: "r20-1", author: "Letícia R.", rating: 5, date: "2026-01-19", comment: "Cara, esse red velvet é surreal! Gosto de bolo na puxada, vicia." },
      { id: "r20-2", author: "Anderson M.", rating: 5, date: "2026-01-12", comment: "Tá maluco, sabor de bolo aveludado é diferenciado demais! Brisa top." },
      { id: "r20-3", author: "Vanessa P.", rating: 4, date: "2026-01-05", comment: "Muito bom o sabor, só podia ter mais puxadas. Mas curti a onda." },
      { id: "r20-4", author: "Henrique S.", rating: 5, date: "2025-12-28", comment: "Peguei na promo e não me arrependi! Red Velvet destruiu, mano." },
      { id: "r20-5", author: "Jéssica L.", rating: 5, date: "2025-12-18", comment: "Melhor lançamento da linha Long! Sabor chocolatudo perfeito." },
      { id: "r20-6", author: "Gustavo F.", rating: 5, date: "2025-12-10", comment: "Esse bolo vermelho é brabo! Vapor grosso e efeito na hora." },
      { id: "r20-7", author: "Carla B.", rating: 5, date: "2025-12-02", comment: "Red Velvet é meu preferido! Sabor de bolo com chocolate suave." },
      { id: "r20-8", author: "Márcio V.", rating: 5, date: "2025-11-22", comment: "Bolo aveludado com brisa braba! Long Edition vale demais." }
    ]
  },
  {
    id: "18",
    name: "Cannabis Lollipops Northern Lights x Pineapple Express",
    slug: "cannabis-lollipops-northern-lights-pineapple",
    price: 89.90,
    description: "Caixa com 50 pirulitos de cannabis da marca Dr. Greenlove. Feitos com óleo de cannabis real, combinando as strains Northern Lights e Pineapple Express para um sabor único e efeito relaxante.",
    details: [
      "Tipo: Pirulitos de cannabis",
      "Quantidade: Caixa com 50 unidades",
      "Strain: Northern Lights x Pineapple Express",
      "Ingredientes: Óleo de cannabis real, açúcar, aromatizantes",
      "Sabor: tropical, frutado, doce",
      "Efeito: relaxamento, bem-estar, euforia leve",
      "Contém THC",
      "Ideal para consumo discreto e saboroso"
    ],
    images: [
      "/images/cannabis-lollipops-2.jpg"
    ],
    category: "Comestíveis",
    inStock: true,
    rating: 4.8,
    reviewCount: 42,
    reviews: [
      { id: "r18-1", author: "Paula D.", rating: 5, date: "2026-01-15", comment: "Caixa rende pra caramba! Pirulitos muito top." },
      { id: "r18-2", author: "Roberto V.", rating: 5, date: "2025-12-28", comment: "Sabor tropical insano, brisa leve e gostosa." },
      { id: "r18-3", author: "Fernanda M.", rating: 5, date: "2025-12-18", comment: "50 pirulitos é muito! Rende meses, sabor tropical brabo." },
      { id: "r18-4", author: "Lucas S.", rating: 4, date: "2025-11-30", comment: "Northern Lights com Pineapple Express é combo perfeito mano!" },
      { id: "r18-5", author: "Carla T.", rating: 5, date: "2025-11-15", comment: "Pirulitos discretos e saborosos! Brisa suave e relaxante." }
    ]
  },
  {
    id: "19",
    name: "Packwoods x Runtz Grape Juice 2g",
    slug: "packwoods-runtz-grape-juice",
    price: 189.90,
    description: "Grape Juice oferece um sabor intenso e doce de uva com efeitos relaxantes e potentes. Versão 2g de alta potência para sessões prolongadas.",
    details: [
      "Tipo: Vape descartável XL",
      "Sabor: uva doce, intenso",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Ideal para relaxamento profundo",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/grape-juice-1.jpg",
      "/images/grape-juice-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      { id: "r19-1", author: "Victor M.", rating: 5, date: "2026-01-17", comment: "Sabor de uva insano! Muito potente, brisa braba." },
      { id: "r19-2", author: "Larissa T.", rating: 5, date: "2026-01-08", comment: "Delícia, virou meu preferido! Curti demais." },
      { id: "r19-3", author: "Caio R.", rating: 4, date: "2025-12-28", comment: "Sabor top e brisa relaxante. Vale a grana." },
      { id: "r19-4", author: "Juliana S.", rating: 5, date: "2025-12-18", comment: "Grape Juice é brabo demais mano!" },
      { id: "r19-5", author: "Amanda L.", rating: 5, date: "2025-12-05", comment: "Uva doce intenso! 2g rende muito, vale o investimento." },
      { id: "r19-6", author: "Rodrigo C.", rating: 5, date: "2025-11-20", comment: "Grape Juice pra relaxar é perfeito! Sabor autêntico de uva." }
    ]
  },
  {
    id: "20",
    name: "Packwoods x Runtz Sour Tangie 2g",
    slug: "packwoods-runtz-sour-tangie",
    price: 189.90,
    description: "Sour Tangie é uma sativa vibrante que combina o sabor cítrico intenso de tangerina com notas ácidas refrescantes. Versão 2g de alta potência para sessões energizantes e duradouras.",
    details: [
      "Tipo: Vape descartável XL",
      "Sabor: tangerina cítrica, ácido, refrescante",
      "Capacidade: 2g (~2000 mg)",
      "Rendimento: Aproximadamente 1000 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Efeito: energizante, criativo, eufórico",
      "Ideal para uso durante o dia",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/sour-tangie-1.jpg?v=20251222",
      "/images/sour-tangie-2.png"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      { id: "r20-1", author: "Caio S.", rating: 5, date: "2026-01-18", comment: "Sabor cítrico insano! Energia pura, muito brabo." },
      { id: "r20-2", author: "Fernanda K.", rating: 5, date: "2026-01-10", comment: "Brabo pra trampar, foco total mano!" },
      { id: "r20-3", author: "Lucas R.", rating: 4, date: "2025-12-28", comment: "Muito refrescante, sabor de tangerina autêntico. Curti!" },
      { id: "r20-4", author: "Marina C.", rating: 5, date: "2025-12-18", comment: "Tangerina é meu sabor, brisa energizante demais!" },
      { id: "r20-5", author: "Thiago M.", rating: 5, date: "2025-11-30", comment: "Sour Tangie é insano, dá um pique absurdo!" },
      { id: "r20-6", author: "Bianca V.", rating: 5, date: "2025-11-18", comment: "Tangerina ácida é refrescante demais! Perfeito pro dia a dia." },
      { id: "r20-7", author: "Henrique L.", rating: 5, date: "2025-10-28", comment: "Sativa braba! Sour Tangie dá energia e criatividade na veia." }
    ]
  },
  {
    id: "21",
    name: "Packwoods x Runtz Wedding Cake 1g",
    slug: "packwoods-runtz-wedding-cake",
    price: 149.90,
    description: "Wedding Cake é uma híbrida premiada com sabor doce e terroso, notas de baunilha e frutas. Efeito relaxante e eufórico equilibrado.",
    details: [
      "Tipo: Vape descartável com óleo de cannabis premium",
      "Sabor: baunilha, terroso, doce",
      "Capacidade: 1g (~1000 mg)",
      "Rendimento: Aproximadamente 500 puxadas",
      "Uso: ativado pela puxada — sem botões",
      "Efeito: relaxante, eufórico, equilibrado",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/wedding-cake-1.jpg",
      "/images/wedding-cake-2.jpg"
    ],
    category: "Vapes",
    inStock: true,
    rating: 4.9,
    reviewCount: 112,
    reviews: [
      { id: "r21-1", author: "Marina S.", rating: 5, date: "2026-01-19", comment: "Sabor de baunilha insano! Virou meu favorito, muito top." },
      { id: "r21-2", author: "Victor H.", rating: 5, date: "2026-01-12", comment: "Híbrida perfeita, brisa equilibrada. Curti demais!" },
      { id: "r21-3", author: "Carla P.", rating: 5, date: "2025-12-28", comment: "Wedding Cake é clássico! Sabor terroso com baunilha, brisa relaxante." },
      { id: "r21-4", author: "Diego M.", rating: 4, date: "2025-12-15", comment: "Muito bom, sabor doce equilibrado. Curti a brisa híbrida mano." },
      { id: "r21-5", author: "Juliana R.", rating: 5, date: "2025-11-28", comment: "Premiado com razão! Wedding Cake é diferenciado demais." }
    ]
  },
  {
    id: "22",
    name: "Kit Packwoods x Runtz 10 Vapes 1g",
    slug: "kit-packwoods-runtz-10-vapes",
    price: 799.00,
    description: "Kit premium com 10 vapes descartáveis Packwoods x Runtz de 1g cada. Variedade de sabores incríveis para você experimentar os melhores strains da collab mais braba do mercado. Economia garantida!",
    details: [
      "Tipo: Kit com 10 Vapes descartáveis premium",
      "Capacidade: 10x 1g (10g total)",
      "Variedade: 10 sabores diferentes",
      "Rendimento: Aproximadamente 5000 puxadas totais",
      "Uso: ativado pela puxada — sem botões",
      "Inclui sabores variados: Runtz, Pink Rozay, Blue Dream, Grape Ape, entre outros",
      "Economia de R$700 — cada unidade sai por R$79,90 (preço individual: R$149,90)",
      "Ideal para quem quer variedade e economia",
      "Contém alta concentração de THC"
    ],
    images: [
      "/images/packwoods-runtz-kit-1.jpg"
    ],
    category: "Kits",
    inStock: true,
    rating: 5.0,
    reviewCount: 47,
    reviews: [
      { id: "r22-1", author: "Rafael M.", rating: 5, date: "2026-01-20", comment: "Kit muito brabo! Variedade insana de sabores, vale cada centavo." },
      { id: "r22-2", author: "Camila S.", rating: 5, date: "2026-01-15", comment: "Curti demais! Cada sabor é uma experiência diferente, brisa top." },
      { id: "r22-3", author: "Diego R.", rating: 5, date: "2026-01-08", comment: "Economia absurda e qualidade premium. Só compro assim agora!" },
      { id: "r22-4", author: "Juliana P.", rating: 5, date: "2025-12-28", comment: "Mano, esse kit é insano! Brisa garantida por semanas." },
      { id: "r22-5", author: "Lucas T.", rating: 5, date: "2025-12-18", comment: "Packwoods x Runtz é brabo demais, e com 10 de uma vez? Melhor investimento!" },
      { id: "r22-6", author: "Fernanda B.", rating: 5, date: "2025-12-08", comment: "10 sabores diferentes é demais! Cada dia uma brisa nova mano." },
      { id: "r22-7", author: "Bruno A.", rating: 5, date: "2025-11-28", comment: "Kit premium que vale cada real! Variedade insana e qualidade top." },
      { id: "r22-8", author: "Mariana L.", rating: 5, date: "2025-11-15", comment: "Economia de R$700 é real! Já peguei 2 kits, melhor custo-benefício." }
    ]
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const categories = [...new Set(products.map(p => p.category))];