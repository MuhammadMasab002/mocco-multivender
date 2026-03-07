import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData) return;
    try {
      alert("Signup successfully");
      console.log("Signup successfully:", formData);
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2  py-2">
        {/* LEFT IMAGE (Hidden on mobile) */}
        <div className="hidden lg:flex items-center justify-center">
          <div
            className="w-full h-140 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          ></div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center py-10 px-6">
          <div className="w-full max-w-md">
            {/* Headings */}
            <h2 className="text-4xl font-bold text-left  text-black mb-8">
              Create an Account
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
                type={"text"}
                placeholder={"Name"}
                name="name"
                icon={false}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <CustomFormInput
                type={"email"}
                placeholder={"Email or Phone Number"}
                name="email"
                icon={false}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <CustomFormInput
                type="password"
                placeholder="Password"
                name="password"
                icon={false}
                value={formData.password}
                onChange={handleChange}
                required
              />

              <CustomButton
                buttonText={"Create Account"}
                type="submit"
                variant={"danger"}
              />
              <CustomButton
                buttonText={"Sign up with Google"}
                type="submit"
                variant={"secondary"}
                onClick={() => alert("Sign up with google successfully")}
              />
              <div className="flex justify-center items-center gap-2 mt-4">
                <p className="text-center text-gray-600">
                  Already have an account?
                </p>
                <div>
                  <CustomButton
                    buttonText={"Login"}
                    type="submit"
                    variant={"textDanger"}
                    className="py-0! px-1!"
                    onClick={() => navigate("/login")}
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

export default SignUp;
