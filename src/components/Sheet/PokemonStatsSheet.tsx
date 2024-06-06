import { PokemonStatsSheetType } from '@/types/types';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { PokemonTypesType } from '@/types/types';
import axios from 'axios';
import { textColorTernary } from '@/utils/utils';

const PokemonStatsSheet: React.FC<PokemonStatsSheetType> = ({
  name,
  mainType,
  hp,
  attack,
  defense,
  spAttack,
  spDefense,
  speed,
}) => {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonTypesType>(Object);

  useEffect(() => {
    PokemonsTypesObject(mainType);
  }, []);

  const PokemonsTypesObject = async (mainType: string) => {
    const endpoints = `https://pokeapi.co/api/v2/type/${mainType}`;
    const response = await axios.get(endpoints);
    setPokemonTypes(response);
  };

  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

  const doubleDamageFromArray = pokemonTypes?.data?.damage_relations?.double_damage_from;
  const halfDamageFromArray = pokemonTypes?.data?.damage_relations?.half_damage_from;
  const noDamageFromArray = pokemonTypes?.data?.damage_relations?.no_damage_from;

  return (
    <div className='space-y-3 flex flex-col select-none'>
      <h2 className={`font-medium text-xl ${textColorTernary(mainType)}`}>Base Stats</h2>

      <div className='flex flex-row items-center'>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Hp</span>
          <span className='text-zinc-500'>{hp}</span>
        </div>

        <Progress
          value={hp}
          className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700'
          fill={`background-type-${mainType}`}
        />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Attack</span>
          <span className='text-zinc-500'>{attack}</span>
        </div>

        <Progress
          value={attack}
          className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700'
          fill={`background-type-${mainType}`}
        />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Defense</span>
          <span className='text-zinc-500'>{defense}</span>
        </div>

        <Progress
          value={defense}
          className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700'
          fill={`background-type-${mainType}`}
        />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Sp Attack</span>
          <span className='text-zinc-500'>{spAttack}</span>
        </div>

        <Progress
          value={spAttack}
          className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700'
          fill={`background-type-${mainType}`}
        />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Sp Defense</span>
          <span className='text-zinc-500'>{spDefense}</span>
        </div>

        <Progress
          value={spDefense}
          className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700'
          fill={`background-type-${mainType}`}
        />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Speed</span>
          <span className='text-zinc-500'>{speed}</span>
        </div>

        <Progress
          value={speed}
          className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700'
          fill={`background-type-${mainType}`}
        />
      </div>

      <div>
        <h2 className={`font-medium text-xl pt-3 pb-1 ${textColorTernary(mainType)}`}>Type Defenses</h2>
        <p className='text-text-grey dark:text-zinc-300'>{`The effectiveness of each type on ${pokemonName}.`}</p>

        <div>
          <h3 className={`font-medium mt-6 mb-1 $${textColorTernary(mainType)}`}>Double Damage From</h3>

          <div className='flex flex-row'>
            {doubleDamageFromArray?.length === 0 ? (
              <div className='bg-neutral-50 p-1 rounded mr-2'></div>
            ) : (
              doubleDamageFromArray?.map((doubleDamageItem, index) => (
                <div className={`bg-type-${doubleDamageItem.name} p-1 rounded mr-2`} key={index}>
                  <img src={`src/assets/TypesIcons/${doubleDamageItem.name}.png`} alt='DoubleDamageImage' />
                </div>
              ))
            )}
          </div>

          <h3 className={`font-medium mt-6 mb-1 ${textColorTernary(mainType)}`}>Half Damage From</h3>
          <div className='flex flex-row'>
            {halfDamageFromArray?.length === 0 ? (
              <div className='bg-neutral-50 p-1 rounded mr-2'></div>
            ) : (
              halfDamageFromArray?.map((halfDamageItem, index) => (
                <div className={`bg-type-${halfDamageItem.name} p-1 rounded mr-2`} key={index}>
                  <img src={`src/assets/TypesIcons/${halfDamageItem.name}.png`} alt='halfDamageFromImage' />
                </div>
              ))
            )}
          </div>

          <h3 className={`font-medium mt-6 mb-1 ${textColorTernary(mainType)}`}>No Damage From</h3>
          <div className='flex flex-row'>
            {noDamageFromArray?.length === 0 ? (
              <div className='bg-background-color p-1 rounded mr-2'></div>
            ) : (
              noDamageFromArray?.map((noDamageItem, index) => (
                <div className={`bg-type-${noDamageItem.name} p-1 rounded mr-2`} key={index}>
                  <img src={`src/assets/TypesIcons/${noDamageItem.name}.png`} alt='noDamageFromArrayImage' />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonStatsSheet;
