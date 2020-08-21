import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

const TopBar = () => {
  const currentUserState = useSelector((state) => {
    return state.currentUser
  })

  console.log('localstorage', localStorage)
  const userImage =
    (currentUserState.isLoggedIn && currentUserState.currentUser.image) ||
    'https://media.istockphoto.com/vectors/silhouette-default-avatar-woman-to-social-user-vector-id860642028'

  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Medium
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <NavLink to='/' className='nav-link' exact>
              Домой
            </NavLink>
          </li>
          {currentUserState.isLoggedIn && (
            <>
              <li className='nav-item'>
                <NavLink to='/articles/new' className='nav-link'>
                  <i className='ion-compose' />
                  &nbsp; Новый пост
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/settings' className='nav-link'>
                  <i className='ion-gear-a' />
                  &nbsp; Настройки
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  to={`/profiles/${currentUserState.currentUser.username}`}
                  className='nav-link'
                >
                  <img className='user-pic' src={userImage} alt='' />
                  &nbsp; {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </>
          )}
          {currentUserState.isLoggedIn === null && (
            <>
              <li className='nav-item'>
                <NavLink to='/login' className='nav-link'>
                  Войти
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/register' className='nav-link'>
                  Регистрация
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default TopBar
