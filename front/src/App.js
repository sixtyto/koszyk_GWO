import React, { useReducer, useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Cart from './components/Cart';
import Order from './components/Order';
import Header from './components/Header';

import {
  usePersistedContext,
  usePersistedReducer,
} from './contexts/usePersist';

import store from './contexts/Store';
import reducer from './contexts/reducer';

const App = () => {
  const globalStore = usePersistedContext(useContext(store), 'state');
  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, globalStore),
    'state'
  );
  useEffect(() => {
    axios('http://localhost:3001/api/book').then(res =>
      dispatch({ type: 'UPDATE_BOOKS', payload: res.data.data })
    );
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <store.Provider value={{ state, dispatch }}>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/order" component={Order} />
        </store.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
