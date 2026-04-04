import { useEffect, useMemo, useState } from "react";
import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const SignUp = () => {
  const navigate = useNavigate();

  // VITE_BACKEND_URL from .env file
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });

  const avatarPreview = useMemo(() => {
    if (!formData.file) return "";
    return URL.createObjectURL(formData.file);
  }, [formData.file]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "file" ? files?.[0] || null : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData) return;
    try {
      // Make API call to register user using axios
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const { data } = await axios.post(
        `${backendUrl}/user/register`,
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
        setFormData({
          name: "",
          email: "",
          password: "",
          file: null,
        });
        navigate("/login");
      } else {
        console.error("Registration failed:", data);
        alert("Registration failed: " + data.message);
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
      <div className="relative hidden lg:flex items-center justify-center px-8 py-10 bg-linear-to-br from-gray-900 via-red-700 to-red-500 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%),radial-gradient(circle_at_80%_80%,#fff_0,transparent_40%)]" />
        <div className="relative max-w-md">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-3 text-red-100">
            Join Mocco Mart
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Create your account and start shopping smarter.
          </h1>
          <p className="text-base text-red-50/90">
            Track orders, save addresses, and manage everything from one
            account.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-sm">
            <PersonAddAlt1Icon fontSize="small" />
            <span className="text-sm font-medium">Fast and secure sign up</span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-8 sm:py-10 flex items-center justify-center bg-white">
        <div className="w-full max-w-xl">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-red-500 mb-2">
              Customer Account
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Create an Account
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Enter your details below to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <CustomFormInput
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              name="name"
              autoComplete="name"
              icon={false}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <CustomFormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              name="email"
              autoComplete="email"
              icon={false}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <CustomFormInput
              label="Password"
              type="password"
              placeholder="Enter password"
              name="password"
              autoComplete="new-password"
              icon={false}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Profile Avatar
              </label>
              <div className="border border-dashed border-gray-300 rounded-xl p-3 sm:p-4 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-full border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PersonAddAlt1Icon className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="user-avatar"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                  >
                    Upload a file
                  </label>
                  <p className="text-xs text-gray-500 mt-2 truncate">
                    {formData.file ? formData.file.name : "PNG, JPG up to 5MB"}
                  </p>
                  <input
                    type="file"
                    id="user-avatar"
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
                buttonText="Create Account"
                type="submit"
                variant="danger"
              />
            </div>

            <CustomButton
              buttonText="Sign up with Google"
              type="button"
              variant="secondary"
              onClick={() => alert("Sign up with google successfully")}
            />

            <p className="text-center text-sm text-gray-600 pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-red-600 hover:text-red-700"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
