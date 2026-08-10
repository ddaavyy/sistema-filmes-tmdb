const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return "Data não informada";
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Data não informada";
  return dateFormatter.format(date);
};

export const formatRating = (value?: number | null): string => {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return value.toFixed(1);
};
