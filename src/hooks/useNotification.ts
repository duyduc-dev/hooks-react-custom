import { useCallback } from 'react'

const useNotification = (title: string, options?: NotificationOptions) => {
  const fireNotify = useCallback(() => {
    if (!('Notification' in window)) {
      return
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, options)
        }
      })
    } else {
      new Notification(title, options)
    }
  }, [])

  if (!('Notification' in window)) {
    return
  }

  return fireNotify
}

export { useNotification }