import { PokemonEvoSheetType } from '@/types/types';

export const PokemonEvolutionsSheet: React.FC<PokemonEvoSheetType> = ({ PokemonEvo, id }) => {
  //console.log(pokemonEvo[0].data.chain.evolves_to[0].evolves_to[0].species.name)
  let evo1 = []
  let evo2 = []
  let evo3 = []
  let evo4 = []
  let evo5 = []
  let evo6 = []
  let evo7 = []
  let evo8 = []
  let evo9 = []

  const EvoFilter = () => {
    let evoChain = [];
    let evoData = PokemonEvo[id].data.chain;
    let evoDataNested = PokemonEvo[id].data.chain.evolves_to[0].species.name

    do {
      const numberOfEvolutions = evoData.evolves_to.length;

      evoChain.push({
        speciesName: evoData.evolves_to[0].species.name,
        speciesUrl: evoData.evolves_to[0].species.url
      });
      // pokemonEvo[0].data.chain.evolves_to[0].species.name
      if (numberOfEvolutions > 1) {
        for (let i = 1; i < numberOfEvolutions; i++) {
          evoChain.push({
            speciesName: evoData.evolves_to[i].species.name,
            speciesUrl: evoData.evolves_to[i].species.url
          });
        }
      }

      evoData = evoData.evolves_to[0];
    } while (evoData.hasOwnProperty('evolves_to') && evoData != undefined);

    return evoChain;
  };

  return <h2 className='font-medium text-xl mb-2'>Evolution Chain</h2>;
};
