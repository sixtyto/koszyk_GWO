const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (!action.payload) {
        return state;
      }
      if ([...state.order].filter(item => item.id === action.payload)[0]) {
        return {
          ...state,
          order: [
            ...state.order.filter(item => item.id !== action.payload),
            {
              id: action.payload,
              quantity:
                [...state.order].filter(item => item.id === action.payload)[0]
                  .quantity + 1,
            },
          ],
        };
      }
      return {
        ...state,
        order: [
          ...state.order,
          {
            id: action.payload,
            quantity: 1,
          },
        ],
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        first_name: action.payload[0],
        last_name: action.payload[1],
        city: action.payload[3],
        zip_code: action.payload[2],
      };
    default:
      return state;
    case 'UPDATE_BOOKS':
      return {
        ...state,
        books: action.payload,
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        order: [...state.order.filter(item => item.id !== action.payload)],
      };
    case 'REMOVE_CART':
      return {
        ...state,
        order: [],
      };
  }
};

export default reducer;
