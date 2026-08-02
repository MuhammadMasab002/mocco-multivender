import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Building2,
  Camera,
  ExternalLink,
  Hash,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Store,
  Undo2,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateSellerInfo } from "../../../services/store/actions/seller";

const ShopSettingsTab = () => {
  const dispatch = useDispatch();
  const { seller, updateLoading } = useSelector((state) => state.seller);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shopAddress: "",
    phoneNumber: "",
    zipCode: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Pre-fill form when seller data is available or updated
  useEffect(() => {
    if (!seller) return;

    const newFormData = {
      name: seller.name || "",
      description: seller.description || "",
      shopAddress:
        seller.addresses || seller.shopAddress || seller.address || "",
      phoneNumber: seller.phoneNumber || "",
      zipCode: seller.zipCode || "",
    };

    // only update if something changed to avoid cascading renders
    setFormData((prev) => {
      const unchanged =
        prev.name === newFormData.name &&
        prev.description === newFormData.description &&
        prev.shopAddress === newFormData.shopAddress &&
        prev.phoneNumber === newFormData.phoneNumber &&
        prev.zipCode === newFormData.zipCode;
      return unchanged ? prev : newFormData;
    });

    const avatarUrl =
      typeof seller.avatar === "object" && seller.avatar?.url
        ? seller.avatar.url
        : typeof seller.avatar === "string"
          ? seller.avatar
          : seller.avatarUrl || "";

    setAvatarPreview((prev) => (prev === avatarUrl ? prev : avatarUrl));
    setAvatarFile((prev) => (prev === null ? prev : null));
  }, [seller]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Max 5MB file size check
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size should be less than 5MB.");
      return;
    }

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    if (seller) {
      setFormData({
        name: seller.name || "",
        description: seller.description || "",
        shopAddress:
          seller.addresses || seller.shopAddress || seller.address || "",
        phoneNumber: seller.phoneNumber || "",
        zipCode: seller.zipCode || "",
      });

      const avatarUrl =
        typeof seller.avatar === "object" && seller.avatar?.url
          ? seller.avatar.url
          : typeof seller.avatar === "string"
            ? seller.avatar
            : seller.avatarUrl || "";

      setAvatarPreview(avatarUrl);
      setAvatarFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatarFile && !avatarPreview && !seller?.avatar) {
      toast.error("Please provide a shop avatar.");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Shop name is required.");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    if (!formData.shopAddress.trim()) {
      toast.error("Shop address is required.");
      return;
    }

    if (!formData.zipCode) {
      toast.error("Zip code is required.");
      return;
    }

    // Check if any profile info or avatar was modified
    const currentAddress =
      seller?.addresses || seller?.shopAddress || seller?.address || "";
    const currentName = seller?.name || "";
    const currentDescription = seller?.description || "";
    const currentPhoneNumber = seller?.phoneNumber || "";
    const currentZipCode = String(seller?.zipCode || "");

    const isChanged =
      Boolean(avatarFile) ||
      formData.name.trim() !== currentName.trim() ||
      formData.description.trim() !== currentDescription.trim() ||
      formData.shopAddress.trim() !== currentAddress.trim() ||
      formData.phoneNumber.trim() !== currentPhoneNumber.trim() ||
      String(formData.zipCode).trim() !== currentZipCode.trim();

    if (!isChanged) {
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("description", formData.description.trim());
    payload.append("shopAddress", formData.shopAddress.trim());
    payload.append("addresses", formData.shopAddress.trim());
    payload.append("phoneNumber", formData.phoneNumber.trim());
    payload.append("zipCode", formData.zipCode);

    if (avatarFile) {
      payload.append("file", avatarFile);
    }

    try {
      const res = await dispatch(updateSellerInfo(payload));
      if (res?.success) {
        toast.success(res.message || "Shop settings updated successfully!");
      } else {
        toast.error(res?.message || "Failed to update shop settings.");
      }
    } catch (err) {
      toast.error(err?.message || "An error occurred while updating settings.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Store className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Shop Settings
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Manage your store profile, branding, contact details, and location.
          </p>
        </div>

        {seller?._id && (
          <Link
            to={`/shop/${seller._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs sm:text-sm font-semibold transition cursor-pointer self-start sm:self-auto"
          >
            <ExternalLink size={16} />
            View Live Storefront
          </Link>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column: Avatar & Account Meta Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center text-center">
            <h2 className="text-base font-semibold text-slate-900 mb-4 w-full text-left">
              Store Branding
            </h2>

            <div className="relative group mb-4">
              <img
                src={
                  avatarPreview ||
                  "https://dummyimage.com/200x200/e2e8f0/64748b.png&text=Shop"
                }
                alt="Shop Logo"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-100 shadow-md transition group-hover:opacity-90"
              />
              <label
                htmlFor="avatar-upload-input"
                className="absolute bottom-1 right-1 p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg cursor-pointer transition transform hover:scale-110"
                title="Upload New Logo"
              >
                <Camera size={16} />
                <input
                  id="avatar-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-sm font-semibold text-slate-900">
              {formData.name || "Your Store Name"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              PNG, JPG, GIF or WebP up to 5MB
            </p>

            {/* <label
              htmlFor="avatar-upload-input"
              className="mt-4 w-full py-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              Change Store Avatar
            </label> */}
          </div>

          {/* Account Meta Info */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Account Overview
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <span className="truncate">{seller?.email || "—"}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Building2 size={16} className="text-slate-400 shrink-0" />
                <span>
                  Role:{" "}
                  <strong className="text-slate-800 font-semibold">
                    {seller?.role || "Seller"}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Details Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
              Store Information
            </h2>

            <div className="space-y-4">
              {/* Shop Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Shop Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Store
                    className="absolute left-3.5 top-3.5 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter shop name"
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    required
                  />
                </div>
              </div>

              {/* Phone & Zip Code Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3.5 top-3.5 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Zip / Postal Code <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash
                      className="absolute left-3.5 top-3.5 text-slate-400"
                      size={18}
                    />
                    <input
                      type="number"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 54000"
                      className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shop Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Shop Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3.5 top-3.5 text-slate-400"
                    size={18}
                  />
                  <textarea
                    rows={2}
                    name="shopAddress"
                    value={formData.shopAddress}
                    onChange={handleInputChange}
                    placeholder="Enter full street address, city, state"
                    className="w-full resize-none rounded-xl border border-slate-300 pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    required
                  />
                </div>
              </div>

              {/* Shop Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Shop Bio / Description
                </label>
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your store, products, and story..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReset}
                disabled={updateLoading}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <Undo2 size={16} />
                Reset
              </button>

              <button
                type="submit"
                disabled={updateLoading}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-md transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {updateLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShopSettingsTab;
