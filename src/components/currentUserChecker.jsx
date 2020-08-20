import { useEffect, useContext } from 'react'

// import { useSelector, useDispatch } from 'react-redux'

import store from '../store/configureStore/reducers'
import currentUserSlice from '../store/slices'

import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch('/user')
  const [token] = useLocalStorage('token')

  useEffect(() => {
    if (!token) {
      store.dispatch(currentUserSlice.actions.SET_UNAUTHORIZED())
      return
    }

    doFetch()
    store.dispatch(currentUserSlice.actions.LOADING()) // правильно ли указан диспатч?
  }, [doFetch, token])

  useEffect(() => {
    if (!response) {
      return
    }

    store.dispatch(currentUserSlice.actions.SET_AUTHORIZED()) // а здесь?
  }, [response])
  return children
}

export default CurrentUserChecker
