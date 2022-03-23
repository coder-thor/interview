// dependencies
import { combineReducers } from "redux";

// reducers
import productsReducer from "./productsReducer";

export default combineReducers({
    products: productsReducer
})