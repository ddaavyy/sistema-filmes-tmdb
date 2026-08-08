export function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-4 w-72 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-2 h-4 w-56 animate-pulse rounded-full bg-slate-200" />
      </div>
    </div>
  )
}
