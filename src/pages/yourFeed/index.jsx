import React, { useEffect, useContext } from 'react'
import { stringify } from 'query-string'

import Feed from '../../components/feed'
import useFetch from '../../hooks/useFetch'
import Pagination from '../../components/pagination'
import { getPaginator, limit } from '../../utils'
import PopularTags from '../../components/popularTags'
import Loading from '../../components/loading'
import ErrorMessage from '../../components/errorMessage'
import FeedToggler from '../../components/feedToggler'
import Banner from '../../components/banner'

import { CurrentUserContext } from '../../contexts/currentUser'

const YourFeed = ({ location, match }) => {
  const [currentUserState] = useContext(CurrentUserContext)

  const { offset, currentPage } = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset,
  })
  const apiUrl = `/articles/feed?${stringifiedParams}`
  const currentUrl = match.url
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl)
  console.log(response)
  useEffect(() => {
    doFetch()
  }, [currentPage, doFetch])

  return (
    <div className='home-page'>
      <Banner />
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
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

export default YourFeed
