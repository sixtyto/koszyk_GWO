import React, { useContext, useState } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import store from '../contexts/store';

const Order = () => {
  const { state, dispatch } = useContext(store);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');

  const setAddress = () => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: [firstNameValue, lastNameValue, zipCodeValue, cityValue],
    });
  };

  const finishOrder = async () => {
    // eslint-disable-next-line camelcase
    const { order, first_name, last_name, city, zip_code } = state;
    await axios({
      method: 'post',
      url: 'http://localhost:3001/api/order',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        order,
        first_name,
        last_name,
        city,
        zip_code,
      }),
    });
    dispatch({
      type: 'REMOVE_CART',
    });
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
                  value={firstNameValue}
                  onChange={e => setFirstNameValue(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="last_name">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Wpisz nazwisko"
                  value={lastNameValue}
                  onChange={e => setLastNameValue(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="zip-code">
                <Form.Label>Kod pocztowy</Form.Label>
                <Form.Control
                  pattern="[0-9][0-9]-[0-9][0-9][0-9]"
                  type="text"
                  placeholder="Wpisz kod pocztowy"
                  value={zipCodeValue}
                  onChange={e => setZipCodeValue(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>Miasto</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Wpisz miasto"
                  value={cityValue}
                  onChange={e => setCityValue(e.target.value)}
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
