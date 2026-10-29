import type { Pokemon } from '../types'
import PokemonCard from './PokemonCard'

interface Props {
  pokemon: Pokemon[]
  favorites: number[]
  compareIds: number[]
  onOpen: (id: number) => void
  onToggleFavorite: (id: number) => void
  onToggleCompare: (id: number) => void
}

export default function PokemonList({
  pokemon,
  favorites,
  compareIds,
  onOpen,
  onToggleFavorite,
  onToggleCompare,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] min-[480px]:gap-4">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favorites.includes(p.id)}
          isComparing={compareIds.includes(p.id)}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  )
}
