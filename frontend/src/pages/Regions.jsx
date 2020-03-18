import React, { useState, useEffect } from 'react'
import {MDBContainer, MDBDataTable, MDBTable, MDBTableHead, MDBTableBody, MDBTableFoot, MDBBtn, MDBIcon,MDBRow,MDBCol} from 'mdbreact'
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
			<MDBRow>
			<MDBCol md="6" className="offset-md-3">
			<h4 className="text-center grey-text pt-3 mt-5 mb-5">REGIONI</h4>
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
						<th>Regioni</th>
						<th>Popolazione</th>
						<th></th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{regions.map((r, index) => (
						<tr key={r._id}>
							<td>{r.name}</td>
							<td>{r.population.toLocaleString("fr-FR")}</td>
							<td align="center"><MDBIcon icon="edit" size="lg" className="grey-text" onClick={() => {
								setRegionIndex(index)
								setUpdateModal(!updateModal)
							}} > </MDBIcon>
							</td>
						</tr>
					))}
					<tr>
					<th colSpan="3" className="text-center"><MDBBtn color="cyan" onClick={() => {
						setModal(!modal)
					}}>AGGIUNGI</MDBBtn></th>
					</tr>
				</MDBTableBody>
			</MDBTable>
			</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}


export default Regions