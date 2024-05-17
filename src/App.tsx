import { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import PokemonHeaderSheet from './components/Sheet/PokemonHeaderSheet';
import PokemonStatsSheet from './components/Sheet/PokemonStatsSheet';
import PokemonAboutSheet from './components/Sheet/PokemonAboutSheet';
import PokemonEvolutionsSheet from './components/Sheet/PokemonEvolutionsSheet';
import { Input } from '@/components/ui/input';
import Loader from './components/ui/loader';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import PokemonCard from './components/PokemonCard';
import { pokemonDefaultType, PokemonSpeciesType, PokemonEvoType } from './types/types';
import { Search } from 'lucide-react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonsDefault, setPokemonsDefault] = useState<pokemonDefaultType[]>([]);
  const [pokemonsSpecies, setPokemonsSpecies] = useState<PokemonSpeciesType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pokemonEvo, setPokemonEvo] = useState<PokemonEvoType[]>([]);
  const [about, setAbout] = useState(true);
  const [stats, setStats] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [evolutions, setEvolutions] = useState(false);

  //console.log(pokemonsSpecies[0].data.evolution_chain.url)
  //console.log(pokemonEvo)

  useEffect(() => {
    PokemonsDefaultObject();
  }, []);

  useEffect(() => {
    PokemonsFlavorObject();
    PokemonsEvoObject();
  }, [pokemonsDefault.length]);

  const PokemonsDefaultObject = useCallback(async () => {
    const endpoints = [];
    for (let i = 1; i < 29; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonsDefault(res));
  }, []);

  const PokemonsDefaultObjectInfiniteScroll = async () => {
    const endpoints = [];
    for (let i = pokemonsDefault.length + 1; i < pokemonsDefault.length + 12; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonsDefault((pokemonsDefault) => [...pokemonsDefault, ...res]));
  };

  const PokemonsFlavorObject = useCallback(async () => {
    const endpoints = [];
    for (let i = 1; i < pokemonsDefault.length; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonsSpecies(res));
  }, [pokemonsDefault.length]);

  const PokemonsEvoObject = useCallback(async () => {
    let speciesUrls: string[] = [];
    let speciesObject: any[] = []
    let endpoints = [];

    for (let i = 1; i < pokemonsDefault.length; i++) {
      speciesUrls.push(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchSpeciesObject = await axios
      .all(speciesUrls.map((speciesUrl) => axios.get(speciesUrl)))
      .then((res) => speciesObject = res);

    for (let i = 0; i < speciesObject.length; i++) {
      endpoints.push(speciesObject[i].data.evolution_chain.url);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchEndpointsUrls = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonEvo(res));

  }, [pokemonsDefault.length]);

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

  const handleKeyUp = (event: KeyboardEvent) => {
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
    <InfiniteScroll
      dataLength={pokemonsDefault.length}
      next={PokemonsDefaultObjectInfiniteScroll}
      hasMore={true}
      loader={<h2></h2>}
    >
      <div
        className='bg-background-white min-w-80 flex py-14 px-10 2xl:px-56 xl:px-36 lg:px-16 justify-center
        bg-pokeball-white bg-no-repeat bg-top bg-75% antialiased'
      >
        <div className='flex flex-col xl:min-w-full '>
          <header>
            <h1 className='title'>Pokédex</h1>
            <p className='text-xl -mt-3'>Search for Pokémon by name or using the National Pokédex Number</p>
          </header>

          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900' />
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

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {pokemonsDefault?.map((pokemon) => (
              <Sheet key={pokemon.data.id}>
                <SheetTrigger asChild onClick={aboutClicked}>
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
                        baseExp={pokemon.data.base_experience}
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
                    <div className='bg-neutral-50 h-full rounded-t-4xl p-8'>
                     <PokemonEvolutionsSheet PokemonEvo={pokemonEvo} id={pokemon.data.id}/>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default App;
