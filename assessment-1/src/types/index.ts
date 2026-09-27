export interface Product {
  id: number;
  name: string;
  subtitle: string;
  step: string;
  tag: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  keyIngredients: string[];
  hairTypes: string[];
  size: string;
  benefits: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: number;
  name: string;
  location: string;
  hairType: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  avatar?: string;
  date: string;
}

export interface Ingredient {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  description: string;
  benefits: string[];
  scientificFact: string;
}
