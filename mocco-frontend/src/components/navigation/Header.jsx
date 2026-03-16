import React, { useState } from "react";
import CustomFormInput from "../common/inputs/CustomFormInput";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import { productData } from "../../static/data.jsx";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedInUser = localStorage.getItem("isLoggedInUser");

  // const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const handleLogout = () => {
    try {
      alert("Logout successfully");
    } catch (error) {
      console.log("error to logout user: ", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // filter search
    const filteredData =
      productData &&
      productData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
    setSearchData(filteredData);
  };

  const handleSearchDropdownToggle = () => {
    setIsSearchDropdownOpen((prev) => !prev);
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-semibold border-b-2 border-red-600"
      : "hover:text-red-600";

  // handle navigation
  const handleNavigation = (productId) => {
    if (!productId) return;

    setMenuOpen(false); // Close the menu after navigation

    setSearch("");
    setIsSearchDropdownOpen(false); // Close the search dropdown on mobile after navigation

    navigate(`product-detail/${productId}`);
  };

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
          <div className="hidden lg:block w-80 2xl:w-100 relative">
            <CustomFormInput
              placeholder="Search what are you looking for?"
              name="search"
              value={search}
              icon={true}
              onChange={handleSearchChange}
              required
              className="w-full!"
            />
            {/* desktop search */}
            <div
              className={`absolute top-full left-0 w-full bg-white border border-red-300 rounded-md mt-1 z-10 overflow-hidden origin-top transition-all duration-300 ease-out delay-75 ${
                search
                  ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {searchData && searchData?.length !== 0 ? (
                <div
                  className={`transition-all duration-200 ease-in-out delay-100 ${
                    search
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1"
                  }`}
                >
                  <div className="py-2 px-1 overflow-y-auto max-h-100">
                    {searchData?.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className="flex p-2 hover:bg-red-50 cursor-pointer"
                      >
                        {/* item image */}
                        <div className="w-10 h-10 mr-3 shrink-0">
                          <img
                            src={item.image_Url[1].url}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className={`transition-all duration-200 ease-in-out delay-100 ${
                    search
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1"
                  }`}
                >
                  <div className="p-2 text-gray-500">No results found</div>
                </div>
              )}
            </div>
          </div>

          {/* mobile search */}
          <span className="lg:hidden">
            <SearchIcon
              onClick={handleSearchDropdownToggle}
              className="text-gray-500 text-xl cursor-pointer"
            />
          </span>

          <div
            className={`lg:hidden absolute top-full left-4 right-4 bg-white border border-red-300 rounded-md mt-1 z-10 overflow-hidden origin-top transition-all duration-300 ease-out delay-75 ${
              isSearchDropdownOpen
                ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="p-3 border-b border-gray-200">
              <CustomFormInput
                placeholder="Search what are you looking for?"
                name="mobile-search"
                value={search}
                icon={true}
                onChange={handleSearchChange}
                required
                className="w-full!"
              />
            </div>

            <div
              className={`transition-all duration-200 ease-in-out delay-100 ${
                search
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1"
              }`}
            >
              {search ? (
                searchData && searchData?.length !== 0 ? (
                  <div className="py-2 px-1 overflow-y-auto max-h-100">
                    {searchData?.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className="flex p-2 hover:bg-red-50 cursor-pointer"
                      >
                        <div className="w-10 h-10 mr-3 shrink-0">
                          <img
                            src={item.image_Url[1].url}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-gray-500">No results found</div>
                )
              ) : null}
            </div>
          </div>
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
