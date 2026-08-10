import { useTheme } from "@src/shared/context/ThemeContext/useTheme";
import { Moon, Sun, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const Header = () => {
  const [searchParams] = useSearchParams();
  const paramQ = searchParams.get("q") ?? "";
  const [q, setQ] = useState(paramQ);
  const [syncedParamQ, setSyncedParamQ] = useState(paramQ);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  if (paramQ !== syncedParamQ) {
    setSyncedParamQ(paramQ);
    setQ(paramQ);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/search?q=${encodeURIComponent(term)}` : "/");
  };

  const handleClear = () => {
    setQ("");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link to="/" className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          TMDB
        </Link>

        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl">
          <div className="flex gap-2">
            <div className="relative w-full">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Pesquisar filmes..."
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-slate-500"
              />
              {q && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Limpar busca"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button className="rounded-3xl bg-slate-900 px-4 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900">
              Buscar
            </button>
          </div>
        </form>

        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-700 transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/favorites"
            className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Favoritos
          </Link>
        </nav>
      </div>
    </header>
  );
};
