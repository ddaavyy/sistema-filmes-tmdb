import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/tmdb";

export function useMovies(query = "", page = 1) {
  return useQuery({
    queryKey: ["movies", { query, page }],
    queryFn: () => fetchMovies(query, page),
    staleTime: 1000 * 60 * 2,
  });
}
