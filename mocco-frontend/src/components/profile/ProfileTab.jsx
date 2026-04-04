import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CustomButton from "../common/CustomButton";
import CustomFormInput from "../common/inputs/CustomFormInput";

const ProfileTab = ({
  profileForm,
  avatarPreview,
  onAvatarChange,
  onInputChange,
  onSubmit,
  countries,
  addressTypes,
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

      <form className="space-y-4 text-black" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormInput
            label="Name"
            name="name"
            value={profileForm.name}
            onChange={onInputChange}
            required
          />
          <CustomFormInput
            label="Email"
            type="email"
            name="email"
            value={profileForm.email}
            onChange={onInputChange}
            required
          />
        </div>

        <CustomFormInput
          label="Current Password"
          type="password"
          name="currentPassword"
          value={profileForm.currentPassword}
          onChange={onInputChange}
          placeholder="Enter your current password to confirm changes"
          required
        />

        <p className="text-xs sm:text-sm text-gray-500">
          Required to verify your identity before updating profile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormInput
            label="Phone Number"
            name="phoneNumber"
            value={profileForm.phoneNumber}
            onChange={onInputChange}
            placeholder="Phone Number"
          />

          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-1">
              Country
            </label>
            <select
              name="country"
              value={profileForm.country}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormInput
            label="City"
            name="city"
            value={profileForm.city}
            onChange={onInputChange}
            placeholder="City"
          />
          <CustomFormInput
            label="Zip Code"
            name="zipCode"
            value={profileForm.zipCode}
            onChange={onInputChange}
            placeholder="Zip Code"
          />
        </div>

        <CustomFormInput
          label="Street Address 1"
          name="streetAddress1"
          value={profileForm.streetAddress1}
          onChange={onInputChange}
          placeholder="Street Address 1"
        />
        <CustomFormInput
          label="Street Address 2"
          name="streetAddress2"
          value={profileForm.streetAddress2}
          onChange={onInputChange}
          placeholder="Street Address 2"
        />

        <div className="w-full md:max-w-md">
          <label className="block text-gray-700 font-medium mb-1">
            Address Type
          </label>
          <select
            name="addressType"
            value={profileForm.addressType}
            onChange={onInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
          >
            {addressTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:max-w-52">
          <CustomButton
            buttonText="Update Profile"
            type="submit"
            variant="dark"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;
