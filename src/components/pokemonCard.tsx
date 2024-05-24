import { PokemonCardProps } from '@/types/types';

const PokemonCard: React.FC<PokemonCardProps> = ({ name, id, image, mainType, typesLength, secondType }) => {
  const backgroundColorTernary =
    mainType === 'grass'
      ? 'bg-background-type-grass'
      : mainType === 'dark'
      ? 'bg-background-type-dark'
      : mainType === 'dragon'
      ? 'bg-background-type-dragon'
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
      : mainType === 'electric'
      ? 'bg-background-type-electric'
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
      : mainType === 'electric'
      ? 'bg-type-electric'
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
      : secondType === 'electric'
      ? 'bg-type-electric'
      : secondType === 'flying'
      ? 'bg-type-flying'
      : secondType === 'ice'
      ? 'bg-type-ice'
      : 'bg-type-rock';

  const idCondicional = id < 10 ? `#000${id}` : id < 100 ? `#00${id}` : id < 1000 ? `#0${id}` : `#${id}`;

  return (
    <div
      className={`${backgroundColorTernary} relative group hover:scale-105 duration-300 ease-in-out p-3 flex flex-row mb-3
       shadow-2xl shadow-gray-400 dark:shadow-none rounded-lg cursor-pointer lg:min-w-72
       bg-card-pokeball-white bg-no-repeat bg-45% bg-right 
       before:bg-6x3-grad before:h-8 before:w-[5rem] before:absolute before:bg-cover before:bg-no-repeat 
       before:right-2/4 before:top-0`}
    >
      <div className='flex flex-col'>
        <span className='text-slate-700 font-bold text-sm dark:text-slate-100'>{idCondicional}</span>
        <span className='pokemonName text-slate-100 capitalize drop-shadow will-change-transform'>
          {name}
        </span>
        <div>
          {typesLength === 1 ? (
            <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type1ColorTernary}`}>
              <img src={`src/assets/TypesIcons/${mainType}.png`} alt='typeImage' className='w-3.5' />
              <span className={`text-slate-100 text-sm capitalize `}>{mainType}</span>
            </div>
          ) : (
            <div className='flex flex-row gap-2'>
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type1ColorTernary}`}>
                <img src={`src/assets/TypesIcons/${mainType}.png`} alt='typeImage' className='w-3.5' />
                <span className={`text-sm text-slate-100 capitalize`}>{mainType}</span>{' '}
              </div>
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type2ColorTernary}`}>
                <img src={`src/assets/TypesIcons/${secondType}.png`} alt='typeImage' className='w-3.5' />
                <span className={`text-sm text-slate-100 capitalize`}>{secondType}</span>
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
           ease-in-out filter saturate-110 dark:filter dark:saturate-110 dark:brightness-85 dark:contrast-125'
        />
      </div>
    </div>
  );
};

export default PokemonCard;
