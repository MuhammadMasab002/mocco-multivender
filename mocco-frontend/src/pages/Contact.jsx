import React, { useState } from "react";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import CustomButton from "../components/common/CustomButton";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Contact</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Call To Us */}
              <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <PhoneInTalkIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-black">
                    Call To Us
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-sm font-medium text-black">Phone: +8801611112222</p>
              </div>

              <hr className="border-gray-200" />

              {/* Write To Us */}
              <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <MailOutlineIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-black">
                    Write To Us
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-sm mb-2 text-black">Emails: customer@moccomart.com</p>
                <p className="text-sm text-black">Emails: support@moccomart.com</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg p-8">
                {/* FORM */}
                <form className="flex flex-col gap-5 text-black">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <CustomFormInput
                      type={"name"}
                      placeholder={" Your Name"}
                      name="name"
                      icon={false}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <CustomFormInput
                      type={"email"}
                      placeholder={"Your Email"}
                      name="email"
                      icon={false}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <CustomFormInput
                      type="phone"
                      placeholder=" Your Phone"
                      name="phone"
                      icon={false}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Message Field */}
                  <div className="mb-2 sm:mb-6">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="8"
                      className="w-full px-2 py-3 border border-gray-300 rounded bggray-100 focus:outline-none focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-400 transition resize-none"
                    ></textarea>
                  </div>

                  <div className="w-full sm:max-w-54 flex self-end end items-center">
                    <CustomButton
                      buttonText={"Send Message"}
                      type="submit"
                      variant={"danger"}
                      className="sm:py-3"
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
