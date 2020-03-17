import {Route, Redirect, Switch} from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Regions from './pages/Regions'
import Daily from './pages/Daily'

const Router = () => {
	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/" exact component={Home} />
			<Route path="/region" exact component={Regions} />
			<Route path="/daily" exact component={Daily} />
			<Route path="/register" component={Register} />
			<Redirect to="/login" />
		</Switch>
	)
}

export default Router