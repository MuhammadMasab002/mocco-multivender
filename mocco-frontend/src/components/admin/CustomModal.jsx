import { X } from "lucide-react";
import FormFields from "./FormFields";

const CustomModal = ({
  formData,
  setFormData,
  modalType,
  showModal,
  setShowModal,
  categories,
  subCategories,
  editingItem,
  handleSubmit,
  featureOptions,
}) => {
  if (!showModal) return null;

  return (
    <div className="absolute inset-0 w-full h-full bg-black/80 py-10 z-50">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold capitalize text-black">
              {editingItem ? "Edit" : "Add"} {modalType}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
            className="space-y-4 text-black"
          >
            <FormFields
              formData={formData}
              setFormData={setFormData}
              modalType={modalType}
              categories={categories}
              subCategories={subCategories}
              featureOptions={featureOptions}
            />
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {editingItem ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
