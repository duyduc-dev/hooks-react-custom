import { useState } from 'react'

// Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error('hooks-react-custom useLocalStorage.ts ~ setValue ~ error', error)
    }
  }

  const removeValue = () => {
    try {
      if (typeof window !== 'undefined') window.localStorage.removeItem(key)
    } catch (error) {
      console.error('hooks-react-custom useLocalStorage.ts:35 ~ removeValue ~ error', error)
    }
  }
  return [storedValue, setValue, removeValue] as const
}

export { useLocalStorage }
