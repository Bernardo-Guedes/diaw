import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

// useState que persiste o valor no localStorage
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* armazenamento indisponível: segue sem persistir */
    }
  }, [key, value])

  return [value, setValue]
}
