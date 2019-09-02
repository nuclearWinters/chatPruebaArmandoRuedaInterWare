import { combineReducers } from "redux"
import postReducer from "./postReducer"
import toggleReducer from "./toggleReducer"

export default combineReducers({
    posts: postReducer,
    toggle: toggleReducer
})