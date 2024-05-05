import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PokemonCard } from './components/pokemonCard';
import { pokemonDefaultType, pokemonType } from './types/types';
import axios from 'axios';
//import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonsDefault, setPokemonsDefault] = useState([]);
  console.log(pokemonsDefault)
 

  useEffect(() => {
    PokemonsDefault();
  }, []);

  const PokemonsDefault = async () => {
    const endpoints = [];
    for (let i = 1; i < 31; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonsDefault(res));
  };

  async function pokemonSubmit() {
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
            onClick={pokemonSubmit}
          >
            Submit
          </Button>
        </div>

        <div className='grid grid-cols-5 gap-5'>
          {pokemonsDefault.map((pokemon: pokemonDefaultType) => (
            <PokemonCard
              name={pokemon.data.name}
              id={pokemon.data.id}
              type={pokemon.data.types[0].type.name}
              image={pokemon.data.sprites.other['official-artwork'].front_default}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
