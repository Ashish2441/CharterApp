import React, { useCallback } from "react";
import CustomerTable from "./components/CustomerTable";
import FilterBar from "./components/FilterBar";
import { CUSTOMER_REWARD_DASHBOARD, EMPTY_STRING, LOADING } from "./constant/constants";
import { useTransactions } from "./api/useTransactions";
import { classes, toastConfig } from "./styles/CustomerTable";
import { Toaster } from "react-hot-toast";

function App() {
  const { transactions, loading, error } = useTransactions();
  const [selectedMonth, setSelectedMonth] = React.useState(EMPTY_STRING);
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());

  const handleMonthChange = useCallback((month) => {
    setSelectedMonth(month);
  }, []);

  const handleYearChange = useCallback((year) => {
    setSelectedYear(year);
  }, []);

  return (
    <>
      <Toaster position={toastConfig.position} toastOptions={toastConfig.toastOptions} />
      <div className={classes.appWrapper}>
        <h1 className={classes.appHeading}>{CUSTOMER_REWARD_DASHBOARD}</h1>
        <FilterBar selectedMonth={selectedMonth} selectedYear={selectedYear} onMonthChange={handleMonthChange} onYearChange={handleYearChange} />
        {loading && <p>{LOADING}</p>}
        {error && <p className={classes.errorText}>{error}</p>}
        {!loading && !error && <CustomerTable data={transactions} selectedMonth={selectedMonth} selectedYear={selectedYear} />}
      </div>
    </>
  );
}

export default App;
