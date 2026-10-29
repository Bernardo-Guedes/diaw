import type { Pokemon, Trainer } from '../types'
import PokemonImage from './PokemonImage'

interface Props {
  trainer: Trainer
  team: Pokemon[]
  onOpenPokemon: (id: number) => void
}

export default function TrainerCard({ trainer, team, onOpenPokemon }: Props) {
  const slots = Math.max(8, trainer.badges)

  return (
    <article className="grid content-start gap-3 rounded-[18px] border border-line bg-surface p-[18px] shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-x-3.5 gap-y-2">
        <h2 className="font-display text-2xl leading-[1.1] font-extrabold tracking-[-0.01em]">
          {trainer.name}
        </h2>
        <div className="grid justify-items-end gap-1">
          <div className="flex gap-1" aria-hidden="true">
            {Array.from({ length: slots }, (_, i) => (
              <span
                key={i}
                className={`size-[11px] rounded-full border-[1.5px] ${
                  i < trainer.badges ? 'border-accent bg-accent' : 'border-line bg-surface-2'
                }`}
              />
            ))}
          </div>
          <span className="text-[0.82rem] font-semibold text-ink-soft">
            {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
          </span>
        </div>
      </header>

      <h3 className="text-[0.9rem] font-semibold text-ink-soft">Pokémon ({team.length})</h3>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-2">
        {team.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className="grid w-full justify-items-center gap-0.5 rounded-xl border border-line bg-surface-2 px-1 pt-2 pb-1.5 text-[0.82rem] font-semibold transition-colors hover:border-ink-soft hover:bg-surface"
              onClick={() => onOpenPokemon(p.id)}
            >
              <PokemonImage id={p.id} name={p.name} className="size-14 object-contain" />
              <span>{p.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
