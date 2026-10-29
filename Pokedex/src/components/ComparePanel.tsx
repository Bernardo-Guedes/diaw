import type { CSSVars, Pokemon } from '../types'
import { STAT_LABELS, formatId, totalStats } from '../utils/helpers'
import { getTypeColor } from '../utils/typeColors'
import Modal from './Modal'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'

const MAX_STAT = 180

interface RowProps {
  label: string
  a: number
  b: number
  colorA: string
  colorB: string
  max?: number
}

// O Pokémon com o maior valor fica em destaque; o outro fica esmaecido
function Row({ label, a, b, colorA, colorB, max = MAX_STAT }: RowProps) {
  const winner = a === b ? null : a > b ? 'a' : 'b'
  const side = (isWinner: boolean) =>
    `flex items-center gap-2.5 ${isWinner ? '' : 'opacity-60'}`
  const value = (isWinner: boolean, align: string) =>
    `w-[34px] tabular-nums ${align} ${isWinner ? 'text-accent' : ''}`

  return (
    <div className="grid grid-cols-[1fr_74px_1fr] items-center gap-1.5 border-t border-line py-1.75 sm:grid-cols-[1fr_110px_1fr] sm:gap-3">
      <div className={`${side(winner === 'a')} flex-row-reverse`}>
        <strong className={value(winner === 'a', 'text-left')}>{a}</strong>
        <div className="flex h-2.5 flex-1 justify-end overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(100, (a / max) * 100)}%`, background: colorA }}
          />
        </div>
      </div>
      <span className="text-center text-[0.72rem] text-ink-soft sm:text-[0.85rem]">{label}</span>
      <div className={side(winner === 'b')}>
        <strong className={value(winner === 'b', 'text-right')}>{b}</strong>
        <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(100, (b / max) * 100)}%`, background: colorB }}
          />
        </div>
      </div>
    </div>
  )
}

interface Props {
  a: Pokemon
  b: Pokemon
  onClose: () => void
}

export default function ComparePanel({ a, b, onClose }: Props) {
  const colorA = getTypeColor(a.types[0]?.name)
  const colorB = getTypeColor(b.types[0]?.name)

  return (
    <Modal title={`Comparação entre ${a.name} e ${b.name}`} onClose={onClose} wide>
      <div className="px-3.5 pt-4 pb-5 sm:px-7 sm:pt-6 sm:pb-7">
        <div className="mt-10 mb-5 grid grid-cols-2 gap-4 sm:mt-0 sm:pr-11">
          {[a, b].map((p, i) => (
            <div
              key={p.id}
              className="grid justify-items-center gap-1 rounded-2xl bg-type-glow px-2 py-3.5 text-center [--glow-y:40%]"
              style={{ '--tc': i === 0 ? colorA : colorB } as CSSVars}
            >
              <PokemonImage
                id={p.id}
                name={p.name}
                className="size-20 object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.2)] sm:size-27.5"
              />
              <span className="text-[0.82rem] font-semibold text-ink-soft">{formatId(p.id)}</span>
              <h2 className="font-display text-[1.15rem] leading-[1.1] font-extrabold sm:text-2xl">
                {p.name}
              </h2>
              <div className="mt-1 flex flex-wrap justify-center gap-1.5">
                {p.types.map((t) => (
                  <TypeBadge key={t.id} name={t.name} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {STAT_LABELS.map(({ key, label }) => (
          <Row
            key={key}
            label={label}
            a={a.stats[key]}
            b={b.stats[key]}
            colorA={colorA}
            colorB={colorB}
          />
        ))}
        <Row
          label="Total base"
          a={totalStats(a)}
          b={totalStats(b)}
          colorA={colorA}
          colorB={colorB}
          max={720}
        />
      </div>
    </Modal>
  )
}
