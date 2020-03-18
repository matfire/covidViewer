import React from "react";
import { MDBContainer, MDBFooter, MDBTypography, MDBBox } from "mdbreact";
const Footer = () => {
  return (
    <div >
      <div className="footer-copyright text-center py-5">
        <MDBContainer fluid>
        <MDBBox tag="p"><small className="grey-text">&copy; {new Date().getFullYear()} | powered with &#9749;, &#127861; & &#10084; by <strong>LuMa</strong> {" "}</small></MDBBox>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Footer;
