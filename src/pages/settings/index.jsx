import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import currentUserSlice from '../../store/slices'
import useLocalStorage from '../../hooks/useLocalStorage'
import useFetch from '../../hooks/useFetch'
// начать следующий день отсюда

const Settings = () => {
  const currentUserState = useSelector((state) => state.currentUser)

  console.clear()
  console.log('стейт из настроек', currentUserState)
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
  }
  const logout = (event) => {
    event.preventDefault()
    setToken('')
    dispatch(currentUserSlice.actions.SET_UNAUTHORIZED())
    setIsSuccessfullLogout(true)
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
  }, [currentUserState])

  useEffect(() => {
    if (!response) {
      return
    }

    dispatch(currentUserSlice.actions.SET_AUTHORIZED())
  }, [response, dispatch])

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
