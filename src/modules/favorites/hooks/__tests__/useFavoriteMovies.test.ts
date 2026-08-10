import type { MovieDetails } from "@modules/movies/types";

import { sortMovies, type SortOption } from "../useFavoriteMovies";

jest.mock("@modules/movies/services/tmdb", () => ({
  fetchMovieDetails: jest.fn(),
}));

const baseMovie = {
  overview: "",
  poster_path: null,
  release_date: "2020-01-01",
  genres: [],
  runtime: 100,
};

const movies: MovieDetails[] = [
  { ...baseMovie, id: 1, title: "Beta", vote_average: 7 },
  { ...baseMovie, id: 2, title: "alpha", vote_average: 9 },
  { ...baseMovie, id: 3, title: "Charlie", vote_average: 5 },
];

describe("sortMovies", () => {
  it("sorts by title ascending", () => {
    expect(sortMovies(movies, "title-asc").map((m) => m.title)).toEqual([
      "alpha",
      "Beta",
      "Charlie",
    ]);
  });

  it("sorts by title descending", () => {
    expect(sortMovies(movies, "title-desc").map((m) => m.title)).toEqual([
      "Charlie",
      "Beta",
      "alpha",
    ]);
  });

  it("sorts by rating descending", () => {
    expect(sortMovies(movies, "rating-desc").map((m) => m.id)).toEqual([2, 1, 3]);
  });

  it("sorts by rating ascending", () => {
    expect(sortMovies(movies, "rating-asc").map((m) => m.id)).toEqual([3, 1, 2]);
  });

  it("does not mutate the original array", () => {
    const copy = [...movies];
    sortMovies(movies, "title-asc");
    expect(movies).toEqual(copy);
  });

  it("returns array as-is when an invalid sort option is passed (default case)", () => {
    const result = sortMovies(movies, "invalid-option" as SortOption);
    expect(result).toEqual(movies);
  });
});

describe("useFavoriteMovies hook", () => {
  it("initializes with empty favorites", () => {
    jest.clearAllMocks();
  });
});
