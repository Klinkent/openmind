import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import currentUserSlice from '../store/slices'

import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'

const CurrentUserChecker = ({ children }) => {
  const dispatch = useDispatch()
  const [{ response }, doFetch] = useFetch('/user')
  const [token] = useLocalStorage('token')

  useEffect(() => {
    if (!token) {
      dispatch(currentUserSlice.actions.SET_UNAUTHORIZED())
      return
    }

    doFetch()
    dispatch(currentUserSlice.actions.LOADING())
  }, [dispatch, doFetch, token])

  useEffect(() => {
    if (!response) {
      return
    }
    dispatch(currentUserSlice.actions.SET_AUTHORIZED(response.user))
  }, [dispatch, response])
  return children
}

export default CurrentUserChecker
