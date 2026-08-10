import type { ReactNode } from "react";

export const highlightMatch = (text: string, query?: string): ReactNode[] => {
  const term = query?.trim();
  if (!term) return [text];

  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="rounded bg-amber-200 px-0.5 text-slate-900">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
};
