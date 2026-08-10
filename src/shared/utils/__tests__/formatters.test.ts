import { formatDate, formatRating } from "../formatters";

describe("formatDate", () => {
  it("returns 'Data não informada' for undefined", () => {
    expect(formatDate(undefined)).toBe("Data não informada");
  });

  it("returns 'Data não informada' for null", () => {
    expect(formatDate(null)).toBe("Data não informada");
  });

  it("returns 'Data não informada' for an invalid date string", () => {
    expect(formatDate("not-a-date")).toBe("Data não informada");
  });

  it("returns a formatted date string for a valid ISO date", () => {
    const result = formatDate("1999-03-31");
    expect(result).toMatch(/março/i);
    expect(result).toMatch(/1999/);
  });
});

describe("formatRating", () => {
  it("returns '-' for undefined", () => {
    expect(formatRating(undefined)).toBe("-");
  });

  it("returns '-' for null", () => {
    expect(formatRating(null)).toBe("-");
  });

  it("returns '-' for NaN", () => {
    expect(formatRating(NaN)).toBe("-");
  });

  it("formats a float to one decimal place", () => {
    expect(formatRating(8.456)).toBe("8.5");
  });

  it("formats a whole number with one decimal place", () => {
    expect(formatRating(7)).toBe("7.0");
  });
});
