import { api } from "@shared/lib/axiosClient";
import type { MovieDetails, MovieSearchResult } from "@modules/movies/types";

function getApiKey() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_TMDB_API_KEY is not defined");
  }
  return apiKey;
}

export function fetchMovies(query = "", page = 1): Promise<MovieSearchResult> {
  return api
    .get("/search/movie", {
      params: {
        api_key: getApiKey(),
        query: query || "batman",
        page,
      },
    })
    .then((response) => response.data);
}

export function fetchMovieDetails(id: string): Promise<MovieDetails> {
  return api
    .get(`/movie/${id}`, {
      params: {
        api_key: getApiKey(),
      },
    })
    .then((response) => response.data);
}
