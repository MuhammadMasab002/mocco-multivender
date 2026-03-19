import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Checkout from "./pages/CheckOut";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wishlist from "./pages/WishList";
import MyProfile from "./pages/MyProfile";
import AdminLayout from "./layouts/AdminLayout";
// import AdminPanel from "./pages/AdminPanel";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useCallback, useEffect } from "react";
import axios from "axios";
import Products from "./pages/Products";
import BestSellingPage from "./pages/BestSellingPage";
import FAQ from "./pages/FAQ";

function App() {
  const fetchData = useCallback(async () => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_BACKEND_URL.replace(/\/$/, ""),
      );
      console.log(result.data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/products" element={<Products />} />
          <Route
            path="/product-detail/:productId"
            element={<ProductDetail />}
          />
          <Route path="/best-selling" element={<BestSellingPage />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/my-profile" element={<MyProfile />} />

          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            //  <AdminRoute user={user}>
            <AdminLayout>
              {/* <AdminPanel /> */}
              <> </>
            </AdminLayout>
            // </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
