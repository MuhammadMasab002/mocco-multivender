import Header from "../components/navigation/Header";
import Footer from "../components/navigation/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container px-4 py-6 flex flex-col m-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
