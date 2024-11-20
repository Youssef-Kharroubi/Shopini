export interface Product {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  releaseDate: Date;
  image:string;
  comments: Comment[];
  category?: string;
  description?: string;
  source: string;
}
