import { Navigate } from "react-router-dom";

export function AdminProtectedRoute({ isUserAuthenticated, user, children }) {
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
