import type { CSSVars, PokemonType } from '../types'
import { getTypeColor } from '../utils/typeColors'

interface Props {
  types: PokemonType[]
  selected: string
  onSelect: (type: string) => void
}

const CHIP =
  'inline-flex flex-none items-center gap-[7px] rounded-full border-[1.5px] px-[13px] py-1.5 text-[0.9rem] font-semibold transition-colors'

export default function TypeFilter({ types, selected, onSelect }: Props) {
  return (
    <div
      className="-mx-3.5 flex gap-2 overflow-x-auto px-3.5 pb-1.5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      role="group"
      aria-label="Filtrar por tipo"
    >
      <button
        type="button"
        className={`${CHIP} ${
          selected === '' ? 'border-ink bg-ink text-bg' : 'border-line bg-surface hover:border-ink-soft'
        }`}
        aria-pressed={selected === ''}
        onClick={() => onSelect('')}
      >
        Todos
      </button>

      {types.map((type) => {
        const active = selected === type.name
        return (
          <button
            key={type.id}
            type="button"
            className={`${CHIP} hover:border-(--chip-color) ${
              active
                ? 'border-(--chip-color) bg-[color-mix(in_srgb,var(--chip-color)_18%,var(--surface))]'
                : 'border-line bg-surface'
            }`}
            style={{ '--chip-color': getTypeColor(type.name) } as CSSVars}
            aria-pressed={active}
            onClick={() => onSelect(active ? '' : type.name)}
          >
            <span className="size-2.5 rounded-full bg-(--chip-color)" aria-hidden="true" />
            {type.name}
          </button>
        )
      })}
    </div>
  )
}
