import React, { useState, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBBtn, MDBNavbar, MDBNavbarBrand, MDBHamburgerToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCol, MDBCard, MDBCardBody, MDBSelect } from 'mdbreact'
import {getRegions, getDailies} from '../client' 
import RegionOverview from '../components/regionOverview'

const Home = () => {
	const [dailies, setDailies] = useState([])
	const [regions, setRegions] = useState([])
	const [regionIndex, setRegionIndex] = useState(0)
	useEffect(() => {
		getRegions().then(res => {
			let data = []
			res.data.regions.forEach((d, index) => {
				data.push({value:d._id, text:d.name, checked:index === 0})
			})
			setRegions(data)
		})
		getDailies().then(res => setDailies(res.data.dailies))
	}, [])
	return (
		<MDBContainer fluid>
			<MDBRow className="mt-5">
				{regions.length > 0 && <MDBCol size="12">
					<MDBCard>
						<MDBCardBody>
							<MDBSelect options={regions} search getValue={(value) => {
								let r = regions.findIndex(e => {
									return (e.value == value)
								})
								console.log(r)
								setRegionIndex(r)
							}}/>
							<RegionOverview region={regions[regionIndex].value} data={dailies} />
						</MDBCardBody>
					</MDBCard>
				</MDBCol>}
				
			</MDBRow>
		</MDBContainer>
	)
}

export default Home