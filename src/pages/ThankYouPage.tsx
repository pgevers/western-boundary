import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="bg-white text-black rounded-2xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order! 🎉</h1>
        <p className="mb-6 text-gray-700">We’ve received your order and are getting it ready for you.</p>

        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl shadow hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
