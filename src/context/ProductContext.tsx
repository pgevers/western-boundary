import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchProducts } from "../lib/sanity";

type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

type ProductContextType = {
  products: Product[];
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await fetchProducts();
      setProducts(result);
    };
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used inside ProductProvider");
  return context;
};
