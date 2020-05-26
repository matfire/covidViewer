import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow, MDBCol, MDBInput, MDBDatePicker, MDBSelect } from 'mdbreact'
import { useState } from 'react'
import { createDaily, getRegions } from '../client'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import moment from 'moment';
import 'moment/locale/it';

const DailyModal = ({isOpen, toggle, update}) => {
	const [regions, setRegions] = useState([])
	const [region, setRegion] = useState("")
	const [date, setDate] = useState(new Date())
	const [dead, setDead] = useState(0)
	const [admissions, setAdmissions] = useState(0)
	const [healed, setHealed] = useState(0)
	const [positives, setPositives] = useState(0)
	const [rea, setRea] = useState(0)
	const [isolated, setIsolated] = useState(0)
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
			<MDBModalBody>
			<h4 className="text-center mt-3 cyan-text">Aggiungi report</h4>
				<MDBDatePicker autoOk value={date} getValue={(value) => setDate(value)} locale={moment.locale('it')} 
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
				<MDBSelect getValue={(v) => setRegion(v)} selected="Scegli la regione"  options={regions} search searchLabel="Cerca"/>
				<MDBRow>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setAdmissions(v)} label="Ricoverati" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setRea(v)} label="Rea" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setIsolated(v)} label="Isolamento" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setPositives(v)} label="Positivi" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setHealed(v)} label="Guariti" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setDead(v)} label="Deceduti" />
					</MDBCol>
					<MDBCol md="6" sm="12">
						<MDBInput type="number" getValue={(v) => setTampons(v)} label="Tamponi" />
					</MDBCol>
				</MDBRow>
			</MDBModalBody>
			<div className="text-center mb-5">
				<MDBBtn color="cyan" onClick={() => {
					if (dead < 0 || admissions <  0|| healed < 0  || positives < 0 || rea < 0 || tampons < 0 || isolated < 0 || !region) {
						Swal.fire("Oops!", "Please fill in all the fields", "error")
						return
					}
					createDaily({date, dead, admissions, healed, positives, rea, tampons, region, isolated}).then(() => {
						setDate(new Date())
						update()
						toggle()
					})
				}}>Aggiungi</MDBBtn>


<MDBBtn outline color="grey-text" onClick={() => toggle()}>Annulla</MDBBtn>
			</div>
		</MDBModal>
	)
}

export default DailyModal