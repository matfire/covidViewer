import React, { useState, useEffect } from "react"
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput } from "mdbreact"
import Swal from 'sweetalert2'
import { createRegion, updateRegion } from "../client"

const RegionUpdate = ({isOpen, toggle, update, region}) => {
	const [name, setName] = useState("")
	const [population, setPopulation] = useState(0)
	useEffect(() => {
		setName(region.name)
		setPopulation(region.population)
	}, [region])
	return (
		<MDBModal isOpen={isOpen} toggle={() => toggle()}>
			<MDBModalBody>
			<h4 className="text-center mt-3 cyan-text">Aggiorna {name}</h4>
				<MDBInput value={name} type="text" label="name" getValue={(value) => setName(value)} />
				<MDBInput value={population} type="number" label="population" getValue={(value) => setPopulation(value)} />
			</MDBModalBody>
			<div className="text-center mb-5">
				<MDBBtn color="cyan" onClick={() => {
					if (!name || population < 1) {
						Swal.fire("Oops!", "Please fill in all the fields", "error")
						return
					}
					updateRegion(region._id, name, population).then(() => {
						update()
						toggle()
					})
				}}>Aggiorna</MDBBtn>
<MDBBtn outline color="grey-text" onClick={() => toggle()}>Annulla</MDBBtn>
			</div>
		</MDBModal>
	)
}

export default RegionUpdate