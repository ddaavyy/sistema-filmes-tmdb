import { api } from "@shared/lib/axiosClient";

import { fetchMovieDetails, fetchMovies } from "../tmdb";

jest.mock("@shared/lib/axiosClient", () => ({
  api: { get: jest.fn() },
}));

const mockedGet = api.get as jest.Mock;

const pageData = { results: [], page: 1, total_pages: 1, total_results: 0 };

describe("fetchMovies", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("calls /movie/popular for an empty query", async () => {
    mockedGet.mockResolvedValue({ data: pageData });
    await fetchMovies();
    expect(mockedGet).toHaveBeenCalledWith(
      "/movie/popular",
      expect.objectContaining({ params: expect.objectContaining({ page: 1 }) }),
    );
  });

  it("calls /movie/popular when the query is only whitespace", async () => {
    mockedGet.mockResolvedValue({ data: pageData });
    await fetchMovies("   ");
    expect(mockedGet).toHaveBeenCalledWith("/movie/popular", expect.anything());
  });

  it("calls /search/movie for a non-empty query", async () => {
    mockedGet.mockResolvedValue({ data: pageData });
    await fetchMovies("batman");
    expect(mockedGet).toHaveBeenCalledWith(
      "/search/movie",
      expect.objectContaining({ params: expect.objectContaining({ query: "batman" }) }),
    );
  });

  it("returns the response data", async () => {
    const data = { results: [{ id: 1 }], page: 1, total_pages: 2, total_results: 20 };
    mockedGet.mockResolvedValue({ data });
    const result = await fetchMovies();
    expect(result).toEqual(data);
  });
});

describe("fetchMovieDetails", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("calls /movie/:id", async () => {
    mockedGet.mockResolvedValue({ data: { id: 1, title: "Matrix" } });
    await fetchMovieDetails("42");
    expect(mockedGet).toHaveBeenCalledWith("/movie/42");
  });

  it("returns the movie details", async () => {
    const data = { id: 1, title: "Matrix", genres: [], runtime: 120 };
    mockedGet.mockResolvedValue({ data });
    const result = await fetchMovieDetails("1");
    expect(result).toEqual(data);
  });
});
