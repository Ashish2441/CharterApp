import { useMemo } from "react";
import { calculatePoints } from "../util/rewardCalculation";
import { ONE, TWO, ZERO, DEFAULT, LONG, LAST_THREE } from "../constant/constants";
import { currentYear } from "../util/daysCalculation";

export function useCustomerData(data, selectedMonth, selectedYear) {
  const filteredData = useMemo(() => {
    const today = new Date();
    return data.filter((tx) => {
      const date = new Date(tx.date);
      const txMonth = date.getMonth() + ONE;
      const txYear = date.getFullYear();
      if (!selectedMonth && selectedYear !== currentYear) {
        return date <= today && txYear === parseInt(selectedYear);
      }
      if (!selectedMonth || selectedMonth === LAST_THREE) {
        const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - TWO, ONE);
        return date >= threeMonthsAgo && date <= today && txYear === parseInt(selectedYear);
      }
      return txMonth === parseInt(selectedMonth) && txYear === parseInt(selectedYear);
    });
  }, [data, selectedMonth, selectedYear]);

  const customerMap = useMemo(() => {
    const map = {};
    filteredData.forEach(({ customerId, amount, date, transactionId }) => {
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
      map[customerId].monthly[month] = (map[customerId].monthly[month] || ZERO) + points;
      map[customerId].purchases[month] = (map[customerId].purchases[month] || ZERO) + amount;
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

  return {
    customerMap,
    customers: useMemo(() => Object.entries(customerMap), [customerMap]),
  };
}
