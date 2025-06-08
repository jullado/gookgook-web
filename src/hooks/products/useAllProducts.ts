import { ProductModel } from "@/models/models";
import { fetchAllProducts } from "@/services/products";

export const getAllProduct = async (): Promise<ProductModel[]> => {
  const products = [] as ProductModel[];

  const data = await fetchAllProducts();
  products.push(...data);

  return products;
};
