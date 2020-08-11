import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from './components/globalFeed'
import Article from './pages/article'
import Authentication from './pages/authentication'
import Settings from './pages/settings'

const Routes = (props) => {
  return (
    <Switch>
      <Route path='/' component={GlobalFeed} exact />
      <Route path='/articles/:slug' component={Article} />
      <Route path='/settings' component={Settings} exact />
      <Route path='/login' component={Authentication} />
      <Route path='/register' component={Authentication} />
    </Switch>
  )
}

export default Routes
