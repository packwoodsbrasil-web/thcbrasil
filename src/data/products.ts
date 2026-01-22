import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Blue Banana",
    slug: "blue-banana",
    price: 299.90,
    originalPrice: 349.90,
    description: "Blue Banana! Esta indica complexa apresenta um delicioso perfil de sabor terroso de banana, como se você estivesse comendo uma banana madura. A Blue Banana proporciona um efeito que vai chegando aos poucos, oferecendo foco e relaxamento corporal profundo. Feita com 100% Live Resin, preservando todos os sabores e moléculas terapêuticas da planta.",
    details: [
      "Alta concentração de THC",
      "Tipo: Indica",
      "Formato: Disposable Straw (Caneta Descartável)",
      "Conteúdo: 500mg (0.018oz)",
      "Extração: 100% Live Resin",
      "Efeitos principais: Foco, Relaxamento",
      "Sabor: Banana terrosa, doce",
      "Certificado: Preserve The Terps™ Verified",
      "Origem: Jeeter - Califórnia, EUA"
    ],
    images: ["/images/blue-banana-1.webp"],
    category: "Canetas",
    inStock: true,
    rating: 4.9,
    reviewCount: 47,
    reviews: [
      {
        id: "r1",
        author: "Lucas M.",
        rating: 5,
        date: "2026-01-18",
        comment: "Mano, essa parada é sinistro demais! O gosto de banana é suave, não é artificial. Bati duas e já tava no mundão, super relaxado. Recomendo demais, mó qualidade!"
      },
      {
        id: "r2",
        author: "Fernanda S.",
        rating: 5,
        date: "2026-01-15",
        comment: "Caraca, que brisa boa! Fiquei focada e ao mesmo tempo relaxada, perfeito pra ver um filminho. O sabor é diferenciado, parece banana de verdade. Top demais!"
      },
      {
        id: "r3",
        author: "Pedro H.",
        rating: 4,
        date: "2026-01-12",
        comment: "Cheguei em casa do trampo morto e essa caneta me salvou! Relaxou toda a tensão do corpo. Só não dou 5 estrelas porque queria que durasse mais, mas a qualidade é braba!"
      },
      {
        id: "r4",
        author: "Juliana R.",
        rating: 5,
        date: "2026-01-08",
        comment: "Gente, isso aqui é outro nível! Nunca tinha experimentado Live Resin e agora não quero outra coisa. A Blue Banana virou minha strain favorita, mó vibe tranquila."
      },
      {
        id: "r5",
        author: "Rafael C.",
        rating: 5,
        date: "2026-01-05",
        comment: "Pô, comprei pra testar a marca e curti demais! O vapor é suave, não arranha a garganta. A onda é boa, deixa chapado mas funcional. Já vou pedir mais!"
      }
    ]
  }
];

export const categories: string[] = ["Canetas", "Vapes", "Comestíveis"];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};
