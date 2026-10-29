import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

const BASE =
  'inline-flex min-h-[42px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] border-[1.5px] px-4 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45'

// Cada variante define a própria cor de borda para não haver classes concorrentes
const VARIANTS: Record<Variant, string> = {
  primary: 'border-accent bg-accent text-accent-ink enabled:hover:brightness-110',
  outline: 'border-line bg-surface hover:border-ink-soft',
  ghost: 'border-transparent bg-transparent text-ink enabled:hover:bg-surface-2',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export default function Button({ variant = 'outline', className = '', type = 'button', ...rest }: Props) {
  return <button type={type} className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest} />
}