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
import { login } from "../client";
import Swal from "sweetalert2";
import PasswordModal from "../components/passwordModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const history = useHistory();
  return (
    <MDBContainer>
      <PasswordModal isOpen={modal} toggle={() => setModal(!modal)} />
      <MDBRow center className="mt-5 pt-5">
        <MDBCol md="5" xs="8" sm="8">
          <MDBCard>
            <MDBCardBody>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  login(email, password).then(res => {
                    localStorage.setItem("jwt", res.data.token);
                    history.push("/");
                  }).catch((re) => {
                    Swal.fire("Oops!", "Sembra che alcuni dati siano sbagliati 🤷", "error")
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
                    validate
                    success="right"
                    error="wrong"
                    icon="envelope"
                    label="Email"
                    required
                    size="1x"
                  />
                  <MDBInput
                    getValue={value => setPassword(value)}
                    value={password}
                    validate
                    success="right"
                    error="wrong"
                    type="password"
                    icon="lock"
                    label="Password"
                    required
                    size="1x"
                  />
                  <p className="font-small d-flex justify-content-end pointer">
                    <span
                      className="cyan-text"
                      onClick={() => setModal(!modal)}
                    >
                      Password dimenticata?
                    </span>
                  </p>
                  <div className="text-center mt-4">
                    <MDBBtn color="cyan" type="submit">
                      Accedi
                    </MDBBtn>{" "}
                    <p className="grey-text mt-3">
                      o <Link to="/register">Crea un account</Link>{" "}
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

export default Login;
