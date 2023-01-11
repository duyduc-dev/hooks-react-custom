import React, { useCallback, useState } from 'react'

function useInputText(initialValue = '') {
  const [value, setValue] = useState<string>(initialValue)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return { value, onChange } as const
}

export { useInputText }
