import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "./redux/hooks/reduxHooks";
import { getData } from "./redux/cart";

import Home from "./components/Home";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Header from "./components/Header";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios("http://localhost:3001/api/book").then(
      (data) => dispatch(getData(data.data.data)) // xD
    );
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Row>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/order" component={Order} />
          </Switch>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
