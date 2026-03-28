import React, { useState } from "react";
import CustomFormInput from "../common/inputs/CustomFormInput";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import { navItems, productData } from "../../static/data.jsx";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  // const isLoggedInUser = localStorage.getItem("isLoggedInUser");

  const { isAuthenticated } = useSelector((state) => state.user);

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

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-semibold border-b-2 border-red-600"
      : "hover:text-red-600";

  // handle navigation
  const handleNavigation = (productId) => {
    if (!productId) return;

    handleMenuClose();

    setSearch("");
    setIsSearchDropdownOpen(false); // Close the search dropdown on mobile after navigation

    navigate(`/product-detail/${productId}`);
  };

  return (
    <header className="w-full sticky top-0 bg-white shadow-md py-4 sm:px-8 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 sm:pr-6">
          <div>
            <button
              className="text-gray-700 focus:outline-none xl:hidden cursor-pointer"
              onClick={handleMenuToggle}
              aria-label="Open mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>

          <Drawer
            anchor="left"
            open={menuOpen}
            onClose={handleMenuClose}
            sx={{
              display: { xl: "none" },
              "& .MuiDrawer-paper": {
                width: 280,
                boxSizing: "border-box",
              },
            }}
          >
            <div className="flex h-full flex-col bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                <Link to="/" onClick={handleMenuClose}>
                  <div className="flex w-36 items-center">
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
                <IconButton
                  onClick={handleMenuClose}
                  aria-label="Close mobile menu"
                >
                  <CloseIcon />
                </IconButton>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5">
                <nav className="space-y-2">
                  {navItems?.map(
                    (item) =>
                      item.title == "SignUp" ||
                      (isAuthenticated && (
                        <NavLink
                          key={item.title}
                          to={item.url}
                          onClick={handleMenuClose}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-red-50 text-red-600"
                                : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                            }`
                          }
                        >
                          {item.title}
                        </NavLink>
                      )),
                  )}
                </nav>
              </div>

              <div className="border-t border-gray-200 px-4 py-4 space-y-3">
                {!isAuthenticated && (
                  <CustomButton
                    buttonText="Start Selling"
                    variant="secondary"
                    onClick={() => {
                      handleMenuClose();
                      alert("Start Selling successfully");
                    }}
                    className="w-full"
                  />
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/wishlist"
                    onClick={handleMenuClose}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <FavoriteBorderIcon fontSize="small" />
                    Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    onClick={handleMenuClose}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <ShoppingCartIcon fontSize="small" />
                    Cart
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {isAuthenticated ? (
                    <Link
                      to="/my-profile"
                      onClick={handleMenuClose}
                      className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      <PersonOutlineIcon fontSize="small" />
                      Profile
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => {
                        handleMenuClose();
                        handleLogout();
                      }}
                      className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                      <LogoutRoundedIcon fontSize="small" />
                      Logout
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Drawer>

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
            {navItems?.map(
              (item) =>
                item.title == "SignUp" ||
                (isAuthenticated && (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    className={getNavLinkClass}
                  >
                    {item.title}
                  </NavLink>
                )),
            )}
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
            {!isAuthenticated && (
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

            {isAuthenticated ? (
              <Link to="/my-profile">
                <PersonOutlineIcon
                  className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                  fontSize="large"
                />
              </Link>
            ) : (
              <Link to="/login">
                <LogoutRoundedIcon
                  className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                  fontSize="large"
                  onClick={handleLogout}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
