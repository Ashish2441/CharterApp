import { useQuery } from "@tanstack/react-query";

const fetchTransactions = async () => {
  const response = await fetch("/data/transactions.json");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const useTransactions = () => {
  const {
    data: transactions = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  return {
    transactions,
    loading,
    error: isError ? error.message : null,
  };
};
