interface PokemonCardProps {
  name: string;
  id: number;
  type: string;
  image: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
  image,
  type,
}) => {
  return (
    <div
      className={`relative h-28 p-3 flex flex-row mb-3 shadow-xl rounded-xl ${
        type === 'grass'
          ? 'bg-background-type-grass'
          : type === 'dark'
          ? 'bg-background-type-dark'
          : type === 'dragon'
          ? 'bg-type-dragon'
          : type === 'fairy'
          ? 'bg-background-type-fairy'
          : type === 'fighting'
          ? 'bg-background-type-fighting'
          : type === 'fire'
          ? 'bg-background-type-fire'
          : type === 'ghost'
          ? 'bg-background-type-ghost'
          : type === 'bug'
          ? 'bg-background-type-bug'
          : type === 'ground'
          ? 'bg-background-type-ground'
          : type === 'normal'
          ? 'bg-background-type-normal'
          : type === 'poison'
          ? 'bg-background-type-poison'
          : type === 'psychic'
          ? 'bg-background-type-psychic'
          : type === 'steel'
          ? 'bg-background-type-steel'
          : type === 'water'
          ? 'bg-background-type-water'
          : type === 'eletric'
          ? 'bg-background-type-eletric'
          : type === 'flying'
          ? 'bg-background-type-flying'
          : type === 'ice'
          ? 'bg-background-type-ice'
          : 'bg-background-type-rock'
      }`}
    >
      <div className='flex flex-col'>
        <span className="text-slate-600 font-medium">#{id}</span>
        <span className='pokemonName text-slate-100 capitalize'>{name}</span>
        <div>
          <span className="p-1 bg-type-grass rounded-md text-slate-100">teste</span>
        </div>
      </div>

      <div className="absolute right-0 bottom-2">
        <img src={image} alt='Pokemon Photo' className="w-[130px] h-[130px]" />
      </div>
    </div>
  );
};
