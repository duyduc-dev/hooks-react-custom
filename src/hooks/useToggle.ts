import { useCallback, useState } from 'react'

const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState)
  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setState((state) => !state), [])

  const setTrue = useCallback((): void => setState(true), [])

  const setFalse = useCallback((): void => setState(false), [])

  return [state, toggle, { setTrue, setFalse }] as const
}
export { useToggle }
