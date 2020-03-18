import React from 'react'
import { useState } from 'react'
import { Line } from "react-chartjs-2";
import { useEffect } from 'react';
import * as moment from 'moment'


const TotalOverview = ({data, start, end}) => {
	const [set, setData] = useState({
		datasets: []
	})

	useEffect(() => {
		let regionData = data.filter((d) => new Date(d.date).getTime() >= start.getTime() && new Date(d.date).getTime() <= end.getTime())
		const datesets = []
		const labels = []
		
		const healed = {label:"Guariti", fill:true, data:[], backgroundColor:"#9AE19D"}
		const dead = {label:"Decessi", fill:true, data:[], backgroundColor:"#A71D31"}
		const positives = {label:"Positivi", fill:true, data:[]}
		const admissions = {label:"Ricoverati", fill:true, data:[]}
		const reanimation = {label:"REA", fill:true, data:[]}
		const tampons = {label:"Tamponi", fill:true, data:[]}
		const isolated = {label:"Isolamento", fill:true, data:[]}
		regionData.forEach((r) => {
			let date = moment(r.date).format("DD/MM").toString()
			if (labels.indexOf(date) < 0) {
				labels.push(date)
				healed.data.push(r.healed)
				dead.data.push(r.dead)
				positives.data.push(r.positives)
				admissions.data.push(r.admissions)
				reanimation.data.push(r.rea)
				tampons.data.push(r.tampons)
				isolated.data.push(r.isolated || 0)
			} else {
				let index = labels.indexOf(date)
				healed.data[index] += r.healed
				dead.data[index] += r.dead
				positives.data[index] += r.positives
				admissions.data[index] += r.admissions
				reanimation.data[index] += r.rea
				tampons.data[index] += r.tampons
				isolated.data[index] += r.isolated || 0
			}

		})


		setData(old => ({labels, datasets: [positives, isolated, admissions, reanimation, dead, healed, tampons]}))
	}, [data, start, end])
	return (
		<Line data={set} options={{responsive:true, tooltips:{mode:"index", intersect:false, position:"nearest"}, hover:{mode:"nearest", intersect:true}}} />
	)
}

export default TotalOverview