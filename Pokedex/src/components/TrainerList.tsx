import type { Pokemon, Trainer } from '../types'
import TrainerCard from './TrainerCard'

interface Props {
  trainers: Trainer[]
  pokemonById: Map<number, Pokemon>
  onOpenPokemon: (id: number) => void
}

export default function TrainerList({ trainers, pokemonById, onOpenPokemon }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-4">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          team={trainer.pokemonIds
            .map((id) => pokemonById.get(id))
            .filter((p): p is Pokemon => p !== undefined)}
          onOpenPokemon={onOpenPokemon}
        />
      ))}
    </div>
  )
}
