export type Product = {
    _id: string;
    name: string;
    price: number;
    image?: { asset: { url: string } };
    slug?: { current: string };
  };
  