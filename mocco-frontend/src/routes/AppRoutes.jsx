import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Checkout from "../pages/CheckOut";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Wishlist from "../pages/WishList";
import MyProfile from "../pages/MyProfile";
import Contact from "../pages/Contact";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import BestSellingPage from "../pages/BestSellingPage";
import FAQ from "../pages/FAQ";
import Events from "../pages/Events";
import EmailActivation from "../pages/EmailActivation";
import { AuthRoute, UserProtectedRoute } from "./UserProtectedRoute.jsx";
import { renderShopRoutes } from "./ShopRoutes.jsx";
import { renderAdminRoutes } from "./AdminRoutes.jsx";

export default function AppRoutes({
  user,
  seller,
  isUserAuthenticated,
  isSellerAuthenticated,
}) {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/checkout"
          element={
            <UserProtectedRoute isUserAuthenticated={isUserAuthenticated}>
              <Checkout />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <UserProtectedRoute isUserAuthenticated={isUserAuthenticated}>
              <Cart />
            </UserProtectedRoute>
          }
        />

        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<Events />} />

        <Route
          path="/wishlist"
          element={
            <UserProtectedRoute isUserAuthenticated={isUserAuthenticated}>
              <Wishlist />
            </UserProtectedRoute>
          }
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/my-profile"
          element={
            <UserProtectedRoute isUserAuthenticated={isUserAuthenticated}>
              <MyProfile />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <AuthRoute isUserAuthenticated={isUserAuthenticated}>
              <SignIn />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute isUserAuthenticated={isUserAuthenticated}>
              <SignUp />
            </AuthRoute>
          }
        />

        {renderShopRoutes({ isSellerAuthenticated, seller })}

        <Route path="/activate" element={<EmailActivation />} />
        <Route path="/activate/:token" element={<EmailActivation />} />
        <Route path="/seller/activate/:token" element={<EmailActivation />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {renderAdminRoutes({ isUserAuthenticated, user })}
    </Routes>
  );
}
