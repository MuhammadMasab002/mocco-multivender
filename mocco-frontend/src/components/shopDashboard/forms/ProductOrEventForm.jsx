import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ProductOrEventForm = ({ mode = "product", onSubmit }) => {
  const isEvent = mode === "event";
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventDateError, setEventDateError] = useState("");

  const getMinEndDate = (selectedStartDate) => {
    if (!selectedStartDate) return "";

    const startDateObj = new Date(selectedStartDate);
    startDateObj.setDate(startDateObj.getDate() + 3);

    return startDateObj.toISOString().split("T")[0];
  };

  // When start date changes, auto-set end date to 3 days later
  const handleStartDateChange = (e) => {
    const start = e.target.value;
    setStartDate(start);
    setEventDateError("");

    if (start) {
      const endDateStr = getMinEndDate(start);
      setEndDate(endDateStr);
    }
  };

  const handleEndDateChange = (e) => {
    setEventDateError("");

    const nextEndDate = e.target.value;
    const minEndDate = getMinEndDate(startDate);

    if (minEndDate && nextEndDate < minEndDate) {
      setEventDateError("End date must be at least 3 days after the start date.");
      setEndDate(minEndDate);
      return;
    }

    setEndDate(nextEndDate);
  };
  useEffect(() => {
    return () => {
      images.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [images]);

  // Show server-side errors from product/event slices (render-time fallback)
  const productError = useSelector((state) => state.product?.error);
  const eventError = useSelector((state) => state.event?.error);

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    const invalidFile = selectedFiles.find(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidFile) {
      setImageError("Only image files are allowed.");
      event.target.value = "";
      setStatusMessage({ type: "error", text: "Only image files are allowed." });
      return;
    }

    setImageError("");
    setStatusMessage({ type: "", text: "" });

    setImages((prev) => {
      const next = selectedFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      return [...prev, ...next];
    });

    event.target.value = "";
  };

  const handleRemoveImage = (imageId) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === imageId);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== imageId);
    });
  };

  const handleClearImages = () => {
    setImages((prev) => {
      prev.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      return [];
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage({ type: "", text: "" });

    if (!images.length) {
      setImageError("Please upload at least one image.");
      setStatusMessage({ type: "error", text: "Please upload at least one image." });
      return;
    }

    // Validate event dates if creating an event
    if (isEvent) {
      if (!startDate || !endDate) {
        setEventDateError("Both start and end dates are required.");
        setStatusMessage({ type: "error", text: "Both start and end dates are required." });
        return;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));

      if (daysDifference < 3) {
        setEventDateError("Event must be at least 3 days long. End date must be at least 3 days after start date.");
        setStatusMessage({ type: "error", text: "Event must be at least 3 days long." });
        return;
      }
    }

    try {
      const submitted = await onSubmit?.(
        event,
        images.map((item) => item.file),
      );

      if (submitted) {
        setStatusMessage({ type: "success", text: isEvent ? "Event created successfully." : "Product created successfully." });
        setImageError("");
        handleClearImages();
        event.target.reset();
        setStartDate("");
        setEndDate("");
        setEventDateError("");
        setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      setImageError(
        error?.message || `Failed to create ${isEvent ? "event" : "product"}.`,
      );
      setStatusMessage({ type: "error", text: error?.message || `Failed to create ${isEvent ? "event" : "product"}.` });
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:p-8"
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {isEvent ? "Create New Event" : "Create New Product"}
      </h2>
      {((statusMessage.text && statusMessage.text) || (!statusMessage.text && (isEvent ? eventError : productError))) && (
        <div className={`rounded-lg mt-4 px-4 py-3 text-sm font-medium ${statusMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {statusMessage.text || (isEvent ? eventError : productError)}
        </div>
      )}

      <div className="mt-8 space-y-6">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Product Name <span className="text-rose-500">*</span>
          </span>
          <input
            type="text"
            name="name"
            placeholder={`Enter ${isEvent ? "event" : "product"} name`}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Description <span className="text-rose-500">*</span>
          </span>
          <textarea
            rows={5}
            name="description"
            placeholder={`Enter ${isEvent ? "event" : "product"} description`}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Category <span className="text-rose-500">*</span>
            </span>
            <select
              name="category"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option>Computers and Laptops</option>
              <option>Mobile and Tablets</option>
              <option>Music and Gaming</option>
              <option>Others</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Tags</span>
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>
        </div>

        {isEvent && (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">
                  Event Start Date <span className="text-rose-500">*</span>
                </span>
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">
                  Event End Date <span className="text-rose-500">*</span>
                </span>
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={handleEndDateChange}
                  min={getMinEndDate(startDate)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  required
                />
              </label>
            </div>
            {eventDateError && (
              <div className="rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-600">
                {eventDateError}
              </div>
            )}
          </>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Original Price
            </span>
            <input
              type="number"
              name="price"
              placeholder="Original Price"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Discount Price <span className="text-rose-500">*</span>
            </span>
            <input
              type="number"
              name="discount_price"
              placeholder="Discount Price"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            {isEvent ? "Event Product" : "Product"} Stock{" "}
            <span className="text-rose-500">*</span>
          </span>
          <input
            type="number"
            name="stock"
            placeholder="0"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <div>
          <p className="text-sm font-semibold text-slate-700">
            {isEvent ? "Event Product" : "Product"} Images{" "}
            <span className="text-rose-500">*</span>
          </p>
          <div className="mt-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <input
              ref={fileInputRef}
              type="file"
              name="files"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex h-28 w-28 items-center justify-center rounded-xl cursor-pointer border-2 border-blue-400 bg-blue-50 text-3xl font-semibold text-blue-600"
              >
                +
              </button>

              <div className="space-y-1 text-center sm:pt-4 sm:text-left">
                <p className="text-slate-500">
                  Click the + button to add images
                </p>
                <p className="text-xs text-slate-400">
                  PNG, JPG, WEBP and other image types supported.
                </p>
                {!!images.length && (
                  <p className="text-xs font-medium text-slate-500">
                    {images.length} image{images.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            </div>

            {imageError && (
              <p className="mt-3 text-sm font-medium text-rose-600">
                {imageError}
              </p>
            )}

            {!!images.length && (
              <>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {images.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white"
                    >
                      <img
                        src={item.previewUrl}
                        alt={item.file.name}
                        className="h-28 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(item.id)}
                        className="absolute right-2 top-2 rounded-md cursor-pointer bg-black/70 px-2 py-0.5 text-xs font-semibold text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleClearImages}
                  className="mt-4 text-sm font-semibold text-red-400 cursor-pointer underline-offset-2 transition hover:text-red-600 hover:underline"
                >
                  Clear all images
                </button>
              </>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl cursor-pointer bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          {isEvent ? "Create Event" : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductOrEventForm;
