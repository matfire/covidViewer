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
        <MDBCol md="6" xs="8" sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header amber">
                <h3>Connettiti</h3>
              </MDBCardHeader>
              <MDBInput
                getValue={value => setEmail(value)}
                type="email"
                icon="envelope"
                label="Email"
              />
              <MDBInput
                getValue={value => setPassword("password")}
                type="password"
                icon="lock"
                label="Password"
              />
              <div className="text-center mt-5">
                <MDBBtn
                  color="primary"
                  onClick={() => {
                    if (!email || !password) {
                      Swal.fire(
                        "Oops",
                        "Verifica di aver riempito tutti i campi",
                        "error"
                      );
                      return;
                    }
                    login(email, password).then(res => {
                      Swal.fire("Hurray!", "Sei connesso", "success");
                      localStorage.setItem("jwt", res.data.token);
                      history.push("/");
                    });
                  }}
                >
                  Invia
                </MDBBtn>{" "}
                o <Link to="/register">Crea un account</Link>{" "}
                <span onClick={() => setModal(!modal)}>
                  Password Dimenticata ?
                </span>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
