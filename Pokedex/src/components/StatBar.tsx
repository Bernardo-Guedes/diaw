interface Props {
  label: string
  value: number
  color: string
}

const MAX_STAT = 180 // valor que representa a barra cheia

export default function StatBar({ label, value, color }: Props) {
  const percent = Math.min(100, (value / MAX_STAT) * 100)
  return (
    <div className="grid grid-cols-[100px_30px_1fr] items-center gap-2 text-[0.92rem] min-[420px]:grid-cols-[130px_34px_1fr] min-[420px]:gap-2.5">
      <span className="text-ink-soft">{label}</span>
      <span className="text-right font-bold tabular-nums">{value}</span>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-surface-2"
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={MAX_STAT}
      >
        <div
          className="h-full origin-left animate-grow rounded-full"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  )
}
