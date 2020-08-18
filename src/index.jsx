/* eslint-disable import/prefer-default-export */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes'
import Topbar from './components/topBar'
import Banner from './components/banner'
import { CurrentUserProvider } from './contexts/currentUser'
import CurrentUserChecker from './components/currentUserChecker'

export const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <Topbar />
          <Banner />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
