import React, { useEffect, useState } from "react";
import CustomerTable from "./components/CustomerTable";
import FilterBar from "./components/FilterBar";
import { CUSTOMER_REWARD_DASHBOARD, LOADING } from "./data/constant";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/transactions.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        {CUSTOMER_REWARD_DASHBOARD}
      </h1>
      <FilterBar
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />
      {loading && <p>{LOADING}</p>}
      {error && (
        <p className="text-red-600 font-semibold text-center mt-4">{error}</p>
      )}
      {!loading && !error && (
        <CustomerTable
          data={transactions}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      )}
    </div>
  );
}

export default App;
