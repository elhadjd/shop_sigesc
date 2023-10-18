export const formatToKwanza = (value: number): string => {
  const formatter = new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};
