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
              <MDBNavItem active>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/region">Regioni</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/daily">Reports giornalieri</MDBNavLink>
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
