import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow, MDBCol, MDBInput, MDBDatePicker, MDBSelect } from 'mdbreact'
import { useState } from 'react'
import { createDaily, getRegions, updateDaily } from '../client'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const DailyUpdate = ({isOpen, toggle, update, daily}) => {
	const [regions, setRegions] = useState([])
	const [region, setRegion] = useState("")
	const [date, setDate] = useState(new Date())
	const [dead, setDead] = useState(0)
	const [admissions, setAdmissions] = useState(0)
	const [healed, setHealed] = useState(0)
	const [positives, setPositives] = useState(0)
	const [rea, setRea] = useState(0)
	const [tampons, setTampons] = useState(0)
	const [isolated, setIsolated] = useState(0)

	useEffect(() => {
		getRegions().then((res) => {
			const data = res.data.regions
			let result = []
			data.map((s) => {
				result.push({
					value:s._id,
					text: s.name,
					checked:s._id === daily.region._id
				})
			})
			setRegions(result)
			setDate(daily.date)
			setDead(daily.dead)
			setAdmissions(daily.admissions)
			setHealed(daily.healed)
			setPositives(daily.positives)
			setRea(daily.rea)
			setTampons(daily.tampons)

		})
	}, [daily])
	return (
		<MDBModal isOpen={isOpen}toggle={() => toggle()}>
			<MDBModalHeader toggle={() => toggle()}>Daily</MDBModalHeader>
			<MDBModalBody>
				<MDBDatePicker autoOk value={date} getValue={(value) => setDate(value)} />
				<MDBSelect getValue={(v) => setRegion(v)} selected="Scegli la regione"  options={regions} search/>
				<MDBRow>
					<MDBCol md="6" sm="12">
						<MDBInput value={positives} type="number" getValue={(v) => setPositives(v)} label="Positivi" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput value={isolated} type="number" getValue={(v) => setIsolated(v)} label="Isolamento" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput value={admissions} type="number" getValue={(v) => setAdmissions(v)} label="Ricoverati" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput value={rea} type="number" getValue={(v) => setRea(v)} label="Rea" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput value={dead} type="number" getValue={(v) => setDead(v)} label="Deceduti" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput value={healed} type="number" getValue={(v) => setHealed(v)} label="Guariti" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput value={tampons} type="number" getValue={(v) => setTampons(v)} label="Tamponi" />
					</MDBCol>
				</MDBRow>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="danger" onClick={() => {
					toggle()
				}}>Close</MDBBtn>
				<MDBBtn color="primary" onClick={() => {
					if (!region || dead < 0 || admissions < 0 || healed < 0 || positives < 0 || rea < 0 || tampons < 0 || isolated < 0) {
						Swal.fire("Oops!", "Please fill in all the fields", "error")
						return
					}
					updateDaily(daily._id, {date, dead, admissions, healed, positives, rea, tampons, region, isolated}).then(() => {
						update()
						toggle()
					})
				}}>Submit</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}

export default DailyUpdate