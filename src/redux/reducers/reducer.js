const INIT_STATE = {
  carts: "",
  cartData: "",
  catId: "",
};

const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      let cartItem = action.payload;
      return {
        carts: { ...state.carts, cartItem },
      };
    case "CART_UPDATE":
      let v = action.value;
      localStorage.setItem("cart", JSON.stringify(v));
      return {
        cartData: action.value,
      };
    case "CAT_WISE_FILTER":
      return {
        catId: action.value,
      };
    default:
      return state;
  }
};

export default cartreducer;
