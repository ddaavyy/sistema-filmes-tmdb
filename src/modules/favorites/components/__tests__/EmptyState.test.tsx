import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  it("shows the empty state message", () => {
    render(
      <MemoryRouter>
        <EmptyState />
      </MemoryRouter>,
    );
    expect(screen.getByText("Nenhum filme favorito ainda")).toBeInTheDocument();
  });

  it("shows a call-to-action link pointing to the home page", () => {
    render(
      <MemoryRouter>
        <EmptyState />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: /explorar/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
