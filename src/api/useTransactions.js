import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { LOADING, TRANSACTION_LOADED, TRANSACTION_LOADING_FAILED, TRANSACTIONS_QUERY_KEY } from "../constant/constants";

const fetchTransactions = async () => {
  const response = await fetch("/data/transactions.json");
  if (!response.ok) {
    throw new Error(TRANSACTION_LOADING_FAILED);
  }
  return response.json();
};

export const useTransactions = () => {
  const {
    data: transactions = [],
    isLoading: loading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY],
    queryFn: fetchTransactions,
  });

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.loading(LOADING);
    }
  }, [loading]);

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success(TRANSACTION_LOADED);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.dismiss();
      toast.error(error.message || TRANSACTION_LOADING_FAILED);
    }
  }, [isError, error]);

  return {
    transactions,
    loading,
    error: isError ? error.message : null,
  };
};
