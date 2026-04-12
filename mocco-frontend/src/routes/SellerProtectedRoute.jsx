import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import Loader from "../layouts/Loader";

export function SellerProtectedRoute({ children }) {
  const { sellerId } = useParams();
  const {
    seller,
    isLoading: isSellerLoading,
    isSellerAuthenticated,
  } = useSelector((state) => state.seller);

  if (isSellerLoading) {
    return <Loader />;
  } else {
    if (!isSellerAuthenticated || !seller?._id) {
      return <Navigate to="/shop-login" replace />;
    }

    if (sellerId && seller._id !== sellerId) {
      return <Navigate to={`/shop/${seller._id}`} replace />;
    }
  }

  return children;
}

export function SellerAuthRoute({ children }) {
  const {
    seller,
    isLoading: isSellerLoading,
    isSellerAuthenticated,
  } = useSelector((state) => state.seller);

  if (isSellerLoading) {
    return <Loader />;
  }

  if (isSellerAuthenticated && seller?._id) {
    return <Navigate to={`/shop/${seller._id}`} replace />;
  }

  return children;
}

export function SellerRoutesLayout() {
  return <Outlet />;
}
