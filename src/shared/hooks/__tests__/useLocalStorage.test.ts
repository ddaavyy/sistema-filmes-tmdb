import { act, renderHook } from "@testing-library/react";

import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns the initial value when storage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("k", 42));
    expect(result.current[0]).toBe(42);
  });

  it("reads the stored value on mount", () => {
    localStorage.setItem("k", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("k", "default"));
    expect(result.current[0]).toBe("stored");
  });

  it("writes to localStorage when the value changes", () => {
    const { result } = renderHook(() => useLocalStorage("k", 0));
    act(() => {
      result.current[1](99);
    });
    expect(JSON.parse(localStorage.getItem("k")!)).toBe(99);
  });

  it("returns the initial value when stored JSON is malformed", () => {
    localStorage.setItem("k", "{broken");
    const { result } = renderHook(() => useLocalStorage("k", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage<number[]>("k", []));
    act(() => {
      result.current[1]((prev) => [...prev, 1]);
    });
    expect(result.current[0]).toEqual([1]);
  });
});
