import CustomTable from "./CustomTable";
// import AdminDashboard from "./AdminDashboard";

const RenderContent = ({
  activeTab,
  // stats,
  products,
  orders,
  users,
  categories,
  // revenueData,
  // categoryData,
  // COLORS,
  handleCreate,
  handleEdit,
  handleDelete,
  subcategories,
}) => {
  switch (activeTab) {
    // case "dashboard":
    //   return (
    //     <AdminDashboard
    //       stats={stats}
    //       products={products}
    //       orders={orders}
    //       revenueData={revenueData}
    //       categoryData={categoryData}
    //       COLORS={COLORS}
    //     />
    //   );
    case "categories":
      return (
        <CustomTable
          type="category"
          data={categories}
          columns={[
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
            { key: "products", label: "Products" },
          ]}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    case "subcategories":
      return (
        <CustomTable
          type="subcategory"
          data={subcategories}
          columns={[
            { key: "name", label: "Name" },
            { key: "categoryId", label: "Category" },
          ]}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    case "products":
      return (
        <CustomTable
          type="product"
          data={products}
          columns={[
            { key: "image", label: "Image" },
            { key: "name", label: "Name" },
            { key: "categoryId", label: "Category" },
            { key: "subCategoryId", label: "Subcategory" },
            { key: "price", label: "Price" },
            { key: "stock", label: "Stock" },
            { key: "feature", label: "Feature + Expiry" },
          ]}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    case "orders":
      return (
        <CustomTable
          type="order"
          data={orders}
          columns={[
            { key: "id", label: "Order ID" },
            { key: "customer", label: "Customer" },
            { key: "product", label: "Product" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" },
            { key: "date", label: "Date" },
          ]}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    case "users":
      return (
        <CustomTable
          type="user"
          data={users}
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status" },
            { key: "joined", label: "Joined" },
          ]}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    default:
      <p className="text-gray-500">Select a tab to view content</p>;
      // return (
      //   <AdminDashboard
      //     stats={stats}
      //     products={products}
      //     orders={orders}
      //     revenueData={revenueData}
      //     categoryData={categoryData}
      //     COLORS={COLORS}
      //   />
      // );
  }
};

export default RenderContent;
