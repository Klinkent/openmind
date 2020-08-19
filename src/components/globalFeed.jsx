import React, { useEffect } from 'react'
import { stringify } from 'query-string'

import Pagination from './pagination'
import { getPaginator, limit } from '../utils'
import useFetch from '../hooks/useFetch'
import Feed from './feed'

import PopularTags from './popularTags'
import FeedToggler from './feedToggler'

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset,
  })
  const apiUrl = `/articles?${stringifiedParams}`
  const currentUrl = match.url
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [currentPage, doFetch])

  return (
    <div className='home-page'>
      <div className='banner'>
        <h1>Medium</h1>
        <p>Поделись знаниями с другими!</p>
      </div>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <FeedToggler />
            {isLoading && <div>Загрузка...</div>}
            {error && <div>Имеется ошибка</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={currentUrl}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className='col-md-3'>
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalFeed
