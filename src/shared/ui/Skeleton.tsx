export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`rounded-lg bg-slate-200/80 animate-pulse ${className}`} />
}
