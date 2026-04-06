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

function ProtectedRoute({ isUserAuthenticated, children }) {
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

  const { user, loading, isUserAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
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
              <ProtectedRoute isUserAuthenticated={isUserAuthenticated}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isUserAuthenticated={isUserAuthenticated}>
                <Cart />
              </ProtectedRoute>
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
              <ProtectedRoute isUserAuthenticated={isUserAuthenticated}>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute isUserAuthenticated={isUserAuthenticated}>
                <MyProfile />
              </ProtectedRoute>
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
          <Route
            path="/shop-create"
            element={
              // <AuthRoute isUserAuthenticated={isUserAuthenticated}>
              <ShopCreate />
              // </AuthRoute>
            }
          />
          <Route
            path="/shop-login"
            element={
              <AuthRoute isUserAuthenticated={isUserAuthenticated}>
                <ShopLogin />
              </AuthRoute>
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
