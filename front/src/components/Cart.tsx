import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/reduxHooks";
import { removeFromCartDispatcher } from "../redux/cart";
import { RootState } from "../redux/store";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { getPrice } from "../utils";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const removeFromCart = (id: number) => {
    dispatch(removeFromCartDispatcher(id));
  };
  const {
    books,
    cart: { order },
  } = useAppSelector((state: RootState) => state.cartData);

  const cartSummary = getPrice(
    order
      .map(
        ({ id, quantity }) =>
          quantity * books.filter((book) => book.id === id)[0].price
      )
      .reduce((a, b) => a + b, 0)
  );
  return (
    <Col>
      <h2>Koszyk</h2>
      {order.length ? (
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
            {order.map(({ id, quantity }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{books.filter((item) => item.id === id)[0].title}</td>
                <td className="d-flex justify-content-between">
                  {quantity}
                  <Button variant="danger" onClick={() => removeFromCart(id)}>
                    Usuń
                  </Button>
                </td>
                <td>
                  {getPrice(books.filter((item) => item.id === id)[0].price)}
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
      {order.length ? (
        <Row>
          <Col xs={{ offset: 10 }}>
            <Link to="/order" className="btn btn-primary">
              Dalej
            </Link>
          </Col>
        </Row>
      ) : null}
    </Col>
  );
};

export default Cart;
