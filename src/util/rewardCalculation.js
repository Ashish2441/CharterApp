export const calculatePoints = (amount) => {
  if (amount <= 50) return 0;
  if (amount <= 100) return amount - 50;
  return 50 + (amount - 100) * 2;
};
