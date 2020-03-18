import React, { useState } from 'react'
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBDataTable } from 'mdbreact'
import { useEffect } from 'react'
import { getDailies, updateDaily } from '../client'
import DailyModal from '../components/dailyModal'
import * as moment from 'moment'
import DailyUpdate from '../components/dailyUpdate'
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
			field:"update"
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
				update:<MDBBtn flat floating color="primary" onClick={() => {
					setIndex(index)
					setUpdateModal(!updateModal)
				}}><MDBIcon icon="edit"/></MDBBtn>
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
			<div className="text-center mt-3">
				<h3>Dati Giornalieri</h3>
			</div>
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
			<MDBDataTable
			btn
			autoWidth
			entriesLabel="Mostra Dati"
			infoLabel={["Mostrando da", "a", "su", "entrate"]}
			paginationLabel={["Precedente", "Successivo"]}
			searchLabel="Cerca"
			noRecordsFoundLabel="Nessun dato trovato"
			responsive
			data={tableData} />
			<div className="text-center">
			<MDBBtn color="primary" onClick={() => {
						setModal(!modal)
					}}>+</MDBBtn>
			</div>
			{/* <MDBTable>
				<MDBTableHead>
					<tr>
						<th>Data</th>
						<th>Regione</th>
						<th>Positivi</th>
						<th>Isolamento</th>
						<th>Ricoverati</th>
						<th>Rea</th>
						<th>Deceduti</th>
						<th>Guariti</th>
						<th>Tamponi</th>
						<th></th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{dailies.map((d, index) => (
						<tr key={d._id}>
							<td>{moment(d.date).format("DD/MM/YYYY")}</td>
					<td>{d.region.name}</td>
					<td>{d.positives}</td>
					<th>{d.isolated || 0}</th>
					<td>{d.admissions}</td>
					<td>{d.rea}</td>
					<td>{d.dead}</td>
					<td>{d.healed}</td>
					<td>{d.tampons}</td>
					<td><MDBBtn floating flat color="primary" onClick={() => {
								setIndex(index)
								setUpdateModal(!updateModal)
							}} ><MDBIcon icon="edit" size="3x" /></MDBBtn></td>
					</tr>
					))}
					<tr>
					<th colSpan="9" className="text-center"><MDBBtn color="primary" onClick={() => {
						setModal(!modal)
					}}>+</MDBBtn></th>
					</tr>
				</MDBTableBody>
			</MDBTable> */}
		</MDBContainer>
	)
}

export default Daily