import { PokemonStatsSheetType } from '@/types/types';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { PokemonTypesType } from '@/types/types';
import axios from 'axios';

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
    const endpoints = [];
    endpoints.push(`https://pokeapi.co/api/v2/type/${mainType}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios.get(endpoints[0]).then((res) => setPokemonTypes(res));
  };

  // console.log(pokemonTypes?.data?.damage_relations);

  const textColorTernary =
  mainType === 'grass'
    ? 'text-background-light-type-grass'
    : mainType === 'dark'
    ? 'text-background-light-type-dark'
    : mainType === 'dragon'
    ? 'text-background-light-type-dragon'
    : mainType === 'fairy'
    ? 'text-background-light-type-fairy'
    : mainType === 'fighting'
    ? 'text-background-light-type-fighting'
    : mainType === 'fire'
    ? 'text-background-light-type-fire'
    : mainType === 'ghost'
    ? 'text-background-light-type-ghost'
    : mainType === 'bug'
    ? 'text-background-light-type-bug'
    : mainType === 'ground'
    ? 'text-background-light-type-ground'
    : mainType === 'normal'
    ? 'text-background-light-type-normal'
    : mainType === 'poison'
    ? 'text-background-light-type-poison'
    : mainType === 'psychic'
    ? 'text-background-light-type-psychic'
    : mainType === 'steel'
    ? 'text-background-light-type-steel'
    : mainType === 'water'
    ? 'text-background-light-type-water'
    : mainType === 'electric'
    ? 'text-background-light-type-electric'
    : mainType === 'flying'
    ? 'text-background-light-type-flying'
    : mainType === 'ice'
    ? 'text-background-light-type-ice'
    : 'text-background-light-type-rock';

  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

  const doubleDamageFromArray = pokemonTypes?.data?.damage_relations?.double_damage_from;
  const halfDamageFromArray = pokemonTypes?.data?.damage_relations?.half_damage_from;
  const noDamageFromArray = pokemonTypes?.data?.damage_relations?.no_damage_from;

  return (
    <div className='space-y-3 flex flex-col'>
      <h2 className={`font-medium text-xl ${textColorTernary}`}>Base Stats</h2>

      <div className='flex flex-row items-center'>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Hp</span>
          <span className='text-zinc-500'>{hp}</span>
        </div>

        <Progress value={hp} className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Attack</span>
          <span className='text-zinc-500'>{attack}</span>
        </div>

        <Progress value={attack} className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Defense</span>
          <span className='text-zinc-500'>{defense}</span>
        </div>

        <Progress value={defense} className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Sp Attack</span>
          <span className='text-zinc-500'>{spAttack}</span>
        </div>

        <Progress value={spAttack} className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Sp Defense</span>
          <span className='text-zinc-500'>{spDefense}</span>
        </div>

        <Progress value={spDefense} className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Speed</span>
          <span className='text-zinc-500'>{speed}</span>
        </div>

        <Progress value={speed} className='w-[66%] h-1.5 bg-zinc-200 dark:bg-zinc-700' fill={`background-type-${mainType}`} />
      </div>

      <div>
        <h2 className={`font-medium text-xl pt-3 pb-1 ${textColorTernary}`}>Type Defenses</h2>
        <p className='text-text-grey dark:text-zinc-300'>{`The effectiveness of each type on ${pokemonName}.`}</p>

        <div>
          <h3 className={`font-medium mt-6 mb-1 ${textColorTernary}`}>Double Damage From</h3>

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

          <h3 className={`font-medium mt-6 mb-1 ${textColorTernary}`}>Half Damage From</h3>
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

          <h3 className={`font-medium mt-6 mb-1 ${textColorTernary}`}>No Damage From</h3>
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
