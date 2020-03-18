import React, { useState } from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput } from 'mdbreact'
import Swal from 'sweetalert2'
import { updatePassword } from '../client'

const PasswordModal = ({isOpen, toggle}) => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<MDBModal isOpen={isOpen} toggle={() => toggle()}>
			<MDBModalBody>
				<h4 className="text-center mt-3 cyan-text">Imposta una nuova password</h4>
				<MDBInput getValue={(v) => setEmail(v)} label="Email" type="email" />
				<MDBInput getValue={(v) => setPassword(v)} label="Nuova Password" type="password" />
			</MDBModalBody>
			<div className="text-center mb-5">
				<MDBBtn color="cyan" onClick={() => {
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
				<MDBBtn outline color="grey-text" onClick={() => toggle()}>Annulla</MDBBtn>
			</div>
		</MDBModal>
	)
}

export default PasswordModal