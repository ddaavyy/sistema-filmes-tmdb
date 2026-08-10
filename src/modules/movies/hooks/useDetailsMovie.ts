import { useQuery } from "@tanstack/react-query";

import { fetchMovieDetails } from "../services/tmdb";

export const useDetailsMovie = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
};
