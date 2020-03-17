import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow, MDBCol, MDBInput, MDBDatePicker, MDBSelect } from 'mdbreact'
import { useState } from 'react'
import { createDaily, getRegions } from '../client'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
const DailyModal = ({isOpen, toggle, update}) => {
	const [regions, setRegions] = useState([])
	const [region, setRegion] = useState("")
	const [date, setDate] = useState(new Date())
	const [dead, setDead] = useState(0)
	const [admissions, setAdmissions] = useState(0)
	const [healed, setHealed] = useState(0)
	const [positives, setPositives] = useState(0)
	const [rea, setRea] = useState(0)
	const [tampons, setTampons] = useState(0)

	useEffect(() => {
		getRegions().then((res) => {
			const data = res.data.regions
			let result = []
			data.map((s) => {
				result.push({
					value:s._id,
					text: s.name
				})
			})
			setRegions(result)
		})
	}, [])
	return (
		<MDBModal isOpen={isOpen}toggle={() => toggle()}>
			<MDBModalHeader toggle={() => toggle()}>Daily</MDBModalHeader>
			<MDBModalBody>
				<MDBDatePicker getValue={(value) => setDate(value)} />
				<MDBSelect getValue={(v) => setRegion(v)} selected="Choose the region"  options={regions} search/>
				<MDBRow>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setDead(v)} label="Deads" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setAdmissions(v)} label="Admissions" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setHealed(v)} label="Healed" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setPositives(v)} label="Positives" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setRea(v)} label="Reanimations" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setTampons(v)} label="Swobs" />
					</MDBCol>
				</MDBRow>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="danger" onClick={() => {
					toggle()
				}}>Close</MDBBtn>
				<MDBBtn color="primary" onClick={() => {
					if (dead < 0 || admissions <  0|| healed < 0  || positives < 0 || rea < 0 || tampons < 0 || !region) {
						Swal.fire("Oops!", "Please fill in all the fields", "error")
						return
					}
					createDaily({date, dead, admissions, healed, positives, rea, tampons, region}).then(() => {
						update()
						toggle()
					})
				}}>Submit</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}

export default DailyModal