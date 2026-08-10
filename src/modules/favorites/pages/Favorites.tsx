import { MovieCard } from "@modules/movies/components/MovieCard";
import { Link } from "react-router-dom";

import { EmptyState } from "../components/EmptyState";
import { SortControl } from "../components/SortControl";
import { useFavoriteMovies } from "../hooks/useFavoriteMovies";

const Favorites = () => {
  const { movies, isLoading, isError, sortBy, setSortBy, removeFavorite } = useFavoriteMovies();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              TMDB
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-50">
              Favoritos
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Seus filmes marcados como favoritos aparecem aqui.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Voltar para a lista
          </Link>
        </header>

        {isError ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300">
            Ocorreu um erro ao carregar seus filmes favoritos.
          </div>
        ) : movies.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <SortControl value={sortBy} onChange={setSortBy} />
            </div>
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => <MovieCard key={index} isLoading />)
                : movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onRemove={removeFavorite} />
                  ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default Favorites;
