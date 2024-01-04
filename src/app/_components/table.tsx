import { formatCurrencyPercentage, formatNumber } from "@/app/_gen/general";
import React from "react";

interface TableProps {
  data: any[][];
  topLabels: string[];
  leftLabels: string[];
  format?: "currency" | "percentage";
}

const Table: React.FC<TableProps> = ({
  data,
  topLabels,
  leftLabels,
  format,
}) => {
  const [show, setShow] = React.useState(false);

  if (!show)
    return (
      <div className="flex justify-center my-4">
        <button
          onClick={() => setShow(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Mostrar tabla
        </button>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center my-4">
        <button
          onClick={() => setShow(false)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ocultar tabla
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 bg-gray-500 bg-opacity-10 rounded">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-transparent text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            {topLabels.map((label, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-transparent text-left text-xs font-medium text-white-500 uppercase tracking-wider"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th
                scope="row"
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white-900"
              >
                {leftLabels[rowIndex]}
              </th>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-white-500"
                >
                  {formatCurrencyPercentage(cell, format)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
