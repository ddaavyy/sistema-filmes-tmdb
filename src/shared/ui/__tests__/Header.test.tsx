import { ThemeProvider } from "@src/shared/context/ThemeContext/ThemeContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

import { Header } from "../Header";

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname + location.search}</div>;
}

function renderHeader(initialEntry: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Header />
                <LocationDisplay />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("Header", () => {
  it("navigates to /search with the typed term on submit", () => {
    renderHeader("/");

    const input = screen.getByPlaceholderText("Pesquisar filmes...");
    fireEvent.change(input, { target: { value: "matrix" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByTestId("location")).toHaveTextContent("/search?q=matrix");
  });

  it("navigates home when submitting an empty search", () => {
    renderHeader("/search?q=matrix");

    const input = screen.getByPlaceholderText("Pesquisar filmes...");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  it("shows a clear (X) button with text and clears it back to Home", () => {
    renderHeader("/search?q=matrix");

    const input = screen.getByPlaceholderText("Pesquisar filmes...") as HTMLInputElement;
    expect(input.value).toBe("matrix");

    fireEvent.click(screen.getByLabelText("Limpar busca"));

    expect(input.value).toBe("");
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  it("resyncs the input (no clear button) when navigating via the logo, instead of keeping the last typed term", () => {
    renderHeader("/search?q=matrix");

    const input = screen.getByPlaceholderText("Pesquisar filmes...") as HTMLInputElement;
    expect(input.value).toBe("matrix");

    fireEvent.click(screen.getByText("TMDB"));

    expect(screen.getByTestId("location")).toHaveTextContent("/");
    expect(input.value).toBe("");
    expect(screen.queryByLabelText("Limpar busca")).not.toBeInTheDocument();
  });

  it("toggles dark mode when clicking the theme button", () => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    renderHeader("/");

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    fireEvent.click(screen.getByLabelText("Ativar tema escuro"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    fireEvent.click(screen.getByLabelText("Ativar tema claro"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
