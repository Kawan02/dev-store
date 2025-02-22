import { Skeleton } from '@/components/skeleton'

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-semibold"> Carregando resultados...</span>

      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => {
          return <Skeleton key={index} className="h-[400px]" />
        })}
      </div>
    </div>
  )
}
