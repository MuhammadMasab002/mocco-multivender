import React from "react";
import { ChevronRight } from "@mui/icons-material";

const CategoryMenu = ({ categories = [], handleCategoryClick }) => {
  return (
    <div className="hidden lg:flex flex-col w-70 border-r pr-4">
      {/* categories heading */}
      <h2 className="text-lg font-semibold mb-1 px-1 text-black">Categories</h2>
      {/* Category Menu */}
      {categories?.map((item) => (
        <button
          key={item.title}
          title={item.title}
          onClick={(e) => handleCategoryClick(e)}
          className="group flex items-center justify-between w-full text-left my-0.5 py-1 px-1 cursor-pointer rounded hover:bg-red-100 transition-colors duration-200"
        >
          <span className="text-gray-700 truncate">{item.title}</span>
          {item.subcategories && item.subcategories.length > 0 && (
            <ChevronRight
              fontSize="small"
              className="text-gray-400 group-hover:text-red-500"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
