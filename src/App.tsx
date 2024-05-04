import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [pokemonName, setPokemonName] = useState('');

  console.log(pokemonName);

  async function PokemonSubmit() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error('could not fetch resource');
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-slate-100 flex h-screen p-14 border-2 border-red-200 justify-center'>
      <div className='flex flex-col xl:min-w-full border-2 border-red-200'>
        <header>
          <h1 className='title'>Pokédex</h1>
          <p className='text-xl -mt-3'>
            Search for Pokémon by name or using the National Pokédex Number
          </p>
        </header>

        <div className='my-8 flex flex-col space-y-3 md:space-y-0 md:space-x-3 md:flex-row md:items-center'>
          <Input
            className='w-full min-w-[300px] md:w-2/5 md:h-11 '
            placeholder='What Pokémon are you looking for?'
            id='inputPokemon'
            onChange={(event) => setPokemonName(event.target.value)}
          />
          <Button
            variant={'destructive'}
            size={'lg'}
            className='text-base font-semibold max-w-24 h-8 md:h-10'
            onClick={PokemonSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
      
    </div>
  );
}

export default App;
