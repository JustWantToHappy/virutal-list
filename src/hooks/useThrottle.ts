import React from 'react'

export function useThrottle<T extends (...args:unknown[])=>unknown>(fn:T,delay=100) {
  const resultRef=React.useRef<unknown>()
  const prevTimeRef = React.useRef<number>()

  const throttleFn = React.useCallback((...args:unknown[]) => {
    const currentTime = Date.now()
    resultRef.current=undefined
    if (!prevTimeRef.current||currentTime - prevTimeRef.current >= delay) {
      prevTimeRef.current=currentTime
      setTimeout(() => {
        resultRef.current=fn.apply(this,args)
      }, delay)
    }
    return resultRef.current  
  },[delay,fn])

  return throttleFn
}