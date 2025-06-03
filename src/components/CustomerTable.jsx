import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { useCustomerData } from "../hooks/useCustomerData";
import { usePaginatedCustomers } from "../hooks/usePaginatedCustomers";
import { classes } from "../styles/CustomerTable";
import {
  NO_TRANSACTIONS,
  CUSTOMER_ID,
  MONTHLY_POINTS,
  TOTAL_POINTS,
  PURCHASE_AMOUNT,
  PREVEIOUS,
  NEXT,
  PAGE,
  OF,
  FIVE,
  ONE,
  ZERO,
  LOADING,
  COLOUMN_SPAN_FOUR,
  TWO,
} from "../constant/constants";

const TransactionDetails = lazy(() => import("./TransactionDetails"));

const CustomerTable = ({ data, selectedMonth, selectedYear }) => {
  const [currentPage, setCurrentPage] = useState(ONE);
  const [expandedRows, setExpandedRows] = useState({});
  const recordsPerPage = FIVE;

  const { customers } = useCustomerData(data, selectedMonth, selectedYear);
  const paginatedCustomers = usePaginatedCustomers(customers, currentPage, recordsPerPage);

  useEffect(() => {
    setExpandedRows({});
    setCurrentPage(ONE);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    setExpandedRows({});
  }, [currentPage]);

  const toggleRow = useCallback((id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  if (customers.length === ZERO) {
    return <p className={classes.noDataText}>{NO_TRANSACTIONS}</p>;
  }

  return (
    <div className={classes.container}>
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
                  <button onClick={() => toggleRow(id)} className={classes.button}>
                    {expandedRows[id] ? "➖" : "➕"}
                  </button>
                  {id}
                </td>
                <td className={classes.td}>
                  {Object.entries(data.purchases).map(([month, amt]) => (
                    <div key={month}>
                      {month}: <span className={classes.amountText}>${amt.toFixed(TWO)}</span>
                    </div>
                  ))}
                </td>
                <td className={classes.td}>
                  {Object.entries(data.monthly).map(([month, points]) => (
                    <div key={month}>
                      {month}: <span className={classes.pointsText}>{points}</span>
                    </div>
                  ))}
                </td>
                <td className={`${classes.td} ${classes.totalPoints}`}>{data.total}</td>
              </tr>
              {expandedRows[id] && (
                <tr>
                  <Suspense fallback={<td colSpan={COLOUMN_SPAN_FOUR}>{LOADING}</td>}>
                    <TransactionDetails transactions={data.transactions} />
                  </Suspense>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className={classes.paginationWrapper}>
        <button className={classes.paginationButton} onClick={() => setCurrentPage((prev) => Math.max(prev - ONE, ONE))} disabled={currentPage === ONE}>
          {PREVEIOUS}
        </button>
        <span className={classes.paginationText}>{`${PAGE} ${currentPage} ${OF} ${Math.ceil(customers.length / recordsPerPage)}`}</span>
        <button
          className={classes.paginationButton}
          onClick={() => setCurrentPage((prev) => (prev < Math.ceil(customers.length / recordsPerPage) ? prev + ONE : prev))}
          disabled={currentPage === Math.ceil(customers.length / recordsPerPage)}
        >
          {NEXT}
        </button>
      </div>
    </div>
  );
};

CustomerTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      transactionId: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomerTable;
