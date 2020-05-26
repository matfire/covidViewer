const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const User = require("./models/User")
const Region = require("./models/Region")
const Daily = require("./models/Daily")
const jwt = require("jsonwebtoken")
const app = express()

const SECRET = "thisisasecret"

const connection = mongoose.connect("mongodb://Matteo:Galako99@ds329668.mlab.com:29668/covid19", {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection

db.once("open", () => {
	console.log("db connected")
})

db.on("error", (err) => {
	console.log(err)
})

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())

// user authentication

app.post("/register", async(req, res) => {
	let {email, password} = req.body
	let crypted = bcrypt.hashSync(password, 12)

	try {
		let user = await User.create({email, password:crypted})
		res.json({token: jwt.sign(JSON.stringify(user), SECRET), user:JSON.stringify("user")})
	} catch (error) {
		res.status(401).json({type:"error", message:"account already exists"})
	}
})

app.post("/login", async(req, res) => {
	let {email, password} = req.body

	let user = await User.findOne({email})
	if (!user) {
		res.status(401).json({type:"error", message:"no user found"})
		return
	}
	if (bcrypt.compareSync(password, user.password)) {
		res.json({token: jwt.sign(JSON.stringify(user), SECRET), user:JSON.stringify(user)})
	} else {
		res.status(401).json({type:"error", message:"wrong credentials"})
	}
})

app.post("/password/change", async(req, res) => {
	const {email, password} = req.body

	const user = await User.findOne({email})
	if (!user) res.json({type:"error", message:"no user found"})
	user.password = bcrypt.hashSync(password, 12)
	await user.save()
	res.json({type:"success", message:"password modified"})
})

const isAuthenticated = async(req, res, next) => {
	let token = req.headers.authentication || req.headers.Authetication || req.headers.Authorization || req.headers.authorization || ""
	if (token === "")
		res.status(401).json({type:"error", message:"invalid token"})
	req.user = jwt.decode(token)
	next()
}

// region management

app.get("/regions", isAuthenticated ,async(req, res) => {
	const regions = await Region.find().sort("name")
	res.json({regions})
})

app.patch("/regions/:id", isAuthenticated, async(req, res) => {
	const region = await Region.findById(req.params.id)
	if (req.body.name) {
		region.name = req.body.name
	}
	if (req.body.population) {
		region.population = req.body.population
	}
	await region.save()
	res.json({region})
})

app.post("/regions", isAuthenticated, async(req, res) => {
	const {name, population} = req.body
	try {
		const region = await Region.create({name, population})
		res.json({region})
	} catch (error) {
		res.status(401).json({type:"error", message:"region already exists"})
	}
})

// daily management

app.get("/daily", isAuthenticated, async(req, res) => {
	const dailies = await Daily.find().populate("region").sort("date")
	res.json({dailies})
})

app.post("/daily", isAuthenticated, async(req, res) => {
	res.json({daily: await Daily.create(req.body)})
})

app.patch("/daily/:id", isAuthenticated, async(req, res) => {
	let daily = await Daily.findById(req.params.id)
	Object.keys(req.body).forEach((k) => {
		daily[k] = req.body[k]
	})
	daily = await daily.save()
	res.json({daily})
})

app.delete("/daily/:id", isAuthenticated, async(req, res) => {
	await Daily.findByIdAndRemove(req.params.id)
	res.json({success:true})
})


app.get("/", (req, res) => {
	res.send('🚁')
})

app.listen(4000, () => {
	console.log("listening on port 4000")
})