import React from 'react'
import { Link } from 'react-router-dom'

import AddToFavorites from './addToFavourites'

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, slug) => (
        <div className='article-preview' key={slug}>
          <div className='article-meta'>
            <Link to={`/profiles/${article.author.username}`}>
              <img src={article.author.image} alt='' />
            </Link>
            <div className='info'>
              <Link
                to={`/profiles/${article.author.username}`}
                className='author'
              >
                {article.author.username}
              </Link>
              <span className='date'>{article.createdAt}</span>
            </div>
            <div className='pull-xs-right'>
              <AddToFavorites
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                articleSlug={article.slug}
              />
            </div>
          </div>
          <Link to={`/articles/${article.slug}`} className='preview-link'>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Читать далее</span>
            <ul className='tag-list'>
              {article.tagList.map((tag) => (
                <li key={tag} className='tag-default tag pill tag-outline'>
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Feed
