import { useState } from 'react'
import { artworkUrl, spriteUrl } from '../utils/helpers'

interface Props {
  id: number
  name: string
  className?: string
}

// Tenta a arte oficial, depois o sprite pequeno e, por fim, um placeholder.
export default function PokemonImage({ id, name, className = '' }: Props) {
  const [stage, setStage] = useState(0)

  if (stage > 1) {
    return (
      <span
        className={`${className} grid place-items-center font-display text-5xl font-extrabold text-ink-soft`}
        role="img"
        aria-label={name}
      >
        ?
      </span>
    )
  }

  return (
    <img
      className={className}
      src={stage === 0 ? artworkUrl(id) : spriteUrl(id)}
      alt={name}
      loading="lazy"
      onError={() => setStage((s) => s + 1)}
    />
  )
}