import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes'
import Topbar from './components/topBar'

export const App = () => {
  return (
    <Router>
      <Topbar />
      <Routes />
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
