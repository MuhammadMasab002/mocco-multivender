import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  // VITE_BACKEND_URL from .env file
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });

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
      formDataToSend.append("file", formData.file);
      const { data } = await axios.post(
        `${backendUrl}/user/register`,
        formDataToSend,
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
        alert("Registration failed: " + data.message);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      alert(
        "Registration failed: " + err.response?.data?.message ||
          "An error occurred",
      );
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

              {/* create file upload input with preview */}
              <div className="flex items-center gap-x-4">
                <img
                  src={
                    formData.file
                      ? URL.createObjectURL(formData.file)
                      : "https://dummyimage.com/200x200/e2e8f0/64748b.png&text=User"
                  }
                  alt="Profile Preview"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <label
                  htmlFor="file"
                  className="text-left text-gray-700 border border-gray-300 py-1 px-4 cursor-pointer rounded-md"
                >
                  Upload a file
                </label>
                {/* <CustomFormInput
                  type="file"
                  placeholder="Profile Picture"
                  name="file"
                  icon={false}
                  value={formData.file}
                  onChange={handleChange}
                  required
                  accept="image/*"
                /> */}
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>

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
