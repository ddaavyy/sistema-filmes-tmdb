import { act, renderHook } from "@testing-library/react";

import { AppProvider } from "../AppContext";
import { useAppContext } from "../useAppContext";

function wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe("AppContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides an empty favorites list initially", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    expect(result.current.favorites).toEqual([]);
  });

  it("adds a movie id when toggleFavorite is called", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    act(() => {
      result.current.toggleFavorite(1);
    });
    expect(result.current.favorites).toContain(1);
  });

  it("removes a movie id on a second toggle", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    act(() => {
      result.current.toggleFavorite(1);
    });
    act(() => {
      result.current.toggleFavorite(1);
    });
    expect(result.current.favorites).not.toContain(1);
  });

  it("throws when used outside AppProvider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useAppContext())).toThrow(
      "useAppContext must be used within AppProvider",
    );
    consoleSpy.mockRestore();
  });
});
