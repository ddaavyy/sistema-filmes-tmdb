import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

import { fetchMovieDetails } from "../../services/tmdb";
import type { MovieDetails } from "../../types";
import { useDetailsMovie } from "../useDetailsMovie";

jest.mock("../../services/tmdb", () => ({
  fetchMovieDetails: jest.fn(),
}));

const mockedFetch = fetchMovieDetails as jest.MockedFunction<typeof fetchMovieDetails>;

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

const movie: MovieDetails = {
  id: 1,
  title: "The Matrix",
  overview: "A hacker discovers reality.",
  poster_path: null,
  release_date: "1999-03-31",
  vote_average: 8.7,
  genres: [{ id: 28, name: "Action" }],
  runtime: 136,
};

describe("useDetailsMovie", () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it("calls fetchMovieDetails with the given id", async () => {
    mockedFetch.mockResolvedValue(movie);
    const { result } = renderHook(() => useDetailsMovie("1"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockedFetch).toHaveBeenCalledWith("1");
  });

  it("does not fetch when the id is empty", async () => {
    const { result } = renderHook(() => useDetailsMovie(""), {
      wrapper: createWrapper(),
    });
    await new Promise((r) => setTimeout(r, 30));
    expect(result.current.isPending).toBe(true);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("exposes the movie data on success", async () => {
    mockedFetch.mockResolvedValue(movie);
    const { result } = renderHook(() => useDetailsMovie("1"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe("The Matrix");
  });

  it("exposes isError on failure", async () => {
    mockedFetch.mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useDetailsMovie("1"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
