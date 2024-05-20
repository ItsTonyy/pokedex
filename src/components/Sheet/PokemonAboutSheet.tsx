import { PokemonAboutSheetType } from '@/types/types';
import { useEffect, useState, useCallback } from 'react';
import { PokemonSpeciesType } from '@/types/types';
import { abilityType } from '@/types/types';
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
  const [pokemonsSpecies, setPokemonsSpecies] = useState<PokemonSpeciesType[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonTypesType>(Object);

  useEffect(() => {
    PokemonsSpeciesObject(id);
    PokemonsTypesObject(mainType);
  }, [id]);

  //console.log(pokemonTypes.data.damage_relations.double_damage_from)

  const PokemonsTypesObject = useCallback(async (mainType: string) => {
    const endpoints = [];
    endpoints.push(`https://pokeapi.co/api/v2/type/${mainType}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios.get(endpoints[0]).then((res) => setPokemonTypes(res));
  }, []);

  const PokemonsSpeciesObject = useCallback(async (id: number) => {
    const endpoints = [];
    endpoints.push(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios.get(endpoints[0]).then((res) => setPokemonsSpecies(res));
  }, []);

  const flavorTextReceived = pokemonsSpecies[0]?.data.flavor_text_entries[1].flavor_text;

  const flavorTextFixed = flavorTextReceived
    ?.replace('POKéMON', 'pokémon')
    .replace(/\f/g, '\n')
    .replace(/\u00ad\n/g, '')
    .replace(/\u00ad/g, '')
    .replace(/ -\n/g, ' - ')
    .replace(/-\n/g, '-')
    .replace(/\n/g, ' ');

  function addPoint(num: number | undefined): string | undefined {
    const numToString = num?.toString();

    return numToString?.replace(/(\d)(?=\d$)/, '$1.');
  }

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

  const doubleDamageFromArray = pokemonTypes?.data?.damage_relations?.double_damage_from

  return (
    <div className='space-y-3 flex flex-col'>
      <div>
        <p className='text-gray-500'>{flavorTextFixed}</p>
      </div>

      <h2 className={`font-medium text-xl pt-3 ${textColorTernary}`}>Pokédex Data</h2>

      <div className='flex'>
        <span className='pr-2 font-light'>Height:</span>
        <span className='text-gray-500'>{addPoint(height)}m</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Weight:</span>
        <span className='text-gray-500'>{addPoint(weight)}kg</span>
      </div>
      <div className='flex flex-row'>
        <span className='pr-2 font-light'>Abilities:</span>
        <div className='flex flex-col'>
          {abilities.map((ability, index) => (
            <span className='text-gray-500'>
              {ability.is_hidden === false
                ? `${index + 1}. ${ability.ability.name}`
                : `${index + 1}. ${ability.ability.name} (hidden ability)`}
            </span>
          ))}
        </div>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Weaknessess:</span>
        {doubleDamageFromArray?.map((doubleDamageItem) => (
          <div className={`bg-type-${doubleDamageItem.name} p-1 rounded mr-2`}>
          <img src={`src/assets/TypesIcons/${doubleDamageItem.name}.png`} alt="DoubleDamageImage" />
          </div>
        ))}
      </div>

      <h2 className={`font-medium text-xl pt-3 ${textColorTernary}`}>Training</h2>

      <div className='flex'>
        <span className='pr-2 font-light'>Capture Rate:</span>
        <span className='text-gray-500'>{!pokemonsSpecies ? 0 : pokemonsSpecies[0]?.data.capture_rate}</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Base Happiness:</span>
        <span className='text-gray-500'>
          {!pokemonsSpecies ? 0 : pokemonsSpecies[0]?.data.base_happiness}
        </span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Base Experience:</span>
        <span className='text-gray-500'>{baseExp}</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Growth Rate:</span>
        <span className='text-gray-500'>
          {!pokemonsSpecies ? null : pokemonsSpecies[0]?.data.growth_rate.name}
        </span>
      </div>
    </div>
  );
};

export default PokemonAboutSheet;
