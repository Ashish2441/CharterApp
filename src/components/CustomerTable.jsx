import React, { useState, useEffect } from "react";
import { calculatePoints } from "../util/rewardCalculation";
import {
  NO_TRANSACTIONS,
  CUSTOMER_ID,
  MONTHLY_POINTS,
  TOTAL_POINTS,
  PURCHASE_AMOUNT,
  LAST_THREE,
  DEFAULT,
  FIVE,
  ONE,
  TWO,
  ZERO,
  LONG,
  TRANSACTIONS,
  TRANSACTION_ID,
  POINTS,
  PREVEIOUS,
  NEXT,
  PAGE,
  OF,
} from "../data/constant";

const CustomerTable = ({ data, selectedMonth, selectedYear }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = FIVE;
  const [expandedRows, setExpandedRows] = useState({});

  // Reset expanded rows when filters change
  useEffect(() => {
    setExpandedRows({});
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  // Collapse rows on page change
  useEffect(() => {
    setExpandedRows({});
  }, [currentPage]);

  const filteredData = data.filter((tx) => {
    const date = new Date(tx.date);
    const txMonth = date.getMonth() + ONE;
    const txYear = date.getFullYear();

    if (!selectedMonth || selectedMonth === LAST_THREE) {
      const today = new Date();
      const threeMonthsAgo = new Date(
        today.getFullYear(),
        today.getMonth() - TWO,
        ONE
      );
      return (
        date >= threeMonthsAgo &&
        date <= today &&
        txYear === parseInt(selectedYear)
      );
    }

    return (
      txMonth === parseInt(selectedMonth) && txYear === parseInt(selectedYear)
    );
  });
  const customerMap = {};
  filteredData.forEach((tx) => {
    const { customerId, amount, date, transactionId } = tx;
    const points = calculatePoints(amount);
    const month = new Date(date).toLocaleString(DEFAULT, { month: LONG });

    if (!customerMap[customerId]) {
      customerMap[customerId] = {
        total: ZERO,
        monthly: {},
        purchases: {},
        transactions: {},
      };
    }
    customerMap[customerId].total += points;
    customerMap[customerId].monthly[month] =
      (customerMap[customerId].monthly[month] || ZERO) + points;
    customerMap[customerId].purchases[month] =
      (customerMap[customerId].purchases[month] || ZERO) + amount;

    if (!customerMap[customerId].transactions[month]) {
      customerMap[customerId].transactions[month] = [];
    }
    customerMap[customerId].transactions[month].push({
      amount,
      points,
      date,
      transactionId,
    });
  });
  const customers = Object.entries(customerMap);
  const totalPages = Math.ceil(customers.length / recordsPerPage);
  const paginatedCustomers = customers.slice(
    (currentPage - ONE) * recordsPerPage,
    currentPage * recordsPerPage
  );
  const toggleRow = (customerId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [customerId]: !prev[customerId],
    }));
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      {customers.length === ZERO ? (
        <p className="text-center text-gray-500">{NO_TRANSACTIONS}</p>
      ) : (
        <>
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">{CUSTOMER_ID}</th>
                <th className="border border-gray-300 p-2">
                  {PURCHASE_AMOUNT}
                </th>
                <th className="border border-gray-300 p-2">{MONTHLY_POINTS}</th>
                <th className="border border-gray-300 p-2">{TOTAL_POINTS}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map(([id, data]) => (
                <React.Fragment key={id}>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 font-semibold flex items-center gap-2">
                      <button
                        onClick={() => toggleRow(id)}
                        className="text-indigo-600 font-bold"
                      >
                        {expandedRows[id] ? "➖" : "➕"}
                      </button>
                      {id}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {Object.entries(data.purchases).map(([month, amt]) => (
                        <div key={month}>
                          {`${month}: `}
                          <span className="text-green-600 font-medium">
                            ${amt.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {Object.entries(data.monthly).map(([month, pts]) => (
                        <div key={month}>
                          {`${month}: `}
                          <span className="font-medium text-indigo-600">
                            {pts}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="border border-gray-300 p-2 font-semibold">
                      {data.total}
                    </td>
                  </tr>

                  {/* Transaction details row */}
                  {expandedRows[id] && (
                    <tr>
                      <td
                        colSpan="4"
                        className="bg-gray-50 p-4 text-sm text-gray-700"
                      >
                        {Object.entries(data.transactions).map(
                          ([month, txList]) => (
                            <div key={month} className="mb-2">
                              <div className="font-semibold mb-1">
                                {`${month} ${TRANSACTIONS}`}:
                              </div>
                              <ul className="list-disc list-inside ml-4">
                                {txList.map((tx, index) => (
                                  <li key={index}>
                                    {`${new Date(
                                      tx.date
                                    ).toLocaleDateString()} → 
                                    ${TRANSACTION_ID}: ${tx.transactionId} → 
                                    ${PURCHASE_AMOUNT}: ${tx.amount.toFixed(
                                      TWO
                                    )} →
                                    ${POINTS}: ${tx.points}`}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-center gap-2">
            <button
              className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - ONE, ONE))
              }
              disabled={currentPage === ONE}
            >
              {`${PREVEIOUS}`}
            </button>
            <span className="px-3 py-1 text-gray-700 font-medium">
              {`${PAGE} ${currentPage} ${OF} ${totalPages}`}
            </span>
            <button
              className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < totalPages ? prev + ONE : prev
                )
              }
              disabled={currentPage === totalPages}
            >
              {`${NEXT}`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerTable;
