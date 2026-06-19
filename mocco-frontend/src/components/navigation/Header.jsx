import React, { useEffect, useState } from "react";
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
import { navItems } from "../../static/data.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../services/store/actions/user.js";
import axios from "axios";
import { getAllEvents } from "../../services/store/actions/event.js";
import GlobalSearch from "./GlobalSearch.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isUserAuthenticated } = useSelector((state) => state.user);
  const { seller, isSellerAuthenticated } = useSelector(
    (state) => state.seller,
  );
  const { ids: wishlistIds } = useSelector((state) => state.wishlist);

  // api call to get events for search
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const [menuOpen, setMenuOpen] = useState(false);

  // handle logout API
  const handleLogout = async () => {
    const { data } = await axios.get(`${backendUrl}/user/logout`, {
      withCredentials: true,
    });
    if (data?.success) {
      alert("Logged out successfully.");
      dispatch(loadUser());
      navigate("/login", { replace: true });
    }
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
                  {navItems?.map((item) => {
                    if (item.title === "SignUp" && isUserAuthenticated)
                      return null;
                    return (
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
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-gray-200 px-4 py-4 space-y-3">
                <CustomButton
                  buttonText={
                    isSellerAuthenticated ? "My Shop" : "Become a Seller"
                  }
                  variant="secondary"
                  onClick={() => {
                    handleMenuClose();
                    navigate(
                      isSellerAuthenticated
                        ? `/shop/${seller?._id}`
                        : "/shop-create",
                    );
                  }}
                  className="w-full"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/wishlist"
                    onClick={handleMenuClose}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <div className="relative">
                      <FavoriteBorderIcon fontSize="small" />
                      <span className="absolute -top-1.5 -right-2 bg-green-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                        {wishlistIds.length}
                      </span>
                    </div>
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
                  {isUserAuthenticated && (
                    <>
                      <Link
                        to="/my-profile"
                        onClick={handleMenuClose}
                        className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        <PersonOutlineIcon fontSize="small" />
                        Profile
                      </Link>
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
                    </>
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

        <nav className="space-x-6 text-gray-700 font-medium hidden xl:block">
          {navItems?.map((item) => {
            if (item.title === "SignUp" && isUserAuthenticated) return null;

            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={getNavLinkClass}
              >
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex justify-between items-center gap-3 pl-4 text-black flex-1 max-w-2xl">
          <GlobalSearch />
          <CustomButton
            buttonText={isSellerAuthenticated ? "My Shop" : "Become a Seller"}
            variant="secondary"
            onClick={() =>
              navigate(
                isSellerAuthenticated ? `/shop/${seller?._id}` : "/shop-create",
              )
            }
            className="hidden md:inline-block text-sm max-w-34!"
          />

          <Link className="hidden sm:block relative" to="/wishlist">
            <FavoriteBorderIcon
              className="rounded-full bg-gray-100 hover:text-red-600 cursor-pointer p-1"
              fontSize="large"
            />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center leading-none">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          <Link className="hidden sm:block" to="/cart">
            <ShoppingCartIcon
              className="rounded-full bg-gray-100 hover:text-red-600 cursor-pointer p-1"
              fontSize="large"
            />
          </Link>

          {isUserAuthenticated ? (
            <>
              <Link to="/my-profile">
                {user?.avatar?.url ? (
                  <img
                    src={`http://localhost:8000/api/v1${user.avatar.url}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <PersonOutlineIcon
                    className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                    fontSize="large"
                  />
                )}
              </Link>
              <Link to="/login">
                <LogoutRoundedIcon
                  className="rounded-full bg-red-100 text-red-600 cursor-pointer p-1"
                  fontSize="large"
                  onClick={handleLogout}
                />
              </Link>
            </>
          ) : (
            <CustomButton
              buttonText="Login"
              variant="primary"
              onClick={() => navigate("/login")}
              className="text-sm px-0! py4! w-16!"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
