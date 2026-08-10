import { lazy } from "react";

const HomePage = lazy(() => import("@modules/movies/pages/Home"));
const SearchPage = lazy(() => import("@modules/movies/pages/Search"));
const DetailsPage = lazy(() => import("@modules/movies/pages/Details"));
const FavoritesPage = lazy(() => import("@modules/favorites/pages/Favorites"));

export { DetailsPage, FavoritesPage, HomePage, SearchPage };
