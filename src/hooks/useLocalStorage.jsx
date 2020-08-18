import { useState, useEffect } from 'react'

// умеет брать ключ и сеттить ключ
// реагирует на изменение значения и ключа

export default (key, initialValue = '') => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}
