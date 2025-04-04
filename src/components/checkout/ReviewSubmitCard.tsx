import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { useCart } from "../../context/CartContext";
import { trackEvent } from "../../lib/analytics";


type Props = {
  onBack: () => void;
};

const ReviewSubmitCard = ({ onBack }: Props) => {
  const { shippingInfo } = useCheckout();
  const { getCartItemsDetailed } = useCart();
  const cartItems = getCartItemsDetailed();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    console.log("✅ Order placed:", {
      shippingInfo,
      cartItems,
      total,
    });
  
    trackEvent("Order Placed", "Checkout", "Thank You Page", total); 
  
    navigate("/thank-you"); 
  };

  return (
    <div className="space-y-8">
      {/* ... UI code unchanged ... */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-200 text-black px-6 py-3 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Back
        </button>

        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmitCard;
