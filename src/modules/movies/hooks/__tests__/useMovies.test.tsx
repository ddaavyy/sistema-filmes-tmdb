import type { MovieSearchResult } from "@modules/movies/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

import { fetchMovies } from "../../services/tmdb";
import { useMovies } from "../useMovies";

jest.mock("../../services/tmdb", () => ({
  fetchMovies: jest.fn(),
}));

const mockedFetchMovies = fetchMovies as jest.MockedFunction<typeof fetchMovies>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

const page = (overrides: Partial<MovieSearchResult> = {}): MovieSearchResult => ({
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
  ...overrides,
});

describe("useMovies", () => {
  beforeEach(() => {
    mockedFetchMovies.mockReset();
  });

  it("requests popular movies when the query is empty", async () => {
    mockedFetchMovies.mockResolvedValue(page());

    const { result } = renderHook(() => useMovies(""), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedFetchMovies).toHaveBeenCalledWith("", 1);
  });

  it("exposes another page while total_pages allows it", async () => {
    mockedFetchMovies.mockResolvedValue(page({ total_pages: 3, total_results: 30 }));

    const { result } = renderHook(() => useMovies("batman"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(true);
  });

  it("has no next page once the last page is reached", async () => {
    mockedFetchMovies.mockResolvedValue(page({ page: 1, total_pages: 1 }));

    const { result } = renderHook(() => useMovies("batman"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(false);
  });
});
