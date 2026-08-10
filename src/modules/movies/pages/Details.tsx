import { Skeleton } from "@shared/ui/Skeleton";
import { useAppContext } from "@src/shared/context/AppContext/useAppContext";
import { formatDate, formatRating } from "@src/shared/utils/formatters";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useDetailsMovie } from "../hooks/useDetailsMovie";

const Details = () => {
  const { id } = useParams();
  const movieId = id ?? "";
  const { favorites, toggleFavorite } = useAppContext();

  const { data: movie, isLoading, isError } = useDetailsMovie(movieId);

  const imgSrc = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+imagem";

  const imgAlt = movie?.title ?? "Imagem do filme";

  const isFavorite = useMemo(
    () => Boolean(movie && favorites.includes(movie.id)),
    [favorites, movie],
  );

  if (!id) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Filme não encontrado
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Verifique o link e tente novamente.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:w-1/3 dark:border-slate-800 dark:bg-slate-900">
          {isLoading ? (
            <Skeleton className="h-[420px] w-full rounded-3xl" />
          ) : (
            <img className="w-full rounded-3xl object-cover" src={imgSrc} alt={imgAlt} />
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-1 dark:border-slate-800 dark:bg-slate-900">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 rounded-3xl" />
              <Skeleton className="h-5 w-1/2 rounded-3xl" />
              <Skeleton className="h-4 w-full rounded-3xl" />
              <Skeleton className="h-4 w-full rounded-3xl" />
              <Skeleton className="h-4 w-5/6 rounded-3xl" />
            </div>
          ) : isError || !movie ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300">
              Não foi possível carregar os detalhes do filme.
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
                    {movie.title}
                  </h1>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(movie.release_date)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
                    Nota TMDB: {formatRating(movie.vote_average)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFavorite(movie.id)}
                  className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${
                    isFavorite
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
                  }`}
                >
                  {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Duração</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {movie.runtime ?? 0} min
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                    Sinopse
                  </h2>
                  <p className="mt-3 text-slate-600 leading-7 dark:text-slate-400">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Details;
