import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
      });

      if (data.success) {
        // Store token in localStorage or context
        // localStorage.setItem("token", data.token);
        // Reset form
        setFormData({
          email: "",
          password: "",
        });

        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-2">
        {/* Left Image (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center justify-center">
          <div
            className="w-full h-140 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          ></div>
        </div>

        {/* Right Form Section */}
        <div className="flex items-center justify-center py-10 px-6">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-left text-black mb-8">
              Login to Mocco Mart.
            </h2>

            <p className="text-left text-black mb-6">
              Enter your details below
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 text-black"
            >
              <CustomFormInput
                type={"email"}
                placeholder={"Email or Phone Number"}
                name="email"
                autoComplete="email"
                icon={false}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <CustomFormInput
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                icon={false}
                value={formData.password}
                onChange={handleChange}
                required
              />

              <CustomButton
                buttonText={"Login"}
                type="submit"
                variant={"danger"}
              />
              <CustomButton
                buttonText={"Forget Password?"}
                type="submit"
                variant={"textDanger"}
                onClick={() => alert("Forget Password successfully")}
              />
              <div className="flex justify-center items-center gap-2 mt4">
                <p className="text-center text-gray-600">
                  Don't have an account?
                </p>
                <div>
                  <CustomButton
                    buttonText={"Sign Up"}
                    type="submit"
                    variant={"textDanger"}
                    className="py-0! px-1!"
                    onClick={() => navigate("/signup")}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
