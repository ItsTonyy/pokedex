import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { PokemonCard } from './components/PokemonCard';
import { PokemonHeaderSheet } from './components/PokemonHeaderSheet';
import { PokemonStatsSheet } from './components/PokemonStatsSheet';
import { PokemonAboutSheet } from './components/PokemonAboutSheet';
import { pokemonDefaultType, PokemonFlavorType } from './types/types';
import { Search } from 'lucide-react';
import axios from 'axios';

//import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonsDefault, setPokemonsDefault] = useState<pokemonDefaultType[]>([]);
  const [pokemonsSpecies, setPokemonsSpecies] = useState<PokemonFlavorType[]>([]);
  const [about, setAbout] = useState(true);
  const [stats, setStats] = useState(false);
  const [evolutions, setEvolutions] = useState(false);
  
  //console.log(pokemonsDefault[26].data.base_experience)
  //console.log(pokemonsDefault[25].data.types[0].type.name)
  //console.log(pokemonsSpecies[0].data.flavor_text_entries[0].flavor_text)
  //console.log(pokemonsDefault[0].data.stats[0].base_stat);
  //const combinedArray = [...pokemonsDefault, ...pokemonsSpecies];

  useEffect(() => {
    PokemonsDefaultObject();
    PokemonsFlavorObject();
  }, []);

  const PokemonsDefaultObject = async () => {
    const endpoints = [];
    for (let i = 1; i < 29; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonsDefault(res));
  };

  const PokemonsFlavorObject = async () => {
    const endpoints = [];
    for (let i = 1; i < 29; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonsSpecies(res));
  };

  async function pokemonSubmit() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

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

  const aboutClicked = () => {
    setAbout(true);
    setStats(false);
    setEvolutions(false);
  };

  const statsClicked = () => {
    setStats(true);
    setAbout(false);
    setEvolutions(false);
  };

  const evolutionsClicked = () => {
    setEvolutions(true);
    setAbout(false);
    setStats(false);
  };

  return (
    <div
      className='bg-background-white flex py-14 px-56 justify-center bg-pokeball-white bg-no-repeat
     bg-top bg-75% antialiased'
    >
      <div className='flex flex-col xl:min-w-full '>
        <header>
          <h1 className='title'>Pokédex</h1>
          <p className='text-xl -mt-3'>Search for Pokémon by name or using the National Pokédex Number</p>
        </header>

        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 z-10' />
          <Input
            className='pl-11 w-full min-w-[300px] my-8 md:h-14 bg-background-default-input
             focus:bg-background-pressed-input text-base shadow-md'
            placeholder='What Pokémon are you looking for?'
            id='inputPokemon'
            onChange={(event) => setPokemonName(event.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>

        {/* ------ Main Part of the App ------*/}
        <div className='grid grid-cols-4 gap-5'>
          {pokemonsDefault?.map((pokemon) => (
            <Sheet key={pokemon.data.id}>
              <SheetTrigger asChild>
                <div>
                  <PokemonCard
                    name={pokemon.data.name}
                    id={pokemon.data.id}
                    mainType={pokemon.data.types[0].type.name}
                    secondType={pokemon.data.types[1]?.type.name}
                    typesLength={pokemon.data.types.length}
                    image={pokemon.data.sprites.other['official-artwork'].front_default}
                  />
                </div>
              </SheetTrigger>

              <SheetContent
                className={`p-0 m-0 border-none bg-background-type-${pokemon.data.types[0].type.name}`}
              >
                <div>
                  <PokemonHeaderSheet
                    name={pokemon.data.name}
                    id={pokemon.data.id}
                    mainType={pokemon.data.types[0].type.name}
                    secondType={pokemon.data.types[1]?.type.name}
                    typesLength={pokemon.data.types.length}
                    image={pokemon.data.sprites.other['official-artwork'].front_default}
                    // [pokemon.data.id].data.flavor_text_entries[0].flavor_text
                  />
                </div>

                <div className='flex justify-between px-6'>
                  <button
                    onClick={aboutClicked}
                    className='text-white py-1 px-3 cursor-pointer mb-2 hover:scale-115
                   hover:underline duration-300 ease-in-out will-change-transform focus:font-bold
                   focus:scale-115 focus:underline focus:outline-none'
                  >
                    About
                  </button>

                  <button
                    onClick={statsClicked}
                    className='text-white py-1 px-3 cursor-pointer mb-2 hover:scale-115
                   hover:underline duration-300 ease-in-out will-change-transform focus:font-bold
                   focus:scale-115 focus:underline focus:outline-none'
                  >
                    Stats
                  </button>

                  <button
                    onClick={evolutionsClicked}
                    className='text-white py-1 px-3 cursor-pointer mb-2 hover:scale-115
                   hover:underline duration-300 ease-in-out will-change-transform focus:font-bold
                   focus:scale-115 focus:underline focus:outline-none'
                  >
                    Evolutions
                  </button>
                </div>

                {about ? (
                  <div className='bg-neutral-50 h-full rounded-t-4xl p-8'>
                    <PokemonAboutSheet
                      pokemonsSpeciesArray={pokemonsSpecies}
                      id={pokemon.data.id}
                      height={pokemon.data.height}
                      weight={pokemon.data.weight}
                      //captureRate={pokemonsSpeciesArray[id].data.capture_rate}
                      //baseHappiness={pokemonsSpeciesArray[id].data.base_happiness}
                      baseExp={pokemon.data.base_experience}
                      //growthRate={pokemonsSpeciesArray[id].data.growth_rate.name}
                    />
                  </div>
                ) : stats ? (
                  <div className='bg-neutral-50 h-full rounded-t-4xl p-8'>
                    <PokemonStatsSheet
                      mainType={pokemon.data.types[0].type.name}
                      hp={pokemon.data.stats[0].base_stat}
                      attack={pokemon.data.stats[1].base_stat}
                      defense={pokemon.data.stats[2].base_stat}
                      spAttack={pokemon.data.stats[3].base_stat}
                      spDefense={pokemon.data.stats[4].base_stat}
                      speed={pokemon.data.stats[5].base_stat}
                    />
                  </div>
                ) : (
                  <div className='bg-neutral-50 h-full rounded-t-4xl p-8'></div>
                )}
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
