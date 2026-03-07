import React from "react";
import { Menu, X } from "lucide-react";

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  menuItems,
  activeTab,
  setActiveTab,
}) => {
  return (
    <>
      {/* === Mobile Toggle Button === */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-20 left-0 z-[9999] bg-gray-900 text-white p-2 rounde"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* === Mobile Overlay === */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* === SIDEBAR === */}
      <div
        className={`
            bg-gray-900 text-white flex flex-col 
            h-full 
            fixed top-16 md:top-0 left-0 z-50 
            md:relative md:h-auto
            transition-all duration-300 ease-in-out
            ${
              sidebarOpen
                ? "translate-x-0 w-64"
                : "-translate-x-full md:translate-x-0 md:w-20"
            }
        `}
      >
        {/* === Header === */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* === Menu === */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2
                ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }
              `}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
