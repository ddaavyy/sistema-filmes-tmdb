import { MovieGrid } from "../components/MovieGrid";
import { useMovies } from "../hooks/useMovies";

const Home = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies();

  const movies = data ? data.pages.flatMap((p) => p.results) : [];
  const totalResults = data?.pages[0]?.total_results ?? 0;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              TMDB
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-50">
              Filmes em destaque
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Busque por filmes ou veja as tendências do dia.
            </p>
          </div>
        </header>

        <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Tendências do dia
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {totalResults} filmes encontrados
          </p>
        </section>

        {isError ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300">
            Não foi possível carregar os filmes. Tente novamente em instantes.
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={Boolean(hasNextPage)}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
