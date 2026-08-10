import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { useMovies } from "../../hooks/useMovies";
import Home from "../Home";

jest.mock("../../hooks/useMovies", () => ({
  useMovies: jest.fn(),
}));
jest.mock("../../components/MovieGrid", () => ({
  MovieGrid: ({ isLoading }: { isLoading: boolean }) =>
    isLoading ? <div>Loading Grid</div> : <div>Movie Grid</div>,
}));

const mockedUseMovies = useMovies as jest.Mock;

const successState = {
  data: { pages: [{ results: [], total_results: 42 }] },
  isLoading: false,
  isError: false,
  fetchNextPage: jest.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
};

describe("Home", () => {
  beforeEach(() => {
    mockedUseMovies.mockReturnValue(successState);
  });

  it("renders the page heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /Filmes em destaque/i })).toBeInTheDocument();
  });

  it("shows the total results count", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText(/42/)).toBeInTheDocument();
  });

  it("delegates loading state to MovieGrid", () => {
    mockedUseMovies.mockReturnValue({ ...successState, data: undefined, isLoading: true });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading Grid")).toBeInTheDocument();
  });

  it("shows an error message on fetch failure", () => {
    mockedUseMovies.mockReturnValue({ ...successState, data: undefined, isError: true });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Não foi possível/)).toBeInTheDocument();
  });
});
