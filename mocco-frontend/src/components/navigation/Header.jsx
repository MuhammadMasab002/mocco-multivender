import React, { useState } from "react";
import CustomFormInput from "../common/inputs/CustomFormInput";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from "@mui/icons-material/Search";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import CustomButton from "../common/CustomButton";

const Header = () => {
  const isLoggedInUser = localStorage.getItem("isLoggedInUser");

  // const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      alert("Logout successfully");
    } catch (error) {
      console.log("error to logout user: ", error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-semibold border-b-2 border-red-600"
      : "hover:text-red-600";

  return (
    <header className="w-full sticky top-0 bg-white shadow-md py-4 sm:px-8 z-9999">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 sm:pr-6">
          <div>
            <button
              className="text-gray-700 focus:outline-none xl:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
          <Link to="/">
            <div className="flex w-42">
              <img
                className="w-full h-full"
                src="../mocco-large-logo.png"
                alt="logo"
              />
              <span className="text-xl font-bold text-red-400 rounded-2xl">
                .
              </span>
            </div>
          </Link>
        </div>

        <div className="flex justify-between items-center gap-4 sm:gap-10 text-black">
          <nav className="space-x-6 text-gray-700 font-medium hidden xl:block">
            <NavLink to="/" end className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={getNavLinkClass}>
              Products
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
            <NavLink to="/signup" className={getNavLinkClass}>
              SignUp
            </NavLink>
          </nav>
          <div className="hidden lg:block w-80 2xl:w-100">
            <CustomFormInput
              placeholder="Search what are you looking for?"
              name="search"
              value={search}
              icon={true}
              onChange={handleChange}
              required
              className="w-full!"
            />
          </div>
          <span className="lg:hidden">
            <SearchIcon className="text-gray-500 text-xl" />
          </span>
          <div className="flex justify-between items-center gap-3 pl-4 text-black">
            {!isLoggedInUser && (
                <CustomButton
                  buttonText="Start Selling"
                  variant="secondary"
                  onClick={() => alert("Start Selling successfully")}
                  className="hidden md:inline-block text-sm"
                />
            )}
            <Link className="hidden sm:block" to="/wishlist">
              <FavoriteBorderIcon
                className="rounded-full bg-gray-100 hover:text-red-600 cursor-pointer p-1"
                fontSize="large"
              />
            </Link>
            <Link className="hidden sm:block" to="/cart">
              <ShoppingCartIcon
                className="rounded-full bg-gray-100 hover:text-red-600 cursor-pointer p-1"
                fontSize="large"
              />
            </Link>

            {!isLoggedInUser && (
              <>
                <Link to="/my-profile">
                  <PersonOutlineIcon
                    className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                    fontSize="large"
                  />
                </Link>

                <Link to="/login">
                  <LogoutRoundedIcon
                    className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                    fontSize="large"
                    onClick={handleLogout}
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
