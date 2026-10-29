import { getReadableTextColor, getTypeColor } from '../utils/typeColors'

interface Props {
  name: string
}

export default function TypeBadge({ name }: Props) {
  const color = getTypeColor(name)
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-[0.78rem] leading-[1.6] font-bold"
      style={{ background: color, color: getReadableTextColor(color) }}
    >
      {name}
    </span>
  )
}
