import React, { useState } from "react"
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput } from "mdbreact"
import Swal from 'sweetalert2'
import { createRegion } from "../client"

const RegionModal = ({isOpen, toggle, update}) => {
	const [name, setName] = useState("")
	const [population, setPopulation] = useState(0)
	return (
		<MDBModal isOpen={isOpen} toggle={() => toggle()}>
			<MDBModalBody>
			<h4 className="text-center mt-3 cyan-text">Aggiungi regione</h4>
				<MDBInput type="text" label="name" getValue={(value) => setName(value)} />
				<MDBInput type="number" label="population" getValue={(value) => setPopulation(value)} />
			</MDBModalBody>
			<div className="text-center mb-5">
				<MDBBtn color="cyan" onClick={() => {
					if (!name || population < 1) {
						Swal.fire("Oops!", "Please fill in all the fields", "error")
						return
					}
					createRegion(name, population).then(() => {
						update()
						toggle()
					})
				}}>Aggiungi</MDBBtn>

<MDBBtn outline color="grey-text" onClick={() => toggle()}>Annulla</MDBBtn>
			</div>
		</MDBModal>
	)
}

export default RegionModal