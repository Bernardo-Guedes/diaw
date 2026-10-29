interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative flex-[1_1_280px]">
      <label htmlFor="search-input" className="sr-only">
        Pesquisar Pokémon por nome ou número
      </label>
      <input
        id="search-input"
        className="min-h-[42px] w-full rounded-[10px] border-[1.5px] border-line bg-surface pr-10 pl-3.5 placeholder:text-ink-soft [&::-webkit-search-cancel-button]:hidden"
        type="search"
        placeholder="Pesquisar por nome ou número…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className="absolute top-1/2 right-1.5 size-[30px] -translate-y-1/2 rounded-full bg-surface-2 text-xl leading-none"
          onClick={() => onChange('')}
          aria-label="Limpar pesquisa"
        >
          ×
        </button>
      )}
    </div>
  )
}