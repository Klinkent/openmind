import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { CurrentUserContext } from '../../contexts/currentUser'

// import {CurrentUserContext} from '../../contexts/currentUser'
// import BackendErrorMessages from '../../components/backendErrorMessages'

const Authentication = (props) => {
  const isLogin = props.match.path === '/login' // -> true/false, from router, this page

  const [, dispatch] = useContext(CurrentUserContext)

  const pageTitle = isLogin ? 'Вход' : 'Регистрация'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Аккаунт нужен?' : 'Есть учётка?'
  const apiUrl = isLogin ? '/users/login' : '/users'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
  const [, setToken] = useLocalStorage('token')

  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = isLogin ? { email, password } : { email, password, username }

    doFetch({
      method: 'post',
      data: {
        user,
      },
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    console.log('response', response)
    setToken(response.user.token)
    setIsSuccessfullSubmit(true)
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
  }, [response, setToken, dispatch])

  if (isSuccessfullSubmit) {
    return <Redirect to='/' />
  }

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>{pageTitle}</h1>
            <p className='text-xs-center'>
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                {!isLogin && (
                  <fieldset className='form-group'>
                    <input
                      type='username'
                      className='form-control form-control-lg'
                      placeholder='имя'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className='form-group'>
                  <input
                    type='email'
                    className='form-control form-control-lg'
                    placeholder='почта'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className='btn btn-lg btn-primary pull-xs-right'
                  type='submit'
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
