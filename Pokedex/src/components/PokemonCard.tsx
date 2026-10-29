import type { CSSVars, Pokemon } from '../types'
import { STAT_LABELS, formatId } from '../utils/helpers'
import { getTypeColor } from '../utils/typeColors'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'

interface Props {
  pokemon: Pokemon
  isFavorite: boolean
  isComparing: boolean
  onOpen: (id: number) => void
  onToggleFavorite: (id: number) => void
  onToggleCompare: (id: number) => void
}

const ICON_BTN =
  'size-[34px] rounded-full border-[1.5px] text-base leading-none backdrop-blur-xs transition-colors'

export default function PokemonCard({
  pokemon,
  isFavorite,
  isComparing,
  onOpen,
  onToggleFavorite,
  onToggleCompare,
}: Props) {
  const primaryColor = getTypeColor(pokemon.types[0]?.name)

  return (
    <article
      className="group relative overflow-hidden rounded-[18px] border border-line bg-surface shadow-card transition duration-200 hover:-translate-y-[3px] hover:border-(--tc)"
      style={{ '--tc': primaryColor } as CSSVars}
    >
      <button
        type="button"
        className="block w-full p-0 text-left"
        onClick={() => onOpen(pokemon.id)}
        aria-label={`Ver detalhes de ${pokemon.name}`}
      >
        <div className="relative grid aspect-[5/4] place-items-center bg-type-glow [--glow-y:62%]">
          <span className="absolute top-2 left-3.5 font-display text-[1.4rem] font-extrabold tracking-[-0.02em] text-type-tint opacity-40 min-[480px]:text-[2rem]">
            {formatId(pokemon.id)}
          </span>
          <PokemonImage
            id={pokemon.id}
            name={pokemon.name}
            className="h-[82%] w-[72%] object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.18)] transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        <div className="grid gap-2.5 px-3.5 pt-3.5 pb-4">
          <h2 className="font-display text-[1.05rem] leading-[1.1] font-extrabold tracking-[-0.01em] min-[480px]:text-[1.3rem]">
            {pokemon.name}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>

          <dl className="mt-0.5 grid grid-cols-3 gap-1.5">
            {STAT_LABELS.map(({ key, short }) => (
              <div key={key} className="rounded-lg bg-surface-2 px-1 py-1.5 text-center">
                <dt className="text-[0.64rem] whitespace-nowrap text-ink-soft min-[480px]:text-[0.7rem]">
                  {short}
                </dt>
                <dd className="font-bold tabular-nums">{pokemon.stats[key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </button>

      <div className="absolute top-2.5 right-2.5 flex gap-1.5">
        <button
          type="button"
          className={`${ICON_BTN} ${
            isFavorite
              ? 'border-accent bg-accent text-accent-ink'
              : 'border-line bg-surface/90 hover:border-ink-soft'
          }`}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remover ${pokemon.name} dos favoritos` : `Favoritar ${pokemon.name}`}
          title={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
          onClick={() => onToggleFavorite(pokemon.id)}
        >
          {isFavorite ? '★' : '☆'}
        </button>
        <button
          type="button"
          className={`${ICON_BTN} ${
            isComparing
              ? 'border-accent bg-accent text-accent-ink'
              : 'border-line bg-surface/90 hover:border-ink-soft'
          }`}
          aria-pressed={isComparing}
          aria-label={isComparing ? `Tirar ${pokemon.name} da comparação` : `Comparar ${pokemon.name}`}
          title={isComparing ? 'Tirar da comparação' : 'Comparar'}
          onClick={() => onToggleCompare(pokemon.id)}
        >
          ⇄
        </button>
      </div>
    </article>
  )
}
