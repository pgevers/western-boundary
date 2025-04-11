export type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  brand?: string;
  slug?: { current: string };
  images?: {
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }[];
};
  