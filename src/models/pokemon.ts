// Update the 'Pokemon.ts' file

export interface Ability {
  ability: {
    name: string;
  };
}

export interface Sprite {
  other: {
    home: {
      front_default: string;
    };
  };
}

export interface Type {
  type: {
    name: string;
  };
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  abilities: Ability[];
  name: string;
  sprites: Sprite;
  types: Type[];
  stats: Stat[];
  weight: number;
}
