import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Checkout from "./pages/CheckOut";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ShopCreate from "./pages/ShopCreate";
import ShopLogin from "./pages/ShopLogin";
import Wishlist from "./pages/WishList";
import MyProfile from "./pages/MyProfile";
import AdminLayout from "./layouts/AdminLayout";
import AdminPanel from "./pages/AdminPanel";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import BestSellingPage from "./pages/BestSellingPage";
import FAQ from "./pages/FAQ";
import Events from "./pages/Events";
import EmailActivation from "./pages/EmailActivation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./services/store/actions/user";
import { loadSeller } from "./services/store/actions/seller";

// User routes
function UserProtectedRoute({ isUserAuthenticated, children }) {
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AuthRoute({ isUserAuthenticated, children }) {
  if (isUserAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Seller routes
function SellerAuthRoute({ isSellerAuthenticated, children }) {
  if (isSellerAuthenticated) {
    return <Navigate to="/shop-dashboard" replace />;
  }

  return children;
}

// Admin routes
function AdminRoute({ isUserAuthenticated, user, children }) {
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const dispatch = useDispatch();

  const {
    user,
    isLoading: isUserLoading,
    isUserAuthenticated,
  } = useSelector((state) => state.user);
  const { isLoading: isSellerLoading, isSellerAuthenticated } = useSelector(
    (state) => state.seller,
  );

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);

  if (isUserLoading || isSellerLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
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
          <Route
            path="/product-detail/:productId"
            element={<ProductDetail />}
          />
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
          {/* Seller Routes */}
          <Route
            path="/shop-login"
            element={
              <SellerAuthRoute isSellerAuthenticated={isSellerAuthenticated}>
                <ShopLogin />
              </SellerAuthRoute>
            }
          />
          <Route
            path="/shop-create"
            element={
              <SellerAuthRoute isSellerAuthenticated={isSellerAuthenticated}>
                <ShopCreate />
              </SellerAuthRoute>
            }
          />

          <Route path="/activate" element={<EmailActivation />} />
          <Route path="/activate/:token" element={<EmailActivation />} />
          <Route path="/seller/activate/:token" element={<EmailActivation />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            <AdminRoute isUserAuthenticated={isUserAuthenticated} user={user}>
              <AdminLayout>
                <AdminPanel />
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
