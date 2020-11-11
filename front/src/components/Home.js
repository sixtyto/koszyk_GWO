import React, { useEffect, useState, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import Store from '../contexts/Store';

const Home = () => {
  const { state, dispatch } = useContext(Store);

  const addToCart = id => {
    dispatch({ type: 'ADD_TO_CART', payload: id });
  };

  return (
    <Container>
      <Row>
        {state.books &&
          state.books.map(book => (
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
                Cena: {(book.price / 100).toFixed(2)} {book.currency}
              </p>
              <Button onClick={() => addToCart(book.id)}>
                Dodaj do koszyka
              </Button>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;
