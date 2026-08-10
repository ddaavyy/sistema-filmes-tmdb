import { Skeleton } from "@shared/ui/Skeleton";
import { useAppContext } from "@src/shared/context/AppContext/useAppContext";
import { formatRating } from "@src/shared/utils/formatters";
import { highlightMatch } from "@src/shared/utils/highlight";
import { Film, Heart, Trash2 } from "lucide-react";
import type { MouseEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import type { Movie } from "../types";

interface MovieCardProps {
  movie?: Movie;
  isLoading?: boolean;
  highlightQuery?: string;
  onRemove?: (id: number) => void;
}

export const MovieCard = ({ movie, isLoading, highlightQuery, onRemove }: MovieCardProps) => {
  const { favorites, toggleFavorite } = useAppContext();
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Skeleton className="aspect-[2/3] w-full rounded-3xl" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!movie) return null;

  const isFavorite = favorites.includes(movie.id);
  const showFallback = imageError || !movie.poster_path;

  const handleToggleFavorite = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(movie.id);
  };

  const handleRemove = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onRemove?.(movie.id);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="block h-full">
      <article className="flex h-full flex-col space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800">
          {showFallback ? (
            <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-600">
              <Film size={48} />
            </div>
          ) : (
            <img
              className="h-full w-full object-cover"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              onError={() => setImageError(true)}
            />
          )}

          <button
            type="button"
            onClick={onRemove ? handleRemove : handleToggleFavorite}
            aria-label={onRemove ? "Remover dos favoritos" : "Favoritar"}
            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            {onRemove ? (
              <Trash2 size={18} />
            ) : (
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            )}
          </button>

          <span className="absolute bottom-2 left-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white shadow">
            {formatRating(movie.vote_average)}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between space-y-1">
          <h3 className="text-base font-semibold text-slate-900 line-clamp-2 dark:text-slate-50">
            {highlightQuery ? highlightMatch(movie.title, highlightQuery) : movie.title}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 dark:text-slate-400">
            {movie.overview}
          </p>
        </div>
      </article>
    </Link>
  );
};
