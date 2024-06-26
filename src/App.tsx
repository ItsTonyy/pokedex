import { useState, useEffect, lazy, Suspense } from 'react';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet';
import { Button } from './components/ui/button';
import { pokemonDefaultType } from './types/types';
import { PokemonTypesType } from './types/types';
import { PokemonColorType } from './types/types';
import { pokemonStringUrl } from './types/types';
import { GenerationResponse } from './types/types';
import { textColorTernary } from './utils/utils';
import { Search, Sun, Moon, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonHeaderSheet from './components/Sheet/PokemonHeaderSheet';
import PokemonStatsSheet from './components/Sheet/PokemonStatsSheet';
import PokemonAboutSheet from './components/Sheet/PokemonAboutSheet';
const PokemonCard = lazy(() => import('./components/PokemonCard'));
const PokemonEvolutionsSheet = lazy(() => import('./components/Sheet/PokemonEvolutionsSheet'));
import PokemonEvoFallback from './components/Fallbacks/PokemonEvoFallback';
import PokemonCardFallback from './components/Fallbacks/PokemonCardFallback';


function App() {
  const [pokemonInputResults, setPokemonInputResults] = useState<pokemonStringUrl[]>([]);
  const [pokemonsDefault, setPokemonsDefault] = useState<pokemonDefaultType[]>([]);
  const [pokemonInputObject, setPokemonInputObject] = useState<pokemonDefaultType>();
  const [about, setAbout] = useState(true);
  const [stats, setStats] = useState(false);
  const [evolutions, setEvolutions] = useState(false);
  const [theme, setTheme] = useState<null | string>(null);

  useEffect(() => {
    PokemonsDefaultObject();

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
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

    const response = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));

    setPokemonsDefault(response);
  };

  const PokemonsDefaultObjectInfiniteScroll = async () => {
    const endpoints = [];
    for (let i = pokemonsDefault.length + 1; i < pokemonsDefault.length + 12; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    const response = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));

    setPokemonsDefault((pokemonsDefault) => [...pokemonsDefault, ...response]);
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

  const handleFilterType = async (type: string) => {
    const typeEndpoint = `https://pokeapi.co/api/v2/type/${type}`;
    let typeObject: PokemonTypesType;

    try {
      const fetchTypeEndpoint = await axios.get(typeEndpoint);
      typeObject = fetchTypeEndpoint;

      const endpoints = typeObject.data.pokemon.map((pokemonObject) => pokemonObject.pokemon.url);

      const response = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));

      setPokemonsDefault(response);
    } catch (error) {
      console.log('Error fetching filterType data: ', error);
    }
  };

  const handleFilterColor = async (color: string) => {
    const colorEndpoint = `https://pokeapi.co/api/v2/pokemon-color/${color}`;
    let colorObject: PokemonColorType;

    try {
      const fetchColorEndpoint = await axios.get(colorEndpoint);
      colorObject = fetchColorEndpoint;

      const endpoints = colorObject.data.pokemon_species.map((species) =>
        species.url.replace(
          /https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/(\d+)\//,
          'https://pokeapi.co/api/v2/pokemon/$1/'
        )
      );

      const response = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
      setPokemonsDefault(response);
    } catch (error) {
      console.log('Error fetching filterColor data: ', error);
    }
  };

  const handleGeneration = async (generationId: number) => {
    const generationEndpoint = `https://pokeapi.co/api/v2/generation/${generationId}`;
    let generationObject: GenerationResponse;

    try {
      const fetchGenerationEndpoint = await axios.get(generationEndpoint);
      console.log(fetchGenerationEndpoint);
      generationObject = fetchGenerationEndpoint;

      const endpoints = generationObject.data.pokemon_species.map((generation) =>
        generation.url.replace(
          /https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/(\d+)\//,
          'https://pokeapi.co/api/v2/pokemon/$1/'
        )
      );

      const response = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
      setPokemonsDefault(response);
    } catch (error) {
      console.log('Error fetching handleGeneration data: ', error);
    }
  };

  const fetchInputData = (value: string) => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((response) => response.json())
      .then((json) => {
        const results = json.results.filter((pokemon: pokemonStringUrl) => {
          return value && pokemon && pokemon.name.toLowerCase().includes(value);
        });
        setPokemonInputResults(results);
      });
  };

  const fetchResultUrl = async (url: string) => {
    const endpoint = url;
    const response = await axios.get(endpoint);
    setPokemonInputObject(response);
  };

  const handleInputClick = (url: string) => {
    fetchResultUrl(url);
    aboutClicked();
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

  const pokemonTypes = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ];

  const pokemonColors = [
    'black',
    'blue',
    'brown',
    'gray',
    'green',
    'pink',
    'purple',
    'red',
    'white',
    'yellow',
  ];

  return (
    <InfiniteScroll
      dataLength={pokemonsDefault.length}
      next={PokemonsDefaultObjectInfiniteScroll}
      hasMore={true}
      loader={<h2></h2>}
    >
      <div
        className='bg-white dark:bg-neutral-900 min-w-80 flex py-14 px-6 min-[440px]:px-12 sm:px-16 2xl:px-56 xl:px-36 lg:px-16 justify-center
        bg-pokeball-white dark:bg-pokeball-dark bg-no-repeat bg-top bg-75% antialiased scroll-smooth'
      >
        <div className='flex flex-col xl:min-w-full relative'>
          <header className='flex flex-col'>
            <h1 className='sm:title drop-shadow-xl font-bold text-6xl'>Pokédex</h1>
            <div className='flex lg:justify-between lg:items-center lg:flex-row flex-col gap-4'>
              <p className='sm:text-xl text-base text-zinc-500 dark:text-zinc-300 mt-2'>
                Search for Pokémon by name or using the National Pokédex Number
              </p>

              {/*Main Page Buttons */}
              <div className='space-x-3'>
                {/*Dark/Light mode*/}
                <Button
                  onClick={handleThemeSwitch}
                  className='bg-zinc-700 dark:bg-zinc-200 w-10 p-0 hover:bg-zinc-950 dark:hover:bg-zinc-100'
                >
                  {localStorage.theme === 'dark' ? <Sun /> : <Moon />}
                </Button>

                {/*Filters Button*/}
                <Sheet>
                  <SheetTrigger>
                    <Button
                      className='bg-zinc-700 dark:bg-zinc-200 w-10 p-0 hover:bg-zinc-950
                      dark:hover:bg-zinc-100'
                    >
                      <SlidersHorizontal />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side={'bottom'} className='max-[440px]:max-h-svh pt-16 pb-10'>
                    <SheetHeader>
                      <SheetTitle className='text-3xl drop-shadow-lg'>Filters</SheetTitle>
                      <SheetDescription className='text-lg'>
                        Use advanced search to explore Pokémon by type and colors!
                      </SheetDescription>

                      <div className='pt-3'>
                        <h2 className='text-lg flex justify-start font-semibold'>Types</h2>

                        <div className='flex flex-row gap-3 mt-2 flex-wrap'>
                          <button
                            onClick={() => PokemonsDefaultObject()}
                            className=' bg-white text-black border-2 border-black dark:bg-black 
                            dark:text-white dark:border-2 dark:border-zinc-300 py-1 px-3 rounded shadow-lg
                            hover:scale-105 will-change-transform duration-300 '
                          >
                            All
                          </button>
                          {pokemonTypes.map((pokemonType, index) => (
                            <button
                              className={`bg-background-type-${pokemonType} min-w-20 py-1 px-3 rounded shadow-lg
                              hover:scale-105 will-change-transform duration-300 capitalize`}
                              onClick={() => handleFilterType(pokemonType)}
                              key={index}
                            >
                              {pokemonType}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className='pt-3'>
                        <h2 className='text-lg flex justify-start font-semibold'>Colors</h2>

                        <div className='flex flex-row gap-3 mt-2 flex-wrap'>
                          <button
                            onClick={() => PokemonsDefaultObject()}
                            className=' bg-white text-black border-2 border-black dark:bg-black 
                            dark:text-white dark:border-2 dark:border-zinc-300 py-1 px-3 rounded shadow-lg
                            hover:scale-105 will-change-transform duration-300 '
                          >
                            All
                          </button>
                          {pokemonColors.map((pokemonColor, index) => (
                            <button
                              className={`${
                                pokemonColor === 'black'
                                  ? 'bg-background-color-black'
                                  : pokemonColor === 'blue'
                                    ? 'bg-background-color-blue'
                                    : pokemonColor === 'brown'
                                      ? 'bg-background-color-brown'
                                      : pokemonColor === 'gray'
                                        ? 'bg-background-color-gray'
                                        : pokemonColor === 'green'
                                          ? 'bg-background-color-green'
                                          : pokemonColor === 'pink'
                                            ? 'bg-background-color-pink'
                                            : pokemonColor === 'purple'
                                              ? 'bg-background-color-purple'
                                              : pokemonColor === 'red'
                                                ? 'bg-background-color-red'
                                                : pokemonColor === 'yellow'
                                                  ? 'bg-background-color-yellow'
                                                  : 'bg-background-color-white'
                              } py-1 px-3 rounded shadow-lg
                              hover:scale-105 will-change-transform duration-300 capitalize min-w-[70px]`}
                              onClick={() => handleFilterColor(pokemonColor)}
                              key={index}
                            >
                              {pokemonColor}
                            </button>
                          ))}
                        </div>
                      </div>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                {/*Generations Button*/}
                <Sheet>
                  <SheetTrigger>
                    <Button
                      className='bg-zinc-700 dark:bg-zinc-200 w-10 p-0 hover:bg-zinc-950
                      dark:hover:bg-zinc-100'
                    >
                      <LayoutGrid />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side={'bottom'} className='max-[440px]:max-h-svh pt-16 pb-10'>
                    <SheetHeader>
                      <SheetTitle className='text-3xl drop-shadow-lg'>Generations</SheetTitle>
                      <SheetDescription className='text-lg'>
                        Use search for generations to explore your Pokémon!
                      </SheetDescription>

                      <div className='pt-3 flex flex-row flex-wrap gap-3'>
                        <div
                          className='w-24 flex justify-center items-center bg-white text-black border-2 border-black dark:bg-black 
                        dark:text-white dark:border-2 dark:border-zinc-300 cursor-pointer p-3 rounded-lg hover:scale-105 
                        will-change-transform duration-300'
                          onClick={() => PokemonsDefaultObject()}
                        >
                          <span className='text-lg'>All</span>
                        </div>
                        <div
                          className='relative bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-400/50 focus:bg-red-500 cursor-pointer p-3 rounded-lg hover:scale-105 will-change-transform duration-300 
                        before:bg-6x3-grad dark:before:bg-6x3-grad-generations before:h-6 before:w-[3rem] before:absolute before:bg-cover before:bg-no-repeat 
                        before:top-0 before:left-4
                        after:bg-6x3-grad dark:after:bg-6x3-grad-generations after:h-6 after:w-[3rem] after:absolute after:bg-cover after:bg-no-repeat 
                        after:bottom-0 after:right-0'
                          onClick={() => handleGeneration(1)}
                        >
                          <img src='src/assets/Generation-1.png' alt='GenerationImage' />
                        </div>
                        <div
                          className='relative bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-400/50 focus:bg-red-500 cursor-pointer p-3 rounded-lg hover:scale-105 will-change-transform duration-300 
                        before:bg-6x3-grad dark:before:bg-6x3-grad-generations before:h-6 before:w-[3rem] before:absolute before:bg-cover before:bg-no-repeat 
                        before:top-0 before:left-4
                        after:bg-6x3-grad dark:after:bg-6x3-grad-generations after:h-6 after:w-[3rem] after:absolute after:bg-cover after:bg-no-repeat 
                        after:bottom-0 after:right-0'
                          onClick={() => handleGeneration(2)}
                        >
                          <img src='src/assets/Generation-2.png' alt='GenerationImage' />
                        </div>
                        <div
                          className='relative bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-400/50 focus:bg-red-500 cursor-pointer p-3 rounded-lg hover:scale-105 will-change-transform duration-300 
                        before:bg-6x3-grad dark:before:bg-6x3-grad-generations before:h-6 before:w-[3rem] before:absolute before:bg-cover before:bg-no-repeat 
                        before:top-0 before:left-4
                        after:bg-6x3-grad dark:after:bg-6x3-grad-generations after:h-6 after:w-[3rem] after:absolute after:bg-cover after:bg-no-repeat 
                        after:bottom-0 after:right-0'
                          onClick={() => handleGeneration(3)}
                        >
                          <img src='src/assets/Generation-3.png' alt='GenerationImage' />
                        </div>
                        <div
                          className='relative bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-400/50 focus:bg-red-500 cursor-pointer p-3 rounded-lg hover:scale-105 will-change-transform duration-300 
                        before:bg-6x3-grad dark:before:bg-6x3-grad-generations before:h-6 before:w-[3rem] before:absolute before:bg-cover before:bg-no-repeat 
                        before:top-0 before:left-4
                        after:bg-6x3-grad dark:after:bg-6x3-grad-generations after:h-6 after:w-[3rem] after:absolute after:bg-cover after:bg-no-repeat 
                        after:bottom-0 after:right-0'
                          onClick={() => handleGeneration(4)}
                        >
                          <img src='src/assets/Generation-4.png' alt='GenerationImage' />
                        </div>
                        <div
                          className='relative bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-400/50 focus:bg-red-500 cursor-pointer p-3 rounded-lg hover:scale-105 will-change-transform duration-300 
                        before:bg-6x3-grad dark:before:bg-6x3-grad-generations before:h-6 before:w-[3rem] before:absolute before:bg-cover before:bg-no-repeat 
                        before:top-0 before:left-4
                        after:bg-6x3-grad dark:after:bg-6x3-grad-generations after:h-6 after:w-[3rem] after:absolute after:bg-cover after:bg-no-repeat 
                        after:bottom-0 after:right-0'
                          onClick={() => handleGeneration(5)}
                        >
                          <img src='src/assets/Generation-5.png' alt='GenerationImage' />
                        </div>
                        <div
                          className='relative bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-400/50 focus:bg-red-500 cursor-pointer p-3 rounded-lg hover:scale-105 will-change-transform duration-300 
                        before:bg-6x3-grad dark:before:bg-6x3-grad-generations before:h-6 before:w-[3rem] before:absolute before:bg-cover before:bg-no-repeat 
                        before:top-0 before:left-4
                        after:bg-6x3-grad dark:after:bg-6x3-grad-generations after:h-6 after:w-[3rem] after:absolute after:bg-cover after:bg-no-repeat 
                        after:bottom-0 after:right-0'
                          onClick={() => handleGeneration(6)}
                        >
                          <img src='src/assets/Generation-6.png' alt='GenerationImage' />
                        </div>
                        <div
                          className='relative bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-400/50 focus:bg-red-500 cursor-pointer p-3 rounded-lg hover:scale-105 will-change-transform duration-300 
                        before:bg-6x3-grad dark:before:bg-6x3-grad-generations before:h-6 before:w-[3rem] before:absolute before:bg-cover before:bg-no-repeat 
                        before:top-0 before:left-4
                        after:bg-6x3-grad dark:after:bg-6x3-grad-generations after:h-6 after:w-[3rem] after:absolute after:bg-cover after:bg-no-repeat 
                        after:bottom-0 after:right-0'
                          onClick={() => handleGeneration(7)}
                        >
                          <img src='src/assets/Generation-7.png' alt='GenerationImage' />
                        </div>
                        <div
                          className='relative bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-400/50 focus:bg-red-500 cursor-pointer p-3 rounded-lg hover:scale-105 will-change-transform duration-300 
                        before:bg-6x3-grad dark:before:bg-6x3-grad-generations before:h-6 before:w-[3rem] before:absolute before:bg-cover before:bg-no-repeat 
                        before:top-0 before:left-4
                        after:bg-6x3-grad dark:after:bg-6x3-grad-generations after:h-6 after:w-[3rem] after:absolute after:bg-cover after:bg-no-repeat 
                        after:bottom-0 after:right-0'
                          onClick={() => handleGeneration(8)}
                        >
                          <img src='src/assets/Generation-8.png' alt='GenerationImage' />
                        </div>
                      </div>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>

          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-900 dark:text-zinc-300' />
            <Input
              className='pl-11 w-full min-w-[300px] my-8 h-14 bg-background-default-input
             focus:bg-zinc-100 text-base shadow-md dark:border-zinc-400 dark:border-2 dark:focus:bg-zinc-800'
              placeholder='What Pokémon are you looking for?'
              id='inputPokemon'
              onChange={(e) => fetchInputData(e.target.value)}
            />
            {pokemonInputResults.length === 0 ? (
              <div className='hidden'></div>
            ) : (
              <div
                className='flex flex-col bg-zinc-100 dark:bg-neutral-900 border border-zinc-600 
                dark:border-zinc-400 w-full absolute z-10 rounded-lg -mt-3 max-h-80 overflow-y-auto'
              >
                {pokemonInputResults?.map((result: pokemonStringUrl) => (
                  <Sheet>
                    <SheetTrigger
                      className='flex border-zinc-600 dark:border-zinc-400 border-b-[1px] last:border-none
                      hover:bg-zinc-200 dark:hover:bg-neutral-950 cursor-pointer'
                      onClick={() => handleInputClick(result.url)}
                    >
                      <div>
                        <div className='text-lg font-light py-2 px-6 capitalize'>{result?.name}</div>
                      </div>
                    </SheetTrigger>

                    <SheetContent
                      className={`p-0 m-0 border-none bg-background-type-${pokemonInputObject?.data.types[0].type.name}`}
                    >
                      <div>
                        <PokemonHeaderSheet
                          name={pokemonInputObject?.data?.name}
                          id={pokemonInputObject?.data?.id}
                          mainType={pokemonInputObject?.data?.types[0]?.type.name}
                          secondType={pokemonInputObject?.data?.types[1]?.type.name}
                          typesLength={pokemonInputObject?.data?.types.length}
                          image={pokemonInputObject?.data?.sprites.other['official-artwork'].front_default}
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
                            id={pokemonInputObject?.data ? pokemonInputObject.data.id : 0}
                            height={pokemonInputObject?.data ? pokemonInputObject.data.height : 0}
                            weight={pokemonInputObject?.data ? pokemonInputObject.data.weight : 0}
                            baseExp={pokemonInputObject?.data ? pokemonInputObject.data.base_experience : 0}
                            mainType={
                              pokemonInputObject?.data ? pokemonInputObject.data.types[0].type.name : 'null'
                            }
                            abilities={pokemonInputObject?.data ? pokemonInputObject.data.abilities : null}
                          />
                        </div>
                      ) : stats ? (
                        <div className='bg-background-color h-full rounded-t-4xl p-8'>
                          <PokemonStatsSheet
                            name={pokemonInputObject?.data ? pokemonInputObject.data.name : 'null'}
                            mainType={
                              pokemonInputObject?.data ? pokemonInputObject.data.types[0].type.name : 'null'
                            }
                            hp={pokemonInputObject?.data ? pokemonInputObject.data.stats[0].base_stat : 0}
                            attack={pokemonInputObject?.data ? pokemonInputObject.data.stats[1].base_stat : 0}
                            defense={
                              pokemonInputObject?.data ? pokemonInputObject.data.stats[2].base_stat : 0
                            }
                            spAttack={
                              pokemonInputObject?.data ? pokemonInputObject.data.stats[3].base_stat : 0
                            }
                            spDefense={
                              pokemonInputObject?.data ? pokemonInputObject.data.stats[4].base_stat : 0
                            }
                            speed={pokemonInputObject?.data ? pokemonInputObject.data.stats[5].base_stat : 0}
                          />
                        </div>
                      ) : (
                        <Suspense fallback={<PokemonEvoFallback />}>
                          <div className='bg-background-color h-full rounded-t-4xl p-8'>
                            <h2
                              className={`font-medium text-xl mb-2 
                              ${textColorTernary(pokemonInputObject?.data ? pokemonInputObject.data.types[0].type.name : 'null')}`}
                            >
                              Evolution Chain
                            </h2>
                            <Suspense fallback={<PokemonEvoFallback />}>
                              <PokemonEvolutionsSheet
                                id={pokemonInputObject?.data ? pokemonInputObject?.data.id : 0}
                              />
                            </Suspense>
                        </div>
                        </Suspense>
                      )}
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            )}
          </div>

          {/* ------ Main Part of the App ------*/}

          <div className='grid min-[700px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {pokemonsDefault?.map((pokemon) => (
              <Sheet key={pokemon.data.id}>
                <SheetTrigger asChild onClick={aboutClicked}>
                  <div>
                    <Suspense fallback={<PokemonCardFallback />}>
                    <PokemonCard
                      name={pokemon.data.name}
                      id={pokemon.data.id}
                      mainType={pokemon.data.types[0]?.type.name}
                      secondType={pokemon.data.types[1]?.type.name}
                      typesLength={pokemon.data.types.length}
                      image={pokemon.data.sprites.other['official-artwork'].front_default}
                    />
                    </Suspense>
                  </div>
                </SheetTrigger>

                <SheetContent
                  className={`p-0 m-0 border-none overflow-y-auto bg-background-type-${pokemon.data.types[0].type.name}`}
                >
                  <div>
                    <PokemonHeaderSheet
                      name={pokemon.data.name}
                      id={pokemon.data.id}
                      mainType={pokemon.data.types[0]?.type.name}
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
                    <Suspense fallback={<PokemonEvoFallback />}>
                      <div className='bg-background-color h-full rounded-t-4xl p-8'>
                        <h2
                          className={`font-medium text-xl mb-2 
                          ${textColorTernary(pokemonInputObject?.data ? pokemonInputObject.data.types[0].type.name : 'null')}`}
                        >
                          Evolution Chain
                        </h2>
                        <Suspense fallback={<PokemonEvoFallback />}>
                        <PokemonEvolutionsSheet id={pokemon.data.id} />
                        </Suspense>
                      </div>
                    </Suspense>
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
