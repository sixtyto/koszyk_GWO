import React, { useContext, useState } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import store from '../contexts/Store';

const Order = () => {
  const { state, dispatch } = useContext(store);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');

  const finishOrder = () => {
    const regex = new RegExp('^[0-9]{2}-[0-9]{3}$');
    // eslint-disable-next-line camelcase
    const { order } = state;
    if (!firstNameValue) return alert('Podaj imię');
    if (!lastNameValue) return alert('Podaj nazwisko');
    if (!cityValue) return alert('Podaj miasto');
    if (!zipCodeValue || !regex.test(zipCodeValue))
      return alert('Podaj prawidłowy kod pocztowy');

    axios({
      method: 'post',
      url: 'http://localhost:3001/api/order',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        order,
        first_name: firstNameValue,
        last_name: lastNameValue,
        city: cityValue,
        zip_code: zipCodeValue,
      }),
    });
    return dispatch({
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
