import React, { useState } from "react";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";

const AdminLayout = ({ children }) => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <header className="w-full sticky top-0 bg-white shadow-md py-4 px-8 z-[999]">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            <a href="/" className="hover:text-blue-600">
              Mocco Mart
              <span className="text-xl font-bold text-red-400 rounded-2xl">
                .
              </span>
            </a>
          </h1>

          {/* <nav className="space-x-6 text-gray-700 font-medium hidden lg:block">
            <a href="/" className="hover:text-blue-600">
              Home
            </a>
          </nav> */}
          <div className="flex justify-between items-center text-black">
            <div className="hidden md:block">
              <CustomFormInput
                placeholder="What are you looking for?"
                name="search"
                value={search}
                icon={true}
                onChange={handleChange}
                required
              />
            </div>
            <SearchIcon className="text-gray-500 text-xl md:invisible" />
            <div className="flex justify-between items-center gap-3 pl-4">
              <PersonOutlineIcon
                className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                fontSize="large"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="flex bg-gray-100 min-h-screen">
        <div className="flex-1">{children}</div>
      </div>
      <div className="w-full bg-black px-4 text-center">
        <p className="text-center text-gray-500 py-5 border-t border-gray-700 text-sm">
          © {new Date().getFullYear()} Mocco Mart. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default AdminLayout;
