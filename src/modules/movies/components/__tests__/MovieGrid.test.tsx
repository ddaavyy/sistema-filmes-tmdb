import { render, screen } from "@testing-library/react";

import type { Movie } from "../../types";
import { MovieGrid } from "../MovieGrid";

jest.mock("../MovieCard", () => ({
  MovieCard: ({ movie, isLoading }: { movie?: { title: string }; isLoading?: boolean }) =>
    isLoading ? <div data-testid="skeleton-card" /> : <div>{movie?.title}</div>,
}));

const movies: Movie[] = [
  { id: 1, title: "Matrix", overview: "", poster_path: null, release_date: "", vote_average: 8 },
  { id: 2, title: "Inception", overview: "", poster_path: null, release_date: "", vote_average: 9 },
];

const defaults = {
  movies: [] as Movie[],
  isLoading: false,
  isFetchingNextPage: false,
  hasNextPage: false,
  fetchNextPage: jest.fn(),
};

describe("MovieGrid", () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    })) as unknown as typeof IntersectionObserver;
  });

  it("shows skeleton cards while loading", () => {
    render(<MovieGrid {...defaults} isLoading movies={[]} />);
    expect(screen.getAllByTestId("skeleton-card").length).toBeGreaterThan(0);
  });

  it("renders a card for each movie", () => {
    render(<MovieGrid {...defaults} movies={movies} />);
    expect(screen.getByText("Matrix")).toBeInTheDocument();
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("shows 'Fim dos resultados' when all pages are loaded", () => {
    render(<MovieGrid {...defaults} movies={movies} hasNextPage={false} />);
    expect(screen.getByText(/Fim dos resultados/)).toBeInTheDocument();
  });

  it("shows 'Role para carregar mais' when another page is available", () => {
    render(<MovieGrid {...defaults} movies={movies} hasNextPage />);
    expect(screen.getByText(/Role para carregar mais/)).toBeInTheDocument();
  });

  it("shows 'Carregando mais...' while fetching the next page", () => {
    render(<MovieGrid {...defaults} movies={movies} isFetchingNextPage hasNextPage />);
    expect(screen.getByText(/Carregando mais/)).toBeInTheDocument();
  });
});
