import React from "react";
import CustomButton from "../common/CustomButton";
import CustomFormInput from "../common/inputs/CustomFormInput";

const ChangePasswordTab = ({
  passwordForm,
  onInputChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="space-y-6 md:max-w-2xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
          Security
        </p>
        <h2 className="text-xl sm:text-2xl text-gray-900 font-semibold tracking-tight">
          Change Password
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Keep your account secure with a strong password.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-6 bg-white text-black border border-gray-200 rounded-3xl py-8 px-4 sm:px-5 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-red-500">* </span>
          <CustomFormInput
            // label="Enter Your Old Password"
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={onInputChange}
            placeholder="Enter your current password"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500">* </span>
          <CustomFormInput
            // label="Enter New Password"
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={onInputChange}
            placeholder="Enter your new password"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500">* </span>
          <p className="text-xs italic sm:text-sm text-gray-500">
            Password must be at least 6 characters long.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500">* </span>
          <CustomFormInput
            // label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={onInputChange}
            placeholder="Confirm your new password"
            required
          />
        </div>

        <div className="flex items-center gap-2 pl-3.5">
          <div className="w-full sm:max-w-48">
            <CustomButton
              buttonText={isLoading ? "Updating..." : "Change Password"}
              type="submit"
              variant="danger"
              className="mt-2"
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordTab;
