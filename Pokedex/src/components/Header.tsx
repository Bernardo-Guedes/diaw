import type { Theme, View } from '../types'

const TABS: { id: View; label: string }[] = [
  { id: 'pokedex', label: 'Pokédex' },
  { id: 'trainers', label: 'Treinadores' },
]

interface Props {
  view: View
  onViewChange: (view: View) => void
  theme: Theme
  onToggleTheme: () => void
  total: number
}

export default function Header({ view, onViewChange, theme, onToggleTheme, total }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-3 gap-y-2.5 px-3.5 py-2.5 sm:flex-nowrap sm:gap-5 sm:px-5 sm:py-3">
        <div className="mr-auto flex items-center gap-3">
          {/* Pokébola desenhada só com utilitários */}
          <span
            aria-hidden="true"
            className="relative size-[38px] flex-none rounded-full border-[3px] border-ink bg-[linear-gradient(to_bottom,var(--accent)_0_47%,var(--ink)_47%_53%,#fff_53%_100%)] after:absolute after:top-1/2 after:left-1/2 after:size-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-[3px] after:border-ink after:bg-white after:content-['']"
          />
          <div>
            <h1 className="font-display text-[1.6rem] leading-none font-extrabold tracking-[-0.02em]">
              Pokédex
            </h1>
            <p className="mt-[3px] text-[0.82rem] text-ink-soft">{total} Pokémon da 1ª geração</p>
          </div>
        </div>

        <nav className="flex gap-1 rounded-xl bg-surface-2 p-1 max-sm:order-3 max-sm:w-full" aria-label="Seções">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rounded-[9px] px-4 py-2 font-semibold max-sm:flex-1 ${
                view === tab.id ? 'bg-surface text-ink shadow-card' : 'text-ink-soft'
              }`}
              aria-current={view === tab.id ? 'page' : undefined}
              onClick={() => onViewChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="size-[42px] rounded-[10px] border-[1.5px] border-line bg-surface text-[1.15rem] hover:border-ink-soft"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>
  )
}
