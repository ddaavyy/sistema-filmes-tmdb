import { useSearchParams } from "react-router-dom";

import { MovieGrid } from "../components/MovieGrid";
import { useMovies } from "../hooks/useMovies";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMovies(query);

  const movies = data ? data.pages.flatMap((p) => p.results) : [];
  const totalResults = data?.pages[0]?.total_results ?? 0;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Resultados para <span className="text-amber-600 dark:text-amber-400">“{query}”</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Encontrados {totalResults} filmes
          </p>
        </header>

        {isError ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300">
            Não foi possível carregar os resultados. Tente novamente em instantes.
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={Boolean(hasNextPage)}
            fetchNextPage={fetchNextPage}
            highlightQuery={query}
          />
        )}
      </div>
    </main>
  );
};

export default Search;
