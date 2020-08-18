import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from './components/globalFeed'
import Article from './pages/article'
import Authentication from './pages/authentication'
import YourFeed from './pages/yourFeed'
import TagFeed from './pages/tagFeed'

const Routes = (props) => {
  return (
    <Switch>
      <Route path='/' component={GlobalFeed} exact />
      <Route path='/feed' component={YourFeed} exact />
      <Route path='/tags/:slug' component={TagFeed} />
      <Route path='/articles/:slug' component={Article} />
      <Route path='/login' component={Authentication} />
      <Route path='/register' component={Authentication} />
    </Switch>
  )
}

export default Routes
