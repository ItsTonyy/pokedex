import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PokemonCard } from './components/pokemonCard';
import { pokemonsObject, pokemonDefaultType } from './types/types';
import { Search } from 'lucide-react';
import axios from 'axios';
//import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonsDefault, setPokemonsDefault] = useState<
    pokemonDefaultType[] | undefined
  >([]);

  useEffect(() => {
    PokemonsDefault();
  }, []);

  const PokemonsDefault = async () => {
    const endpoints = [];
    for (let i = 1; i < 29; i++) {
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

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      pokemonSubmit();
    }
  };

  return (
    <div
      className='bg-background-white flex py-14 px-56 justify-center bg-pokeball-white bg-no-repeat
     bg-top bg-75%'
    >
      <div className='flex flex-col xl:min-w-full '>
        <header>
          <h1 className='title'>Pokédex</h1>
          <p className='text-xl -mt-3'>
            Search for Pokémon by name or using the National Pokédex Number
          </p>
        </header>

        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 z-10'/>
          <Input
          className='pl-11 w-full min-w-[300px] my-8 md:h-14 bg-background-default-input
             focus:bg-background-pressed-input text-base'
          placeholder='What Pokémon are you looking for?'
          id='inputPokemon'
          onChange={(event) => setPokemonName(event.target.value)}
          onKeyUp={handleKeyUp}
        />
        </div>
        
        <div className='grid grid-cols-4 gap-5'>
          {pokemonsDefault?.map((pokemon) => (
            <PokemonCard
              name={pokemon.data.name}
              id={pokemon.data.id}
              mainType={pokemon.data.types[0].type.name}
              secondType={pokemon.data.types[1]?.type.name}
              typesLength={pokemon.data.types.length}
              image={
                pokemon.data.sprites.other['official-artwork'].front_default
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
