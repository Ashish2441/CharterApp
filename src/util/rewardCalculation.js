import { FIFTY, HUNDRED, TWO, ZERO } from "../constant/constants";

export const calculatePoints = (amount) => {
  if (amount <= FIFTY) return ZERO;
  if (amount <= HUNDRED) return Math.round(amount - FIFTY);
  return Math.round(FIFTY + (amount - HUNDRED) * TWO);
};
