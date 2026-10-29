import type { CSSProperties } from 'react'

export type StatKey =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'

export type Stats = Record<StatKey, number>

export interface PokemonType {
  id: number
  name: string
}

export interface Pokemon {
  id: number
  name: string
  stats: Stats
  types: PokemonType[]
}

export interface Trainer {
  id: number
  name: string
  badges: number
  pokemonIds: number[]
}

// Formato do arquivo src/data/pokedex-data.json
export interface PokedexData {
  types: PokemonType[]
  pokemon: Pokemon[]
  trainers: Trainer[]
}

export type View = 'pokedex' | 'trainers'
export type Theme = 'light' | 'dark'
export type SortKey = 'id' | 'name' | StatKey

export interface FilterOptions {
  query: string
  type: string
  onlyFavorites: boolean
  favorites: number[]
}

// Permite passar variáveis CSS (ex.: --tc) no atributo style
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>
