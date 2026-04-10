import ProductOrEventForm from "../forms/ProductOrEventForm";

const CreateEventTab = () => {
  return (
    <ProductOrEventForm mode="event" onSubmit={(e) => e.preventDefault()} />
  );
};

export default CreateEventTab;
