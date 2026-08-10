import { render } from "@testing-library/react";

import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders with the animate-pulse class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild?.className).toContain("animate-pulse");
  });

  it("appends the custom className", () => {
    const { container } = render(<Skeleton className="h-8 w-full" />);
    expect(container.firstElementChild?.className).toContain("h-8");
    expect(container.firstElementChild?.className).toContain("w-full");
  });
});
