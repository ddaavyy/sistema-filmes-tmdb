import { fireEvent, render, screen } from "@testing-library/react";

import type { SortOption } from "../../hooks/useFavoriteMovies";
import { SortControl } from "../SortControl";

describe("SortControl", () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it("renders all four sort options", () => {
    render(<SortControl value="title-asc" onChange={onChange} />);
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("reflects the current value as the selected option", () => {
    render(<SortControl value="rating-desc" onChange={onChange} />);
    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe("rating-desc");
  });

  it("calls onChange with the selected sort option", () => {
    render(<SortControl value="title-asc" onChange={onChange} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "rating-asc" },
    });
    expect(onChange).toHaveBeenCalledWith("rating-asc" as SortOption);
  });
});
