import { PokemonEvoSheetType } from '@/types/types';
import { PokemonEvoDataType } from '@/types/types';
import { PokemonSpeciesType } from '@/types/types';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { CircleArrowRight } from 'lucide-react';

const PokemonEvolutionsSheet: React.FC<PokemonEvoSheetType> = ({ id, mainType }) => {
  const [pokemonEvo, setPokemonEvo] = useState<PokemonEvoDataType[]>([]);
  const [pokemonSprites, setPokemonSprites] = useState<string[]>([]);

  useEffect(() => {
    PokemonsEvoObject();
  }, []);

  useEffect(() => {
    getPokemonsImage(evolutionsObject);
  }, [pokemonEvo]);

  interface evolutionObjectType {
    speciesName: string;
    speciesUrl: string;
  }

  const PokemonsEvoObject = async () => {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    try {
      const speciesObject: PokemonSpeciesType = await axios.get(speciesUrl);
      const endpoint = speciesObject.data.evolution_chain.url;

      const fetchEndpointsUrls = await axios.get(endpoint);
      setPokemonEvo([fetchEndpointsUrls.data]);
    } catch (error) {
      console.log('Error fetching pokemonEvoObject: ', error);
    }
  };

  const getNestedEvolutions = (pokemonEvo: PokemonEvoDataType[]) => {
    const evoChain = [];
    let evoData = pokemonEvo[0]?.chain;

    do {
      evoChain.push({
        speciesName: evoData?.species.name,
        speciesUrl: evoData?.species.url,
      });

      evoData = evoData?.evolves_to[0];
    } while (!!evoData && Object.prototype.hasOwnProperty.call(evoData, 'evolves_to'));

    return evoChain;
  };

  const evolutionsObject = getNestedEvolutions(pokemonEvo);

  const getPokemonsImage = async (evolutionsObject: evolutionObjectType[]) => {
    const endpoints = [];
    let pokemonSpritesUrl: string[] = [];

    for (let i = 0; i < evolutionsObject?.length; i++) {
      const pokemonName = evolutionsObject[i]?.speciesName;
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    }

    const fetchEndpointToGetImages = await axios
      .all(endpoints?.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        pokemonSpritesUrl = res.map((pokemon) => pokemon.data.sprites.front_default);
        setPokemonSprites(pokemonSpritesUrl);
      })
      .catch((error) => {
        console.log(`Error fetching pokemon data: ${error}`);
      });
    return fetchEndpointToGetImages;
  };

  const textColorTernary =
    mainType === 'grass'
      ? 'text-background-light-type-grass'
      : mainType === 'dark'
      ? 'text-background-light-type-dark'
      : mainType === 'dragon'
      ? 'text-background-light-type-dragon'
      : mainType === 'fairy'
      ? 'text-background-light-type-fairy'
      : mainType === 'fighting'
      ? 'text-background-light-type-fighting'
      : mainType === 'fire'
      ? 'text-background-light-type-fire'
      : mainType === 'ghost'
      ? 'text-background-light-type-ghost'
      : mainType === 'bug'
      ? 'text-background-light-type-bug'
      : mainType === 'ground'
      ? 'text-background-light-type-ground'
      : mainType === 'normal'
      ? 'text-background-light-type-normal'
      : mainType === 'poison'
      ? 'text-background-light-type-poison'
      : mainType === 'psychic'
      ? 'text-background-light-type-psychic'
      : mainType === 'steel'
      ? 'text-background-light-type-steel'
      : mainType === 'water'
      ? 'text-background-light-type-water'
      : mainType === 'electric'
      ? 'text-background-light-type-electric'
      : mainType === 'flying'
      ? 'text-background-light-type-flying'
      : mainType === 'ice'
      ? 'text-background-light-type-ice'
      : 'text-background-light-type-rock';

  return (
    <div>
      <h2 className={`font-medium text-xl mb-2 ${textColorTernary}`}>Evolution Chain</h2>
      <div className='mt-2 flex flex-row w-full justify-center'>
        {pokemonSprites?.length > 1
          ? pokemonSprites?.map((imageUrl, index) => {
              const name = evolutionsObject[index].speciesName;
              return (
                <div key={imageUrl} className='flex justify-center items-center w-[35%] h-auto'>
                  {index === pokemonSprites.length - 1 ? (
                    <div className='flex flex-col items-center'>
                      <img
                        src={imageUrl}
                        alt='PokemonSprite'
                        className='w-[100px] h-full hover:scale-110 duration-500 ease-in-out max-w-max max-h-max'
                      />

                      <span className='font-light text-sm'>{name}</span>
                    </div>
                  ) : (
                    <>
                      <div className='flex flex-col items-center'>
                        <img
                          src={imageUrl}
                          alt='PokemonSprite'
                          className='w-[138px] h-full hover:scale-110 duration-500 ease-in-out max-w-max max-h-max'
                        />

                        <span className='font-light text-sm'>{name}</span>
                      </div>

                      <CircleArrowRight className='max-w-max max-h-max' />
                    </>
                  )}
                </div>
              );
            })
          : pokemonSprites?.map((imageUrl) => {
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
