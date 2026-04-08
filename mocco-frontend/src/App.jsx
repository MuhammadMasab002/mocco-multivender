import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./services/store/actions/user";
import { loadSeller } from "./services/store/actions/seller";
import { AdminProtectedRoute } from "./routes/AdminProtectedRoute.jsx";
import {
  SellerAuthRoute,
  SellerProtectedRoute,
  SellerRoutesLayout,
} from "./routes/SellerProtectedRoute.jsx";
import { AuthRoute, UserProtectedRoute } from "./routes/UserProtectedRoute.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Checkout from "./pages/CheckOut.jsx";
import Cart from "./pages/Cart.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import BestSellingPage from "./pages/BestSellingPage.jsx";
import Events from "./pages/Events.jsx";
import Wishlist from "./pages/WishList.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import About from "./pages/About.jsx";
import FAQ from "./pages/FAQ.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ShopLogin from "./pages/ShopLogin.jsx";
import ShopCreate from "./pages/ShopCreate.jsx";
import EmailActivation from "./pages/EmailActivation.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import ShopDashboard from "./pages/ShopDashboard.jsx";
import MyShop from "./pages/MyShop.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          <Route
            path="/product-detail/:productId"
            element={<ProductDetail />}
          />

          <Route
            path="/wishlist"
            element={
              <UserProtectedRoute>
                <Wishlist />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <UserProtectedRoute>
                <Checkout />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <UserProtectedRoute>
                <Cart />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/my-profile"
            element={
              <UserProtectedRoute>
                <MyProfile />
              </UserProtectedRoute>
            }
          />

          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<Events />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />

          <Route
            path="/login"
            element={
              <AuthRoute>
                <SignIn />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />

          {/* shop routes */}
          <Route
            path="/shop-login"
            element={
              <SellerAuthRoute>
                <ShopLogin />
              </SellerAuthRoute>
            }
          />

          <Route
            path="/shop-create"
            element={
              <SellerAuthRoute>
                <ShopCreate />
              </SellerAuthRoute>
            }
          />

          <Route
            path="/shop/:sellerId/*"
            element={
              <SellerProtectedRoute>
                <SellerRoutesLayout />
              </SellerProtectedRoute>
            }
          >
            <Route index element={<MyShop />} />
          </Route>

          <Route path="/activate" element={<EmailActivation />} />
          <Route path="/activate/:token" element={<EmailActivation />} />
          <Route path="/seller/activate/:token" element={<EmailActivation />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminPanel />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/shop-dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboard />
            </SellerProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
