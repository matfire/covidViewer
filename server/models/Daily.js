const mongoose = require("mongoose")

const Daily = mongoose.model("daily", new mongoose.Schema({
	date: Date,
	region: {type: mongoose.Schema.Types.ObjectId, ref:"region"},
	dead: Number,
	admissions: Number,
	healed: Number,
	positives: Number,
	rea: Number,
	tampons: Number
}))

module.exports = Daily