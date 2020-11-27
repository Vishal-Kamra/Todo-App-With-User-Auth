import React from "react"
import Home from "./Components/Home"
import Login from "./Components/Login"
import CreateUser from "./Components/Create User"
import PageNotFound from "./Components/PageNotFound"
import PrivateRoute from "./Components/PrivateRoute"
import AuthRedirect from "./Components/AuthRedirect"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

const App = () => {
  return(
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/home" component={Home} />
        <AuthRedirect exact path="/login" component={Login} />
        <AuthRedirect exact path="/signup" component={CreateUser} />
        <Route component={PageNotFound} />
      </Switch>
      <p className="created-by">Created By Vishal ❤</p>
    </Router>
  )
}

export default App;