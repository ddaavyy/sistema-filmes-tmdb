import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { useDetailsMovie } from "../../hooks/useDetailsMovie";
import Details from "../Details";

jest.mock("../../hooks/useDetailsMovie", () => ({
  useDetailsMovie: jest.fn(),
}));
jest.mock("@src/shared/context/AppContext/useAppContext", () => ({
  useAppContext: jest.fn(() => ({ favorites: [], toggleFavorite: jest.fn() })),
}));

import { useAppContext } from "@src/shared/context/AppContext/useAppContext";

const mockedUseDetailsMovie = useDetailsMovie as jest.Mock;
const mockedUseAppContext = useAppContext as jest.Mock;

const movie = {
  id: 1,
  title: "The Matrix",
  overview: "A hacker discovers reality is a simulation.",
  poster_path: null,
  release_date: "1999-03-31",
  vote_average: 8.7,
  genres: [{ id: 28, name: "Action" }],
  runtime: 136,
};

function renderDetails(id = "1") {
  return render(
    <MemoryRouter initialEntries={[`/movie/${id}`]}>
      <Routes>
        <Route path="/movie/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );
}

function renderDetailsNoId() {
  return render(
    <MemoryRouter>
      <Details />
    </MemoryRouter>,
  );
}

describe("Details", () => {
  beforeEach(() => {
    mockedUseDetailsMovie.mockReturnValue({ data: movie, isLoading: false, isError: false });
    mockedUseAppContext.mockReturnValue({ favorites: [], toggleFavorite: jest.fn() });
  });

  it("shows 'Filme não encontrado' when there is no id param", () => {
    renderDetailsNoId();
    expect(screen.getByText("Filme não encontrado")).toBeInTheDocument();
  });

  it("shows loading skeletons while fetching", () => {
    mockedUseDetailsMovie.mockReturnValue({ data: undefined, isLoading: true, isError: false });
    const { container } = renderDetails();
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("renders the movie title and genre on success", () => {
    renderDetails();
    expect(screen.getByRole("heading", { name: "The Matrix" })).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders the runtime", () => {
    renderDetails();
    expect(screen.getByText(/136 min/)).toBeInTheDocument();
  });

  it("shows an error message on fetch failure", () => {
    mockedUseDetailsMovie.mockReturnValue({ data: undefined, isLoading: false, isError: true });
    renderDetails();
    expect(screen.getByText(/Não foi possível/)).toBeInTheDocument();
  });

  it("calls toggleFavorite when the favorite button is clicked", () => {
    const toggleFavorite = jest.fn();
    mockedUseAppContext.mockReturnValue({ favorites: [], toggleFavorite });
    renderDetails();
    fireEvent.click(screen.getByText("Adicionar aos favoritos"));
    expect(toggleFavorite).toHaveBeenCalledWith(1);
  });

  it("shows 'Remover dos favoritos' when the movie is already a favorite", () => {
    mockedUseAppContext.mockReturnValue({ favorites: [1], toggleFavorite: jest.fn() });
    renderDetails();
    expect(screen.getByText("Remover dos favoritos")).toBeInTheDocument();
  });
});
