import ProductOrEventForm from "../forms/ProductOrEventForm";
import { createProduct } from "../../../services/store/actions/product";
import { useDispatch } from "react-redux";

const CreateProductTab = () => {
  const dispatch = useDispatch();

  const handleProductFormSubmit = async (event, imageFiles = []) => {
    const formData = new FormData(event.currentTarget);
    formData.delete("files");
    imageFiles.forEach((file) => {
      formData.append("files", file);
    });

    await dispatch(createProduct(formData));
    return true;
  };

  return (
    <ProductOrEventForm mode="product" onSubmit={handleProductFormSubmit} />
  );
};

export default CreateProductTab;
