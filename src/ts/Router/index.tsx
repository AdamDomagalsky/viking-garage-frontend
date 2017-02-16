import * as React from 'react'
import {
  browserHistory,
  Route,
  Router,
} from 'react-router'
import Offers from '../Offers'
import Detail from '../Detail'
import NotFound from '../NotFound'
import Login from '../Login'
import Signin from '../Signin'

export default function AppRouter(props) {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Offers} />
      <Route path="/detail" component={Detail} />
      <Route path="/login" component={Login} />
      <Route path="/signin" component={Signin} />
      <Route path="*" component={NotFound} />
    </Router>
  )
}
