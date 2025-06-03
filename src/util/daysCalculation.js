import { EN_US, FIVE, LONG, TWELVE } from "../constant/constants";

export const currentYear = new Date().getFullYear();
export const lastFiveYears = Array.from({ length: FIVE }, (_, i) => currentYear - i);
export const months = Array.from({ length: TWELVE }, (_, i) => new Intl.DateTimeFormat(EN_US, { month: LONG }).format(new Date(2000, i)));
