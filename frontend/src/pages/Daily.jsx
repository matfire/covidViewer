import React, { useState } from 'react'
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon } from 'mdbreact'
import { useEffect } from 'react'
import { getDailies, updateDaily } from '../client'
import DailyModal from '../components/dailyModal'
import * as moment from 'moment'
import DailyUpdate from '../components/dailyUpdate'
const Daily = () => {
	const [dailies, setDailies] = useState([])
	const [modal, setModal] = useState(false)
	const [dailyIndex, setIndex] = useState(0)
	const [updateModal, setUpdateModal] = useState(false)
	useEffect(() => {
		getDailies().then((res) => {
			setDailies(res.data.dailies)
		})
	}, [])
	return (
		<MDBContainer>
			<DailyModal isOpen={modal} toggle={() => setModal(!modal)} update={() => {
						getDailies().then((res) => {
							setDailies(res.data.dailies)
						})
			}} />
			{dailies.length > 0 && 	<DailyUpdate isOpen={updateModal} toggle={() => setUpdateModal(!updateModal)} update={() => {
						getDailies().then((res) => {
							setDailies(res.data.dailies)
						})
			}} daily={dailies[dailyIndex]} />}
			<MDBTable>
				<MDBTableHead>
					<tr>
						<th>Date</th>
						<th>Region</th>
						<th>Deads</th>
						<th>Admissions</th>
						<th>Healed</th>
						<th>Positives</th>
						<th>Reanimations</th>
						<th>Swobs</th>
						<th></th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{dailies.map((d, index) => (
						<tr key={d._id}>
							<td>{moment(d.date).format("DD/MM/YYYY")}</td>
					<td>{d.region.name}</td>
					<td>{d.dead}</td>
					<td>{d.admissions}</td>
					<td>{d.healed}</td>
					<td>{d.positives}</td>
					<td>{d.rea}</td>
					<td>{d.tampons}</td>
					<td><MDBBtn floating flat color="primary" onClick={() => {
								setIndex(index)
								setUpdateModal(!updateModal)
							}} ><MDBIcon icon="edit" size="3x" /></MDBBtn></td>
					</tr>
					))}
					<tr>
					<th colSpan="8" className="text-center"><MDBBtn color="primary" onClick={() => {
						setModal(!modal)
					}}>+</MDBBtn></th>
					</tr>
				</MDBTableBody>
			</MDBTable>
		</MDBContainer>
	)
}

export default Daily