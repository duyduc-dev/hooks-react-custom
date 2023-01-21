import { useRef } from 'react'

type UseScrollToElementReturn<T> = [React.MutableRefObject<T | null>, () => void]

const useScrollToElement = <T extends HTMLElement>(): UseScrollToElementReturn<T> => {
  const ref = useRef<T | null>(null)
  const scrollToRef = (): void => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }
  return [ref, scrollToRef]
}

export { useScrollToElement, UseScrollToElementReturn }
