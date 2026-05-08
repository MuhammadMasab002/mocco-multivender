import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../../../services/store/actions/coupon";

const CouponForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    minAmount: "",
    maxAmount: "",
    productId: "",
    categoryId: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { isLoading: isCouponLoading } = useSelector((state) => state.coupon);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "discount" || name === "minAmount" || name === "maxAmount"
          ? value
            ? Number(value)
            : ""
          : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code?.trim()) newErrors.code = "Coupon code is required";
    if (!formData.discount && formData.discount !== 0)
      newErrors.discount = "Discount value is required";
    if (!formData.productId)
      newErrors.productId = "Product selection is required";
    if (!formData.categoryId)
      newErrors.categoryId = "Category selection is required";

    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(createCoupon(formData));
      setSuccessMessage("Coupon created successfully!");
      setFormData({
        code: "",
        discount: "",
        minAmount: "",
        maxAmount: "",
        productId: "",
        categoryId: "",
      });
      setErrors({});

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors({ submit: error.message || "Failed to create coupon" });
    }
  };

  const categories = [
    "Computers and Laptops",
    "Mobile and Tablets",
    "Music and Gaming",
    "Others",
  ];

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:p-8"
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Create Coupon
      </h2>

      {successMessage && (
        <div className="mt-4 rounded-lg bg-green-100 px-4 py-3 text-green-700">
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">
          {errors.submit}
        </div>
      )}

      <div className="mt-8 space-y-6">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Coupon Code <span className="text-rose-500">*</span>
          </span>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="e.g. OFF20"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
          {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
        </label>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Min Amount
            </span>
            <input
              type="number"
              name="minAmount"
              value={formData.minAmount}
              onChange={handleInputChange}
              placeholder="$100"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Max Amount
            </span>
            <input
              type="number"
              name="maxAmount"
              value={formData.maxAmount}
              onChange={handleInputChange}
              placeholder="$500"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Select Category <span className="text-rose-500">*</span>
            </span>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">{errors.categoryId}</p>
            )}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Select Product <span className="text-rose-500">*</span>
            </span>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select Product</option>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))
              ) : (
                <option disabled>No products available</option>
              )}
            </select>
            {errors.productId && (
              <p className="text-sm text-red-500">{errors.productId}</p>
            )}
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Discount Value (%) <span className="text-rose-500">*</span>
          </span>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            placeholder="10%"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
          {errors.discount && (
            <p className="text-sm text-red-500">{errors.discount}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={isCouponLoading}
          className="inline-flex items-center justify-center rounded-xl cursor-pointer bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isCouponLoading ? "Creating..." : "Create Coupon"}
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
