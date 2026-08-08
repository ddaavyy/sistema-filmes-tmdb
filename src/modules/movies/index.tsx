import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'

export default function MoviesModule() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<Details />} />
    </Routes>
  )
}
