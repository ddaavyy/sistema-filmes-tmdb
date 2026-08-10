export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`rounded-lg bg-slate-200/80 animate-pulse dark:bg-slate-700/60 ${className}`} />
  );
};
