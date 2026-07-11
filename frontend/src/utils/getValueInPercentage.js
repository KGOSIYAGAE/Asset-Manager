export const getPercentage = (value, total) => {
  const percentage = (value / total) * 100;

  return Math.round(percentage * 100) / 100;
};
