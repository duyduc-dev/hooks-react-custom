import { useCallback, useEffect, useState } from 'react'

export interface OptionsAsync {
  immediate?: boolean
  log?: boolean
}

export type StatusModal = 'idle' | 'pending' | 'success' | 'error'

export interface UseAsyncState<T, E = string> {
  status: StatusModal
  value: T | null
  error: E | null
}

// Hook
const useAsync = <T, E = string>(asyncFunction: () => Promise<T>, options?: OptionsAsync) => {
  const [state, setState] = useState<UseAsyncState<T, E>>({
    status: 'idle',
    value: null,
    error: null,
  })

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setState({
      status: 'pending',
      value: null,
      error: null,
    })
    return asyncFunction()
      .then((response: any) => {
        setState({
          status: 'success',
          value: response,
          error: null,
        })
      })
      .catch((error: any) => {
        setState({
          status: 'error',
          value: null,
          error: error,
        })
      })
  }, [asyncFunction])
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (options?.immediate) {
      execute()
    }
  }, [execute, options?.immediate])

  useEffect(() => {
    if (options?.log) console.log(state)
  }, [options?.log, state])
  return { execute, ...state }
}

export { useAsync }
