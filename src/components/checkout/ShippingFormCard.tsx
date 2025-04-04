import { useFormik } from "formik";
import * as Yup from "yup";
import { useCheckout } from "../../context/CheckoutContext";
import { trackEvent } from "../../lib/analytics";


type Props = {
  onNext: () => void;
};

const ShippingFormCard = ({ onNext }: Props) => {
  const { setShippingInfo } = useCheckout();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string()
        .matches(/^\d{5}$/, "Must be a 5-digit ZIP")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setShippingInfo(values);
      trackEvent("Submit Shipping", "Checkout", values.email, Number(values.zip));
      onNext();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["fullName", "email", "address", "city", "state", "zip"].map((field, i) => {
            const placeholder = field === "zip" ? "ZIP Code" : field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1");
            const spanClass = field === "address" ? "md:col-span-2" : "";
            return (
              <div key={i} className={spanClass}>
                <input
                  type="text"
                  name={field}
                  placeholder={placeholder}
                  className="input"
                  value={formik.values[field as keyof typeof formik.values]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field as keyof typeof formik.touched] &&
                  formik.errors[field as keyof typeof formik.errors] && (
                    <p className="text-red-600 text-sm mt-1">
                      {formik.errors[field as keyof typeof formik.errors]}
                    </p>
                  )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="text-right">
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default ShippingFormCard;