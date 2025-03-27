import React from "react";
import "./footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container text-center">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Team 2. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
