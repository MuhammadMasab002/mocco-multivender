import { Route } from "react-router-dom";
import ShopCreate from "../pages/ShopCreate";
import ShopLogin from "../pages/ShopLogin";
import ShopDashboard from "../pages/ShopDashboard";
import {
  SellerAuthRoute,
  SellerProtectedRoute,
  SellerRoutesLayout,
} from "./SellerProtectedRoute.jsx";

export function renderShopRoutes({ isSellerAuthenticated, seller }) {
  return (
    <>
      <Route
        path="/shop-login"
        element={
          <SellerAuthRoute
            isSellerAuthenticated={isSellerAuthenticated}
            seller={seller}
          >
            <ShopLogin />
          </SellerAuthRoute>
        }
      />

      <Route
        path="/shop-create"
        element={
          <SellerAuthRoute
            isSellerAuthenticated={isSellerAuthenticated}
            seller={seller}
          >
            <ShopCreate />
          </SellerAuthRoute>
        }
      />

      <Route
        path="/shop/:sellerId/*"
        element={
          <SellerProtectedRoute
            isSellerAuthenticated={isSellerAuthenticated}
            seller={seller}
          >
            <SellerRoutesLayout />
          </SellerProtectedRoute>
        }
      >
        <Route index element={<ShopDashboard />} />
      </Route>
    </>
  );
}
