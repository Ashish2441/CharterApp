import PropTypes from "prop-types";
import { TRANSACTIONS, TRANSACTION_ID, PURCHASE_AMOUNT, POINTS, TWO, COLOUMN_SPAN_FOUR } from "../constant/constants";
import { classes } from "../styles/CustomerTable";

const TransactionDetails = ({ transactions }) => {
  return (
    <td colSpan={COLOUMN_SPAN_FOUR} className={classes.transactionsCell}>
      {Object.entries(transactions).map(([month, txList]) => (
        <div key={month} className={classes.transactionGroup}>
          <div className={classes.transactionLabel} data-testid={`transactions-${month}`}>
            {`${month} ${TRANSACTIONS}`}:
          </div>
          <ul className={classes.transactionList}>
            {txList.map((transaction) => (
              <li key={`${transaction.transactionId}-${transaction.date}`}>
                {`${new Date(transaction.date).toLocaleDateString()} → 
                ${TRANSACTION_ID}: ${transaction.transactionId} → 
                ${PURCHASE_AMOUNT}: ${transaction.amount.toFixed(TWO)} → 
                ${POINTS}: ${transaction.points}`}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </td>
  );
};

TransactionDetails.propTypes = {
  transactions: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        transactionId: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
      })
    )
  ).isRequired,
};

export default TransactionDetails;
