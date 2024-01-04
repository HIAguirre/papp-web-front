export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const monthColors = [
  "rgba(169, 234, 255, 1)",
  "rgba(255, 175, 214, 1)",
  "rgba(142, 141, 228, 1)",
  "rgba(176, 255, 217, 1)",
  "rgba(243, 201, 152, 1)",
  "rgba(211, 141, 228, 1)",
  "rgba(207, 255, 170, 1)",
  "rgba(183, 255, 238, 1)",
  "rgba(255, 167, 167, 1)",
  "rgba(255, 233, 207, 1)",
  "rgba(255, 252, 175, 1)",
  "rgba(176, 203, 255, 1)",
];

export const transpose = (matrix: any[][]) => {
  if (!matrix || !matrix.length) {
    return [[]];
  }
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
};

export const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatCurrencyPercentage = (
  value: number | string,
  format?: "currency" | "percentage"
) => {
  if (value === undefined || value === null) return "";
  if (!format) return `${value}`;
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (format === "currency") {
    return `$${formatNumber(number)}`;
  }
  return `${formatNumber(number)}%`;
};

export const beautifyName = (name?: string): string => {
  if (!name) return "";
  const words = name.split(" ");
  const beautifiedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return beautifiedWords.join(" ");
};
