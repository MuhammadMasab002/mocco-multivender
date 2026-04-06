import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminPanel from "../pages/AdminPanel";
import { AdminProtectedRoute } from "./AdminProtectedRoute.jsx";

export function renderAdminRoutes({ isUserAuthenticated, user }) {
  return (
    <Route
      path="/admin"
      element={
        <AdminProtectedRoute isUserAuthenticated={isUserAuthenticated} user={user}>
          <AdminLayout>
            <AdminPanel />
          </AdminLayout>
        </AdminProtectedRoute>
      }
    />
  );
}
