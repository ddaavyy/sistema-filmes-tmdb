import { Skeleton } from '@components/Skeleton'
import type { Movie } from '../types'

interface MovieCardProps {
  movie?: Movie
  isLoading?: boolean
}

export function MovieCard({ movie, isLoading }: MovieCardProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <Skeleton className="h-72 w-full rounded-3xl" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )
  }

  if (!movie) return null

  return (
    <article className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img
        className="h-72 w-full rounded-3xl object-cover"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=Sem+imagem'
        }
        alt={movie.title}
      />
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-900">{movie.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">{movie.overview}</p>
      </div>
    </article>
  )
}
