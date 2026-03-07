import React from "react";

const CustomButton = ({
  buttonText = "Click Me",
  onClick,
  type = "button",
  variant = "danger",
  disabled = false,
  className = "",
}) => {
  const baseStyle =
    "w-full text-base px-4 py-2 rounded cursor-pointer font-medium transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    dark: "bg-gray-800 text-white hover:bg-gray-900 active:bg-black disabled:bg-gray-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-60",
    success:
      "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 disabled:bg-green-300",
    textDanger:
      "bg-transparent text-red-600 font-semibold hover:underline disabled:text-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;
