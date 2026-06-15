import { Star } from "lucide-react";

/**
 * TableActionIcon
 * Supports types: "preview" | "delete" | "feature"
 * For "feature": pass `active` prop (boolean) to reflect current isFeatured state.
 */
const TableActionIcon = ({ type = "preview", action, active = false }) => {
  const isDelete = type === "delete";
  const isFeature = type === "feature";

  if (isFeature) {
    return (
      <button
        type="button"
        onClick={action}
        aria-label={active ? "Remove from featured" : "Mark as featured"}
        title={active ? "Remove from featured" : "Mark as featured"}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg cursor-pointer border transition ${
          active
            ? "border-amber-300 bg-amber-50 text-amber-500 hover:bg-amber-100"
            : "border-slate-200 bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-500 hover:border-amber-300"
        }`}
      >
        <Star size={16} fill={active ? "currentColor" : "none"} />
      </button>
    );
  }

  const iconMap = {
    preview: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    delete: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
  };

  return (
    <button
      type="button"
      onClick={action}
      aria-label={isDelete ? "Delete" : "Preview"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg cursor-pointer border transition ${
        isDelete
          ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
          : "border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100"
      }`}
    >
      {iconMap[type]}
    </button>
  );
};

export default TableActionIcon;
