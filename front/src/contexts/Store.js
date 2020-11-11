import React from 'react';

const Store = React.createContext({
  order: [],
  first_name: '',
  last_name: '',
  city: '',
  zip_code: '',
  books: [],
});

export default Store;
