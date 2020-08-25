import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import UserProfile from '../../hooks/userProfileStorage'

import currentUserSlice from '../../store/slices'
import useLocalStorage from '../../hooks/useLocalStorage'
import useFetch from '../../hooks/useFetch'

const Settings = () => {
  const currentUserState = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()
  const apiUrl = '/user'
  const [{ response, error }, doFetch] = useFetch(apiUrl)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useLocalStorage('token')
  const [successfullLogout, setIsSuccessfullLogout] = useState(false)

  // кладем данные в сторадж
  const [, setNameToStorage] = useLocalStorage('name')
  const [, setImageToStorage] = useLocalStorage('image')
  const [, setBioToStorage] = useLocalStorage('bio')
  const [, setEmailToStorage] = useLocalStorage('email')

  const handleSubmit = (event) => {
    event.preventDefault()
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          bio,
          username: name,
          email,
          password,
        },
      },
    })
    // кладем данные в сторадж при изменении настроек
  }
  const logout = (event) => {
    event.preventDefault()
    setToken('')
    dispatch(currentUserSlice.actions.SET_UNAUTHORIZED())
    setIsSuccessfullLogout(true)

    setNameToStorage('name')
    setImageToStorage('image')
    setBioToStorage('bio')
    setEmailToStorage('email')
    // удаляем данные текущего пользователя из хранилища (TODO)
  }
  // скорее всего здесь нужан реализация через юздиспатч
  useEffect(() => {
    if (!currentUserState.currentUser) {
      return
    }
    const { currentUser } = currentUserState
    setName(currentUser.username)
    setImage(currentUser.image)
    setBio(currentUser.bio)
    setEmail(currentUser.email)

    setNameToStorage(currentUser.username)
    setImageToStorage(currentUser.image)
    setBioToStorage(currentUser.bio)
    setEmailToStorage(currentUser.email)
  }, [
    currentUserState,
    setBioToStorage,
    setEmailToStorage,
    setImageToStorage,
    setNameToStorage,
  ])

  useEffect(() => {
    if (!response) {
      return
    }

    dispatch(currentUserSlice.actions.SET_AUTHORIZED(response.user))
  }, [response, dispatch, doFetch])

  if (successfullLogout) {
    return <Redirect to='/' />
  }

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Настройки юзера</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='ссылка на картинку профиля'
                    onChange={(e) => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Имя пользователя'
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='О себе'
                    rows='8'
                    onChange={(e) => setBio(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Почта'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Новый пароль'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  type='submit'
                  className='btn btn-lg btn-primary pull-xs-right'
                >
                  Обновить и сохранить
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={logout}
            >
              Разлогиниться
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
