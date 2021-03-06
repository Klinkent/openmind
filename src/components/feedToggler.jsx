import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'

const FeedToggler = ({ tagName }) => {
  const currentUserState = useSelector((state) => state.currentUser)

  return (
    <div className='feed-toggler'>
      <ul className='nav nav-pills outline-active'>
        {currentUserState.isLoggedIn && (
          <li className='nav-item'>
            <NavLink to='/feed' className='nav-link'>
              Твоя лента
            </NavLink>
          </li>
        )}
        <li className='nav-item'>
          <NavLink to='/' className='nav-link' exact>
            Стена Дурова
          </NavLink>
        </li>
        {tagName && (
          <li className='nav-item'>
            <NavLink to={`/tags/${tagName}`} className='nav-link' exact>
              <i className='ion-pound' />
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

FeedToggler.defaultProps = {
  tagName: '',
}
FeedToggler.propTypes = {
  tagName: PropTypes.string,
}

export default FeedToggler
