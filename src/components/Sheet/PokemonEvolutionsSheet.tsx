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

  const PokemonsEvoObject = useCallback(async () => {
    const speciesUrls: string[] = [];
    let speciesObject: PokemonSpeciesType[] = [];
    const endpoint = [];

    speciesUrls.push(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchSpeciesObject = await axios
      .all(speciesUrls.map((speciesUrl) => axios.get(speciesUrl)))
      .then((res) => (speciesObject = res));

    endpoint.push(speciesObject[0].data.evolution_chain.url);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchEndpointsUrls = await axios.get(endpoint[0]).then((res) => setPokemonEvo([res.data]));
  }, [id]);

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

  const getPokemonsImage = useCallback(async (evolutionsObject: evolutionObjectType[]): Promise<string[]> => {
    const endpoints = [];
    let pokemonSpritesUrl: string[] = [];

    for (let i = 0; i < evolutionsObject?.length; i++) {
      const pokemonName = evolutionsObject[i]?.speciesName;
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    }
    // O problema está aqui embaixo
    const fetchEndpointToGetImages = await axios
      .all(endpoints?.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        pokemonSpritesUrl = res.map((pokemon) => pokemon.data.sprites.front_default);
        setPokemonSprites(pokemonSpritesUrl);
        return;
      })
      .catch((error) => {
        console.log(`Error fetching pokemon data: ${error}`);
        return;
      });
    return fetchEndpointToGetImages;
  }, []);

  const textColorTernary =
    mainType === 'grass'
      ? 'text-type-grass'
      : mainType === 'dark'
      ? 'text-type-dark'
      : mainType === 'dragon'
      ? 'text-type-dragon'
      : mainType === 'fairy'
      ? 'text-type-fairy'
      : mainType === 'fighting'
      ? 'text-type-fighting'
      : mainType === 'fire'
      ? 'text-type-fire'
      : mainType === 'ghost'
      ? 'text-type-ghost'
      : mainType === 'bug'
      ? 'text-type-bug'
      : mainType === 'ground'
      ? 'text-type-ground'
      : mainType === 'normal'
      ? 'text-type-normal'
      : mainType === 'poison'
      ? 'text-type-poison'
      : mainType === 'psychic'
      ? 'text-type-psychic'
      : mainType === 'steel'
      ? 'text-type-steel'
      : mainType === 'water'
      ? 'text-type-water'
      : mainType === 'electric'
      ? 'text-type-electric'
      : mainType === 'flying'
      ? 'text-type-flying'
      : mainType === 'ice'
      ? 'text-type-ice'
      : 'text-type-rock';

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

                      <CircleArrowRight className='max-w-max max-h-max'/>
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
