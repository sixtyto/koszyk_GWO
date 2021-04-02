import React from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../redux/hooks/reduxHooks";
import { RootState } from "../redux/store";
import {
  setFirstNameDispatcher,
  setLastNameDispatcher,
  setCityDispatcher,
  setZipCodeDispatcher,
  removeCart,
} from "../redux/cart";

const Order: React.FC = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state: RootState) => state.cartData);
  const { first_name, last_name, city, zip_code } = order;
  const setFirstName = (value: string) =>
    dispatch(setFirstNameDispatcher(value));
  const setLastName = (value: string) => dispatch(setLastNameDispatcher(value));
  const setZipCode = (value: string) => dispatch(setZipCodeDispatcher(value));
  const setCity = (value: string) => dispatch(setCityDispatcher(value));

  const finishOrder = () => {
    const regex = new RegExp("^[0-9]{2}-[0-9]{3}$");
    if (!first_name) return alert("Podaj imię");
    if (!last_name) return alert("Podaj nazwisko");
    if (!city) return alert("Podaj miasto");
    if (!zip_code || !regex.test(zip_code))
      return alert("Podaj prawidłowy kod pocztowy");

    axios({
      method: "post",
      url: "http://localhost:3001/api/order",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(order),
    }).then(console.log);
    return dispatch(removeCart());
  };

  return (
    <Col>
      {order.order.length > 0 ? (
        <Form>
          <Form.Group controlId="first_name">
            <Form.Label>Imię</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Wpisz imię"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="last_name">
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Wpisz nazwisko"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="zip-code">
            <Form.Label>Kod pocztowy</Form.Label>
            <Form.Control
              pattern="[0-9][0-9]-[0-9][0-9][0-9]"
              type="text"
              placeholder="Wpisz kod pocztowy"
              value={zip_code}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>Miasto</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Wpisz miasto"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col xs={{ offset: 10 }}>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  finishOrder();
                }}
              >
                Zamów
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <p>Zamówienie zostało złożone</p>
      )}
    </Col>
  );
};

export default Order;
