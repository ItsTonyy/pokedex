import { PokemonEvoSheetType } from '@/types/types';
import { PokemonEvoType } from '@/types/types';
import { pokemonDefaultType } from '@/types/types';
import { PokemonSpeciesType } from '@/types/types';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { CircleArrowRight } from 'lucide-react';

const PokemonEvolutionsSheet: React.FC<PokemonEvoSheetType> = ({ id }) => {
  const [pokemonEvo, setPokemonEvo] = useState<PokemonEvoType[]>([]);
  const [pokemonSprites, setPokemonSprites] = useState<string[]>([]);

  useEffect(() => {
    PokemonsEvoObject();
    getPokemonsImage(evolutionsObject);
  }, []);

  interface evolutionObjectType {
    speciesName: string;
    speciesUrl: string;
  }

  const PokemonsEvoObject = useCallback(async () => {
    const speciesUrls: string[] = [];
    let speciesObject: PokemonSpeciesType[] = [];
    const endpoints = [];

    speciesUrls.push(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchSpeciesObject = await axios
      .all(speciesUrls.map((speciesUrl) => axios.get(speciesUrl)))
      .then((res) => (speciesObject = res));

    endpoints.push(speciesObject[id].data.evolution_chain.url);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchEndpointsUrls = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemonEvo(res));
  }, [id])

  const getNestedEvolutions = (pokemonEvo: PokemonEvoType[]) => {
    const evoChain = [];
    let evoData = pokemonEvo[id - 1].data.chain;

    do {
      evoChain.push({
        speciesName: evoData.species.name,
        speciesUrl: evoData.species.url,
      });

      evoData = evoData['evolves_to'][0];
    } while (!!evoData && Object.prototype.hasOwnProperty.call(evoData, 'evolves_to'));

    return evoChain;
  };

  const evolutionsObject = getNestedEvolutions(pokemonEvo);

  const getPokemonsImage = async (evolutionsObject: evolutionObjectType[]): Promise<string[]> => {
    const endpoints = [];
    let pokemonDefaultLikeObject: pokemonDefaultType[] = [];
    let pokemonSpritesUrl: string[] = [];

    const pokemonName = evolutionsObject[id].speciesName;
    endpoints.push(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const fetchEndpointToGetImages: Promise<string[]> = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        pokemonDefaultLikeObject = res;
        pokemonSpritesUrl = pokemonDefaultLikeObject.map((pokemon) => pokemon.data.sprites.front_default);
        setPokemonSprites(pokemonSpritesUrl);
      })
      .catch((error) => {
        throw new Error(`Error fetching pokemon data: ${error}`)
      });

    return fetchEndpointToGetImages;
  };

  return (
    <div>
      <h2 className='font-medium text-xl mb-2'>Evolution Chain</h2>
      <div className='mt-2 flex flex-row w-full justify-center'>
        {pokemonSprites.length > 1
          ? pokemonSprites.map((imageUrl, index) => {
              const name = evolutionsObject[index].speciesName;
              return (
                <div key={imageUrl} className='flex justify-center items-center w-auto h-auto'>
                  {index === pokemonSprites.length - 1 ? (
                    <div className='flex flex-col items-center'>
                      <img
                        src={imageUrl}
                        alt='PokemonSprite'
                        className='w-[138px] h-full hover:scale-110 duration-500 ease-in-out'
                      />

                      <span className='font-light text-sm'>{name}</span>
                    </div>
                  ) : (
                    <>
                      <div className='flex flex-col items-center'>
                        <img
                          src={imageUrl}
                          alt='PokemonSprite'
                          className='w-[138px] h-full hover:scale-110 duration-500 ease-in-out'
                        />

                        <span className='font-light text-sm'>{name}</span>
                      </div>

                      <CircleArrowRight />
                    </>
                  )}
                </div>
              );
            })
          : pokemonSprites.map((imageUrl) => {
              return (
                <div>
                  <img src={imageUrl} alt='PokemonSprite' />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PokemonEvolutionsSheet;
