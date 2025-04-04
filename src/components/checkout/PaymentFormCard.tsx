import { useFormik } from "formik";
import * as Yup from "yup";
import { trackEvent } from "../../lib/analytics";


type Props = {
  onNext: () => void;
  onBack: () => void;
};

const PaymentFormCard = ({ onNext, onBack }: Props) => {
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, "Must be a 16-digit card number")
        .required("Required"),
      expiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Must be in MM/YY format")
        .required("Required"),
      cvv: Yup.string()
        .matches(/^\d{3}$/, "Must be a 3-digit CVV")
        .required("Required"),
    }),
    onSubmit: (values) => {
        console.log("Mock payment info:", values);
        trackEvent("Submit Payment", "Checkout", "Payment Form");
      
        onNext(); 
      },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            className="input"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.cardNumber}</p>
          )}

          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            className="input"
            value={formik.values.expiry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.expiry && formik.errors.expiry && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.expiry}</p>
          )}

          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            className="input"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.cvv}</p>
          )}
        </div>
      </section>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 text-black px-6 py-3 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Back
        </button>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
        >
          Review Order
        </button>
      </div>
    </form>
  );
};

export default PaymentFormCard;
