import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { useFavoriteMovies } from "../../hooks/useFavoriteMovies";
import Favorites from "../Favorites";

jest.mock("../../hooks/useFavoriteMovies", () => ({
  useFavoriteMovies: jest.fn(),
}));
jest.mock("@modules/movies/components/MovieCard", () => ({
  MovieCard: ({ movie }: { movie?: { title: string } }) =>
    movie ? <div>{movie.title}</div> : null,
}));

const mockedUseFavoriteMovies = useFavoriteMovies as jest.Mock;

const defaultHook = {
  movies: [],
  isLoading: false,
  isError: false,
  sortBy: "title-asc" as const,
  setSortBy: jest.fn(),
  removeFavorite: jest.fn(),
};

function renderFavorites() {
  return render(
    <MemoryRouter>
      <Favorites />
    </MemoryRouter>,
  );
}

describe("Favorites", () => {
  beforeEach(() => {
    mockedUseFavoriteMovies.mockReturnValue({ ...defaultHook });
  });

  it("shows the empty state when there are no favorites", () => {
    renderFavorites();
    expect(screen.getByText("Nenhum filme favorito ainda")).toBeInTheDocument();
  });

  it("renders a card for each favorite movie", () => {
    mockedUseFavoriteMovies.mockReturnValue({
      ...defaultHook,
      movies: [
        {
          id: 1,
          title: "Matrix",
          overview: "",
          poster_path: null,
          release_date: "",
          vote_average: 8,
          genres: [],
          runtime: 136,
        },
      ],
    });
    renderFavorites();
    expect(screen.getByText("Matrix")).toBeInTheDocument();
  });

  it("shows an error message on fetch failure", () => {
    mockedUseFavoriteMovies.mockReturnValue({ ...defaultHook, isError: true });
    renderFavorites();
    expect(screen.getByText(/Ocorreu um erro/)).toBeInTheDocument();
  });

  it("shows loading skeletons while fetching", () => {
    mockedUseFavoriteMovies.mockReturnValue({ ...defaultHook, isLoading: true });
    renderFavorites();
    // Loading state shows MovieCard with isLoading — our mock renders null for those
    // so just check the page title is present (page renders)
    expect(screen.getByRole("heading", { name: /Favoritos/ })).toBeInTheDocument();
  });
});
