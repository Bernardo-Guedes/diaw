import type { CSSVars, Pokemon, Trainer } from '../types'
import { STAT_LABELS, formatId, totalStats } from '../utils/helpers'
import { getTypeColor } from '../utils/typeColors'
import Button from './Button'
import Modal from './Modal'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'

interface Props {
  pokemon: Pokemon
  trainers: Trainer[]
  isFavorite: boolean
  isComparing: boolean
  hasPrev: boolean
  hasNext: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onToggleFavorite: (id: number) => void
  onToggleCompare: (id: number) => void
}

export default function PokemonDetails({
  pokemon,
  trainers,
  isFavorite,
  isComparing,
  hasPrev,
  hasNext,
  onClose,
  onPrev,
  onNext,
  onToggleFavorite,
  onToggleCompare,
}: Props) {
  const color = getTypeColor(pokemon.types[0]?.name)
  const owners = trainers.filter((t) => t.pokemonIds.includes(pokemon.id))

  return (
    <Modal title={`Detalhes de ${pokemon.name}`} onClose={onClose}>
      <div className="grid md:grid-cols-[5fr_6fr]" style={{ '--tc': color } as CSSVars}>
        <div className="relative grid content-center justify-items-center gap-3 bg-type-glow [--glow-y:45%] px-4 pt-[52px] pb-4 md:px-5 md:py-6">
          <span className="absolute top-3.5 left-5 font-display text-[2rem] font-extrabold tracking-[-0.02em] text-type-tint opacity-40 md:text-[2.6rem]">
            {formatId(pokemon.id)}
          </span>
          <PokemonImage
            id={pokemon.id}
            name={pokemon.name}
            className="aspect-square w-[min(100%,220px)] object-contain drop-shadow-[0_12px_12px_rgba(0,0,0,0.22)] md:w-[min(100%,300px)]"
          />
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onPrev} disabled={!hasPrev}>
              ‹ Anterior
            </Button>
            <Button variant="ghost" onClick={onNext} disabled={!hasNext}>
              Próximo ›
            </Button>
          </div>
        </div>

        <div className="grid content-start gap-4 px-[18px] pt-5 pb-[22px] md:px-7 md:pt-7 md:pb-6">
          <h2 className="pr-10 font-display text-[1.8rem] leading-none font-extrabold tracking-[-0.02em] md:text-[2.2rem]">
            {pokemon.name}
          </h2>
          <div className="flex gap-2">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>

          <div className="grid gap-2.5">
            {STAT_LABELS.map(({ key, label }) => (
              <StatBar key={key} label={label} value={pokemon.stats[key]} color={color} />
            ))}
            <p className="mt-0.5 border-t border-line pt-2.5 text-[0.92rem] text-ink-soft">
              Total base <strong className="ml-1.5 text-[1.1rem] text-ink">{totalStats(pokemon)}</strong>
            </p>
          </div>

          <div>
            <h3 className="mb-1.5 font-display text-base font-bold">Treinadores</h3>
            {owners.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {owners.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-full border border-line bg-surface-2 px-[11px] py-[3px] text-[0.88rem] font-semibold"
                  >
                    {t.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink-soft">Nenhum treinador da lista tem este Pokémon.</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button
              variant={isFavorite ? 'primary' : 'outline'}
              aria-pressed={isFavorite}
              onClick={() => onToggleFavorite(pokemon.id)}
            >
              {isFavorite ? '★ Favorito' : '☆ Favoritar'}
            </Button>
            <Button
              variant={isComparing ? 'primary' : 'outline'}
              aria-pressed={isComparing}
              onClick={() => onToggleCompare(pokemon.id)}
            >
              {isComparing ? '⇄ Na comparação' : '⇄ Comparar'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
