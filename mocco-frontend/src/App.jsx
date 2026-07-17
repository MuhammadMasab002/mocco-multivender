import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./services/store/actions/user";
import { loadSeller } from "./services/store/actions/seller";
import { getCart, initGuestCart } from "./services/store/actions/cart";
import { AdminProtectedRoute } from "./routes/AdminProtectedRoute.jsx";
import {
  SellerAuthRoute,
  SellerProtectedRoute,
  SellerRoutesLayout,
} from "./routes/SellerProtectedRoute.jsx";
import { AuthRoute, UserProtectedRoute } from "./routes/UserProtectedRoute.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import CheckoutLayout from "./layouts/CheckoutLayout.jsx";
import Checkout from "./pages/CheckOut.jsx";
import Payment from "./pages/Payment.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
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
import { Toaster } from "react-hot-toast";
import {
  getWishlist,
  initGuestWishlist,
} from "./services/store/actions/wishlist.js";
import { getAllProducts } from "./services/store/actions/product.js";
import { getAllEvents } from "./services/store/actions/event.js";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import axios from "axios";
import { backendUrl } from "./components/myShop/utils.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const dispatch = useDispatch();

  const { isUserAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  // function to get stripe api key from backend
  useEffect(() => {
    const fetchStripeApiKey = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/payment/stripe-api-key`,
        );
        setStripeApiKey(data.stripeKey);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStripeApiKey();
  }, []);

  // React may execute it multiple times. Instead memoize it
  const stripePromise = useMemo(() => {
    return stripeApiKey ? loadStripe(stripeApiKey) : null;
  }, [stripeApiKey]);

  // Initial Load: User, Seller, Products, Events, Guest Cart/Wishlist
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());

    dispatch(getAllEvents());
    dispatch(getAllProducts());

    dispatch(initGuestWishlist());
    dispatch(initGuestCart());
  }, [dispatch]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isUserAuthenticated) {
        await dispatch(getWishlist());
        await dispatch(getCart());
      }
    };
    fetchUserData();
  }, [isUserAuthenticated, dispatch]);

  // scroll to top on each route change
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    handleRouteChange();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* Visual Anchor: Scroll reset component sits at the root */}
      <ScrollToTop />
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
              // <UserProtectedRoute>
              <Wishlist />
              // </UserProtectedRoute>
            }
          />

          {/* Checkout Flow (Shipping & Payment share layout) */}
          <Route
            element={
              <UserProtectedRoute>
                <CheckoutLayout />
              </UserProtectedRoute>
            }
          >
            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/payment"
              element={
                stripePromise ? (
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500 text-lg">
                      Loading payment gateway...
                    </p>
                  </div>
                )
              }
            />
          </Route>

          {/* Standalone Success Page */}
          <Route
            path="/order/success"
            element={
              <UserProtectedRoute>
                <OrderSuccess />
              </UserProtectedRoute>
            }
          />

          {/* Order Detail — accessible to both users and sellers */}
          <Route
            path="/order/:orderId"
            element={
              <UserProtectedRoute>
                <OrderDetailPage />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              // <UserProtectedRoute>
              <Cart />
              // </UserProtectedRoute>
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

          <Route path="/shop/:sellerId" element={<MyShop />} />

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
