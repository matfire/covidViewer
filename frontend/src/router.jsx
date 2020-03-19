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
			<Route path="/login" exact component={Login} />
			<AuthedRoute path="/region" exact component={Regions} />
			<AuthedRoute path="/daily" exact component={Daily} />
			<Route path="/register" exact component={Register} />
			<AuthedRoute path="/" exact component={Home} />
			<Redirect to="/login" />
		</Switch>
	)
}

export default Router