import React from "react";
import CustomButton from "../common/CustomButton";

const LogoutTab = ({ onLogout }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-80 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">Session</p>
      <h2 className="text-2xl sm:text-3xl text-gray-900 font-semibold mb-3 tracking-tight">Logout</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md">Log out from your account to end the current session and return to the sign in page.</p>
      <div className="w-full sm:max-w-48">
        <CustomButton buttonText="Confirm Logout" variant="dark" onClick={onLogout} />
      </div>
    </div>
  );
};

export default LogoutTab;