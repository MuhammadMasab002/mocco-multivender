import { Eye, Trash2 } from "lucide-react";

const TableActionIcon = ({ type = "preview", action }) => {
  const isDelete = type === "delete";
  const IconComponent = isDelete ? Trash2 : Eye;

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
      <IconComponent size={16} />
    </button>
  );
};

export default TableActionIcon;
