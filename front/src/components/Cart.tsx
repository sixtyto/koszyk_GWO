import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/reduxHooks";
import { removeFromCartDispatcher } from "../redux/cart";
import { RootState } from "../redux/store";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const removeFromCart = (id: number) => {
    dispatch(removeFromCartDispatcher(id));
  };
  const getPrice = (price: number) => (price / 100).toFixed(2);
  const {
    books,
    order: { order },
  } = useAppSelector((state: RootState) => state.cartData);

  const cartSummary = getPrice(
    order
      .map(
        (item) =>
          item.quantity * books.filter((order) => order.id === item.id)[0].price
      )
      .reduce((a, b) => a + b, 0)
  );
  return (
    <Container className="py-3">
      <Row>
        <Col>
          <h2>Koszyk</h2>
          {order.length > 0 ? (
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
                {order.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {books.filter((item) => item.id === order.id)[0].title}
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
                        books.filter((item) => item.id === order.id)[0].price
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="text-right">
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
      {order.length > 0 ? (
        <Row>
          <Col xs={{ offset: 10 }}>
            <Link to="/order" className="btn btn-primary">
              Dalej
            </Link>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default Cart;
