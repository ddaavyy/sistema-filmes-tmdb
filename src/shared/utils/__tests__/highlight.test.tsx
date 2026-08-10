import { render } from "@testing-library/react";

import { highlightMatch } from "../highlight";

describe("highlightMatch", () => {
  it("returns the text as-is when no query is provided", () => {
    expect(highlightMatch("The Matrix")).toEqual(["The Matrix"]);
  });

  it("returns the text as-is when query is empty or whitespace", () => {
    expect(highlightMatch("The Matrix", "")).toEqual(["The Matrix"]);
    expect(highlightMatch("The Matrix", "   ")).toEqual(["The Matrix"]);
  });

  it("wraps the matching substring in a <mark> element", () => {
    const parts = highlightMatch("The Matrix Reloaded", "Matrix");
    const { container } = render(<>{parts}</>);
    const mark = container.querySelector("mark");
    expect(mark).not.toBeNull();
    expect(mark?.textContent).toBe("Matrix");
  });

  it("is case-insensitive", () => {
    const parts = highlightMatch("The Matrix", "matrix");
    const { container } = render(<>{parts}</>);
    expect(container.querySelector("mark")?.textContent).toBe("Matrix");
  });

  it("escapes regex special characters in the query", () => {
    expect(() => highlightMatch("Price: $10.00", "$10.00")).not.toThrow();
    const parts = highlightMatch("Price: $10.00", "$10.00");
    const { container } = render(<>{parts}</>);
    expect(container.querySelector("mark")?.textContent).toBe("$10.00");
  });

  it("highlights multiple occurrences", () => {
    const parts = highlightMatch("batman and batman", "batman");
    const { container } = render(<>{parts}</>);
    expect(container.querySelectorAll("mark")).toHaveLength(2);
  });
});
