import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// import { auth, db, logout } from '../../firebase'
import './style.css'

function Navibar() {
  // const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="light" variant="light" fixed="top" className="bg-custom">
      <Container className='container-lg'>
        <Navbar.Brand href="/" > <img className={'icon-img'} src={require('../assets/machine-learning24.png')}/> Auto-ML</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Input</Nav.Link>
            <Nav.Link href="/data-list">Data List</Nav.Link>
          </Nav>
          <Nav>
            {/* {user ? <Nav.Link href="/" onClick={logout}>Log Out</Nav.Link> : null} */}
            {!false ? <Nav.Link href="/login">Log In</Nav.Link> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;