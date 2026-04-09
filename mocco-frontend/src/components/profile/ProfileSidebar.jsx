import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ProfileSidebar = ({
  userName,
  userEmail,
  tabs,
  activeTab,
  onTabChange,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = React.useRef(null);

  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Sidebar Layout */}
      <aside className="hidden lg:block lg:sticky lg:top-20 h-fit bg-white/85 backdrop-blur border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-linear-to-r from-gray-50 to-red-50/60">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-md ring-4 ring-white transform hover:scale-105 transition-transform">
            <span className="text-lg font-bold">
              {userName?.charAt(0) || "U"}
            </span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl text-gray-900 font-semibold leading-tight">
              {userName}
            </h3>
            <p className="text-sm sm:text-base text-gray-500">{userEmail}</p>
          </div>
        </div>

        <div className="p-3 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`w-full rounded-2xl px-4 py-3.5 flex items-center justify-between text-left transition-all duration-300 cursor-pointer border group ${
                  isActive
                    ? "bg-linear-to-r from-black to-black text-white border-red-600 shadow-lg shadow-red-500/30"
                    : "bg-white text-gray-700 border-transparent hover:bg-gray-50 hover:border-gray-200"
                }`}
              >
                <span className="flex items-center gap-3 font-medium text-sm sm:text-[15px]">
                  <Icon
                    fontSize="small"
                    className={`transition-transform ${isActive ? "group-hover:rotate-12" : ""}`}
                  />
                  {tab.label}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all ${isActive ? "bg-white" : "bg-current opacity-0 group-hover:opacity-40"}`}
                />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile/Tablet Horizontal Navigation */}
      <div className="lg:hidden mb-6">
        {/* User Info Card - Mobile */}
        <div className="bg-linear-to-r from-gray-50 to-red-50/60 rounded-2xl border border-gray-200 p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-md ring-3 ring-white">
              <span className="text-base font-bold">
                {userName?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg text-gray-900 font-semibold truncate">
                {userName}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Tabs Navigation */}
        <div className="relative">
          {/* Scroll buttons */}
          {scrollPosition > 0 && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:bg-gray-50 text-gray-700 hover:text-gray-900"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon fontSize="small" />
            </button>
          )}

          {/* Tabs Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-2 py-3 px-1 mx-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  title={tab.label}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 border shrink-0 snap-start group ${
                    isActive
                      ? "bg-black text-white border-red-600 shadow-lg shadow-red-500/30"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <Icon
                    fontSize="small"
                    className={`transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                  />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll right button - Show based on scroll position */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            aria-label="Scroll right"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProfileSidebar;
