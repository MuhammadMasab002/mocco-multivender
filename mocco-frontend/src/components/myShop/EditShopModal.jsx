import React from "react";
import { BadgeDollarSign, CircleCheck, Layers, Upload, X } from "lucide-react";

const EditShopModal = ({
  isOpen,
  editForm,
  onClose,
  onSubmit,
  onInputChange,
  onAvatarChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Edit Shop Settings
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close edit shop modal"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 p-5 sm:p-6">
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Shop Avatar
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={editForm.avatarUrl}
                  alt="Shop avatar preview"
                  className="h-20 w-20 rounded-full border border-slate-200 object-cover"
                />
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-100">
                  <Upload size={16} />
                  Choose Image
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={onAvatarChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-slate-500">
                  JPG, PNG, GIF or WebP (max. 2MB)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 sm:grid-cols-3">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <CircleCheck size={16} className="text-emerald-500" />
                Better profile details
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <Layers size={16} className="text-sky-500" />
                Polished card layout
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <BadgeDollarSign size={16} className="text-rose-500" />
                Conversion-friendly style
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <label className="space-y-1.5">
                <span className="text-sm font-semibold text-slate-700">
                  Shop Name *
                </span>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={onInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-sm font-semibold text-slate-700">
                  Email *
                </span>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={onInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-sm font-semibold text-slate-700">
                  Address *
                </span>
                <textarea
                  rows={3}
                  name="addresses"
                  value={editForm.addresses}
                  onChange={onInputChange}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-semibold text-slate-700">
                    Phone Number *
                  </span>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editForm.phoneNumber}
                    onChange={onInputChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-semibold text-slate-700">
                    Zip Code *
                  </span>
                  <input
                    type="text"
                    name="zipCode"
                    value={editForm.zipCode}
                    onChange={onInputChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Update Shop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShopModal;
