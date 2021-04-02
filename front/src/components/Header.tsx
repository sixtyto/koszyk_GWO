import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/reduxHooks";
import { RootState } from "../redux/store";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Header: React.FC = () => {
  const {
    cart: { order },
  } = useAppSelector((state: RootState) => state.cartData);
  return (
    <Navbar bg="light" expand="md">
      <Container fluid>
        <Navbar.Brand href="#home">Zadanie rekrutacyjne</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Strona domowa
            </Link>
            <Link to="/cart" className="nav-link">
              Koszyk
              {order.length
                ? ` (${order
                    .map(({ quantity }) => quantity)
                    .reduce((a, b) => a + b)})`
                : null}
            </Link>
            {order.length ? (
              <Link to="/order" className="nav-link">
                Zamów
              </Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
