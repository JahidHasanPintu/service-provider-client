export const ADD = (item, quantity,selectedColor, selectedSize ) => {
  let oQuantity = quantity;

  let oColor = selectedColor;
  let oSize =  selectedSize;
  if(!quantity){
    oQuantity = 1;
  }
  if(!selectedSize){
    oSize = " ";
  }
  if(!selectedColor){
    oColor = " ";
  }
  return {
    type: "ADD_CART",
    payload: {
      ...item,
      orderQuantity: oQuantity,
      orderColor: oColor,
      orderSize: oSize,
    }
  }
}

export const INCREMENT_QUANTITY = (item) => {
  return {
    type: "INCREMENT_QUANTITY",
    payload: item
  };
};

export const DECREMENT_QUANTITY = (item) => {
  return {
    type: "DECREMENT_QUANTITY",
    payload: item
  };
};


export const REMOVE = (item) => {
  return {
    type: "REMOVE_CART",
    payload: item
  };
};

export const CLEAR_CART = () => {
  return {
    type: "CLEAR_CART"
  };
};


export const LOGIN_SUCCESS = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user
  };
};

export const LOGOUT = () => {
  return {
    type: "LOGOUT"
  };
};