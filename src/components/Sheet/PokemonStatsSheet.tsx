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
      ? 'text-type-grass'
      : mainType === 'dark'
      ? 'text-type-dark'
      : mainType === 'dragon'
      ? 'text-type-dragon'
      : mainType === 'fairy'
      ? 'text-type-fairy'
      : mainType === 'fighting'
      ? 'text-type-fighting'
      : mainType === 'fire'
      ? 'text-type-fire'
      : mainType === 'ghost'
      ? 'text-type-ghost'
      : mainType === 'bug'
      ? 'text-type-bug'
      : mainType === 'ground'
      ? 'text-type-ground'
      : mainType === 'normal'
      ? 'text-type-normal'
      : mainType === 'poison'
      ? 'text-type-poison'
      : mainType === 'psychic'
      ? 'text-type-psychic'
      : mainType === 'steel'
      ? 'text-type-steel'
      : mainType === 'water'
      ? 'text-type-water'
      : mainType === 'electric'
      ? 'text-type-electric'
      : mainType === 'flying'
      ? 'text-type-flying'
      : mainType === 'ice'
      ? 'text-type-ice'
      : 'text-type-rock';

  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

  const doubleDamageFromArray = pokemonTypes?.data?.damage_relations?.double_damage_from;
  const halfDamageFromArray = pokemonTypes?.data?.damage_relations?.half_damage_from;
  const noDamageFromArray = pokemonTypes?.data?.damage_relations?.no_damage_from;

  return (
    <div className='space-y-3 flex flex-col'>
      <h2 className={`font-medium text-xl mb-2 ${textColorTernary}`}>Base Stats</h2>

      <div className='flex flex-row items-center'>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Hp</span>
          <span className='text-zinc-500'>{hp}</span>
        </div>

        <Progress value={hp} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Attack</span>
          <span className='text-zinc-500'>{attack}</span>
        </div>

        <Progress value={attack} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Defense</span>
          <span className='text-zinc-500'>{defense}</span>
        </div>

        <Progress value={defense} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Sp Attack</span>
          <span className='text-zinc-500'>{spAttack}</span>
        </div>

        <Progress value={spAttack} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Sp Defense</span>
          <span className='text-zinc-500'>{spDefense}</span>
        </div>

        <Progress value={spDefense} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Speed</span>
          <span className='text-zinc-500'>{speed}</span>
        </div>

        <Progress value={speed} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>

      <div>
        <h2 className={`font-medium text-xl pt-3 pb-1 ${textColorTernary}`}>Type Defenses</h2>
        <p className='text-gray-500'>{`The effectiveness of each type on ${pokemonName}.`}</p>

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
              <div className='bg-neutral-50 p-1 rounded mr-2'></div>
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
