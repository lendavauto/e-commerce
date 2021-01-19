import { ADD_TO_CART, REMOVE_FROM_CART, SET_USER, CLEAR_CART } from './actions';

function reducer(state, action) {
  console.log(action);
  console.log(state);

  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    case REMOVE_FROM_CART:
      let newCart = [...state.cart];
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(`Cant remove product id:${action.id}`);
      }
      return { ...state, cart: newCart };

    case SET_USER:
      return { ...state, user: action.payload };

    case CLEAR_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export default reducer;
