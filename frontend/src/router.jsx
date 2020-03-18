import {Route, Redirect, Switch} from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Regions from './pages/Regions'
import Daily from './pages/Daily'

const AuthedRoute = ({path, exact, component}) => {
	return localStorage.getItem("jwt") ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/login" />
}

const Router = () => {
	return (
		<Switch>
			<Route path="/login" component={Login} />
			<AuthedRoute path="/" exact component={Home} />
			<AuthedRoute path="/region" exact component={Regions} />
			<AuthedRoute path="/daily" exact component={Daily} />
			<Route path="/register" component={Register} />
			<Redirect to="/login" />
		</Switch>
	)
}

export default Router