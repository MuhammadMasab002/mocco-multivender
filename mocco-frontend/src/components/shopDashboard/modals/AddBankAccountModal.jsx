import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

const AddBankAccountModal = ({
  open,
  loading,
  onClose,
  onSubmit,
  pakistanBanks,
}) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    pin: "",
  });
  const [showPin, setShowPin] = useState(false);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Add Bank Account
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Select Bank *
            </span>
            <select
              value={formData.bankName}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  bankName: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            >
              <option value="" disabled>
                Choose your bank
              </option>
              {pakistanBanks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Account Holder Name *
            </span>
            <input
              type="text"
              value={formData.accountHolderName}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  accountHolderName: event.target.value,
                }))
              }
              placeholder="Enter account holder name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Account Number *
            </span>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  accountNumber: event.target.value,
                }))
              }
              placeholder="Enter account number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              4-Digit PIN *
            </span>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={formData.pin}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, pin: event.target.value }))
                }
                placeholder="Enter 4-digit PIN"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-11 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                maxLength={4}
                required
              />
              <button
                type="button"
                onClick={() => setShowPin((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-slate-100"
                aria-label="Toggle pin visibility"
              >
                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Add Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBankAccountModal;
