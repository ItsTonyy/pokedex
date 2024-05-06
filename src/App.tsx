import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PokemonCard } from './components/pokemonCard';
import { pokemonDefaultType, pokemonsObject } from './types/types';
import axios from 'axios';
//import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonsDefault, setPokemonsDefault] = useState<pokemonsObject>([]);
  //para pegar o tipo do pokemon => (lembra do index) pokemon.data.types[0 ou 1].type.name)
  //console.log(pokemonsDefault[0].data.types)

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

  return (
    <div className='bg-background-white flex py-14 px-56 justify-center bg-pokeball-white bg-no-repeat
     bg-top bg-80%'>
      <div className='flex flex-col xl:min-w-full '>
        <header>
          <h1 className='title'>Pokédex</h1>
          <p className='text-xl -mt-3'>
            Search for Pokémon by name or using the National Pokédex Number
          </p>
        </header>

        <div className='my-8 flex flex-col space-y-3 md:space-y-0 md:space-x-3 md:flex-row md:items-center'>
          <Input
            className='w-full min-w-[300px] md:w-2/5 md:h-11 bg-background-default-input'
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

        <div className='grid grid-cols-4 gap-5'>
          {pokemonsDefault.map((pokemon: pokemonDefaultType) => (
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
