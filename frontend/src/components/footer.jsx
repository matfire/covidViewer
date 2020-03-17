import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
const Footer = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "black"
      }}
    >
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Footer;
