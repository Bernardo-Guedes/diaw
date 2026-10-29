import type { FilterOptions, Pokemon, SortKey, StatKey } from '../types'

export const STAT_LABELS: { key: StatKey; label: string; short: string }[] = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'Atq' },
  { key: 'defense', label: 'Defesa', short: 'Def' },
  { key: 'specialAttack', label: 'Ataque especial', short: 'Atq. esp.' },
  { key: 'specialDefense', label: 'Defesa especial', short: 'Def. esp.' },
  { key: 'speed', label: 'Velocidade', short: 'Vel' },
]

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'id', label: 'Número' },
  { value: 'name', label: 'Nome (A–Z)' },
  { value: 'hp', label: 'HP (maior)' },
  { value: 'attack', label: 'Ataque (maior)' },
  { value: 'defense', label: 'Defesa (maior)' },
  { value: 'specialAttack', label: 'Ataque especial (maior)' },
  { value: 'specialDefense', label: 'Defesa especial (maior)' },
  { value: 'speed', label: 'Velocidade (maior)' },
]

export const formatId = (id: number): string => `#${String(id).padStart(3, '0')}`

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

// Pesquisa por nome ou ID, filtro por tipo e favoritos
export function filterPokemon(
  list: Pokemon[],
  { query, type, onlyFavorites, favorites }: FilterOptions,
): Pokemon[] {
  const q = normalize(query).replace(/^#/, '')

  return list.filter((p) => {
    if (type && !p.types.some((t) => t.name === type)) return false
    if (onlyFavorites && !favorites.includes(p.id)) return false
    if (!q) return true

    const matchesName = normalize(p.name).includes(q)
    // "25", "025" e "#025" encontram o Pikachu; "1" mostra os IDs que começam com 1
    const matchesId = /^\d+$/.test(q) && String(p.id).startsWith(q.replace(/^0+(?=\d)/, ''))
    return matchesName || matchesId
  })
}

export function sortPokemon(list: Pokemon[], sortKey: SortKey): Pokemon[] {
  const copy = [...list]
  if (sortKey === 'id') return copy.sort((a, b) => a.id - b.id)
  if (sortKey === 'name') return copy.sort((a, b) => a.name.localeCompare(b.name))
  return copy.sort((a, b) => b.stats[sortKey] - a.stats[sortKey] || a.id - b.id)
}

export const totalStats = (p: Pokemon): number =>
  Object.values(p.stats).reduce((sum, value) => sum + value, 0)

const SPRITE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

// Imagens vindas do repositório de sprites da PokéAPI (documentado no README)
export const artworkUrl = (id: number): string => `${SPRITE_BASE}/other/official-artwork/${id}.png`
export const spriteUrl = (id: number): string => `${SPRITE_BASE}/${id}.png`
