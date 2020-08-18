import { useState, useEffect, useCallback, useContext } from 'react'
import Axios from 'axios'

import useLocalStorage from './useLocalStorage'

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api'
  const [token] = useLocalStorage('token')

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null) // ответ от сервера (res.data)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({}) // то, что юзер передал снаружи

  const doFetch = useCallback(() => {
    setOptions(options)
    setIsLoading(true)
  }, []) // метод хука, с его помощью будем что-то фетчить

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '', // cообщаем наш токен, пустая строка == не залогинен
        },
      },
    }
    if (!isLoading) {
      return
    }

    Axios(baseUrl + url, requestOptions) // содержит все опциии и хедер
      .then((res) => {
        console.log('success', res) // когда мы получаем ответ от сервера - весь ответ приходит не в рес, а в рес.дата
        setIsLoading(false)
        setResponse(res.data) // записываем в состояние, то что мы получим, что внутри дата
      })
      .catch((error) => {
        console.log('error', error)
        setIsLoading(false)
        setError(error.response.data) // тут тройная пирамида, потому что кетч работает с then??
      })
  }, [isLoading, options, url, token])

  return [{ isLoading, response, error }, doFetch]
  // мы всегда возвращаем массив
  // мы ничего не делаем внутри, но уже тут возвращем все данные, которые необходимы снаружи
}
