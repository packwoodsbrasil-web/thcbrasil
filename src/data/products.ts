import { Product } from "@/types/product";

export const products: Product[] = [];

export const categories: string[] = ["Canetas", "Vapes", "Comestíveis"];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};
