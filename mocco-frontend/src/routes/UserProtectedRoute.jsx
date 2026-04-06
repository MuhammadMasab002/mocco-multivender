import { Navigate } from "react-router-dom";

export function UserProtectedRoute({ isUserAuthenticated, children }) {
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function AuthRoute({ isUserAuthenticated, children }) {
  if (isUserAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
