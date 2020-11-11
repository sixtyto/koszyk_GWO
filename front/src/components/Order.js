import React, { useContext, useState } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Store from '../contexts/Store';

const Order = () => {
  const { state, dispatch } = useContext(Store);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const setAddress = () => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: [firstName, lastName, zipCode, city],
    });
  };
  const finishOrder = () => {
    console.log(
      JSON.stringify({
        order: state.order,
        first_name: state.first_name,
        last_name: state.last_name,
        city: state.city,
        zip_code: state.zip_code,
      })
    );
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/order',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        order: state.order,
        first_name: state.first_name,
        last_name: state.last_name,
        city: state.city,
        zip_code: state.zip_code,
      }),
    })
      .then(res => console.log(res))
      .then(
        dispatch({
          type: 'REMOVE_CART',
        })
      );
  };
  return (
    <Container className="my-3">
      <Row>
        <Col>
          {state.order[0] ? (
            <Form>
              <Form.Group controlId="first_name">
                <Form.Label>Imię</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Wpisz imię"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="last_name">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Wpisz nazwisko"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="zip-code">
                <Form.Label>Kod pocztowy</Form.Label>
                <Form.Control
                  pattern="[0-9][0-9]-[0-9][0-9][0-9]"
                  type="text"
                  placeholder="Wpisz kod pocztowy"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>Miasto</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Wpisz miasto"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  setAddress();
                  finishOrder();
                }}
              >
                Zamów
              </Button>
            </Form>
          ) : (
            <p>Zamówienie zostało złożone</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
