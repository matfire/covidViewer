import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBBtn
} from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import { register } from "../client";
import Swal from "sweetalert2";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  return (
    <MDBContainer>
      <MDBRow center className="mt-5 pt-5">
        <MDBCol md="5" xs="8" sm="8">
          <MDBCard>
            <MDBCardBody>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!email || !password) {
                    Swal.fire(
                      "Oops",
                      "Verifica che tutti i campi siano riempiti",
                      "error"
                    );
                    return;
                  }
                  register(email, password).then(res => {
                    Swal.fire(
                      "Hurray!",
                      "Il tuo account é stato creato",
                      "success"
                    );
                    localStorage.setItem("jwt", res.data.token);
                    history.push("/");
                  });
                }}
              >
                <div className="text-center mt-3 mb-5">
                  <img src="/covid19-big.png" className="img-fluid" alt="" />
                </div>

                <div className="grey-text">
                  <MDBInput
                    getValue={value => setEmail(value)}
					value={email}
					type="email"
                    icon="envelope"
					label="Email"
					required
					validate
					success="right"
					error="wrong"
                  />
                  <MDBInput
					getValue={value => setPassword(value)}
					value={password}
                    type="password"
                    icon="lock"
					label="Password"
					required
					validate
					success="right"
					error="wrong"
                  />
                  <div className="text-center mt-5">
                    <MDBBtn color="cyan" type="submit">
                      Crea un account
                    </MDBBtn>
                    <p className="grey-text mt-3">
                      o <Link to="/login">Connettiti</Link>
                    </p>
                  </div>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
