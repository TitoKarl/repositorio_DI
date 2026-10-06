export interface ProductModel {
  id: any;
  d: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
}
export interface ProductsResponse {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;
}
