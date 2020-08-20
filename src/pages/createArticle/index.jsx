import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux'
import ArticleForm from '../../components/articleForm'
import useFetch from '../../hooks/useFetch'

const CreateArticle = () => {
  const apiUrl = '/articles'
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
  const [{ response, error }, doFetch] = useFetch(apiUrl)
  const currentUserState = useSelector((state) => state.currentUser)

  const onSubmit = (article) => {
    doFetch({
      method: 'post',
      data: {
        article,
      },
    })
  }
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: '',
  }

  useEffect(() => {
    if (!response) {
      return
    }
    setIsSuccessfullSubmit(true)
  }, [response])

  if (currentUserState.isLoggedIn === null) {
    return null
  }

  if (isSuccessfullSubmit || currentUserState.isLoggedIn === false) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
      />
    </div>
  )
}

export default CreateArticle
