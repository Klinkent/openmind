import React, { useEffect } from 'react'
import { stringify } from 'query-string'

import Loading from '../../../components/loading'
import ErrorMessage from '../../../components/errorMessage'
import Feed from '../../../components/feed'
import Pagination from '../../../components/pagination'
import useFetch from '../../../hooks/useFetch'

import { getPaginator, limit } from '../../../utils'

const getApiUrl = ({ username, offset, isFavorites }) => {
  // чтобы лайкнуть пост - мы отправляем post-запрос на ../favourites, когда диз -- delete-запрос
  const params = isFavorites // меняет параметры запроса, если статья в любимых
    ? {
        limit,
        offset,
        favorited: username,
      }
    : {
        limit,
        offset,
        author: username,
      }
  return `/articles?${stringify(params)}` // /articles?author=BTRRTBhbj&limit=10&offset=0
}

const UserArticles = ({ username, location, url }) => {
  const isFavorites = location.pathname.includes('favorites')
  const { offset, currentPage } = getPaginator(location.search)

  // Добавляет url для страницы пролайканных статей, нужно для корректной работы пагинации
  const addFavoritesUrl = isFavorites ? `/favorites` : ''

  const apiUrl = getApiUrl({ username, offset, isFavorites })
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites, currentPage])

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url + addFavoritesUrl}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  )
}

export default UserArticles
