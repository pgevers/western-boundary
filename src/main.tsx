import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initGA } from './lib/analytics';
import { CartProvider } from './context/CartContext'; 
import { CheckoutProvider } from "./context/CheckoutContext";
import { ProductProvider } from "./context/ProductContext";
import App from './App'; 
import './index.css';
import './global.css';


initGA();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <CheckoutProvider>
          <BrowserRouter>
            <App /> {}
          </BrowserRouter>
          </CheckoutProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
