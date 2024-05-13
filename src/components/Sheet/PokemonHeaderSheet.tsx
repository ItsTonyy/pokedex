import { PokemonSheetProps } from '@/types/types';

export const PokemonHeaderSheet: React.FC<PokemonSheetProps> = ({
  name,
  id,
  image,
  mainType,
  typesLength,
  secondType,
}) => {
  const idCondicional = id < 10 ? `#000${id}` : id < 100 ? `#00${id}` : id < 1000 ? `#0${id}` : `#${id}`
  
  return (
    <div
      className={`bg-background-type-${mainType} relative pb-8 pt-20 flex flex-row justify-evenly items-center cursor-pointer
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
              className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${mainType}`}
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
                className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${mainType}`}
              >
                <img
                  src={`src/assets/TypesIcons/${mainType}.png`}
                  alt='typeImage'
                  className='w-3.5'
                />
                <span
                  className={`bg-type-${mainType} text-sm text-slate-100 capitalize`}
                >
                  {mainType}
                </span>{' '}
              </div>
              <div
                className={`w-fit gap-1 flex flex-row items-center p-1 rounded bg-type-${secondType}`}
              >
                <img
                  src={`src/assets/TypesIcons/${secondType}.png`}
                  alt='typeImage'
                  className='w-3.5'
                />
                <span
                  className={`bg-type-${secondType} text-sm text-slate-100 capitalize`}
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
