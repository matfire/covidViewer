import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBHamburgerToggler
} from "mdbreact";
import {useHistory} from 'react-router-dom'

const Navigation = () => {
  const history = useHistory()
  const [collapsed, setCollapsed] = useState("")
  const user = JSON.parse(localStorage.getItem("user"))
  const allowedUsers = ["mgassend@gmail.com", "bgassend@me.com", "lucia.taras@me.com"]

  const toggleCollapse = () => {
    setCollapsed((oldCol) => oldCol !== "navbar" ? "navbar" : "")
  }
  if (history.location.pathname !== "/login" && history.location.pathname !== "/register" ) {
    return (
      <MDBNavbar expand="md" color="white" light>
        <MDBContainer size="xl">
          <MDBNavbarBrand>
            <span className="cursor" onClick={() => {
              history.push("/")
            }}><img src="/covid-19.png" className="img-fluid" alt="" /></span>
          </MDBNavbarBrand>
          <MDBNavbarToggler color="cyan" id="navbar" onClick={() => toggleCollapse()} />
          <MDBCollapse id="navbar" isOpen={collapsed} navbar>
            <MDBNavbarNav right>
{ user && user.email && allowedUsers.indexOf(user.email) >= 0 && <React.Fragment>

<MDBNavItem active={history.location.pathname === "/"}>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={history.location.pathname === "/region"}>
                  <MDBNavLink to="/region">Regioni</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={history.location.pathname === "/daily"}>
                  <MDBNavLink to="/daily">Dati giornalieri</MDBNavLink>
                </MDBNavItem>
</React.Fragment>             }
                <MDBNavItem>
                <MDBBtn color="cyan" outline size="sm" onClick={() => {
            localStorage.removeItem("jwt")
            history.push("/login")
					}}>Logout</MDBBtn>
                </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );

  } else {
    return (
      <div></div>
    );
  } 
  
};

export default Navigation;
