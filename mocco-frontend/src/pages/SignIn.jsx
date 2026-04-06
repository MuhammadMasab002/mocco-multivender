import { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser } from "../services/store/actions/user";
import LoginIcon from "@mui/icons-material/Login";

const SignIn = () => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  // const { loading, isUserAuthenticated } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      console.error("Please fill in all fields");
      return;
    }
    try {
      // Make API call to login user using axios
      const { data } = await axios.post(`${backendUrl}/user/login`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data?.success) {
        dispatch(loadUser());
        // Reset form
        setFormData({
          email: "",
          password: "",
        });

        navigate("/");
        // window.location.reload(true); // Reload the page to update the UI with the new authentication state
      } else {
        console.error("Login failed: ", data);
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to sign in. Please try again.";
      alert(`Login failed: ${message}`);
    }
  };

  return (
    <section className="w-full min-h-[78vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_16px_60px_rgba(15,23,42,0.08)]">
      <div className="relative hidden lg:flex items-center justify-center px-8 py-10 bg-linear-to-br from-red-700 via-red-600 to-orange-500 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%),radial-gradient(circle_at_80%_80%,#fff_0,transparent_40%)]" />
        <div className="relative max-w-md">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-3 text-red-100">
            Welcome Back
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Sign in and continue your shopping journey.
          </h1>
          <p className="text-base text-red-50/90">
            Access your saved cart, orders, and profile details in a few
            seconds.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-sm">
            <LoginIcon fontSize="small" />
            <span className="text-sm font-medium">
              Protected account access
            </span>
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
              Login to Mocco Mart
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
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
              placeholder="Enter your password"
              name="password"
              autoComplete="current-password"
              icon={false}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="pt-2">
              <CustomButton buttonText="Login" type="submit" variant="danger" />
            </div>

            <CustomButton
              buttonText="Forget Password?"
              type="button"
              variant="textDanger"
              onClick={() => alert("Forget Password successfully")}
            />

            <p className="text-center text-sm text-gray-600 pt-2">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-red-600 hover:text-red-700"
              >
                Sign Up
              </Link>
            </p>

            <p className="text-center text-sm text-gray-600">
              Want to sell on Mocco Mart?{" "}
              <Link
                to="/shop-create"
                className="font-semibold text-red-600 hover:text-red-700"
              >
                Create Seller Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
