import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBNavbar,
  MDBNavbarBrand,
  MDBHamburgerToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";

const Navigation = () => {
  const [collapse1, setCo1] = useState(false);
  const [collapseID, setCoID] = useState("");

  const toggleCollapse = id => {
    setCoID(id);
  };
  const toggleSingleCollapse = id => {
    setCo1(!collapse1);
  };
  return (
    <MDBNavbar color="light-blue" light>
      <MDBContainer>
        <MDBNavbarBrand>
          <span className="text-white">Covid-19</span>
        </MDBNavbarBrand>
        <MDBHamburgerToggler
          color="white"
          id="hamburger1"
          onClick={() => {
            toggleSingleCollapse("collapse1");
          }}
        />
        <MDBCollapse isOpen={collapse1} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/region">Regions</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/daily">Reports</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navigation;
