import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 500): { debouncedValue: T; isPending: boolean } {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [isPending, setIsPending] = useState<boolean>(false)

  useEffect(() => {
    setIsPending(true)
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      setIsPending(false)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return { debouncedValue, isPending } as const
}
