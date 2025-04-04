import { createContext, useContext, useState, ReactNode } from "react";


type ShippingInfo = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

type CheckoutContextType = {
  shippingInfo: ShippingInfo | null;
  setShippingInfo: (info: ShippingInfo) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  return (
    <CheckoutContext.Provider value={{ shippingInfo, setShippingInfo }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
