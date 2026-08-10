import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <Clapperboard size={48} className="text-slate-300 dark:text-slate-600" />
      <div>
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Nenhum filme favorito ainda
        </p>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Comece explorando filmes populares e adicione seus favoritos!
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
      >
        Explorar Filmes
      </Link>
    </div>
  );
};
