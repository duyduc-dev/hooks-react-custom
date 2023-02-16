import { useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

function useDocumentTitle(title: string) {
  const [titleApp, setTitleApp] = useState(title)
  useIsomorphicLayoutEffect(() => {
    window.document.title = titleApp
  }, [title])

  return { title: titleApp, setTitleApp }
}

export { useDocumentTitle }
