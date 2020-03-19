import React from 'react'
import { useState } from 'react'
import { Line } from "react-chartjs-2";
import { useEffect } from 'react';
import * as moment from 'moment'


const DeltaOverview = ({data, start, end}) => {
	const [set, setData] = useState({
		datasets: []
	})

	useEffect(() => {
		let regionData = data.filter((d) => new Date(d.date).getTime() >= start.getTime() && new Date(d.date).getTime() <= end.getTime())
		const labels = []
		const healed = {label:"Guariti", fill:true, data:[], backgroundColor:"rgba(42, 113, 109, 0.20)", borderColor:"rgba(42, 113, 109, 1)",borderWidth:"1",pointBackgroundColor:"rgba(42, 113, 109, 1)"}
		const dead = {label:"Decessi", fill:true, data:[], backgroundColor:"rgba(0, 0, 0, 0.20)", borderColor:"rgba(0, 0, 0, 1)",borderWidth:"1",pointBackgroundColor:"rgba(0, 0, 0, 1)"}
		const positives = {label:"Positivi", fill:true, data:[], backgroundColor:"rgba(204, 204, 204, 0.10)", borderColor:"rgba(204, 204, 204, 1)",borderWidth:"1",pointBackgroundColor:"rgba(204, 204, 204, 1)"}
		const admissions = {label:"Ricoverati", fill:true, data:[], backgroundColor:"rgba(17, 138, 178, 0.20)", borderColor:"rgba(17, 138, 178, 1)",borderWidth:"1",pointBackgroundColor:"rgba(0, 127, 255, 1)"}
		const reanimation = {label:"REA", fill:true, data:[], backgroundColor:"rgba(174, 0, 0, 0.20)", borderColor:"rgba(174, 0, 0, 1)",borderWidth:"1",pointBackgroundColor:"rgba(174, 0, 0, 1)"}
		const isolated = {label:"Isolamento", fill:true, data:[], backgroundColor:"rgba(255, 227, 50, 0.20)", borderColor:"rgba(255, 227, 50, 1)",borderWidth:"1",pointBackgroundColor:"rgba(255, 227, 50, 1)"}
		regionData.forEach((r) => {
			let date = moment(r.date).format("DD/MM").toString()
			if (labels.indexOf(date) < 0) {
				labels.push(date)
				healed.data.push(r.healed)
				dead.data.push(r.dead)
				positives.data.push(r.positives)
				admissions.data.push(r.admissions)
				reanimation.data.push(r.rea)
				isolated.data.push(r.isolated || 0)
			} else {
				let index = labels.indexOf(date)
				healed.data[index] += r.healed
				dead.data[index] += r.dead
				positives.data[index] += r.positives
				admissions.data[index] += r.admissions
				reanimation.data[index] += r.rea
				isolated.data[index] += r.isolated || 0
			}
		})
		const dhealed = {label:"Guariti", fill:true, data:[], backgroundColor:"rgba(42, 113, 109, 0.20)", borderColor:"rgba(42, 113, 109, 1)",borderWidth:"1",pointBackgroundColor:"rgba(42, 113, 109, 1)"}
		dhealed.data = healed.data.map((e, index) => {
			if (index === 0) {
				return e
			}
			return e - healed.data[index - 1]
		})

		const ddead = {label:"Decessi", fill:true, data:[], backgroundColor:"rgba(0, 0, 0, 0.20)", borderColor:"rgba(0, 0, 0, 1)",borderWidth:"1",pointBackgroundColor:"rgba(0, 0, 0, 1)"}
		ddead.data = dead.data.map((e, index) => {
			if (index === 0) {
				return e
			}
			return (e - dead.data[index - 1])
		})
		const dpositives = {label:"Positivi", fill:true, data:[], backgroundColor:"rgba(204, 204, 204, 0.10)", borderColor:"rgba(204, 204, 204, 1)",borderWidth:"1",pointBackgroundColor:"rgba(204, 204, 204, 1)"}
		dpositives.data = positives.data.map((e, index) => {
			if (index === 0) {
				return e
			}
			return (e - positives.data[index - 1])
		})
		const dadmissions = {label:"Ricoverati", fill:true, data:[], backgroundColor:"rgba(17, 138, 178, 0.20)", borderColor:"rgba(17, 138, 178, 1)",borderWidth:"1",pointBackgroundColor:"rgba(0, 127, 255, 1)"}
		dadmissions.data = admissions.data.map((e, index) => {
			if (index === 0) {
				return e
			}
			return (e - admissions.data[index - 1])
		})
		const dreanimation = {label:"REA", fill:true, data:[], backgroundColor:"rgba(174, 0, 0, 0.20)", borderColor:"rgba(174, 0, 0, 1)",borderWidth:"1",pointBackgroundColor:"rgba(174, 0, 0, 1)"}
		dreanimation.data = reanimation.data.map((e, index) => {
			if (index === 0) {
				return e
			}
			return (e - reanimation.data[index - 1])
		})
		
		const disolated = {label:"Isolamento", fill:true, data:[], backgroundColor:"rgba(255, 227, 50, 0.20)", borderColor:"rgba(255, 227, 50, 1)",borderWidth:"1",pointBackgroundColor:"rgba(255, 227, 50, 1)"}
		disolated.data = isolated.data.map((e, index) => {
			if (index === 0) {
				return e
			}
			return (e - isolated.data[index - 1])
		})

		setData(old => ({labels, datasets: [dpositives, disolated, dadmissions, dreanimation, ddead, dhealed]}))
	}, [data, start, end])
	return (
		<Line data={set} options={{responsive:true, legend:{position:"bottom"}, tooltips:{mode:"index", intersect:false, position:"nearest"}, hover:{mode:"nearest", intersect:true}}} />
	)
}

export default DeltaOverview