

export interface pokemonType {
  abilities: [];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dreamWorld: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      ['official-artwork']: {
        front_default: string;
        front_shiny: string | null;
      };
      showdown: {
        back_default: string;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    versions: object;
  };
  stats: [];
  types: [{
    0: {
      slot: number,
      type: {
        name: string,
        url: string
      }
    },
    1?: {
      slot: number,
      type: {
        name: string,
        url: string
      }
    }
  }];
  weight: number;
}

export interface pokemonDefaultType {
  config: object,
  data: pokemonType,
  headers: object,
  request: object,
  status: number,
  statusText: string
}

export type pokemonsObject = Record<number, pokemonDefaultType | undefined>

export interface PokemonCardProps {
  name: string;
  id: number;
  mainType: string;
  secondType: string;
  typesLength: number;
  image: string;
}
