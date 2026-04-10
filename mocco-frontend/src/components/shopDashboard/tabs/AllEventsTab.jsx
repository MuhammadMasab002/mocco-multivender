import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";

const AllEventsTab = ({ sellerEvents }) => {
  return (
    <TableShell
      columns={[
        "Product Id",
        "Name",
        "Price",
        "Stock",
        "Sold Out",
        "Start",
        "End",
        "Delete",
      ]}
      rows={sellerEvents.map((item, i) => [
        <TruncateTextCell
          key={`event-id-${i}`}
          text={item.productId}
          maxWidthClass="max-w-36"
          mono
        />,
        <TruncateTextCell
          key={`event-name-${i}`}
          text={item.name}
          maxWidthClass="max-w-48"
        />,
        `US$ ${item.price}`,
        item.stock,
        item.soldOut,
        item.startDate,
        item.endDate,
        <TableActionIcon key={`event-delete-${i}`} type="delete" />,
      ])}
    />
  );
};

export default AllEventsTab;
