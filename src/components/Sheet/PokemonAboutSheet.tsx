import { PokemonAboutSheetType } from '@/types/types';
import { useEffect, useState } from 'react';
import { PokemonSpeciesType } from '@/types/types';
import { PokemonTypesType } from '@/types/types';
import axios from 'axios';

const PokemonAboutSheet: React.FC<PokemonAboutSheetType> = ({
  height,
  weight,
  baseExp,
  id,
  mainType,
  abilities,
}) => {
  const [pokemonsSpecies, setPokemonsSpecies] = useState<PokemonSpeciesType>(Object);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonTypesType>(Object);

  useEffect(() => {
    PokemonsSpeciesObject(id);
    PokemonsTypesObject(mainType);
  }, [id]);

  const PokemonsTypesObject = async (mainType: string) => {
    const endpoints = `https://pokeapi.co/api/v2/type/${mainType}`;
    const response = await axios.get(endpoints)
    setPokemonTypes(response)
  };

  const PokemonsSpeciesObject = async (id: number) => {
    const endpoints = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const response = await axios.get(endpoints)
    setPokemonsSpecies(response)
  };

  // getting only the flavor texts in english
  const filteredFlavorText = pokemonsSpecies?.data?.flavor_text_entries.filter(
    (element) => element.language.name === 'en'
  )[0]?.flavor_text;

  const flavorTextFixed = filteredFlavorText
    ?.replace('POKéMON', 'pokémon')
    .replace('DIGLETT', 'Diglett')
    .replace('TELEPORT', 'teleport')
    .replace('RAYQUAZA', 'Rayquaza')
    .replace('LATIOS', 'Latios')
    .replace('SHELGON', 'Shelgon')
    .replace('FLYGON', 'Flygon')
    .replace(/\f/g, '\n')
    .replace(/\u00ad\n/g, '')
    .replace(/\u00ad/g, '')
    .replace(/ -\n/g, ' - ')
    .replace(/-\n/g, '-')
    .replace(/\n/g, ' ');

  function addPoint(num: number): string {
    const realNumber = num / 10
    const numToString = realNumber.toString();

    return numToString?.replace(/(\d)(?=\d$)/, '$1.');
  }

  const textColorTernary =
    mainType === 'grass'
      ? 'text-background-type-grass dark:text-background-light-type-grass'
      : mainType === 'dark'
      ? 'text-background-type-dark dark:text-background-light-type-dark'
      : mainType === 'dragon'
      ? 'text-background-type-dragon dark:text-background-light-type-dragon'
      : mainType === 'fairy'
      ? 'text-background-type-fairy dark:text-background-light-type-fairy'
      : mainType === 'fighting'
      ? 'text-background-type-fighting dark:text-background-light-type-fighting'
      : mainType === 'fire'
      ? 'text-background-type-fire dark:text-background-light-type-fire'
      : mainType === 'ghost'
      ? 'text-background-type-ghost dark:text-background-light-type-ghost'
      : mainType === 'bug'
      ? 'text-background-type-bug dark:text-background-light-type-bug'
      : mainType === 'ground'
      ? 'text-background-type-ground dark:text-background-light-type-ground'
      : mainType === 'normal'
      ? 'text-background-type-normal dark:text-background-light-type-normal'
      : mainType === 'poison'
      ? 'text-background-type-poison dark:text-background-light-type-poison'
      : mainType === 'psychic'
      ? 'text-background-type-psychic dark:text-background-light-type-psychic'
      : mainType === 'steel'
      ? 'text-background-type-steel dark:text-background-light-type-steel'
      : mainType === 'water'
      ? 'text-background-type-water dark:text-background-light-type-water'
      : mainType === 'electric'
      ? 'text-background-light-type-electric dark:text-background-light-type-electric'
      : mainType === 'flying'
      ? 'text-background-type-flying dark:text-background-light-type-flying'
      : mainType === 'ice'
      ? 'text-background-type-ice dark:text-background-light-type-ice'
      : 'text-background-type-rock dark:text-background-light-type-rock';

  const doubleDamageFromArray = pokemonTypes?.data?.damage_relations?.double_damage_from;
  const eggGroups = pokemonsSpecies?.data?.egg_groups;
  const hatchCounter = pokemonsSpecies?.data?.hatch_counter;

  return (
    <div className='space-y-[0.5rem] flex flex-col'>
      <div>
        <p className='text-text-grey dark:text-zinc-300'>{flavorTextFixed}</p>
      </div>

      <h2 className={`font-medium text-xl pt-3 ${textColorTernary}`}>Data</h2>

      <div className='flex'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Height:</span>
        <span className='text-zinc-500 dark:text-zinc-400'>{addPoint(height)}m</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Weight:</span>
        <span className='text-zinc-500 dark:text-zinc-400'>{addPoint(weight)}kg</span>
      </div>
      <div className='flex flex-row'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Abilities:</span>
        <div className='flex flex-col'>
          {abilities.map((ability, index) => (
            <span className='text-zinc-500 dark:text-zinc-400' key={index}>
              {ability.is_hidden === false
                ? `${index + 1}. ${ability.ability.name}`
                : `${index + 1}. ${ability.ability.name} (hidden ability)`}
            </span>
          ))}
        </div>
      </div>
      <div className='flex items-center'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Weaknesses:</span>
        {doubleDamageFromArray?.map((doubleDamageItem, index) => (
          <div className={`bg-type-${doubleDamageItem.name} p-1 rounded mr-2`} key={index}>
            <img src={`src/assets/TypesIcons/${doubleDamageItem.name}.png`} alt='DoubleDamageImage' />
          </div>
        ))}
      </div>

      <h2 className={`font-medium text-xl pt-3 ${textColorTernary}`}>Training</h2>

      <div className='flex'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Capture Rate:</span>
        <span className='text-zinc-500 dark:text-zinc-400'>{pokemonsSpecies?.data?.capture_rate}</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Base Friendship:</span>
        <span className='text-zinc-500 dark:text-zinc-400'>{pokemonsSpecies?.data?.base_happiness}</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Base Experience:</span>
        <span className='text-zinc-500 dark:text-zinc-400'>{baseExp}</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Growth Rate:</span>
        <span className='text-zinc-500 dark:text-zinc-400'>
          {!pokemonsSpecies ? null : pokemonsSpecies?.data?.growth_rate.name}
        </span>
      </div>

      <h2 className={`font-medium text-xl pt-3 ${textColorTernary}`}>Breeding</h2>

      <div className='flex flex-row'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Gender:</span>
        {pokemonsSpecies?.data?.gender_rate === -1 ? (
          <span className='text-purple-700 font-medium'>Genderless</span>
        ) : (
          <div className='flex flex-row space-x-4'>
            <div className='flex flex-row items-center gap-1'>
              <img src='\src\assets\female.png' alt='Female Icon' className='w-4 h-4' />
              <span className='text-female font-medium'>{12.5 * pokemonsSpecies?.data?.gender_rate}%</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <img src='\src\assets\male.png' alt='Male Icon' className='w-4 h-4' />
              <span className='text-male font-medium'>{100 - 12.5 * pokemonsSpecies?.data?.gender_rate}%</span>
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-row'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Egg Groups:</span>
        <div>
          {eggGroups?.length === 1
            ? eggGroups?.map((eggGroup) => (
                <span className='text-zinc-500 dark:text-zinc-400 capitalize'> {`${eggGroup?.name}`}</span>
              ))
            : eggGroups?.map((eggGroup, index) =>
                index === 0 ? (
                  <span className='text-zinc-500 dark:text-zinc-400 capitalize'> {`${eggGroup?.name}, `}</span>
                ) : (
                  <span className='text-zinc-500 dark:text-zinc-400 capitalize'> {` ${eggGroup?.name}`}</span>
                )
              )}
        </div>
      </div>

      <div className='flex flex-row items-center'>
        <span className='pr-2 font-light text-zinc-900 dark:text-zinc-100'>Egg Cycles:</span>
        <span className='text-zinc-500 dark:text-zinc-400 pr-1'>{hatchCounter}</span>
        <span className='text-xs text-zinc-500 dark:text-zinc-400/75'>
          {' '}
          ~({`${hatchCounter * 128} - ${hatchCounter * 257}`}) steps
        </span>
      </div>
    </div>
  );
};

export default PokemonAboutSheet;
