import { PokemonSheetProps } from '@/types/types';

const PokemonHeaderSheet: React.FC<PokemonSheetProps> = ({
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

      const TextNameColorTernary =
    mainType === 'grass'
      ? 'text-[#8bbe8a]'
      : mainType === 'dark'
      ? 'text-[#6f6e78]'
      : mainType === 'dragon'
      ? 'text-[#7383b9]'
      : mainType === 'fairy'
      ? 'text-[#eba8c3]'
      : mainType === 'fighting'
      ? 'text-[#eb4971]'
      : mainType === 'fire'
      ? 'text-[#ffa756]'
      : mainType === 'ghost'
      ? 'text-[#8571be]'
      : mainType === 'bug'
      ? 'text-[#6bd674]'
      : mainType === 'ground'
      ? 'text-[#f78551]'
      : mainType === 'normal'
      ? 'text-[#b5b9c4]'
      : mainType === 'poison'
      ? 'text-[#9f6397]'
      : mainType === 'psychic'
      ? 'text-[#ff6568]'
      : mainType === 'steel'
      ? 'text-[#4c91b2]'
      : mainType === 'water'
      ? 'text-[#58abf6]'
      : mainType === 'electric'
      ? 'text-[#d4ba79]'
      : mainType === 'flying'
      ? 'text-[#83a2e3]'
      : mainType === 'ice'
      ? 'text-[#91d8df]'
      : 'text-[#d4c294]';

      const ColorGradientTernary =
    mainType === 'grass'
      ? 'from-[#8bbe8a]'
      : mainType === 'dark'
      ? 'from-[#6f6e78]'
      : mainType === 'dragon'
      ? 'from-[#7383b9]'
      : mainType === 'fairy'
      ? 'from-[#eba8c3]'
      : mainType === 'fighting'
      ? 'from-[#eb4971]'
      : mainType === 'fire'
      ? 'from-[#ffa756]'
      : mainType === 'ghost'
      ? 'from-[#8571be]'
      : mainType === 'bug'
      ? 'from-[#6bd674]'
      : mainType === 'ground'
      ? 'from-[#f78551]'
      : mainType === 'normal'
      ? 'from-[#b5b9c4]'
      : mainType === 'poison'
      ? 'from-[#9f6397]'
      : mainType === 'psychic'
      ? 'from-[#ff6568]'
      : mainType === 'steel'
      ? 'from-[#4c91b2]'
      : mainType === 'water'
      ? 'from-[#58abf6]'
      : mainType === 'electric'
      ? 'from-[#d4ba79]'
      : mainType === 'flying'
      ? 'from-[#83a2e3]'
      : mainType === 'ice'
      ? 'from-[#91d8df]'
      : 'from-[#d4c294]';

  const idCondicional = id < 10 ? `#000${id}` : id < 100 ? `#00${id}` : id < 1000 ? `#0${id}` : `#${id}`;

  return (
    <div
      className={`relative pb-8 pt-20 flex flex-row justify-evenly items-center overflow-hidden
       `}
    >
      {/*pokemon name with gradient and animation */}
      <div
        className={`absolute top-[-20px] left-[-10%] text-[120px] uppercase font-bold 
         w-max`}
      >
        <p className={`${TextNameColorTernary} outline-title opacity-40 animate-textAnimation`}>{name}</p>
        <div className={`w-full h-[140px] relative top-[-90px] right-[-10%] bg-gradient-to-t ${ColorGradientTernary} from-80% z-10`}></div>
      </div>

      {/* Pokemon Photo*/}
      <div className='z-20'>
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

      {/*pokemon info (name, type, etc...) */}
      <div className='flex flex-col z-20'>
        <span className='text-slate-900 font-extrabold'>{idCondicional}</span>
        <span className='font-extrabold text-3xl text-slate-100 capitalize drop-shadow'>{name}</span>
        <div>
          {typesLength === 1 ? (
            <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${mainType}`}>
              <img src={`src/assets/TypesIcons/${mainType}.png`} alt='typeImage' className='w-3.5' />
              <span className={`text-slate-100 text-sm capitalize `}>{mainType}</span>
            </div>
          ) : (
            <div className='flex flex-row gap-2'>
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${mainType}`}>
                <img src={`src/assets/TypesIcons/${mainType}.png`} alt='typeImage' className='w-3.5' />
                <span className={`bg-type-${mainType} text-sm text-slate-100 capitalize`}>
                  {mainType}
                </span>{' '}
              </div>
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${secondType}`}>
                <img src={`src/assets/TypesIcons/${secondType}.png`} alt='typeImage' className='w-3.5' />
                <span className={`bg-type-${secondType} text-sm text-slate-100 capitalize`}>
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

export default PokemonHeaderSheet;
