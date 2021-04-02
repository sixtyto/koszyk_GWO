import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "./redux/hooks/reduxHooks";
import { getData } from "./redux/cart";

import Cart from "./components/Cart";
import Container from "react-bootstrap/Container";
import Home from "./components/Home";
import Order from "./components/Order";
import Header from "./components/Header";
import Row from "react-bootstrap/Row";

import { BookResponse } from "./types";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get<BookResponse>("http://localhost:3001/api/book")
      .then((data) => dispatch(getData(data.data.data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Container className="py-3">
        <Row>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/order" component={Order} />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
