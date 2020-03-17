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
import Swal from 'sweetalert2'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  return (
    <MDBContainer>
      <MDBRow center className="mt-5 pt-5">
        <MDBCol md="6" xs="8" sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header amber">
                <h3>Sign In</h3>
              </MDBCardHeader>
              <MDBInput
                getValue={value => setEmail(value)}
                type="email"
                icon="envelope"
                label="Email here"
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
                        "Check that all the fields are filled in",
                        "error"
                      );
                      return;
                    }
                    login(email, password).then(res => {
                      Swal.fire(
                        "Hurray!",
                        "You are now logged in",
                        "success"
                      );
					  localStorage.setItem("jwt", res.data.token);
					  history.push("/")
                    });
                  }}
                >
                  Submit
                </MDBBtn>{" "}
                or <Link to="/register">Create an account</Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
