import { useEffect } from 'react'

type KeyPredicate = (event: KeyboardEvent) => boolean
type keyType = KeyboardEvent['keyCode'] | KeyboardEvent['key']
type KeyMap = keyType | Array<keyType> | ((event: KeyboardEvent) => boolean)
type EventHandler = (event: KeyboardEvent) => void
type keyEnum = 'keydown' | 'keyup'

const aliasKeyCodeMap: any = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46],
}

const aliasKeyMap: any = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  delete: ['Backspace', 'Delete'],
}

const combineKey: any = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  meta: (event: KeyboardEvent) => event.metaKey,
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

/**
 *
 * @param [obj: any]
 * @returns String
 */
function isType(obj: any) {
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, '$1')
    .toLowerCase()
}

/**
 *
 * @param [val: string]
 * @returns Boolean
 */
function toNumber(val: string) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 *
 * @param [event: KeyboardEvent]
 * @param [keyMap: any] 当前键
 * @returns Boolean
 */
function genFilterKey(event: any, keyMap: any) {
  const type = isType(keyMap)
  if (type === 'number') {
    return event.keyCode === keyMap
  }
  const genArr = keyMap.split('.')
  let genLen = 0
  for (const key of genArr) {
    const genModified = combineKey[key]
    const aliasKey = aliasKeyMap[key]
    const aliasKeyCode = aliasKeyCodeMap[key]

    if (
      (genModified && genModified(event)) ||
      (aliasKey && isType(aliasKey) === 'array' ? aliasKey.includes(event.key) : aliasKey === event.key) ||
      (aliasKeyCode && isType(aliasKeyCode) === 'array'
        ? aliasKeyCode.includes(event.keyCode)
        : aliasKeyCode === event.keyCode) ||
      event.key === key ||
      event.keyCode === toNumber(key)
    ) {
      genLen++
    }
  }

  return genLen === genArr.length
}

/**
 *
 * @param [keyMap: any]
 * @returns () => Boolean
 */
function genKeyFormatter(keyMap: any): KeyPredicate {
  const type = isType(keyMap)
  if (type === 'function') {
    return keyMap
  }
  if (type === 'string' || type === 'number') {
    return (event: KeyboardEvent) => genFilterKey(event, keyMap)
  }
  if (type === 'array') {
    return (event: KeyboardEvent) => keyMap.some((item: any) => genFilterKey(event, item))
  }
  return keyMap ? () => true : () => false
}

const defaultEvents: Array<keyEnum> = ['keydown']

function useKeyPressHandler(keyMap: KeyMap, eventHandler: EventHandler = noop, events = defaultEvents) {
  useEffect(() => {
    const callback: EventHandler = (handlerEvent) => {
      const genGuard: KeyPredicate = genKeyFormatter(keyMap)
      if (genGuard(handlerEvent)) {
        return eventHandler(handlerEvent)
      }
    }

    for (const eventName of events) {
      window.addEventListener(eventName, callback)
    }
    return () => {
      for (const eventName of events) {
        window.removeEventListener(eventName, callback)
      }
    }
  }, [events, eventHandler])
}

export { useKeyPressHandler }
