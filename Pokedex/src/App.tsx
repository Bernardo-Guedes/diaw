import { useCallback, useEffect, useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { PokedexData, Pokemon, SortKey, Theme, View } from './types'
import { filterPokemon, sortPokemon } from './utils/helpers'

import Button from './components/Button'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import SortSelect from './components/SortSelect'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import CompareTray from './components/CompareTray'
import ComparePanel from './components/ComparePanel'
import EmptyState from './components/EmptyState'

const { pokemon: allPokemon, trainers, types } = data as PokedexData

// Estruturas derivadas dos dados (calculadas uma única vez)
const pokemonById = new Map<number, Pokemon>(allPokemon.map((p) => [p.id, p]))
const usedTypes = types.filter((t) =>
  allPokemon.some((p) => p.types.some((pt) => pt.id === t.id)),
)

const prefersDark = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches

export default function App() {
  // --- estado da interface ---
  const [view, setView] = useState<View>('pokedex')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [compareIds, setCompareIds] = useState<number[]>([])
  const [showCompare, setShowCompare] = useState(false)

  // --- estado persistido ---
  const [favorites, setFavorites] = useLocalStorage<number[]>('pokedex:favorites', [])
  const [theme, setTheme] = useLocalStorage<Theme>('pokedex:theme', prefersDark() ? 'dark' : 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // --- estado derivado: lista filtrada e ordenada ---
  const visiblePokemon = useMemo(
    () => sortPokemon(filterPokemon(allPokemon, { query, type, onlyFavorites, favorites }), sortKey),
    [query, type, onlyFavorites, favorites, sortKey],
  )

  const hasActiveFilters = query !== '' || type !== '' || onlyFavorites

  // --- ações ---
  const clearFilters = () => {
    setQuery('')
    setType('')
    setOnlyFavorites(false)
  }

  const toggleFavorite = useCallback(
    (id: number) =>
      setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])),
    [setFavorites],
  )

  // Mantém no máximo 2 Pokémon: ao escolher o terceiro, o mais antigo sai
  const toggleCompare = useCallback(
    (id: number) =>
      setCompareIds((prev) =>
        prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id].slice(-2),
      ),
    [],
  )

  const openPokemon = useCallback((id: number) => setSelectedId(id), [])
  const closeDetails = useCallback(() => setSelectedId(null), [])
  const closeCompare = useCallback(() => setShowCompare(false), [])

  const openRandom = () => {
    const pool = visiblePokemon.length > 0 ? visiblePokemon : allPokemon
    setSelectedId(pool[Math.floor(Math.random() * pool.length)].id)
  }

  // --- navegação anterior/próximo dentro do modal ---
  const navigationList = visiblePokemon.some((p) => p.id === selectedId)
    ? visiblePokemon
    : allPokemon
  const selectedIndex = navigationList.findIndex((p) => p.id === selectedId)
  const selectedPokemon = selectedId !== null ? pokemonById.get(selectedId) : null

  const goTo = (offset: number) => {
    const target = navigationList[selectedIndex + offset]
    if (target) setSelectedId(target.id)
  }

  const comparing = compareIds
    .map((id) => pokemonById.get(id))
    .filter((p): p is Pokemon => p !== undefined)

  return (
    <>
      <Header
        view={view}
        onViewChange={setView}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        total={allPokemon.length}
      />

      <main className="mx-auto max-w-[1200px] px-3.5 pt-3.5 pb-[120px] sm:px-5 sm:pt-5">
        {view === 'pokedex' ? (
          <>
            <section className="grid gap-3.5" aria-label="Pesquisa e filtros">
              <div className="flex flex-wrap items-center gap-2.5">
                <SearchBar value={query} onChange={setQuery} />
                <SortSelect value={sortKey} onChange={setSortKey} />
                <Button
                  variant={onlyFavorites ? 'primary' : 'outline'}
                  className="max-sm:flex-[1_1_calc(50%-10px)]"
                  aria-pressed={onlyFavorites}
                  onClick={() => setOnlyFavorites((v) => !v)}
                >
                  ★ Favoritos ({favorites.length})
                </Button>
                <Button
                  className="max-sm:flex-[1_1_calc(50%-10px)]"
                  onClick={openRandom}
                >
                  Aleatório
                </Button>
              </div>
              <TypeFilter types={usedTypes} selected={type} onSelect={setType} />
            </section>

            <p
              className="mt-[18px] mb-3.5 flex items-center gap-3.5 text-[0.95rem] text-ink-soft"
              aria-live="polite"
            >
              {visiblePokemon.length === allPokemon.length
                ? `${allPokemon.length} Pokémon`
                : `${visiblePokemon.length} de ${allPokemon.length} Pokémon`}
              {hasActiveFilters && (
                <button
                  type="button"
                  className="font-semibold text-accent underline underline-offset-[3px]"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </button>
              )}
            </p>

            {visiblePokemon.length > 0 ? (
              <PokemonList
                pokemon={visiblePokemon}
                favorites={favorites}
                compareIds={compareIds}
                onOpen={openPokemon}
                onToggleFavorite={toggleFavorite}
                onToggleCompare={toggleCompare}
              />
            ) : onlyFavorites && favorites.length === 0 ? (
              <EmptyState
                title="Você ainda não tem favoritos"
                message="Toque na estrela de um card para guardar o Pokémon aqui."
                actionLabel="Ver todos os Pokémon"
                onAction={clearFilters}
              />
            ) : (
              <EmptyState
                title="Nenhum Pokémon encontrado"
                message={
                  query
                    ? `Nada corresponde a “${query}”${type ? ` no tipo ${type}` : ''}. Confira a grafia ou tente um número de 1 a ${allPokemon.length}.`
                    : 'Nenhum Pokémon combina com os filtros escolhidos.'
                }
                actionLabel="Limpar filtros"
                onAction={clearFilters}
              />
            )}
          </>
        ) : (
          <>
            <p className="mt-[18px] mb-3.5 text-[0.95rem] text-ink-soft">{trainers.length} treinadores</p>
            <TrainerList trainers={trainers} pokemonById={pokemonById} onOpenPokemon={openPokemon} />
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          trainers={trainers}
          isFavorite={favorites.includes(selectedPokemon.id)}
          isComparing={compareIds.includes(selectedPokemon.id)}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < navigationList.length - 1}
          onClose={closeDetails}
          onPrev={() => goTo(-1)}
          onNext={() => goTo(1)}
          onToggleFavorite={toggleFavorite}
          onToggleCompare={toggleCompare}
        />
      )}

      <CompareTray
        selected={comparing}
        onRemove={toggleCompare}
        onClear={() => setCompareIds([])}
        onCompare={() => setShowCompare(true)}
      />

      {showCompare && comparing.length === 2 && (
        <ComparePanel a={comparing[0]} b={comparing[1]} onClose={closeCompare} />
      )}
    </>
  )
}
