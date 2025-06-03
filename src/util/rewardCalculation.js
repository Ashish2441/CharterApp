import { FIFTY, HUNDRED, TWO, ZERO } from "../constant/constants";

export const calculatePoints = (amount) => {
  if (amount <= FIFTY) return ZERO;
  if (amount <= HUNDRED) return amount - FIFTY;
  return FIFTY + (amount - HUNDRED) * TWO;
};
