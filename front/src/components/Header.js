import React, { useContext } from 'react';

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
          <Nav.Link href="/">Strona domowa</Nav.Link>
          <Nav.Link href="/cart">
            Koszyk
            {state.order[0]
              ? ` (${state.order
                  .map(item => item.quantity)
                  .reduce((a, b) => a + b)})`
              : null}
          </Nav.Link>
          {state.order[0] ? <Nav.Link href="/order">Zamów</Nav.Link> : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
