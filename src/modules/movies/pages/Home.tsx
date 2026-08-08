import { MovieCard } from '../components/MovieCard'
import { useMovies } from '../hooks/useMovies'

export default function Home() {
  const { data, isLoading } = useMovies('', 1)
  const movies = data?.results ?? []

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">TMDB</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Filmes em destaque</h1>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <MovieCard key={index} isLoading />)
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </main>
  )
}
