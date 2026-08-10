import { LoadingPage } from "@shared/ui/LoadingPage";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { DetailsPage, FavoritesPage, HomePage, SearchPage } from "./routes";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<DetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Suspense>
  );
};
