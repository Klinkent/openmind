/* eslint-disable import/prefer-default-export */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store/configureStore/reducers'
import Routes from './routes'
import Topbar from './components/topBar'
import { CurrentUserProvider } from './contexts/currentUser'
import CurrentUserChecker from './components/currentUserChecker'

// а тут правильно заимплеменчен стор или нет?
export const App = () => {
  return (
    <Provider store={store}>
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <Topbar />
            <Routes />
          </Router>
        </CurrentUserChecker>
      </CurrentUserProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
