import { PokemonSheetProps } from '@/types/types';
import { textNameColorTernary, colorGradientTernary } from '@/utils/utils';

const PokemonHeaderSheet: React.FC<PokemonSheetProps> = ({
  name,
  id,
  image,
  mainType,
  typesLength,
  secondType,
}) => {
  const idCondicional = id < 10 ? `#000${id}` : id < 100 ? `#00${id}` : id < 1000 ? `#0${id}` : `#${id}`;

  return (
    <div
      className={`relative pb-8 pt-20 flex flex-row justify-evenly items-center overflow-hidden select-none
       `}
    >
      {/*pokemon name with gradient and animation */}
      <div
        className={`absolute top-[-20px] left-[-10%] text-[120px] uppercase font-bold 
         w-max`}
      >
        <p className={`${textNameColorTernary(mainType)} outline-title opacity-40 animate-textAnimation`}>
          {name}
        </p>
        <div
          className={`w-[450px] h-[140px] relative top-[-98px] bg-gradient-to-t ${colorGradientTernary(mainType)}
         from-80% z-10`}
        ></div>
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
                <span className={`bg-type-${secondType} text-sm text-zinc-100 capitalize`}>{secondType}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonHeaderSheet;
