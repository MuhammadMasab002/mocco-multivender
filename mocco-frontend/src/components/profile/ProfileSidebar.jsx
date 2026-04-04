import React from "react";

const ProfileSidebar = ({ userName, userEmail, tabs, activeTab, onTabChange }) => {
  return (
    <aside className="lg:sticky lg:top-8 h-fit bg-white/85 backdrop-blur border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-gray-50 to-red-50/60">
        <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm ring-4 ring-white">
          <span className="text-lg font-semibold">{userName?.charAt(0) || "U"}</span>
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
              className={`w-full rounded-2xl px-4 py-3.5 flex items-center justify-between text-left transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-black text-white border-black shadow-lg shadow-black/10"
                  : "bg-white text-gray-700 border-transparent hover:bg-gray-50 hover:border-gray-200"
              }`}
            >
              <span className="flex items-center gap-3 font-medium text-sm sm:text-[15px]">
                <Icon fontSize="small" />
                {tab.label}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-red-500" : "bg-current opacity-60"}`} />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default ProfileSidebar;