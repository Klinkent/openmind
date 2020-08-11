import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'

const TopBar = () => {
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
          <li className='nav-item'>
            <NavLink to='/articles/new' className='nav-link'>
              <i className='ion-compose' />
              &nbsp; Создать
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/settings' className='nav-link'>
              <i className='ion-gear-a' />
              &nbsp; Настройки
            </NavLink>
          </li>
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
        </ul>
      </div>
    </nav>
  )
}

export default TopBar
