import { useEffect, useRef } from 'react'

const FirstRender = Symbol()

export function useMemoCompare<T>(state: T, compare: (previous: T, current: T) => boolean) {
  const previousRef = useRef<T | typeof FirstRender>(FirstRender)
  const previous = previousRef.current
  const isEqual = previous !== FirstRender && compare(previous, state)
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = state
    }
  }, [state])
  return isEqual ? previous : state
}
