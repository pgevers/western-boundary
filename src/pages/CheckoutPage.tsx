import { useState } from "react";
import ShippingFormCard from "../components/checkout/ShippingFormCard";
import PaymentFormCard from "../components/checkout/PaymentFormCard";


const CheckoutPage = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white text-black rounded-2xl shadow-lg p-6 space-y-8">
        <h1 className="text-2xl font-bold">Checkout</h1>

        {step === 0 && <ShippingFormCard onNext={() => setStep(1)} />}
        {step === 1 && (
  <PaymentFormCard onNext={() => setStep(2)} onBack={() => setStep(0)} />
)}
        {step === 2 && <p>✅ ReviewSubmitCard goes here</p>}
      </div>
    </div>
  );
};

export default CheckoutPage;
