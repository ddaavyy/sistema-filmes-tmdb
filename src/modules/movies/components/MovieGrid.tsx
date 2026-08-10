import { useEffect, useRef } from "react";

import type { Movie } from "../types";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  highlightQuery?: string;
  skeletonCount?: number;
}

export const MovieGrid = ({
  movies,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  highlightQuery,
  skeletonCount = 8,
}: MovieGridProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && movies.length === 0
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <MovieCard key={index} isLoading />
            ))
          : movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} highlightQuery={highlightQuery} />
            ))}
      </div>

      <div ref={sentinelRef} className="mt-8 flex items-center justify-center">
        {isFetchingNextPage ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            Carregando mais...
          </div>
        ) : hasNextPage ? (
          <div className="text-sm text-slate-500 dark:text-slate-400">Role para carregar mais</div>
        ) : movies.length > 0 ? (
          <div className="text-sm text-slate-400 dark:text-slate-500">Fim dos resultados</div>
        ) : null}
      </div>
    </>
  );
};
