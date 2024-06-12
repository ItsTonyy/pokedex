import { Skeleton } from "@/components/ui/skeleton"

const PokemonCardFallback = () => {
  return (
    <Skeleton className="w-[288px] h-[114px] rounded-lg p-3 flex flex-row mb-3" />
  )
}

export default PokemonCardFallback