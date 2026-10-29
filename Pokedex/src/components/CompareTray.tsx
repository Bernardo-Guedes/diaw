import type { Pokemon } from '../types'
import Button from './Button'
import PokemonImage from './PokemonImage'

interface Props {
  selected: Pokemon[]
  onRemove: (id: number) => void
  onClear: () => void
  onCompare: () => void
}

export default function CompareTray({ selected, onRemove, onClear, onCompare }: Props) {
  if (selected.length === 0) return null

  return (
    <aside
      className="fixed bottom-4 left-1/2 z-30 flex w-[min(640px,calc(100%-24px))] -translate-x-1/2 animate-rise flex-col gap-2 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-[0_10px_34px_rgba(0,0,0,0.25)] min-[520px]:flex-row min-[520px]:items-center min-[520px]:gap-3.5"
      aria-label="Comparação de Pokémon"
    >
      <ul className="flex min-w-0 flex-1 gap-2">
        {[0, 1].map((slot) => {
          const p: Pokemon | undefined = selected[slot]
          return (
            <li
              key={slot}
              className={`relative flex min-h-12 min-w-0 flex-1 items-center rounded-[10px] ${
                p
                  ? 'gap-2 bg-surface-2 py-1 pr-[30px] pl-1.5'
                  : 'justify-center border-[1.5px] border-dashed border-line px-2.5 py-1'
              }`}
            >
              {p ? (
                <>
                  <PokemonImage id={p.id} name={p.name} className="size-10 flex-none object-contain" />
                  <span className="truncate text-[0.92rem] font-semibold">{p.name}</span>
                  <button
                    type="button"
                    className="absolute top-1/2 right-1 size-6 -translate-y-1/2 rounded-full text-[1.15rem] leading-none hover:bg-line"
                    onClick={() => onRemove(p.id)}
                    aria-label={`Remover ${p.name} da comparação`}
                  >
                    ×
                  </button>
                </>
              ) : (
                <span className="text-[0.82rem] text-ink-soft">Escolha mais um</span>
              )}
            </li>
          )
        })}
      </ul>
      <div className="flex gap-1.5 max-[520px]:justify-end">
        <Button variant="ghost" onClick={onClear}>
          Limpar
        </Button>
        <Button variant="primary" disabled={selected.length < 2} onClick={onCompare}>
          Comparar
        </Button>
      </div>
    </aside>
  )
}
