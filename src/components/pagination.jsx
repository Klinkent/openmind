import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { range } from '../utils'

const PaginationItem = ({ page, currentPage, url }) => {
  const liClasses = classNames({
    'page-item': true,
    active: currentPage === page,
  })
  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className='page-link'>
        {page}
      </Link>
    </li>
  )
}

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount)

  return (
    <ul className='pagination'>
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          url={url}
        />
      ))}
    </ul>
  )
}

PaginationItem.defaultProps = {
  page: PropTypes.string,
  currentPage: PropTypes.string,
  url: PropTypes.string,
}

PaginationItem.propTypes = {
  page: PropTypes.string,
  currentPage: PropTypes.string,
  url: PropTypes.string,
}
Pagination.defaultProps = {
  total: 0,
  limit: 10,
  url: '',
  currentPage: 1,
}

Pagination.propTypes = {
  total: PropTypes.number,
  limit: PropTypes.number,
  url: PropTypes.string,
  currentPage: PropTypes.number,
}

export default Pagination
