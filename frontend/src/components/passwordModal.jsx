import React, { useState } from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput } from 'mdbreact'
import Swal from 'sweetalert2'
import { updatePassword } from '../client'

const PasswordModal = ({isOpen, toggle}) => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<MDBModal isOpen={isOpen} toggle={() => toggle()}>
			<MDBModalHeader toggle={() => toggle()}>Reset Password</MDBModalHeader>
			<MDBModalBody>
				<MDBInput getValue={(v) => setEmail(v)} label="Email" type="email" />
				<MDBInput getValue={(v) => setPassword(v)} label="Nuova Password" type="password" />
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="danger" onClick={() => toggle()}>Annulla</MDBBtn>
				<MDBBtn color="primary" onClick={() => {
					if (!email || !password) {
						Swal.fire("Oops!", "Verifica di aver riempito tutti i dati", "error")
					}
					updatePassword(email, password).then(() => {
						Swal.fire("Yeah!", "Password modificata con successo", "success")
						toggle()
					}).catch(() => {
						Swal.fire("Oops!", "Qualcosa é andato storto", "error")
					})
				}}>Invia</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}

export default PasswordModal