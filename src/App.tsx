import { Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import LandingPage from './pages/LandingPage'; 
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage"; 
import FooterNav from './components/FooterNav';
import Header from './components/Header';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-black shadow-md">
        <Header />
      </header>

      {/* Main content grows to fill screen */}
      <main className="flex-grow px-4 pt-4 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:name" element={<ProductList />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </main>

      {/* Footer stuck to bottom via flexbox, not sticky/fixed */}
      <footer className="bg-gray-900 text-white border-t border-gray-800 h-16">
        <FooterNav />
      </footer>
    </div>
  );
}

