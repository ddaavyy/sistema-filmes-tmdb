import { DetailsPage, FavoritesPage, HomePage, SearchPage } from "../routes";

describe("routes", () => {
  it("exports HomePage", () => {
    expect(HomePage).toBeDefined();
  });

  it("exports SearchPage", () => {
    expect(SearchPage).toBeDefined();
  });

  it("exports DetailsPage", () => {
    expect(DetailsPage).toBeDefined();
  });

  it("exports FavoritesPage", () => {
    expect(FavoritesPage).toBeDefined();
  });
});
