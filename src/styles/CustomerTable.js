export const classes = {
  container: "bg-white shadow-md rounded p-4",
  noDataText: "text-center text-gray-500",
  table: "w-full text-left border border-gray-300",
  theadRow: "bg-gray-100",
  th: "border border-gray-300 p-2",
  tr: "hover:bg-gray-50",
  td: "border border-gray-300 p-2",
  customerIdCell: "font-semibold flex items-center gap-2",
  button: "text-indigo-600 font-bold",
  amountText: "text-green-600 font-medium",
  pointsText: "font-medium text-indigo-600",
  totalPoints: "font-semibold",
  transactionsCell: "bg-gray-50 p-4 text-sm text-gray-700",
  paginationButton: "px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50",
  paginationText: "px-3 py-1 text-gray-700 font-medium",
  filterBar: "flex flex-wrap gap-4 justify-center mb-6",
  select: "px-4 py-2 border rounded",
  errorText: "text-red-600 font-semibold text-center mt-4",
  transactionGroup: "mb-2",
  transactionLabel: "font-semibold mb-1",
  transactionList: "list-disc list-inside ml-4",
  paginationWrapper: "mt-4 flex justify-center gap-2",
  appWrapper: "max-w-5xl mx-auto p-4",
  appHeading: "text-3xl font-bold text-center text-indigo-700 mb-6",
};

export const toastConfig = {
  position: "top-right",
  toastOptions: {
    className: "text-sm font-medium rounded-md shadow-lg",
    success: {
      className: "bg-green-100 text-green-800 border border-green-300",
    },
    error: {
      className: "bg-red-100 text-red-800 border border-red-300",
    },
  },
};
