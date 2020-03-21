import {Route, Redirect, Switch} from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Regions from './pages/Regions'
import Daily from './pages/Daily'

const AuthedRoute = ({path, exact, component, prot}) => {
	if (prot) {
		let user = localStorage.getItem("user")
		if (user) {
			user = JSON.parse(user)
			if (["mgassend@gmail.com", "bgassend@me.com", "lucia.taras@me.com"].indexOf(user.email) >= 0) {
				return <Route path={path} exact={exact} component={component} />
			} else {
				return <Redirect to="/login" />
			}
		} else {
			return <Redirect to="/login" />
		}
	} else {
		if (localStorage.getItem("jwt")) {
			return <Route path={path} exact={exact} component={component} />
		} else {
			return <Redirect to="/login" />
		}
	}
}

const Router = () => {
	return (
		<Switch>
			<Route path="/login" exact component={Login} />
			<AuthedRoute path="/region" exact component={Regions} prot />
			<AuthedRoute path="/daily" exact component={Daily} prot />
			<Route path="/register" exact component={Register} />
			<AuthedRoute path="/" exact component={Home} />
			<Redirect to="/login" />
		</Switch>
	)
}

export default Router