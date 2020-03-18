import React from "react";
import { MDBContainer, MDBFooter, MDBTypography, MDBBox } from "mdbreact";
const Footer = () => {
  return (
    <div >
      <div className="footer-copyright text-center py-5">
        <MDBContainer fluid>
        <MDBBox tag="p"><small className="grey-text">&copy; {new Date().getFullYear()} | powered with &#127861; & &#9749; by <strong>LuMa</strong> {" "}</small></MDBBox>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Footer;
