import { useState } from "react";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  LayoutDashboard,
  Folders,
  FolderTree,
} from "lucide-react";
import CustomModal from "../components/admin/CustomModal";
import AdminSidebar from "../components/admin/AdminSidebar";
import RenderContent from "../components/admin/RenderContent";

const initialOrders = [
  {
    id: 1001,
    customer: "John Doe",
    product: "iPhone 15 Pro",
    amount: 999,
    status: "Delivered",
    date: "2024-11-20",
  },
  {
    id: 1002,
    customer: "Jane Smith",
    product: "MacBook Pro M3",
    amount: 1999,
    status: "Pending",
    date: "2024-11-22",
  },
  {
    id: 1003,
    customer: "Bob Johnson",
    product: "Cotton T-Shirt",
    amount: 29,
    status: "Shipped",
    date: "2024-11-21",
  },
];

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Customer",
    status: "Active",
    joined: "2024-02-20",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
    joined: "2023-12-01",
  },
];

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
];

const categoryData = [
  { name: "Electronics", value: 45 },
  { name: "Clothing", value: 120 },
  { name: "Books", value: 89 },
];

const featureOptions = [
  { value: "FLASH_SALES", label: "Flash Sales" },
  { value: "BEST_SELLING", label: "Best Selling" },
  { value: "NEW_ARRIVALS", label: "New Arrivals" },
  { value: "NONE", label: "None" },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // State for all data
  const orders = initialOrders;
  const users = initialUsers;

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Total Products",
      value: 120, // This should ideally come from API
      icon: Package,
      color: "bg-yellow-500",
    },
    {
      title: "Total Revenue",
      value: "$" + orders.reduce((sum, o) => sum + o.amount, 0),
      icon: DollarSign,
      color: "bg-purple-500",
    },
  ];

  // CRUD Functions
  const handleCreate = (type) => {
    setModalType(type);
    setEditingItem(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    // setFormData(item);
    setFormData({
      ...item,
      image: item.image || "", // keep URL
    });
    setShowModal(true);
  };

  const handleDelete = async (type, id) => {
    // show alert before delete
    alert("Delete successfully" + type + " with id: " + id);
    // if (window.confirm("Are you sure you want to delete this item?")) {
    //   switch (type) {
    //     case "category":

    //       break;
    //     case "subcategory":

    //       break;
    //     case "product":

    //       break;
    //     case "order":
    //       setOrders(orders.filter((o) => o.id !== id));
    //       break;
    //     case "user":
    //       setUsers(users.filter((u) => u.id !== id));
    //       break;
    //   }
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert
    alert("Form submitted");

    // switch (modalType) {
    //   case "category":
    //     editingItem
    //       ? await triggerUpdateCategory([editingItem?._id, formData]).unwrap()
    //       : await triggerCreateCategory(formData).unwrap();

    //     break;
    //   case "subcategory":
    //     editingItem
    //       ? await triggerUpdateSubCategory([
    //           editingItem?._id,
    //           formData,
    //         ]).unwrap()
    //       : await triggerCreateSubCategory(formData).unwrap();

    //     break;
    //   case "product": {
    //     const updatedData = { ...formData };

    //     // If user selected NEW image (File)
    //     if (formData.imageFile instanceof File) {
    //       const fd = new FormData();
    //       fd.append("image", formData?.imageFile);

    //       const upload = await triggerUploadImage(fd).unwrap();

    //       // delete updatedData.image;
    //       updatedData.image = upload.url; // set new URL
    //       delete updatedData.imageFile;
    //     }

    //     editingItem
    //       ? await triggerUpdateProduct([editingItem?._id, updatedData]).unwrap()
    //       : await triggerCreateProduct(updatedData).unwrap();
    //     break;
    //   }
    //   case "order":
    //     if (editingItem) {
    //       setOrders(
    //         orders.map((o) =>
    //           o.id === editingItem.id ? { ...formData, id: editingItem.id } : o,
    //         ),
    //       );
    //     } else {
    //       setOrders([
    //         ...orders,
    //         {
    //           ...formData,
    //           id: Date.now(),
    //           date: new Date().toISOString().split("T")[0],
    //         },
    //       ]);
    //     }
    //     break;
    //   case "user":
    //     if (editingItem) {
    //       setUsers(
    //         users.map((u) =>
    //           u.id === editingItem.id ? { ...formData, id: editingItem.id } : u,
    //         ),
    //       );
    //     } else {
    //       setUsers([
    //         ...users,
    //         {
    //           ...formData,
    //           id: Date.now(),
    //           joined: new Date().toISOString().split("T")[0],
    //         },
    //       ]);
    //     }
    //     break;
    // }

    setShowModal(false);
    setFormData({});
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "categories", label: "Categories", icon: Folders },
    { id: "subcategories", label: "Subcategories", icon: FolderTree },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <div className="relative flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="w-50 flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-6 mt-6 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {activeTab}
            </h1>
            <p className="text-gray-600 mt-1">Manage your {activeTab} here</p>
          </div>
          <RenderContent
            activeTab={activeTab}
            stats={stats}
            // products={allProducts?.products}
            orders={orders}
            users={users}
            // categories={allCategories?.categories}
            revenueData={revenueData}
            categoryData={categoryData}
            COLORS={COLORS}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            // subcategories={allSubCategories?.subCategories}
          />
        </div>
      </div>
      {/* Modal */}
      <CustomModal
        formData={formData}
        setFormData={setFormData}
        modalType={modalType}
        showModal={showModal}
        setShowModal={setShowModal}
        // categories={allCategories?.categories}
        // subCategories={allSubCategories?.subCategories}
        editingItem={editingItem}
        handleSubmit={handleSubmit}
        featureOptions={featureOptions}
      />
    </div>
  );
}

export default AdminPanel;
