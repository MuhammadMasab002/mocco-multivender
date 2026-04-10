import ProductOrEventForm from "../forms/ProductOrEventForm";

const CreateProductTab = () => {
  return (
    <ProductOrEventForm mode="product" onSubmit={(e) => e.preventDefault()} />
  );
};

export default CreateProductTab;
