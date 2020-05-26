import React, { useState } from 'react'
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBDataTable,MDBRow,MDBCol } from 'mdbreact'
import { useEffect } from 'react'
import { getDailies, updateDaily, deleteDaily } from '../client'
import DailyModal from '../components/dailyModal'
import * as moment from 'moment'
import DailyUpdate from '../components/dailyUpdate'
import Swal from "sweetalert2";

let data = {
	columns: [
		{
			label:"Data",
			field:"date",
			sort:"asc"
		},
		{
			label:"Regione",
			field:"region",
			sort:"asc"
		},
		{
			label:"Positivi",
			field:"positives",
			sort:"asc"
		},
		{
			label:"Isolamento",
			field:"isolated",
			sort:"asc"
		},
		{
			label:"Ricoverati",
			field:"admissions",
			sort:"asc"
		},
		{
			label:"REA",
			field:"rea",
			sort:"asc"
		},
		{
			label:"Deceduti",
			field:"dead",
			sort:"asc"
		},
		{
			label:"Guariti",
			field:"healed",
			sort:"asc"
		},
		{
			label:"Tamponi",
			field:"tampons"
		},
		{
			label:"",
			field:"update",
			sort:"disabled"
		},
		{
			label:"",
			field:"delete",
			sort:"disabled"
		}
	],
	rows: []
}

const Daily = () => {
	const [dailies, setDailies] = useState([])
	const [modal, setModal] = useState(false)
	const [dailyIndex, setIndex] = useState(0)
	const [updateModal, setUpdateModal] = useState(false)
	const [tableData, setTableData] = useState({})

	const generateTable = (res) => {
		let newData = {...data}
		newData.rows = []
		res.forEach((e, index) => {
			newData.rows.push({
				date: moment(e.date).format("DD/MM/YYYY"),
				region: e.region.name,
				positives:e.positives,
				isolated:e.isolated || 0,
				admissions: e.admissions,
				rea: e.rea,
				dead: e.dead,
				healed: e.healed,
				tampons: e.tampons,
				update:<MDBIcon icon="edit" size="lg" className="grey-text" onClick={() => {
					setIndex(index)
					setUpdateModal(!updateModal)
				}} > </MDBIcon>,
				delete: <MDBIcon icon="trash" size="lg" className="grey-text" onClick={() => {
					deleteDaily(e._id).then(() => {
						Swal.fire("Cancellato!", "Daje!", "success")
					})
				}} ></MDBIcon>
			})
		})
		return newData
	}

	useEffect(() => {
		getDailies().then((res) => {
			setDailies(res.data.dailies)

			setTableData(generateTable(res.data.dailies))
		})
	}, [])
	return (
		<MDBContainer>
			<MDBRow>
			<MDBCol md="12">
			<h4 className="text-center grey-text pt-3 mt-5 mb-5">DATI GIORNALIERI</h4>

			<DailyModal isOpen={modal} toggle={() => setModal(!modal)} update={() => {
						getDailies().then((res) => {
							setDailies(res.data.dailies)
							setTableData(generateTable(res.data.dailies))
						})
			}} />
			{dailies.length > 0 && 	<DailyUpdate isOpen={updateModal} toggle={() => setUpdateModal(!updateModal)} update={() => {
						getDailies().then((res) => {
							setDailies(res.data.dailies)
							setTableData(generateTable(res.data.dailies))
						})
			}} daily={dailies[dailyIndex]} />}
			<div className="text-center">
			<MDBBtn color="cyan" onClick={() => {
						setModal(!modal)
					}}>Aggiungi</MDBBtn>
			</div>
			<MDBDataTable noBottomColumns 
			btn
			entriesLabel=""
			infoLabel={["Da", "a", "di", "record"]}
			paginationLabel={["Prec", "Suc"]}
			searchLabel="Cerca"
			noRecordsFoundLabel="Nessun dato trovato"
			striped
      		bordered
	  		hover
	  		responsive
			data={tableData} />
			<div className="text-center mb-4">
			<MDBBtn color="cyan" onClick={() => {
						setModal(!modal)
					}}>Aggiungi</MDBBtn>
			</div>
		</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default Daily