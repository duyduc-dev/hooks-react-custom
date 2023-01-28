import { useRef } from 'react'

type UseScrollToElementReturn<T> = [React.MutableRefObject<T | null>, (arg?: boolean | ScrollIntoViewOptions) => void]

const useScrollToElement = <T extends HTMLElement>(): UseScrollToElementReturn<T> => {
  const ref = useRef<T | null>(null)
  const scrollToRef = (arg?: boolean | ScrollIntoViewOptions): void => {
    if (ref.current) {
      ref.current.scrollIntoView(arg)
    }
  }
  return [ref, scrollToRef]
}

export { useScrollToElement, UseScrollToElementReturn }
