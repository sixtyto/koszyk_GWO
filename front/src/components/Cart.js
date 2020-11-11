import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import store from '../contexts/store';

const Cart = () => {
  const { state, dispatch } = useContext(store);

  const removeFromCart = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const getPrice = price => (price / 100).toFixed(2);

  const cartSummary = getPrice(
    state.order
      .map(
        item =>
          item.quantity *
          state.books.filter(order => order.id === item.id)[0].price
      )
      .reduce((a, b) => a + b, 0)
  );

  return (
    <Container className="py-3">
      <Row>
        <Col>
          <h2>Koszyk</h2>
          {state.order[0] ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tytuł</th>
                  <th>Ilość</th>
                  <th>Cena</th>
                </tr>
              </thead>
              <tbody>
                {state.order.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {
                        state.books.filter(item => item.id === order.id)[0]
                          .title
                      }
                    </td>
                    <td className="d-flex justify-content-between">
                      {order.quantity}
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(order.id)}
                      >
                        Usuń
                      </Button>
                    </td>
                    <td>
                      {getPrice(
                        state.books.filter(item => item.id === order.id)[0]
                          .price
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="text-right">
                    Razem
                  </td>
                  <td>{cartSummary}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>Koszyk jest pusty</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
