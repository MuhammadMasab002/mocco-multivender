import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function AdminProtectedRoute({ children }) {
  const {
    user,
    isLoading: isUserLoading,
    isUserAuthenticated,
  } = useSelector((state) => state.user);

  if (!isUserLoading) {
    if (!isUserAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (user?.role !== "admin") {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
