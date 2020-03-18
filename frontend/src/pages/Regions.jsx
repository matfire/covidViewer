import React, { useState, useEffect } from 'react'
import {MDBContainer, MDBDataTable, MDBTable, MDBTableHead, MDBTableBody, MDBTableFoot, MDBBtn, MDBIcon} from 'mdbreact'
import { getRegions } from '../client'
import RegionModal from '../components/regionModal'
import RegionUpdate from '../components/regionUpdate'
const Regions = () => {
	const [regions, setRegions] = useState([])
	const [modal, setModal] = useState(false)
	const [regionIndex, setRegionIndex] = useState(0)
	const [updateModal, setUpdateModal] = useState(false)
	useEffect(() => {
		getRegions().then((res) => {
			setRegions(res.data.regions)
		})
	}, [])
	return (
		<MDBContainer>
			<RegionModal isOpen={modal} toggle={() => setModal(!modal)} update={() => {
						getRegions().then((res) => {
							setRegions(res.data.regions)
						})
			}} />
			{regions.length > 0 && <RegionUpdate region={regions[regionIndex]} update={() => {
										getRegions().then((res) => {
											setRegions(res.data.regions)
										})
			}} isOpen={updateModal} toggle={() => setUpdateModal(!updateModal)}
			/>}
			
			<MDBTable>
				<MDBTableHead>
					<tr>
						<th>Name</th>
						<th>Population</th>
						<th></th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{regions.map((r, index) => (
						<tr key={r._id}>
							<td>{r.name}</td>
							<td>{r.population.toLocaleString("fr-FR")}</td>
							<td><MDBBtn floating flat color="primary" onClick={() => {
								setRegionIndex(index)
								setUpdateModal(!updateModal)
							}} ><MDBIcon icon="edit" size="3x" /></MDBBtn></td>
						</tr>
					))}
					<tr>
					<th colSpan="3" className="text-center"><MDBBtn color="primary" onClick={() => {
						setModal(!modal)
					}}>+</MDBBtn></th>
					</tr>
				</MDBTableBody>
			</MDBTable>
		</MDBContainer>
	)
}


export default Regions