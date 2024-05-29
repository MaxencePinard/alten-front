export interface PublicProductItem {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: string;
  rating: number;
  code: string;
}

export interface AdminProductItem {
  _id: any;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: string;
  rating: number;
  code: string;
  isSelected: boolean;
}
