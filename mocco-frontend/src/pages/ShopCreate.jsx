import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialFormData = {
  name: "",
  phoneNumber: "",
  email: "",
  address: "",
  zipCode: "",
  password: "",
  file: null,
};

const ShopCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const logoPreview = useMemo(() => {
    if (!formData.file) return "";
    return URL.createObjectURL(formData.file);
  }, [formData.file]);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "file" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData) return;
    if (!formData.file) {
      alert("Please upload your shop logo avatar.");
      return;
    }
    try {
      // Make API call to register shop using axios
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("zipCode", formData.zipCode);
      formDataToSend.append("password", formData.password);

      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const { data } = await axios.post(
        `${backendUrl}/shop/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.success) {
        alert(data.message);
        // Reset form
        setFormData(initialFormData);
        navigate("/shop-login");
      } else {
        console.error(
          "Shop registration failed:",
          data.message || "Unknown error",
        );
        alert(`Shop registration failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred";

      alert(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <section className="w-full min-h-[78vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_16px_60px_rgba(15,23,42,0.08)]">
      <div className="relative hidden lg:flex items-center justify-center px-8 py-10 bg-linear-to-br from-red-600 via-red-500 to-orange-500 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%),radial-gradient(circle_at_80%_80%,#fff_0,transparent_40%)]" />
        <div className="relative max-w-md">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-3 text-red-100">
            Become a Seller
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Start your own store on Mocco Mart.
          </h1>
          <p className="text-base text-red-50/90">
            Open your shop, upload your brand logo, and manage your products
            from one simple dashboard.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-sm">
            <StorefrontIcon fontSize="small" />
            <span className="text-sm font-medium">
              Trusted by growing sellers
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-8 sm:py-10 flex items-center justify-center bg-white">
        <div className="w-full max-w-xl">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-red-500 mb-2">
              Seller Account
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Create Your Shop
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Fill in your business details to sign up as a seller.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div className="grid grid-cols-1 gap-4">
              <CustomFormInput
                label="Shop Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your shop name"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomFormInput
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. +92 300 1234567"
                required
              />
              <CustomFormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <CustomFormInput
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter shop address"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomFormInput
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Enter zip code"
                required
              />
              <CustomFormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Enter password"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Shop Logo Avatar <span className="text-red-500">*</span>
              </label>
              <div className="border border-dashed border-gray-300 rounded-xl p-3 sm:p-4 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-full border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Shop logo preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <StorefrontIcon className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="shop-logo"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                  >
                    Upload a file
                  </label>
                  <p className="text-xs text-gray-500 mt-2 truncate">
                    {formData.file ? formData.file.name : "PNG, JPG up to 5MB"}
                  </p>
                  <input
                    id="shop-logo"
                    type="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <CustomButton
                buttonText="Sign Up"
                type="submit"
                variant="danger"
              />
            </div>

            <p className="text-center text-sm text-gray-600 pt-2">
              Alread have account?{" "}
              <Link
                to="/shop-login"
                className="font-semibold text-red-600 hover:text-red-700"
              >
                sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ShopCreate;
