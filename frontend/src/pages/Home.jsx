import React, { useState, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBBtn, MDBNavbar, MDBNavbarBrand, MDBHamburgerToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCol, MDBCard, MDBCardBody, MDBSelect, MDBDatePicker } from 'mdbreact'
import {getRegions, getDailies} from '../client' 
import RegionOverview from '../components/regionOverview'

import moment from 'moment';
import 'moment/locale/it';

const Home = () => {
	const [dailies, setDailies] = useState([])
	const [regions, setRegions] = useState([])
	const [regionIndex, setRegionIndex] = useState(0)
	const [startRegionDate, setRegionStartDate] = useState(new Date())
	const [endRegionDate, setRegionEndDate] = useState(new Date())
	useEffect(() => {
		getRegions().then(res => {
			let data = []
			res.data.regions.forEach((d, index) => {
				data.push({value:d._id, text:d.name, checked:index === 0})
			})
			setRegions(data)
		})
		getDailies().then(res => {
			setDailies(res.data.dailies)
			setRegionStartDate(new Date(res.data.dailies[0].date))
			setRegionEndDate(new Date(res.data.dailies[res.data.dailies.length - 1].date))
		})
	}, [])
	return (
		<MDBContainer size="xl">
			<MDBRow className="mt-5">
				{regions.length > 0 && <MDBCol size="12">
					<MDBCard>
						<MDBCardBody>
							<MDBRow>
								<MDBCol md="4" sm="12">
									<MDBSelect options={regions} search getValue={(value) => {
										let r = regions.findIndex(e => {
											return (e.value == value)
										})
										console.log(r)
										setRegionIndex(r)
									}}/>
								</MDBCol>
								<MDBCol md="4" sm="12">
									<MDBDatePicker autoOk value={startRegionDate} getValue={setRegionStartDate} locale={moment.locale('it')} 
				cancelLabel='Cancella'
				theme={{
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#00bcd4',
      contrastText: '#00bcd4',
    },
  },
  typography: {
    useNextVariants: true,
  }
}}/>
								</MDBCol>
								<MDBCol md="4" sm="12">
									<MDBDatePicker autoOk value={endRegionDate} getValue={setRegionEndDate} locale={moment.locale('it')} 
				cancelLabel='Cancella'
				theme={{
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#00bcd4',
      contrastText: '#00bcd4',
    },
  },
  typography: {
    useNextVariants: true,
  }
}}/>
								</MDBCol>
							</MDBRow>
							<RegionOverview region={regions[regionIndex].value} data={dailies} start={startRegionDate} end={endRegionDate} />
						</MDBCardBody>
					</MDBCard>
				</MDBCol>}
				
			</MDBRow>
		</MDBContainer>
	)
}

export default Home