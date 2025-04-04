import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCheckout } from "../context/CheckoutContext";


const CheckoutPage: React.FC = () => {
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
      setShippingInfo(values); // 
      console.log("Shipping info saved:", values);
      // Handle form submission (e.g., move to payment logic)
    },
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white text-black rounded-2xl shadow-lg p-6 space-y-8">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-8">

          {/* Shipping Info */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="input"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.fullName}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  className="input"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.address}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="input"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.city}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="input"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.state}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  className="input"
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.zip && formik.errors.zip && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.zip}</p>
                )}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;