import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/reduxHooks";
import { addToCartDispatcher } from "../redux/cart";
import { RootState } from "../redux/store";

import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import { getPrice } from "../utils";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const addToCart = (id: number) => {
    dispatch(addToCartDispatcher(id));
  };
  const { books } = useAppSelector((state: RootState) => state.cartData);

  return (
    <>
      {books.length
        ? books.map(
            ({ id, cover_url, title, author, pages, price, currency }) => (
              <Col
                xs={6}
                sm={4}
                md={3}
                key={id}
                className="p-2 d-flex flex-column justify-content-between"
              >
                <div>
                  <Image fluid src={cover_url} alt={title} />
                </div>
                <p>{author}</p>
                <h3>{title}</h3>
                <p>Stron: {pages}</p>
                <p>
                  Cena: {getPrice(price)} {currency}
                </p>
                <Button onClick={() => addToCart(id)}>Dodaj do koszyka</Button>
              </Col>
            )
          )
        : null}
    </>
  );
};

export default Home;
