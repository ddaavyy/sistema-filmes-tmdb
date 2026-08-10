import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AppRoutes } from "../AppRoutes";

jest.mock("../routes", () => ({
  HomePage: () => <div>Home Page</div>,
  SearchPage: () => <div>Search Page</div>,
  DetailsPage: () => <div>Details Page</div>,
  FavoritesPage: () => <div>Favorites Page</div>,
}));

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe("AppRoutes", () => {
  it("renders the home page at /", async () => {
    renderAt("/");
    expect(await screen.findByText("Home Page")).toBeInTheDocument();
  });

  it("renders the search page at /search", async () => {
    renderAt("/search");
    expect(await screen.findByText("Search Page")).toBeInTheDocument();
  });

  it("renders the details page at /movie/:id", async () => {
    renderAt("/movie/1");
    expect(await screen.findByText("Details Page")).toBeInTheDocument();
  });

  it("renders the favorites page at /favorites", async () => {
    renderAt("/favorites");
    expect(await screen.findByText("Favorites Page")).toBeInTheDocument();
  });
});
