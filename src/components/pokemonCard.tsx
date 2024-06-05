import { PokemonCardProps } from '@/types/types';
import { memo } from 'react';
import { backgroundColorTernary } from '@/utils/utils';
import { type1ColorTernary, type2ColorTernary } from '@/utils/utils';

const PokemonCard: React.FC<PokemonCardProps> = memo(
  ({ name, id, image, mainType, typesLength, secondType }) => { 

    const idCondicional = id < 10 ? `#000${id}` : id < 100 ? `#00${id}` : id < 1000 ? `#0${id}` : `#${id}`;

    function limitName(name: string) {
      // Regex para capturar tudo antes do segundo hífen
      const match = name.match(/^([^-\n]*-[^-]*)/);
      if (match) {
        return match[1];
      }
      return name;
    }

    return (
      <div
        className={`${backgroundColorTernary(mainType)} relative group hover:scale-105 duration-300 ease-in-out p-3 flex flex-row mb-3
       shadow-2xl shadow-gray-400 dark:shadow-none rounded-lg cursor-pointer lg:min-w-72 max-h-[114px]
       bg-card-pokeball-white bg-no-repeat bg-40% sm:bg-45% bg-right 
       before:bg-6x3-grad before:h-8 before:w-[5rem] before:absolute before:bg-cover before:bg-no-repeat 
       before:right-2/4 before:top-0`}
      >
        <div className='flex flex-col'>
          <span className='text-gray-100 font-bold text-sm drop-shadow'>{idCondicional}</span>
          <span className='pokemonName text-gray-100 capitalize drop-shadow'>{limitName(name)}</span>
          <div>
            {typesLength === 1 ? (
              <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${type1ColorTernary(mainType)}`}>
                <img src={`src/assets/TypesIcons/${mainType}.png`} alt='typeImage' className='w-3.5' />
                <span className={`text-slate-100 text-sm capitalize `}>{mainType}</span>
              </div>
            ) : (
              <div className='flex flex-row gap-2'>
                <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${type1ColorTernary(mainType)}`}>
                  <img src={`src/assets/TypesIcons/${mainType}.png`} alt='typeImage' className='w-3.5' />
                  <span className={`text-sm text-slate-100 capitalize`}>{mainType}</span>{' '}
                </div>
                <div className={`w-fit gap-1 flex flex-row items-center p-1 rounded ${type2ColorTernary(secondType)}`}>
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
  }
);

export default PokemonCard;
