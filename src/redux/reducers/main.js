import { combineReducers } from "redux";

import { authReducer, cartReducer } from "./reducer";

const rootReducer = combineReducers({
    cartReducer, // Rename this to cart
    authReducer,
   
});

export default rootReducer;