import React from 'react'

export function useDebouce<T extends (...args: unknown[]) => unknown>(fn: T, delay = 100, immediate = false) {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>()

  const debouceFn = React.useCallback((...args: unknown[]) => {
    let result
    if (timerRef.current) clearTimeout(timerRef.current)
    if (immediate) {
      if (!timerRef.current) result = fn.apply(this, args)
      timerRef.current = setTimeout(() => {
        timerRef.current = null
      }, delay)
    } else {
      timerRef.current = setTimeout(() => {
        result = fn.apply(this, args)
      }, delay)
    }
    return result
  }, [fn, delay, immediate])

  return debouceFn
}