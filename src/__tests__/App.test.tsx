import { AppProvider } from "@src/shared/context/AppContext/AppContext";
import { ThemeProvider } from "@src/shared/context/ThemeContext/ThemeContext";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

jest.mock("@src/routes/AppRoutes", () => ({
  AppRoutes: () => <div>AppRoutes</div>,
}));

jest.mock("@shared/ui/Header", () => ({
  Header: () => <div>Header</div>,
}));

describe("App", () => {
  it("renders Header and AppRoutes", () => {
    render(
      <ThemeProvider>
        <AppProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </AppProvider>
      </ThemeProvider>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("AppRoutes")).toBeInTheDocument();
  });
});
