import { useState, useEffect, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './components/ui/tooltip';
import { Button } from './components/ui/button';
import { pokemonDefaultType } from './types/types';
import { Search, Sun, Moon } from 'lucide-react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonCard from './components/PokemonCard';
import PokemonHeaderSheet from './components/Sheet/PokemonHeaderSheet';
import PokemonStatsSheet from './components/Sheet/PokemonStatsSheet';
import PokemonAboutSheet from './components/Sheet/PokemonAboutSheet';
import PokemonEvolutionsSheet from './components/Sheet/PokemonEvolutionsSheet';

//const PokemonCard = lazy(() => import('./components/PokemonCard'));
//const PokemonHeaderSheet = lazy(() => import('./components/Sheet/PokemonHeaderSheet'));
//const PokemonStatsSheet = lazy(() => import('./components/Sheet/PokemonStatsSheet'));
//const PokemonAboutSheet = lazy(() => import('./components/Sheet/PokemonAboutSheet'));
//const PokemonEvolutionsSheet = lazy(() => import('./components/Sheet/PokemonEvolutionsSheet'));

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonsDefault, setPokemonsDefault] = useState<pokemonDefaultType[]>([]);
  const [about, setAbout] = useState(true);
  const [stats, setStats] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [evolutions, setEvolutions] = useState(false);
  const [theme, setTheme] = useState(null);

  //console.log(pokemonsDefault[0].data)

  useEffect(() => {
    PokemonsDefaultObject();
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const PokemonsDefaultObject = async () => {
    const endpoints = [];
    for (let i = 1; i < 21; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonsDefault(res));
  };

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

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');

    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <InfiniteScroll
      dataLength={pokemonsDefault.length}
      next={PokemonsDefaultObjectInfiniteScroll}
      hasMore={true}
      loader={<h2></h2>}
    >
      <div
        className='bg-background-color min-w-80 flex py-14 px-10 2xl:px-56 xl:px-36 lg:px-16 justify-center
        bg-pokeball-white dark:bg-pokeball-dark bg-no-repeat bg-top bg-75% antialiased scroll-smooth'
      >
        <div className='flex flex-col xl:min-w-full relative'>
          <header className='flex flex-col'>
            <h1 className='title drop-shadow-lg'>Pokédex</h1>
            <div className='flex justify-between items-center'>
              <p className='text-xl'>Search for Pokémon by name or using the National Pokédex Number</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      onClick={handleThemeSwitch}
                      className='bg-zinc-700 dark:bg-zinc-200 w-12 p-0 hover:bg-zinc-950 dark:hover:bg-zinc-100'
                    >
                      {localStorage.theme === 'dark' ? <Sun /> : <Moon />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{localStorage.theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </header>

          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-900 dark:text-zinc-300' />
            <Input
              className='pl-11 w-full min-w-[300px] my-8 md:h-14 bg-background-default-input
             focus:bg-zinc-100 text-base shadow-md dark:border-zinc-400 dark:border-2 dark:focus:bg-zinc-800'
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
                    />
                  </div>

                  <div className='flex justify-between px-6'>
                    <button
                      onClick={aboutClicked}
                      className='text-white py-1 px-3 cursor-pointer mb-2 hover:scale-115
                    duration-300 ease-in-out hover:font-bold focus:font-bold
                    focus:scale-115 focus:outline-none'
                    >
                      About
                    </button>

                    <button
                      onClick={statsClicked}
                      className='text-white py-1 px-3 cursor-pointer mb-2 hover:scale-115
                    duration-300 ease-in-out hover:font-bold focus:font-bold
                    focus:scale-115 focus:outline-none'
                    >
                      Stats
                    </button>

                    <button
                      onClick={evolutionsClicked}
                      className='text-white py-1 px-3 cursor-pointer mb-2 hover:scale-115
                    duration-300 ease-in-out hover:font-bold focus:font-bold
                    focus:scale-115 focus:outline-none'
                    >
                      Evolutions
                    </button>
                  </div>

                  {about ? (
                    <div className='h-full bg-background-color rounded-t-4xl p-8'>
                      <PokemonAboutSheet
                        id={pokemon.data.id}
                        height={pokemon.data.height}
                        weight={pokemon.data.weight}
                        baseExp={pokemon.data.base_experience}
                        mainType={pokemon.data.types[0].type.name}
                        abilities={pokemon.data.abilities}
                      />
                    </div>
                  ) : stats ? (
                    <div className='bg-background-color h-full rounded-t-4xl p-8'>
                      <PokemonStatsSheet
                        name={pokemon.data.name}
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
                    <div className='bg-background-color h-full rounded-t-4xl p-8'>
                      <PokemonEvolutionsSheet
                        id={pokemon.data.id}
                        mainType={pokemon.data.types[0].type.name}
                      />
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
