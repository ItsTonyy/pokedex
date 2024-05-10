import { PokemonAboutSheetType } from '@/types/types';

export const PokemonAboutSheet: React.FC<PokemonAboutSheetType> = ({
  pokemonsSpeciesArray,
  height,
  weight,
  captureRate,
  baseHappiness,
  baseExp,
  growthRate,
  id,
}) => {
  const flavorTextReceived = pokemonsSpeciesArray[id - 1].data.flavor_text_entries[1].flavor_text;

  const flavorTextFixed = flavorTextReceived
    .replace('POKéMON', 'pokémon')
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

  return (
    <div className='space-y-3 flex flex-col'>
      <div>
        <p className='text-gray-500'>{flavorTextFixed}</p>
      </div>

      <h2 className='font-medium text-xl pt-3'>Pokédex Data</h2>

      <div className='flex'>
        <span className='pr-2 font-light'>Height:</span>
        <span className='text-gray-500'>{addPoint(height)}m</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Weight:</span>
        <span className='text-gray-500'>{addPoint(weight)}kg</span>
      </div>

      <h2 className='font-medium text-xl pt-3'>Pokédex Training</h2>

      <div className='flex'>
        <span className='pr-2 font-light'>Capture Rate:</span>
        <span className='text-gray-500'>{pokemonsSpeciesArray[id].data.capture_rate}</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Base Happiness:</span>
        <span className='text-gray-500'>{pokemonsSpeciesArray[id].data.base_happiness}</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Base Experience:</span>
        <span className='text-gray-500'>{baseExp}</span>
      </div>
      <div className='flex'>
        <span className='pr-2 font-light'>Growth Rate:</span>
        <span className='text-gray-500'>{pokemonsSpeciesArray[id].data.growth_rate.name}</span>
      </div>
    </div>
  );
};
