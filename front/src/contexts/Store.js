import React from 'react';

const store = React.createContext({
  order: [],
  first_name: '',
  last_name: '',
  city: '',
  zip_code: '',
  books: [],
});

export default store;
