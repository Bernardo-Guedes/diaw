// Cor associada a cada tipo (usada em badges, filtros e no fundo dos cards)
export const TYPE_COLORS: Record<string, string> = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Grass: '#7AC74C',
  Electric: '#F7D02C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dark: '#705746',
  Dragon: '#6F35FC',
  Steel: '#B7B7CE',
  Typeless: '#9AA5B1',
}

export function getTypeColor(name?: string): string {
  return (name && TYPE_COLORS[name]) || TYPE_COLORS.Typeless
}

// Escolhe texto claro ou escuro conforme a luminância do fundo (contraste legível)
export function getReadableTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#1B2A3A' : '#FFFFFF'
}
