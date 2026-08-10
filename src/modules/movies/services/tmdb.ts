import type { MovieDetails, MovieSearchResult } from "@modules/movies/types";
import { api } from "@shared/lib/axiosClient";

export const fetchMovies = async (query = "", page = 1): Promise<MovieSearchResult> => {
  const endpoint = query.trim() ? "/search/movie" : "/movie/popular";

  const { data } = await api.get(endpoint, {
    params: {
      query: query.trim() || undefined,
      page,
    },
  });

  return data;
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const { data } = await api.get(`/movie/${id}`);
  return data;
};
