import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CustomButton from "../common/CustomButton";
import CustomFormInput from "../common/inputs/CustomFormInput";

const ProfileTab = ({
  profileForm,
  derivedProfile,
  avatarPreview,
  onAvatarChange,
  onInputChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
            Manage Account
          </p>
          <h2 className="text-xl sm:text-2xl text-gray-900 font-semibold tracking-tight">
            Edit Profile
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Keep your profile information up to date.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gray-200 text-white bg-gray-50 flex items-center justify-center shadow-sm">
          {avatarPreview ? (
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={avatarPreview}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <span className="text-gray-500 text-sm text-center">
              User Avatar
            </span>
          )}
          <label className="absolute -bottom-1 -right-1 bg-black text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-white">
            <CameraAltIcon fontSize="small" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarChange}
            />
          </label>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto flex justify-center border-t border-gray-200 pt-8 mt-8">
        <form className="w-full space-y-6 text-black" onSubmit={onSubmit}>
          <div className="flex items-center gap-2">
            <span className="text-red-500">* </span>
            <CustomFormInput
              // label="Name"
              name="name"
              value={profileForm.name || derivedProfile.name}
              onChange={onInputChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">* </span>
            <CustomFormInput
              // label="Email"
              type="email"
              name="email"
              value={profileForm.email || derivedProfile.email}
              onChange={onInputChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="flex items-center gap-2 pl-3.5">
            <CustomFormInput
              // label="Phone Number"
              name="phoneNumber"
              value={profileForm.phoneNumber || derivedProfile.phoneNumber}
              onChange={onInputChange}
              placeholder="Phone Number"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">* </span>

            <CustomFormInput
              // label="Current Password"
              type="password"
              name="currentPassword"
              value={profileForm.currentPassword}
              onChange={onInputChange}
              placeholder="Enter your current password to confirm changes"
              required
            />
          </div>

          <div className="flex justify-start itemscenter gap-2">
            <span className="text-red-500">* </span>
            <p className="text-xs sm:text-sm italic text-gray-500 pb-3">
              Required fields. You will be Required to verify your identity
              before updating profile.
            </p>
          </div>

          <div className="flex items-center gap-2 pl-3.5">
            <div className="w-full">
              <CustomButton
                buttonText={isLoading ? "Updating..." : "Update Profile"}
                type="submit"
                variant="dark"
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;
