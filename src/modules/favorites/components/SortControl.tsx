import type { SortOption } from "../hooks/useFavoriteMovies";

interface SortControlProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "title-asc", label: "Título (A-Z)" },
  { value: "title-desc", label: "Título (Z-A)" },
  { value: "rating-desc", label: "Nota (maior-menor)" },
  { value: "rating-asc", label: "Nota (menor-maior)" },
] as const;

export const SortControl = ({ value, onChange }: SortControlProps) => {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      Ordenar por:
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-slate-500"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
