import { useEffect, useContext } from 'react'
import useFetch from '../hooks/useFetch'
import { CurrentUserContext } from '../contexts/currentUser'
import useLocalStorage from '../hooks/useLocalStorage'
// получает текущего юзера при старте приложения и сохраняет его

const CurrentUserChecker = ({ children }) => {
  const [, setCurrentUserState] = useContext(CurrentUserContext) // хотим установить новый стейт, при этом нам не нужно значение старого указывать
  const [{ response }, doFetch] = useFetch('/user')
  const [token] = useLocalStorage('token')

  useEffect(() => {
    if (!token) {
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }))
      return
    }

    doFetch()
    setCurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }))
  }, [doFetch, setCurrentUserState, token])

  useEffect(() => {
    // смотрим статус ответа от сервера
    if (!response) {
      return
    }
    setCurrentUserState((state) => ({
      ...state, // копируем стейт и меняем в нем значение
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
      // загружается прям щас
    }))
  }, [response, setCurrentUserState])

  return children
}

export default CurrentUserChecker
