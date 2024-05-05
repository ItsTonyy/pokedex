interface PokemonCardProps {
  name: string;
  id: number;
  mainType: string;
  image: string;
  typesLength: number;
  allTypesPokemon: [];
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
  image,
  mainType,
  typesLength,
  allTypesPokemon,
}) => {
  return (
    <div
      className={`relative h-28 p-3 flex flex-row mb-3 shadow-xl rounded-xl ${
        mainType === 'grass'
          ? 'bg-background-type-grass'
          : mainType === 'dark'
          ? 'bg-background-type-dark'
          : mainType === 'dragon'
          ? 'bg-type-dragon'
          : mainType === 'fairy'
          ? 'bg-background-type-fairy'
          : mainType === 'fighting'
          ? 'bg-background-type-fighting'
          : mainType === 'fire'
          ? 'bg-background-type-fire'
          : mainType === 'ghost'
          ? 'bg-background-type-ghost'
          : mainType === 'bug'
          ? 'bg-background-type-bug'
          : mainType === 'ground'
          ? 'bg-background-type-ground'
          : mainType === 'normal'
          ? 'bg-background-type-normal'
          : mainType === 'poison'
          ? 'bg-background-type-poison'
          : mainType === 'psychic'
          ? 'bg-background-type-psychic'
          : mainType === 'steel'
          ? 'bg-background-type-steel'
          : mainType === 'water'
          ? 'bg-background-type-water'
          : mainType === 'eletric'
          ? 'bg-background-type-eletric'
          : mainType === 'flying'
          ? 'bg-background-type-flying'
          : mainType === 'ice'
          ? 'bg-background-type-ice'
          : 'bg-background-type-rock'
      }`}
    >
      <div className='flex flex-col'>
        <span className='text-slate-600 font-medium'>#{id}</span>
        <span className='pokemonName text-slate-100 capitalize'>{name}</span>
        <div>
          {typesLength === 1 ? (
            <span className='p-1 bg-type-grass rounded-md text-slate-100 capitalize'>
              {allTypesPokemon[0].type.name}
            </span>
          ) : (
            <div>
              <span className='p-1 bg-type-grass rounded-md text-slate-100 capitalize'>
                {allTypesPokemon[0].type.name}
              </span>{' '}
              <span className='p-1 bg-type-grass rounded-md text-slate-100 capitalize'>
                {allTypesPokemon[1].type.name}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className='absolute right-0 bottom-2'>
        <img
          src={image}
          alt='Pokemon Photo'
          className='w-[130px] h-[130px] hover:rotate-12 hover:transition-transform'
        />
      </div>
    </div>
  );
};
