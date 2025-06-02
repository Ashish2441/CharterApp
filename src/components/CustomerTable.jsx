import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { calculatePoints } from "../util/rewardCalculation";
import { classes } from "../styles/classMap";
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
  COLOUMN_SPAN_FOUR,
} from "../data/constant";

const CustomerTable = ({ data, selectedMonth, selectedYear }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = FIVE;
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    setExpandedRows({});
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    setExpandedRows({});
  }, [currentPage]);

  const filteredData = useMemo(() => {
    return data.filter((tx) => {
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
  }, [data, selectedMonth, selectedYear]);

  const customerMap = useMemo(() => {
    const map = {};
    filteredData.forEach((tx) => {
      const { customerId, amount, date, transactionId } = tx;
      const points = calculatePoints(amount);
      const month = new Date(date).toLocaleString(DEFAULT, { month: LONG });

      if (!map[customerId]) {
        map[customerId] = {
          total: ZERO,
          monthly: {},
          purchases: {},
          transactions: {},
        };
      }
      map[customerId].total += points;
      map[customerId].monthly[month] =
        (map[customerId].monthly[month] || ZERO) + points;
      map[customerId].purchases[month] =
        (map[customerId].purchases[month] || ZERO) + amount;

      if (!map[customerId].transactions[month]) {
        map[customerId].transactions[month] = [];
      }
      map[customerId].transactions[month].push({
        amount,
        points,
        date,
        transactionId,
      });
    });
    return map;
  }, [filteredData]);

  const customers = useMemo(() => Object.entries(customerMap), [customerMap]);

  const paginatedCustomers = useMemo(() => {
    return customers.slice(
      (currentPage - ONE) * recordsPerPage,
      currentPage * recordsPerPage
    );
  }, [customers, currentPage, recordsPerPage]);

  const toggleRow = useCallback((customerId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [customerId]: !prev[customerId],
    }));
  }, []);

  return (
    <div className={classes.container}>
      {customers.length === ZERO && (
        <p className={classes.noDataText}>{NO_TRANSACTIONS}</p>
      )}
      {customers.length !== ZERO && (
        <>
          <table className={classes.table}>
            <thead>
              <tr className={classes.theadRow}>
                <th className={classes.th}>{CUSTOMER_ID}</th>
                <th className={classes.th}>{PURCHASE_AMOUNT}</th>
                <th className={classes.th}>{MONTHLY_POINTS}</th>
                <th className={classes.th}>{TOTAL_POINTS}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map(([id, data]) => (
                <React.Fragment key={id}>
                  <tr className={classes.tr}>
                    <td className={`${classes.td} ${classes.customerIdCell}`}>
                      <button
                        onClick={() => toggleRow(id)}
                        className={classes.button}
                      >
                        {expandedRows[id] ? "➖" : "➕"}
                      </button>
                      {id}
                    </td>
                    <td className={classes.td}>
                      {Object.entries(data.purchases).map(([month, amt]) => (
                        <div key={month}>
                          {`${month}: `}
                          <span className={classes.amountText}>
                            ${amt.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className={classes.td}>
                      {Object.entries(data.monthly).map(([month, pts]) => (
                        <div key={month}>
                          {`${month}: `}
                          <span className={classes.pointsText}>{pts}</span>
                        </div>
                      ))}
                    </td>
                    <td className={`${classes.td} ${classes.totalPoints}`}>
                      {data.total}
                    </td>
                  </tr>
                  {expandedRows[id] && (
                    <tr>
                      <td
                        colSpan={COLOUMN_SPAN_FOUR}
                        className={classes.transactionsCell}
                      >
                        {Object.entries(data.transactions).map(
                          ([month, txList]) => (
                            <div
                              key={month}
                              className={classes.transactionGroup}
                            >
                              <div className={classes.transactionLabel}>
                                {`${month} ${TRANSACTIONS}`}:
                              </div>
                              <ul className={classes.transactionList}>
                                {txList.map((tx) => (
                                  <li key={tx.transactionId}>
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
          <div className={classes.paginationWrapper}>
            <button
              className={classes.paginationButton}
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - ONE, ONE))
              }
              disabled={currentPage === ONE}
            >
              {PREVEIOUS}
            </button>
            <span className={classes.paginationText}>
              {`${PAGE} ${currentPage} ${OF} ${Math.ceil(
                customers.length / recordsPerPage
              )}`}
            </span>
            <button
              className={classes.paginationButton}
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(customers.length / recordsPerPage)
                    ? prev + ONE
                    : prev
                )
              }
              disabled={
                currentPage === Math.ceil(customers.length / recordsPerPage)
              }
            >
              {NEXT}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

CustomerTable.propTypes = {
  data: PropTypes.array.isRequired,
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomerTable;
