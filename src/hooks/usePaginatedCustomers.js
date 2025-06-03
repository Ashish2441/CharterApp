import { useMemo } from "react";
import { ONE } from "../constant/constants";

export function usePaginatedCustomers(customers, currentPage, recordsPerPage) {
  return useMemo(() => {
    return customers.slice((currentPage - ONE) * recordsPerPage, currentPage * recordsPerPage);
  }, [customers, currentPage, recordsPerPage]);
}
