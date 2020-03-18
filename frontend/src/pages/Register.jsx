import React, { useState } from 'react'
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn} from 'mdbreact'
import { Link, useHistory } from 'react-router-dom'
import { register } from '../client'
import Swal from 'sweetalert2'
const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const history = useHistory()
	return (
		<MDBContainer>
			<MDBRow center className="mt-5 pt-5">
				<MDBCol md="6" xs="8" sm="8" >
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header amber">
								<h3>Crea un Account</h3>
							</MDBCardHeader>
							<MDBInput getValue={(value) => setEmail(value)} type="email" icon="envelope" label="Email" />
							<MDBInput getValue={(value) => setPassword("password")} type="password" icon="lock" label="Password" />
							<div className="text-center mt-5">
								<MDBBtn color="primary" onClick={() => {
									if (!email || !password) {
										Swal.fire("Oops", "Verifica che tutti i campi siano riempiti", "error")
										return
									}
									register(email, password).then((res) => {
										Swal.fire("Hurray!", "Il tuo account é stato creato", "success")
										localStorage.setItem("jwt", res.data.token)
										history.push("/")
									})
								}}>Invia</MDBBtn> o <Link to="/login">Connettiti</Link>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default Register