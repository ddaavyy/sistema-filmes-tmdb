import { render } from "@testing-library/react";

import { LoadingPage } from "../LoadingPage";

describe("LoadingPage", () => {
  it("renders without crashing", () => {
    render(<LoadingPage />);
  });

  it("contains animated skeleton elements", () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("fills at least the viewport height", () => {
    const { container } = render(<LoadingPage />);
    expect(container.firstElementChild?.className).toContain("min-h-screen");
  });
});
