interface NameAPIResource {
  name: string;
  url: string;
}

interface pokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface typesType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface dataPokemonDefaultType {
  abilities: abilityType[];
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
  stats: pokemonStats[];
  types: typesType[];
  weight: number;
}

export interface pokemonDefaultType {
  config: object;
  data: dataPokemonDefaultType;
  headers: object;
  request?: XMLHttpRequest;
  status: number;
  statusText: string;
}

export type pokemonsObject = Record<number, pokemonDefaultType | undefined>;

export interface PokemonCardProps {
  name: string;
  id: number;
  mainType: string;
  secondType: string;
  typesLength: number;
  image: string;
}

export interface flavorTextProps {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface PokemonSheetProps {
  name: string;
  id: number;
  mainType: string;
  secondType: string;
  typesLength: number;
  image: string;
  //hp: Record<number, pokemonStats>,
  //attack: Record<number, pokemonStats>,
  //defense: Record<number, pokemonStats>,
  //spAttack: Record<number, pokemonStats>,
  //spDefense: Record<number, pokemonStats>,
  //speed: Record<number, pokemonStats>,
}

export interface dataSpeciesType {
  base_happiness: number;
  capture_rate: number;
  color: object;
  egg_groups: NameAPIResource[];
  evolution_chain: { url: string };
  evolves_from_species: object;
  flavor_text_entries: flavorTextProps[];
  form_descriptions: [];
  forms_switchable: boolean;
  gender_rate: number;
  genera: [];
  generation: object;
  growth_rate: {
    name: string;
    url: string;
  };
  habitat: object;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: [];
  order: number;
  pal_park_encounters: [];
  pokedex_number: [];
  shape: object;
  varieties: [];
}

export interface PokemonSpeciesType {
  config: object;
  data: dataSpeciesType;
  headers: object;
  request?: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface PokemonStatsSheetType {
  name: string;
  mainType: string;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

export interface PokemonAboutSheetType {
  height: number;
  weight: number;
  captureRate?: number;
  baseHappiness?: number;
  baseExp: number;
  growthRate?: string;
  id: number;
  mainType: string;
  abilities: abilityType[];
}

export interface PokemonEvoDataType {
  id: number;
  baby_trigger_item: null;
  chain: {
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
    evolution_details: object | null;
    evolves_to: {
      is_baby: boolean;
      species: {
        name: string;
        url: string;
      };
      evolution_details: object;
      evolves_to: [];
    }[];
  };
}

export interface PokemonEvoType {
  config: object;
  data: PokemonEvoDataType;
  headers: object;
  request?: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface PokemonEvoSheetType {
  id: number;
  mainType: string;
}

export interface abilityType {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface damageRelationsType {
  name: string;
  url: string;
}

interface pokemonType {
  pokemon: {
    name: string;
    url: string;
  };
}

interface colorObject {
  name: string,
  url: string
}

interface pokemonTypesData {
  damage_relations: {
    double_damage_from: damageRelationsType[];
    double_damage_to: damageRelationsType[];
    half_damage_from: damageRelationsType[];
    half_damage_to: damageRelationsType[];
    no_damage_from: damageRelationsType[];
    no_damage_to: damageRelationsType[];
  };
  game_indices: object[];
  generation: object;
  id: number;
  move_damage_class: object[];
  name: string;
  names: object[];
  past_damage_relations: [];
  pokemon: pokemonType[];
}

export interface PokemonTypesType {
  config: object;
  data: pokemonTypesData;
  headers: object;
  request?: XMLHttpRequest;
  status: number;
  statusText: string;
}

interface PokemonColorData {
  id: number;
  name: string;
  names: [];
  pokemon_species: colorObject[];
}

export interface PokemonColorType {
  config: object;
  data: PokemonColorData;
  headers: object;
  request?: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface pokemonStringUrl {
  name: string,
  url: string
}

export interface pokemonInputType {
  count: number,
  next: null | boolean,
  previous: null | boolean,
  results: pokemonStringUrl[]
}
