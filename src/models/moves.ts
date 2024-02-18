export interface ColumnData {
  dataKey: keyof Move;
  label: string;
  numeric?: boolean;
  width: number;
}

export interface Damage {
  name: string;
}

export interface Effect {
  effect: string;
}

export interface Type {
  name: string;
}

export interface MovesUrl {
  name: string;
  url: string;
}

export interface Colors {
  [key: string]: string;
}

export interface Move {
  id: number;
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  damage_class: Damage;
  type: Type;
  effect_entries: Effect[];
  effect_chance: number | null;
}
