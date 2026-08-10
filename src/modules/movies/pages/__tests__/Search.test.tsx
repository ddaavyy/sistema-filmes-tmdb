import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { useMovies } from "../../hooks/useMovies";
import Search from "../Search";

jest.mock("../../hooks/useMovies", () => ({
  useMovies: jest.fn(),
}));
jest.mock("../../components/MovieGrid", () => ({
  MovieGrid: () => <div>Movie Grid</div>,
}));

const mockedUseMovies = useMovies as jest.Mock;

const successState = {
  data: { pages: [{ results: [], total_results: 5 }] },
  isLoading: false,
  isError: false,
  fetchNextPage: jest.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
};

function renderSearch(query: string) {
  return render(
    <MemoryRouter initialEntries={[`/search?q=${encodeURIComponent(query)}`]}>
      <Search />
    </MemoryRouter>,
  );
}

describe("Search", () => {
  beforeEach(() => {
    mockedUseMovies.mockReturnValue(successState);
  });

  it("shows the search query in the heading", () => {
    renderSearch("matrix");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/matrix/i);
  });

  it("shows the total results count", () => {
    renderSearch("batman");
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it("passes the query to useMovies", () => {
    renderSearch("inception");
    expect(mockedUseMovies).toHaveBeenCalledWith("inception");
  });

  it("shows an error message on fetch failure", () => {
    mockedUseMovies.mockReturnValue({ ...successState, data: undefined, isError: true });
    renderSearch("x");
    expect(screen.getByText(/Não foi possível/)).toBeInTheDocument();
  });
});
