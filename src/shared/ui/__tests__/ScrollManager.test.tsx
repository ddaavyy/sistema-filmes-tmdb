import { fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";

import { ScrollManager } from "../ScrollManager";

describe("ScrollManager", () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it("scrolls to top on every route change", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollManager />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
        </nav>
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="/search" element={<div>Search page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Search"));
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);

    fireEvent.click(screen.getByText("Home"));
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });
});
