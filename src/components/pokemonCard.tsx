interface PokemonCardProps {
  name: string;
  id: number;
  mainType: string;
  secondType: string;
  typesLength: number;
  image: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
  image,
  mainType,
  typesLength,
  secondType,
}) => {
  const backgroundColorTernary =
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
      : 'bg-background-type-rock';

  const Type1ColorTernary =
    mainType === 'grass'
      ? 'bg-type-grass'
      : mainType === 'dark'
      ? 'bg-type-dark'
      : mainType === 'dragon'
      ? 'bg-type-dragon'
      : mainType === 'fairy'
      ? 'bg-type-fairy'
      : mainType === 'fighting'
      ? 'bg-type-fighting'
      : mainType === 'fire'
      ? 'bg-type-fire'
      : mainType === 'ghost'
      ? 'bg-type-ghost'
      : mainType === 'bug'
      ? 'bg-type-bug'
      : mainType === 'ground'
      ? 'bg-type-ground'
      : mainType === 'normal'
      ? 'bg-type-normal'
      : mainType === 'poison'
      ? 'bg-type-poison'
      : mainType === 'psychic'
      ? 'bg-type-psychic'
      : mainType === 'steel'
      ? 'bg-type-steel'
      : mainType === 'water'
      ? 'bg-type-water'
      : mainType === 'eletric'
      ? 'bg-type-eletric'
      : mainType === 'flying'
      ? 'bg-type-flying'
      : mainType === 'ice'
      ? 'bg-type-ice'
      : 'bg-type-rock';

  const Type2ColorTernary =
    secondType === 'grass'
      ? 'bg-type-grass'
      : secondType === 'dark'
      ? 'bg-type-dark'
      : secondType === 'dragon'
      ? 'bg-type-dragon'
      : secondType === 'fairy'
      ? 'bg-type-fairy'
      : secondType === 'fighting'
      ? 'bg-type-fighting'
      : secondType === 'fire'
      ? 'bg-type-fire'
      : secondType === 'ghost'
      ? 'bg-type-ghost'
      : secondType === 'bug'
      ? 'bg-type-bug'
      : secondType === 'ground'
      ? 'bg-type-ground'
      : secondType === 'normal'
      ? 'bg-type-normal'
      : secondType === 'poison'
      ? 'bg-type-poison'
      : secondType === 'psychic'
      ? 'bg-type-psychic'
      : secondType === 'steel'
      ? 'bg-type-steel'
      : secondType === 'water'
      ? 'bg-type-water'
      : secondType === 'eletric'
      ? 'bg-type-eletric'
      : secondType === 'flying'
      ? 'bg-type-flying'
      : secondType === 'ice'
      ? 'bg-type-ice'
      : 'bg-type-rock';
// C:\Users\HOME\Documents\Code\VSCode\Projects\pokedex\src\assets\TypesIcons\fairy.png
  return (
    <div
      className={`relative group h-28 p-3 flex flex-row mb-3 shadow-xl rounded-lg ${backgroundColorTernary}`}
    >
      <div className='flex flex-col'>
        <span className='text-slate-700 font-medium'>#{id}</span>
        <span className='pokemonName text-slate-100 capitalize drop-shadow'>
          {name}
        </span>
        <div>
          {typesLength === 1 ? (
            <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type1ColorTernary}`}>
              <img src={`src/assets/TypesIcons/${mainType}.png`} alt="typeImage" className="w-3.5"/> 
              <span
              className={`text-slate-100 text-sm capitalize `}
            >
              {mainType}
            </span>
            </div>
            
          ) : (
            <div className="flex flex-row gap-2">
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type1ColorTernary}`}>
                <img src={`src/assets/TypesIcons/${mainType}.png`} alt="typeImage" className="w-3.5"/> 
                <span
                  className={`${Type1ColorTernary} text-sm text-slate-100 capitalize`}
                >
                  {mainType}
                </span>{' '}
              </div>
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type2ColorTernary}`}>
                <img src={`src/assets/TypesIcons/${secondType}.png`} alt="typeImage" className="w-3.5"/> 
                <span
                  className={`${Type2ColorTernary} text-sm text-slate-100 capitalize`}
                >
                  {secondType}
                </span>
              </div>
              
            </div>
          )}
        </div>
      </div>

      <div className='absolute right-0 bottom-2'>
        <img
          src={image}
          alt='Pokemon Photo'
          className='w-[130px] h-[130px] group-hover:scale-110 group-hover:rotate-6 duration-500
           transition-transform ease-in-out filter saturate-110'
        />
      </div>
    </div>
  );
};
