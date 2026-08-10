import type { MovieSearchResult } from "@modules/movies/types";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchMovies } from "../services/tmdb";

export const useMovies = (query = "") => {
  return useInfiniteQuery<MovieSearchResult>({
    queryKey: ["movies", { query }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchMovies(query, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 2,
  });
};
