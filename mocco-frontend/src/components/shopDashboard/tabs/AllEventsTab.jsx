import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";
import { deleteEvent, getEvents } from "../../../services/store/actions/event";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AllEventsTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { seller } = useSelector((state) => state.seller);
  const shopId = seller?._id;

  const {
    events,
    isLoading: isEventLoading,
    error: eventError,
  } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getEvents(shopId));
  }, [dispatch, shopId]);

  // implement route to product detail page
  const handlePreviewRoute = (productId) => {
    if (!productId) return;
    navigate(`/product-detail/${productId}`);
  };

  // implement delete product functionality
  const handleDeleteEvent = async (eventId) => {
    if (!eventId) return;
    await dispatch(deleteEvent(eventId));
    // Optionally, you can show a success message or handle errors here
    alert("Event deleted successfully!" + eventId);
  };

  const rows =
    events?.length > 0
      ? events?.map((item, i) => [
          <TruncateTextCell
            key={`event-id-${i}`}
            text={item?._id || i}
            maxWidthClass="max-w-36"
            mono
          />,
          <TruncateTextCell
            key={`event-name-${i}`}
            text={item?.name || "Unnamed Event"}
            maxWidthClass="max-w-48"
          />,
          `US$ ${item?.discount_price ?? item?.price ?? 0}`,
          item?.stock ?? 0,
          item?.total_sell ?? 0,
          item?.status ?? "N/A",
          item?.startDate ? new Date(item.startDate).toLocaleDateString() : "-",
          item?.endDate ? new Date(item.endDate).toLocaleDateString() : "-",
          <TableActionIcon
            key={`event-preview-${i}`}
            action={() => handlePreviewRoute(item?._id)}
            type="preview"
          />,
          <TableActionIcon
            key={`event-delete-${i}`}
            action={() => handleDeleteEvent(item?._id)}
            type="delete"
          />,
        ])
      : [
          [
            eventError && "No events found for this shop.",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
          ],
        ];

  return (
    <TableShell
      columns={[
        "Event Id",
        "Name",
        "Price",
        "Stock",
        "Sold Out",
        "Status",
        "Start",
        "End",
        "Preview",
        "Delete",
        // actions -> preview, delete, edit (optional)
      ]}
      rows={rows}
      eventLoading={isEventLoading}
    />
  );
};

export default AllEventsTab;
