import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface Props {
  title: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
}

// Modal acessível: fecha com Esc ou clique no fundo e trava a rolagem da página.
export default function Modal({ title, onClose, children, wide = false }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      ;(previouslyFocused as HTMLElement | null)?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 grid animate-fade place-items-center overflow-y-auto bg-[rgba(10,16,24,0.6)] p-2.5 backdrop-blur-[3px] sm:p-5"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative max-h-[calc(100vh-20px)] w-full animate-pop overflow-y-auto rounded-[18px] border border-line bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:max-h-[calc(100vh-40px)] sm:rounded-[22px] ${
          wide ? 'max-w-[760px]' : 'max-w-[820px]'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          ref={closeRef}
          type="button"
          className="absolute top-3 right-3 z-[2] size-[38px] rounded-full border-[1.5px] border-line bg-surface text-2xl leading-none hover:border-ink-soft"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
