import { PokemonEvoSheetType } from '@/types/types';
import { PokemonEvoType } from '@/types/types';
import { pokemonDefaultType } from '@/types/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CircleArrowDown  } from 'lucide-react';

const PokemonEvolutionsSheet: React.FC<PokemonEvoSheetType> = ({ PokemonEvo, id }) => {
  const [pokemonSprites, setPokemonSprites] = useState<string[]>([]);

  useEffect(() => {
    getPokemonsImage(evolutionsObject);
  }, []);

  interface evolutionObjectType {
    speciesName: string;
    speciesUrl: string;
  }

  function getNestedEvolutions(PokemonEvo: PokemonEvoType[]) {
    const evoChain = [];
    let evoData = PokemonEvo[id - 1].data.chain;

    do {
      evoChain.push({
        speciesName: evoData.species.name,
        speciesUrl: evoData.species.url,
      });

      evoData = evoData['evolves_to'][0];
    } while (!!evoData && Object.prototype.hasOwnProperty.call(evoData, 'evolves_to'));

    return evoChain;
  }

  const evolutionsObject = getNestedEvolutions(PokemonEvo);

  const getPokemonsImage = async (evolutionsObject: evolutionObjectType[]): Promise<string[]> => {
    const endpoints = [];
    let pokemonDefaultLikeObject: pokemonDefaultType[] = [];
    let pokemonSpritesUrl: string[] = [];

    for (let i = 0; i < evolutionsObject.length; i++) {
      const pokemonName = evolutionsObject[i].speciesName;
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const fetchEndpointToGetImages: string[] = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        pokemonDefaultLikeObject = res;
        pokemonSpritesUrl = pokemonDefaultLikeObject.map((pokemon) => pokemon.data.sprites.front_default);
        setPokemonSprites(pokemonSpritesUrl);
      })
      .catch((error) => {
        console.log('Error fetching pokemon data: ', error);
        return [];
      });

    return fetchEndpointToGetImages;
  };

  return (
    <div>
      <h2 className='font-medium text-xl mb-2'>Evolution Chain</h2>
      <div className='mt-2'>
        {pokemonSprites.length > 1
          ? pokemonSprites.map((imageUrl) => {
              return (
                <div key={imageUrl} className='flex justify-center items-center flex-col space-y-3'>
                  <img src={imageUrl} alt='PokemonSprite' className='w-24 last:hidden'/>
                  <CircleArrowDown  />
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
