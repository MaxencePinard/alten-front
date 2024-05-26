export interface PublicProductItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: string;
  rating: number;
  code: string;
}

export interface AdminProductItem {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: string;
  rating: number;
  code: string;
  isSelected: boolean;
}
