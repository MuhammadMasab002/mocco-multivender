import Loader from "../../../layouts/Loader";

const TableShell = ({ columns, rows, productLoading }) => (
  <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="border-b border-slate-200 bg-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border-r border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-600 last:border-r-0"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productLoading ? (
            <tr>
              <td
                colSpan={columns.length - 1}
                className="w-full! px-4 py-6 text-center"
              >
                <div className="w-full flex flex-col items-center gap-2">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className="border-b border-slate-200">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-sm leading-6 text-slate-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default TableShell;
