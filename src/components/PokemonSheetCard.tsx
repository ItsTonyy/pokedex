import { PokemonCardProps } from '@/types/types';

export const PokemonSheetCard: React.FC<PokemonCardProps> = ({
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

      const idCondicional = id < 10 ? `#000${id}` : id < 100 ? `#00${id}` : id < 1000 ? `#0${id}` : `#${id}`

  return (
    <div
      className={`relative pb-12 pt-20 flex flex-row justify-evenly items-center
       ${backgroundColorTernary} cursor-pointer
       before:bg-6x3-grad before:h-8 before:w-[5rem] before:absolute before:bg-cover before:bg-no-repeat before:left-2/4 before:top-0`}
    >
      <div className=''>
        <img
          src='src/assets/BackgroundImages/bg-pokeball-white-sheet.svg'
          alt=''
          className='w-[145px] absolute top-13 left-9 object-cover'
        />
        <img
          src={image}
          alt='Pokemon Photo'
          className='w-[130px] h-[130px]
           filter saturate-110'
        />
      </div>

      <div className='flex flex-col'>
        <span className='text-slate-900 font-extrabold'>{idCondicional}</span>
        <span className='font-extrabold text-3xl text-slate-100 capitalize drop-shadow'>
          {name}
        </span>
        <div>
          {typesLength === 1 ? (
            <div
              className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type1ColorTernary}`}
            >
              <img
                src={`src/assets/TypesIcons/${mainType}.png`}
                alt='typeImage'
                className='w-3.5'
              />
              <span className={`text-slate-100 text-sm capitalize `}>
                {mainType}
              </span>
            </div>
          ) : (
            <div className='flex flex-row gap-2'>
              <div
                className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type1ColorTernary}`}
              >
                <img
                  src={`src/assets/TypesIcons/${mainType}.png`}
                  alt='typeImage'
                  className='w-3.5'
                />
                <span
                  className={`${Type1ColorTernary} text-sm text-slate-100 capitalize`}
                >
                  {mainType}
                </span>{' '}
              </div>
              <div
                className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${Type2ColorTernary}`}
              >
                <img
                  src={`src/assets/TypesIcons/${secondType}.png`}
                  alt='typeImage'
                  className='w-3.5'
                />
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
    </div>
  );
};
