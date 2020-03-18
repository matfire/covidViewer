import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import {useHistory} from 'react-router-dom'

const Navigation = () => {
  const history = useHistory()
  
  if (history.location.pathname !== "/login" && history.location.pathname !== "/register" ) {
    return (
      <MDBNavbar color="white" light>
        <MDBContainer>
          <MDBNavbarBrand>
            <span className="cursor" onClick={() => {
              history.push("/")
            }}><img src="/covid-19.png" className="img-fluid" alt="" /></span>
          </MDBNavbarBrand>
          
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
