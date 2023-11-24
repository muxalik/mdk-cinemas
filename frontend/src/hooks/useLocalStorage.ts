import { useState } from 'react'

const useLocalStorage = <T>(key: string, initial?: T) => {
  const [value, setValue] = useState(() => {
    const local = localStorage.getItem(key)

    if (local !== undefined && local !== null) {
      return JSON.parse(local!)
    }

    localStorage.setItem(key, JSON.stringify(initial))

    return initial
  })

  const setLocal = (item: T) => {
    localStorage.setItem(key, JSON.stringify(item))
    setValue(item)
  }

  return [value, setLocal] as const
}

export default useLocalStorage
