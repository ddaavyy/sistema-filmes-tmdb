import { fetchMovieDetails } from "@modules/movies/services/tmdb";
import type { MovieDetails } from "@modules/movies/types";
import { useAppContext } from "@src/shared/context/AppContext/useAppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act,renderHook, waitFor } from "@testing-library/react";

import { sortMovies, type SortOption, useFavoriteMovies } from "../useFavoriteMovies";

jest.mock("@modules/movies/services/tmdb", () => ({
  fetchMovieDetails: jest.fn(),
}));

jest.mock("@src/shared/context/AppContext/useAppContext", () => ({
  useAppContext: jest.fn(),
}));

const mockedFetchMovieDetails = jest.mocked(fetchMovieDetails);
const mockedUseAppContext = jest.mocked(useAppContext);

const baseMovie = {
  overview: "",
  poster_path: null,
  release_date: "2020-01-01",
  genres: [],
  runtime: 100,
};

const movies: MovieDetails[] = [
  {
    ...baseMovie,
    id: 1,
    title: "Beta",
    vote_average: 7,
  },
  {
    ...baseMovie,
    id: 2,
    title: "alpha",
    vote_average: 9,
  },
  {
    ...baseMovie,
    id: 3,
    title: "Charlie",
    vote_average: 5,
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

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

  it("returns array as-is when an invalid sort option is passed", () => {
    const result = sortMovies(movies, "invalid-option" as SortOption);

    expect(result).toEqual(movies);
  });
});

describe("useFavoriteMovies", () => {
  const toggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseAppContext.mockReturnValue({
      favorites: [],
      toggleFavorite,
    } as ReturnType<typeof useAppContext>);
  });

  it("initializes with empty favorites", () => {
    const { result } = renderHook(() => useFavoriteMovies(), {
      wrapper: createWrapper(),
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.sortBy).toBe("title-asc");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.removeFavorite).toBe(toggleFavorite);
  });

  it("fetches favorite movies", async () => {
    mockedUseAppContext.mockReturnValue({
      favorites: [1, 2, 3],
      toggleFavorite,
    } as ReturnType<typeof useAppContext>);

    mockedFetchMovieDetails
      .mockResolvedValueOnce(movies[0])
      .mockResolvedValueOnce(movies[1])
      .mockResolvedValueOnce(movies[2]);

    const { result } = renderHook(() => useFavoriteMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedFetchMovieDetails).toHaveBeenCalledTimes(3);

    expect(mockedFetchMovieDetails).toHaveBeenNthCalledWith(1, "1");
    expect(mockedFetchMovieDetails).toHaveBeenNthCalledWith(2, "2");
    expect(mockedFetchMovieDetails).toHaveBeenNthCalledWith(3, "3");

    expect(result.current.movies.map((movie) => movie.id)).toEqual([2, 1, 3]);
  });

  it("sorts favorite movies by title descending", async () => {
    mockedUseAppContext.mockReturnValue({
      favorites: [1, 2, 3],
      toggleFavorite,
    } as ReturnType<typeof useAppContext>);

    mockedFetchMovieDetails
      .mockResolvedValueOnce(movies[0])
      .mockResolvedValueOnce(movies[1])
      .mockResolvedValueOnce(movies[2]);

    const { result } = renderHook(() => useFavoriteMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setSortBy("title-desc");
    });

    expect(result.current.sortBy).toBe("title-desc");

    expect(result.current.movies.map((movie) => movie.title)).toEqual(["Charlie", "Beta", "alpha"]);
  });

  it("sorts favorite movies by rating ascending", async () => {
    mockedUseAppContext.mockReturnValue({
      favorites: [1, 2, 3],
      toggleFavorite,
    } as ReturnType<typeof useAppContext>);

    mockedFetchMovieDetails
      .mockResolvedValueOnce(movies[0])
      .mockResolvedValueOnce(movies[1])
      .mockResolvedValueOnce(movies[2]);

    const { result } = renderHook(() => useFavoriteMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setSortBy("rating-asc");
    });

    expect(result.current.movies.map((movie) => movie.id)).toEqual([3, 1, 2]);
  });

  it("sorts favorite movies by rating descending", async () => {
    mockedUseAppContext.mockReturnValue({
      favorites: [1, 2, 3],
      toggleFavorite,
    } as ReturnType<typeof useAppContext>);

    mockedFetchMovieDetails
      .mockResolvedValueOnce(movies[0])
      .mockResolvedValueOnce(movies[1])
      .mockResolvedValueOnce(movies[2]);

    const { result } = renderHook(() => useFavoriteMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setSortBy("rating-desc");
    });

    expect(result.current.movies.map((movie) => movie.id)).toEqual([2, 1, 3]);
  });

  it("sets isError when fetching a favorite movie fails", async () => {
    mockedUseAppContext.mockReturnValue({
      favorites: [1],
      toggleFavorite,
    } as ReturnType<typeof useAppContext>);

    mockedFetchMovieDetails.mockRejectedValueOnce(new Error("Failed to fetch movie"));

    const { result } = renderHook(() => useFavoriteMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.movies).toEqual([]);
  });

  it("removes a favorite using toggleFavorite", () => {
    mockedUseAppContext.mockReturnValue({
      favorites: [],
      toggleFavorite,
    } as ReturnType<typeof useAppContext>);

    const { result } = renderHook(() => useFavoriteMovies(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.removeFavorite(123);
    });

    expect(toggleFavorite).toHaveBeenCalledTimes(1);
    expect(toggleFavorite).toHaveBeenCalledWith(123);
  });

  it("uses only successfully fetched movies", async () => {
    mockedUseAppContext.mockReturnValue({
      favorites: [1, 2, 3],
      toggleFavorite,
    } as ReturnType<typeof useAppContext>);

    mockedFetchMovieDetails
      .mockResolvedValueOnce(movies[0])
      .mockRejectedValueOnce(new Error("Movie not found"))
      .mockResolvedValueOnce(movies[2]);

    const { result } = renderHook(() => useFavoriteMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.movies.map((movie) => movie.id)).toEqual([1, 3]);
  });
});
