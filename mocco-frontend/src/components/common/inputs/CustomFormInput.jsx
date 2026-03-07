import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const CustomFormInput = ({
  label,
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  required = false,
  icon = false,
  className = "",
}) => {
  const inputStyle = "w-full px-1 py-2 bg-transparent focus:outline-none";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* OUTER DIV — focus-within enables border change on input focus */}
      <div
        className={`
          flex items-center gap-2 
          border border-gray-300 rounded 
          px-2
          bg-white
          focus-within:border-red-500 
          focus-within:ring-2 
          focus-within:ring-red-400
          transition
          ${className}
        `}
      >
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${inputStyle}`}
        />

        {icon && <SearchIcon className="text-gray-500 text-xl" />}
      </div>
    </div>
  );
};

export default CustomFormInput;
