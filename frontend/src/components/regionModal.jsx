import React, { useState } from "react"
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput } from "mdbreact"
import Swal from 'sweetalert2'
import { createRegion } from "../client"

const RegionModal = ({isOpen, toggle, update}) => {
	const [name, setName] = useState("")
	const [population, setPopulation] = useState(0)
	return (
		<MDBModal isOpen={isOpen} toggle={() => toggle()}>
			<MDBModalHeader toggle={() => toggle()}>Add Region</MDBModalHeader>
			<MDBModalBody>
				<MDBInput type="text" label="name" getValue={(value) => setName(value)} />
				<MDBInput type="number" label="population" getValue={(value) => setPopulation(value)} />
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="danger" onClick={() => toggle()}>Close</MDBBtn>
				<MDBBtn color="primary" onClick={() => {
					if (!name || population < 1) {
						Swal.fire("Oops!", "Please fill in all the fields", "error")
						return
					}
					createRegion(name, population).then(() => {
						update()
						toggle()
					})
				}}>Submit</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}

export default RegionModal