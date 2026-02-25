export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface Pokemon {
  id: number;
  name: string;
  image?: string | null;
  type?: string;
  types?: string[];
  stats?: PokemonStat[];
  height?: number;
  weight?: number;
  abilities?: any[];
}

export interface ApiListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

