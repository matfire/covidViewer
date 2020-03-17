import axios from 'axios'

const api = axios.create({
	baseURL:  process.env.NODE_ENV === "production" ? "https://covid-dun.now.sh" : "http://localhost:4000"	
})


const login = (email, password) => {
	return api.post("/login", {email, password})
}

const register = (email, password) => {
	return api.post("/register", {email, password})
}

const getRegions = () => {
	return api.get("/regions", {
		headers: {
			Authorization: localStorage.getItem("jwt")
		}
	})
}

const createRegion = (name, population) => {
	return api.post("/regions", {name, population}, {
		headers: {
			Authorization: localStorage.getItem("jwt")
		}
	})
}

const updateRegion = (id, name, population) => {
	return api.patch(`/regions/${id}`, {name, population}, {
		headers: {
			Authorization: localStorage.getItem("jwt")
		}
	})
}

const getDailies = () => {
	return api.get("/daily", {
		headers: {
			Authorization: localStorage.getItem("jwt")
		}
	})
}

const createDaily = (data) => {
	return api.post("/daily", data, {
		headers : {
			Authorization: localStorage.getItem("jwt")
		}
	})
}

const updateDaily = (id, data) => {
	return api.patch(`/daily/${id}`, data, {
		headers: {
			Authorization: localStorage.getItem("jwt")
		}
	})
}

export {login, register, getRegions, createRegion, updateRegion, getDailies, createDaily, updateDaily}