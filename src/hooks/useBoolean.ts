import { useCallback, useMemo, useState } from 'react'

interface ActionUseBoolean {
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
  setBoolean: (bool: boolean) => void
}

const useBoolean = (initialState = false): [boolean, ActionUseBoolean] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState)
  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setState((state) => !state), [])
  const setBoolean = useCallback((state: boolean): void => setState(state), [])
  const setTrue = useCallback((): void => setState(true), [])
  const setFalse = useCallback((): void => setState(false), [])

  const actions = useMemo(
    () => ({
      toggle,
      setTrue,
      setFalse,
      setBoolean,
    }),
    [setBoolean, setFalse, setTrue, toggle],
  )

  return [state, actions]
}
export { useBoolean }
