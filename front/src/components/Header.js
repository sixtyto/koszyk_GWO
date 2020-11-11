import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import store from '../contexts/store';

const Header = () => {
  const { state } = useContext(store);
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">Zadanie rekrutacyjne</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Strona domowa
          </Link>
          <Link to="/cart" className="nav-link">
            Koszyk
            {state.order[0]
              ? ` (${state.order
                  .map(item => item.quantity)
                  .reduce((a, b) => a + b)})`
              : null}
          </Link>
          {state.order[0] ? (
            <Link to="/order" className="nav-link">
              Zamów
            </Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
