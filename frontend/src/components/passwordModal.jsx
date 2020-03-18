import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact'

const PasswordModal = ({isOpen, toggle, update}) => {
	return (
		<MDBModal isOpen={isOpen} toggle={() => toggle()}>
			<MDBModalHeader toggle={() => toggle()}>Reset Password</MDBModalHeader>
			<MDBModalBody>

			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="danger" onClick={() => toggle()}>Annulla</MDBBtn>
				<MDBBtn color="primary" onClick={() => {

				}}>Invia</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}

export default PasswordModal