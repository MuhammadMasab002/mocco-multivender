import { createEvent } from "../../../services/store/actions/event";
import ProductOrEventForm from "../forms/ProductOrEventForm";
import { useDispatch } from "react-redux";

const CreateEventTab = () => {
  const dispatch = useDispatch();

  const handleEventFormSubmit = async (event, imageFiles = []) => {
    console.log("create event", event.currentTarget);
    const formData = new FormData(event.currentTarget);
    formData.delete("files");
    imageFiles.forEach((file) => {
      formData.append("files", file);
    });

    await dispatch(createEvent(formData));
    return true;
  };
  return <ProductOrEventForm mode="event" onSubmit={handleEventFormSubmit} />;
};

export default CreateEventTab;
