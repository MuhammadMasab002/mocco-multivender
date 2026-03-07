import React from "react";
import { ChevronRight } from "@mui/icons-material";

const CategoryMenu = ({ categories = [] }) => {
  return (
    <div className="hidden lg:flex flex-col w-60 border-r pr-4">
      {categories.map((item, index) => (
        <button
          key={index}
          className="group flex items-center justify-between w-full text-left my-1 py-1 px-3 cursor-pointer rounded hover:bg-red-50 transition-colors duration-200"
        >
          <span className="text-gray-700">{item}</span>
          <ChevronRight fontSize="small" className="text-gray-400 group-hover:text-red-500" />
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
