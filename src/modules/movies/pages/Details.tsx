import { useParams } from 'react-router-dom'

export default function Details() {
  const { id } = useParams()

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Detalhes do filme</h1>
        <p className="mt-4 text-slate-600">ID do filme: {id}</p>
      </div>
    </main>
  )
}
