import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoadingPage } from '@shared/ui/LoadingPage'

const MoviesModule = React.lazy(() => import('../modules/movies'))
const FavoritesModule = React.lazy(() => import('../modules/favorites'))

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/*" element={<MoviesModule />} />
        <Route path="/favorites/*" element={<FavoritesModule />} />
      </Routes>
    </Suspense>
  )
}
