import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/reduxHooks";
import { addToCartDispatcher } from "../redux/cart";
import { RootState } from "../redux/store";

import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const addToCart = (id: number) => {
    dispatch(addToCartDispatcher(id));
  };
  const getPrice = (price: number) => (price / 100).toFixed(2);
  const { books } = useAppSelector((state: RootState) => state.cartData);

  return (
    <>
      {books &&
        books.map((book) => (
          <Col
            xs={6}
            sm={4}
            md={3}
            key={book.id}
            className="p-2 d-flex flex-column justify-content-between"
          >
            <div className="">
              <Image fluid src={book.cover_url} alt={book.title} />
            </div>
            <p>{book.author}</p>
            <h3>{book.title}</h3>
            <p>Stron: {book.pages}</p>
            <p>
              Cena: {getPrice(book.price)} {book.currency}
            </p>
            <Button onClick={() => addToCart(book.id)}>Dodaj do koszyka</Button>
          </Col>
        ))}
    </>
  );
};

export default Home;
