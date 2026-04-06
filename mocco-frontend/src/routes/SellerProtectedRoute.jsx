import { Navigate, Outlet, useParams } from "react-router-dom";

export function SellerProtectedRoute({ isSellerAuthenticated, seller, children }) {
  const { sellerId } = useParams();

  if (!isSellerAuthenticated || !seller?._id) {
    return <Navigate to="/shop-login" replace />;
  }

  if (sellerId && seller._id !== sellerId) {
    return <Navigate to={`/shop/${seller._id}`} replace />;
  }

  return children;
}

export function SellerAuthRoute({ isSellerAuthenticated, seller, children }) {
  if (isSellerAuthenticated && seller?._id) {
    return <Navigate to={`/shop/${seller._id}`} replace />;
  }

  return children;
}

export function SellerRoutesLayout() {
  return <Outlet />;
}
