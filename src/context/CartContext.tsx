import { createContext, useContext, useState, ReactNode } from 'react';
import { useProducts } from './ProductContext'; // ✅ fixed import path

type CartItem = {
  productId: string;
  quantity: number;
};

type DetailedCartItem = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartItemsDetailed: () => DetailedCartItem[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { products } = useProducts(); // ✅ grab products from context

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemsDetailed = (): DetailedCartItem[] => {
    return cart.map((item) => {
      const product = products.find((p) => p._id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        name: product?.name ?? 'Unknown Product',
        price: product?.price ?? 0,
        image: product?.image,
      };
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getCartItemsDetailed }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
