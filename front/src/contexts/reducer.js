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
