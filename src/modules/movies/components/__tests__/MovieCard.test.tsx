import { AppProvider } from "@src/shared/context/AppContext/AppContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { Movie } from "../../types";
import { MovieCard } from "../MovieCard";

const movie: Movie = {
  id: 1,
  title: "The Matrix",
  overview: "A hacker discovers reality is a simulation.",
  poster_path: "/poster.jpg",
  release_date: "1999-03-31",
  vote_average: 8.456,
};

function renderCard(props: Partial<React.ComponentProps<typeof MovieCard>> = {}) {
  return render(
    <MemoryRouter>
      <AppProvider>
        <MovieCard movie={movie} {...props} />
      </AppProvider>
    </MemoryRouter>,
  );
}

describe("MovieCard", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("displays the formatted TMDB rating", () => {
    renderCard();
    expect(screen.getByText("8.5")).toBeInTheDocument();
  });

  it("toggles the favorite state on heart click without navigating", () => {
    renderCard();

    fireEvent.click(screen.getByLabelText("Favoritar"));

    const stored = JSON.parse(window.localStorage.getItem("favorites") ?? "[]");
    expect(stored).toContain(movie.id);
  });

  it("renders a local fallback instead of an external placeholder when there is no poster", () => {
    const { container } = renderCard({ movie: { ...movie, poster_path: null } });
    expect(container.querySelector("img")).toBeNull();
  });

  it("highlights the searched term in the title", () => {
    const { container } = renderCard({ highlightQuery: "Matrix" });
    const mark = container.querySelector("mark");
    expect(mark).toHaveTextContent("Matrix");
  });

  it("shows a trash button instead of the heart when onRemove is provided", () => {
    const onRemove = jest.fn();
    renderCard({ onRemove });

    fireEvent.click(screen.getByLabelText("Remover dos favoritos"));

    expect(onRemove).toHaveBeenCalledWith(movie.id);
    expect(screen.queryByLabelText("Favoritar")).not.toBeInTheDocument();
  });
});
