import { useEffect, useState } from 'react'

function useIsInViewport(ref: any) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setIsIntersecting(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(updateEntry)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isIntersecting
}

export { useIsInViewport }
