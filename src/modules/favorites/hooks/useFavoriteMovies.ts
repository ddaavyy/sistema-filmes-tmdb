import { fetchMovieDetails } from "@modules/movies/services/tmdb";
import type { MovieDetails } from "@modules/movies/types";
import { useAppContext } from "@src/shared/context/AppContext/useAppContext";
import { useQueries } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export type SortOption = "title-asc" | "title-desc" | "rating-desc" | "rating-asc";

export const sortMovies = (movies: MovieDetails[], sortBy: SortOption): MovieDetails[] => {
  const sorted = [...movies];
  switch (sortBy) {
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "rating-desc":
      return sorted.sort((a, b) => b.vote_average - a.vote_average);
    case "rating-asc":
      return sorted.sort((a, b) => a.vote_average - b.vote_average);
    default:
      return sorted;
  }
};

export const useFavoriteMovies = () => {
  const { favorites, toggleFavorite } = useAppContext();
  const [sortBy, setSortBy] = useState<SortOption>("title-asc");

  const favoriteQueries = useQueries({
    queries: favorites.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => fetchMovieDetails(id.toString()),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const isLoading = favoriteQueries.some((query) => query.isLoading);
  const isError = favoriteQueries.some((query) => query.isError);

  const movies = useMemo(() => {
    const results = favoriteQueries
      .map((query) => query.data)
      .filter((m): m is MovieDetails => Boolean(m));
    return sortMovies(results, sortBy);
  }, [favoriteQueries, sortBy]);

  return {
    movies,
    isLoading,
    isError,
    sortBy,
    setSortBy,
    removeFavorite: toggleFavorite,
  };
};
