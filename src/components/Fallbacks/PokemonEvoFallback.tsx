import Loader from "../ui/loader"

const PokemonEvoFallback = () => {
  return (
    <div className="mt-2 flex flex-row w-full justify-center">
      <Loader />
      <Loader />
      <Loader />
    </div>
  )
}

export default PokemonEvoFallback