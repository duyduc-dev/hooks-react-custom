import React, { useCallback, useState } from 'react'

function useInputText(initialValue = '') {
  const [value, setValue] = useState<string>(initialValue)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const setInputText = useCallback(setValue, [setValue])

  return { value, onChange, setInputText } as const
}

export { useInputText }
