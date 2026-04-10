const CouponForm = ({ onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:p-8"
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Create Coupon
      </h2>

      <div className="mt-8 space-y-6">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Coupon Code <span className="text-rose-500">*</span>
          </span>
          <input
            type="text"
            placeholder="e.g. OFF20"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Value (%) <span className="text-rose-500">*</span>
            </span>
            <input
              type="number"
              defaultValue={10}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Min Amount
            </span>
            <input
              type="number"
              defaultValue={100}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Max Amount
            </span>
            <input
              type="number"
              defaultValue={500}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Select Product <span className="text-rose-500">*</span>
            </span>
            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Product
              </option>
              <option>Gaming pad (mouse pad) Dolore qui</option>
              <option>Enim assumenda ullam</option>
            </select>
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Select Category
          </span>
          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            defaultValue=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option>Computers and Laptops</option>
            <option>Mobile and Tablets</option>
            <option>Music and Gaming</option>
            <option>Others</option>
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Create Coupon
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
