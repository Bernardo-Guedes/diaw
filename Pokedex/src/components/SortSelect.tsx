import type { SortKey } from '../types'
import { SORT_OPTIONS } from '../utils/helpers'

interface Props {
  value: SortKey
  onChange: (value: SortKey) => void
}

export default function SortSelect({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-[0.92rem] text-ink-soft max-sm:basis-full">
      <span>Ordenar por</span>
      <select
        className="min-h-[42px] rounded-[10px] border-[1.5px] border-line bg-surface px-2.5 text-ink max-sm:flex-1"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
