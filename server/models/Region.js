const mongoose = require("mongoose")

const Region = mongoose.model("region", new mongoose.Schema({
	name:{type:String, unique:true},
	population: Number
}))

module.exports = Region