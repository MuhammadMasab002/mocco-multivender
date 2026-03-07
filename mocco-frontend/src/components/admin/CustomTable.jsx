import { Plus, Edit2, Trash2 } from "lucide-react";
const CustomTable = ({
  type,
  data,
  columns,
  handleCreate,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold capitalize text-black">
          Manage {type}s
        </h2>
        <button
          onClick={() => handleCreate(type)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          <p className="hidden lg:block">Add {type}</p>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((item) => (
              <tr key={item?._id}>
                {columns?.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {col.key === "categoryId" || col.key === "subCategoryId" ? (
                      item[col.key]?.name
                    ) : col.key === "products" ? (
                      item[col.key]?.length
                    ) : col.key === "image" ? (
                      <div className="w-16 h-16">
                        <img
                          // src={item?.image}
                          src={item?.[col.key]}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ) : col.key === "feature" ? (
                      <div className="max-w-24 flex flex-col justify-center gap-1 text-center font-medium">
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                          {item[col.key] || "None"}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                          {item.featureExpireAt
                            ? new Date(item.featureExpireAt).toLocaleDateString(
                                "en-US"
                              )
                            : "0"}
                        </span>
                      </div>
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(type, item)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(type, item?._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
