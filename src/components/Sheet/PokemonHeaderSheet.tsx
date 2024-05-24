import { PokemonSheetProps } from '@/types/types';

const PokemonHeaderSheet: React.FC<PokemonSheetProps> = ({
  name,
  id,
  image,
  mainType,
  typesLength,
  secondType,
}) => {
  
  
      const TextNameColorTernary =
    mainType === 'grass'
      ? 'text-background-type-grass'
      : mainType === 'dark'
      ? 'text-background-type-dark'
      : mainType === 'dragon'
      ? 'text-background-type-dragon'
      : mainType === 'fairy'
      ? 'text-background-type-fairy'
      : mainType === 'fighting'
      ? 'text-background-type-fighting'
      : mainType === 'fire'
      ? 'text-background-type-fire'
      : mainType === 'ghost'
      ? 'text-background-type-ghost'
      : mainType === 'bug'
      ? 'text-background-type-bug'
      : mainType === 'ground'
      ? 'text-background-type-ground'
      : mainType === 'normal'
      ? 'text-background-type-normal'
      : mainType === 'poison'
      ? 'text-background-type-poison'
      : mainType === 'psychic'
      ? 'text-background-type-psychic'
      : mainType === 'steel'
      ? 'text-background-type-steel'
      : mainType === 'water'
      ? 'text-background-type-water'
      : mainType === 'electric'
      ? 'text-background-type-electric'
      : mainType === 'flying'
      ? 'text-background-type-flying'
      : mainType === 'ice'
      ? 'text-background-type-ice'
      : 'text-background-type-rock';

      const ColorGradientTernary =
      mainType === 'grass'
      ? 'from-[#8bbe8a] dark:from-[#2a6233]'
      : mainType === 'dark'
      ? 'from-[#6f6e78] dark:from-[#23222A]'
      : mainType === 'dragon'
      ? 'from-[#7383b9] dark:from-[#36426C]'
      : mainType === 'fairy'
      ? 'from-[#eba8c3] dark:from-[#945469]'
      : mainType === 'fighting'
      ? 'from-[#eb4971] dark:from-[#85001F]'
      : mainType === 'fire'
      ? 'from-[#ffa756] dark:from-[#B15A16]'
      : mainType === 'ghost'
      ? 'from-[#8571be] dark:from-[#33245F]'
      : mainType === 'bug'
      ? 'from-[#6bd674] dark:from-[#2A8032]'
      : mainType === 'ground'
      ? 'from-[#f78551] dark:from-[#872C06]'
      : mainType === 'normal'
      ? 'from-[#b5b9c4] dark:from-[#61636E]'
      : mainType === 'poison'
      ? 'from-[#9f6397] dark:from-[#4D145A]'
      : mainType === 'psychic'
      ? 'from-[#ff6568] dark:from-[#A70D0F]'
      : mainType === 'steel'
      ? 'from-[#4c91b2] dark:from-[#073A52]'
      : mainType === 'water'
      ? 'from-[#58abf6] dark:from-[#155295]'
      : mainType === 'electric'
      ? 'from-[#d4ba79] dark:from-[#7F6A35]'
      : mainType === 'flying'
      ? 'from-[#83a2e3] dark:from-[#354E81]'
      : mainType === 'ice'
      ? 'from-[#91d8df] dark:from-[#427B81]'
      : 'from-[#d4c294] dark:from-[#7E6642]';

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
        <div className={`w-[450px] h-[140px] relative top-[-95px] bg-gradient-to-t ${ColorGradientTernary}
         from-80% z-10`}></div>
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
        <span className='text-zinc-900 font-extrabold'>{idCondicional}</span>
        <span className='font-extrabold text-3xl text-zinc-100 capitalize drop-shadow'>{name}</span>
        <div>
          {typesLength === 1 ? (
            <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${mainType}`}>
              <img src={`src/assets/TypesIcons/${mainType}.png`} alt='typeImage' className='w-3.5' />
              <span className={`text-zinc-100 text-sm capitalize `}>{mainType}</span>
            </div>
          ) : (
            <div className='flex flex-row gap-2'>
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${mainType}`}>
                <img src={`src/assets/TypesIcons/${mainType}.png`} alt='typeImage' className='w-3.5' />
                <span className={`bg-type-${mainType} text-sm text-zinc-100 capitalize`}>
                  {mainType}
                </span>{' '}
              </div>
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${secondType}`}>
                <img src={`src/assets/TypesIcons/${secondType}.png`} alt='typeImage' className='w-3.5' />
                <span className={`bg-type-${secondType} text-sm text-zinc-100 capitalize`}>
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
