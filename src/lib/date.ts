export const formatDate = (date: Date | string): string => {
  const options = { day: "numeric", month: "long", year: "numeric" } as const;
  const formattedDate = new Date(date).toLocaleDateString("pt-AO", options);
  return formattedDate;
};
