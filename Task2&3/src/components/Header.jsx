import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

function Header() {
  console.log("Header.css is loaded"); // Debugging untuk memastikan CSS termuat

  return (
    <Navbar
      expand="lg"
      className="navbar-light" // Tambahkan ini untuk memastikan warna tidak tertimpa Bootstrap
      style={{ backgroundColor: "transparent", height: "1in" }}
      variant="light"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <strong style={{ color: "black" }}>Team 2 JAYA</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/informasi" className="nav-link">
              Informasi
            </Nav.Link>
            <Nav.Link as={Link} to="/teams" className="nav-link">
              Teams
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="nav-link">
              Services
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
